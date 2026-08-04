import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { gbpMinorToUsdCents } from '@/lib/fx';
import { syncPaymentToAirtable } from '@/lib/n8nWebhooks';

/**
 * POST /api/admin/record-payment
 *
 * Record a manual payment (e.g. Built Different Legacy monthly subs that
 * aren't processed through Stripe). Writes to Postgres with USD cents in
 * `amount` + original GBP pence in `amount_gbp`, and fires the n8n
 * payment-complete webhook so it also lands in Airtable — mirroring a
 * live Stripe payment.
 *
 * Body:
 * - email: customer email (required — finds or creates the user)
 * - amountGbpPence: amount in GBP minor units (pence), e.g. 10000 = £100
 * - tier: tier label (default 'Built Different Legacy')
 * - paymentDate: optional ISO date (defaults to now)
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, amountGbpPence, tier, paymentDate } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }
    if (typeof amountGbpPence !== 'number' || !isFinite(amountGbpPence) || amountGbpPence <= 0) {
      return NextResponse.json({ error: 'amountGbpPence must be a positive number' }, { status: 400 });
    }

    // Find or create user
    let user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    let userId: string;
    const isNewUser = user.length === 0;

    if (user.length > 0) {
      userId = user[0].id;
      await db.update(users).set({ status: 'customer', updatedAt: new Date() }).where(eq(users.id, userId));
    } else {
      const [newUser] = await db.insert(users).values({
        email,
        status: 'customer',
        createdAt: new Date(),
      }).returning();
      userId = newUser.id;
    }

    // Convert GBP pence → USD cents (live rate w/ fallback)
    const usdCents = await gbpMinorToUsdCents(amountGbpPence);
    const stripePaymentId = `manual_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Insert payment record
    await db.insert(payments).values({
      userId,
      stripePaymentIntentId: stripePaymentId,
      amount: usdCents,
      amountGbp: amountGbpPence,
      currency: 'USD',
      tier: tier || 'Built Different Legacy',
      status: 'succeeded',
      paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      metadata: { source: 'manual-entry' },
    });

    // Fire n8n webhook for Airtable sync (fire-and-forget)
    syncPaymentToAirtable({
      email,
      firstName: user[0]?.firstName || undefined,
      lastName: user[0]?.lastName || undefined,
      tier: (tier || 'Built Different Legacy') as 'Access' | 'Plus' | 'Premium' | 'Elite',
      amount: usdCents, // USD cents
      stripePaymentId,
      paymentDate: new Date().toISOString(),
      score: user[0]?.leadScore || 100,
    }).catch((err) => {
      console.error('[record-payment] Airtable sync failed (non-blocking):', err);
    });

    return NextResponse.json({
      success: true,
      payment: {
        email,
        amountGbpPence,
        usdCents,
        tier: tier || 'Built Different Legacy',
        isNewUser,
      },
    });
  } catch (error) {
    console.error('[record-payment] Error:', error);
    return NextResponse.json(
      { error: 'Failed to record payment' },
      { status: 500 }
    );
  }
}
