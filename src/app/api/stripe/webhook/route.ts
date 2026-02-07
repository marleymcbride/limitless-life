import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { users, payments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { n8nEvents } from '@/lib/n8nWebhooks';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract metadata
      const email = session.customer_details?.email;
      const tier = session.metadata?.tier;
      const paymentId = session.payment_intent as string;

      if (!email || !tier) {
        console.error('Missing email or tier in session');
        return NextResponse.json(
          { error: 'Invalid session data' },
          { status: 400 }
        );
      }

      // Find or create user
      let user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      let userId: string;

      if (user.length === 0) {
        // Create new user
        const [newUser] = await db
          .insert(users)
          .values({
            email,
            status: 'customer',
            createdAt: new Date(),
          })
          .returning();
        userId = newUser.id;
      } else {
        userId = user[0].id;

        // Update existing user to customer status
        await db
          .update(users)
          .set({
            status: 'customer',
          })
          .where(eq(users.id, userId));
      }

      // Save payment to database
      await db.insert(payments).values({
        userId,
        stripePaymentIntentId: paymentId,
        amount: session.amount_total!,
        currency: session.currency || 'usd',
        status: 'complete',
        createdAt: new Date(),
      });

      // Trigger n8n workflow
      await n8nEvents.paymentComplete({
        userId,
        email,
        amount: session.amount_total!,
        currency: session.currency || 'usd',
        stripePaymentId: paymentId,
        productName: tier,
      });

      console.log('Payment processed:', email, tier);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
