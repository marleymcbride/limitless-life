Concierge Deposit Flow — Full Integration for the Dev Server Specialist:

What we are building

When a prospect pays the £197 concierge deposit on limitless-life.co, we need that payment to:

Write to Railway Postgres (source of truth for all payments/users)
Appear automatically in the Admin Dashboard at /admin/revenue and /admin/revtrack
Trigger n8n to write to Airtable and notify Marley

This is a new payment type — separate from all existing Limitless tiers (Access/Plus/Premium/Elite). It must not interfere with any existing payment flows.

Context — how the existing system works

When any Stripe checkout.session.completed event fires, it hits your webhook handler at:

/api/webhooks/stripe/route.ts

That handler currently:

Reads session.amount_total and maps it to a tier (Access/Plus/Premium/Elite)
Upserts a user in the users table
Inserts a row in the payments table
Fires events to n8n

The problem: a £197 deposit will hit this same handler and get misidentified as the lowest tier. We need to intercept it before that happens.

The differentiator: Stripe metadata will contain tier: "Concierge-deposit" on all three deposit price IDs.

Exactly what needs changing

File 1: src/db/schema.ts

The payments table is missing a payment_plan column. Add it:

typescript
paymentPlan: text('payment_plan'), // 'monthly' | '4-month' | '6-month'

Then run a Drizzle migration to apply this to Railway Postgres. This column is what differentiates which programme length the prospect chose — it must exist before any deposits can be processed correctly.

File 2: src/app/api/create-checkout-session/route.ts

This file creates the Stripe Checkout session when a user clicks pay. The Stripe session metadata must include paymentPlan so the webhook handler and n8n both know which programme length was selected.

Confirm the metadata being sent looks exactly like this:

typescript
metadata: {
  tier: 'Concierge-deposit',        // exact string — this is the intercept key
  paymentPlan: 'monthly',           // or '4-month' or '6-month' — driven by what user selected on pricing page
  email: userEmail,                 // user's email
  customerName: userFullName,       // user's full name
  sessionId: sessionUuid,           // your internal session tracking ID
}

If paymentPlan is not already in the metadata, add it. This is the single most important field — everything downstream depends on it.

File 3: src/app/api/webhooks/stripe/route.ts

This is the main change. At the very top of the checkout.session.completed case, before any existing tier-mapping logic, add the following intercept block:

typescript
const metadata = session.metadata || {};

if (metadata.tier === 'Concierge-deposit') {

  // Extract all data from Stripe payload
  const email = metadata.email || session.customer_details?.email || '';
  const customerName = metadata.customerName || session.customer_details?.name || '';
  const paymentPlan = metadata.paymentPlan; // 'monthly' | '4-month' | '6-month'
  const firstName = customerName.split(' ')[0] || '';
  const lastName = customerName.split(' ').slice(1).join(' ') || '';

  // STEP 1: Upsert user in Postgres `users` table
  // If user already exists (e.g. was a lead), update their status to customer
  // If new, create them
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  let userId: string;

  if (existing.length > 0) {
    userId = existing[0].id;
    await db.update(users)
      .set({ status: 'customer', updatedAt: new Date() })
      .where(eq(users.id, userId));
  } else {
    const newUser = await db.insert(users)
      .values({ email, firstName, lastName, status: 'customer' })
      .returning();
    userId = newUser[0].id;
  }

  // STEP 2: Insert into Postgres `payments` table
  // Uses the new paymentPlan column
  // tier is stored as 'Concierge-deposit' — not mapped to Access/Plus/Premium/Elite
  await db.insert(payments).values({
    userId,
    stripePaymentIntentId: session.payment_intent as string,
    amount: session.amount_total || 19700,   // in pence — £197 = 19700
    currency: session.currency || 'gbp',
    tier: 'Concierge-deposit',
    paymentPlan,                              // 'monthly' | '4-month' | '6-month'
    status: 'succeeded',
  });

  // STEP 3: Insert into Postgres `events` table
  // For admin analytics and funnel tracking
  await db.insert(events).values({
    sessionId: metadata.sessionId,
    userId,
    eventType: 'concierge_deposit_paid',
    eventData: {
      paymentPlan,
      amount: session.amount_total,
      stripeSessionId: session.id,
    },
  });

  // STEP 4: POST to n8n webhook
  // This triggers n8n to write to Airtable + Slack Marley + create TickTick task
  // n8n is completely separate from your site — this is a fire-and-forget POST
  await fetch('https://n8n.marleymcbride.co/webhook/limitless-concierge-deposit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      firstName,
      lastName,
      paymentPlan,
      amount: (session.amount_total || 19700) / 100,  // convert pence to pounds for n8n
      currency: session.currency || 'gbp',
      stripeSessionId: session.id,
      stripeCustomerId: session.customer,
      depositDate: new Date().toISOString().split('T')[0],
    }),
  });

  // IMPORTANT: return here — do not fall through to existing tier-mapping logic below
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}

// ALL existing checkout.session.completed logic continues below, completely unchanged
What the admin dashboard gets automatically

The admin dashboard at /admin/revenue and /admin/revtrack reads directly from the Postgres payments table. No changes needed to the dashboard itself.

Once the payments table has:

tier = 'Concierge-deposit'
payment_plan = 'monthly' | '4-month' | '6-month'

These deposits will appear in Revtrack automatically. If you want to segment by payment_plan in the Revtrack UI (e.g. show monthly vs 4-month vs 6-month deposit counts separately), that's a UI addition — let me know if you want to build that.

What n8n handles (separate system — no action needed from you)

Once your site POSTs to https://n8n.marleymcbride.co/webhook/limitless-concierge-deposit, n8n takes over completely:

Creates a record in Airtable Concierge Deposits table with status pending-review
Sends Marley a Slack message: who paid, which plan, their email
Creates a TickTick task: "Review + book call — [name] — [paymentPlan] commitment"
Logs to Automations Log

Marley then reviews in Airtable and marks accept/decline. When accepted and client pays in full, a separate n8n workflow handles moving them into the coaching system.

Summary of exactly what to do
Task	File	Action
Add payment_plan column	src/db/schema.ts	Add field, run migration
Confirm metadata includes paymentPlan	src/app/api/create-checkout-session/route.ts	Check + add if missing
Add deposit intercept block	src/app/api/webhooks/stripe/route.ts	Add before existing tier logic
Deploy to Vercel	—	Push + confirm live