import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { users, payments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { trackEvent } from '@/lib/analytics';
import { n8nEvents } from '@/lib/n8nWebhooks';

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events with signature verification
 *
 * Important: Configure STRIPE_WEBHOOK_SECRET in your environment variables
 * Get it from: Stripe Dashboard → Developers → Webhooks → Click on webhook → Signing secret
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found in headers');
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 401 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-01-27.acacia" as any, // Use any to allow flexibility with Stripe API versions
    });

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Webhook signature verification failed:', errorMessage);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Handle the event
    console.log(`Received Stripe webhook: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status === 'paid') {
          const userId = session.metadata?.userId;
          const email = session.metadata?.email || session.customer_details?.email;

          if (!userId || !email) {
            console.error('Missing userId or email in session metadata');
            break;
          }

          // Get user details
          const user = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

          if (user.length === 0) {
            console.error('User not found:', userId);
            break;
          }

          // Calculate amount (from cents to dollars)
          const amount = (session.amount_total || 0) / 100;
          const currency = (session.currency || 'usd').toUpperCase();
          const paymentIntentId = session.payment_intent as string;

          // Store payment record
          await db.insert(payments).values({
            userId,
            stripePaymentId: paymentIntentId,
            amount,
            currency,
            status: 'succeeded',
            paymentDate: new Date(),
            metadata: {
              sessionId: session.id,
              ...session.metadata,
            },
          });

          // Update user status to customer
          await db
            .update(users)
            .set({
              status: 'customer',
              updatedAt: new Date(),
            })
            .where(eq(users.id, userId));

          // Track payment event
          await trackEvent({
            sessionId: session.metadata?.sessionId || '',
            userId,
            eventType: 'payment_complete',
            eventData: {
              email,
              amount,
              currency,
              stripePaymentId: paymentIntentId,
            },
          });

          // Trigger n8n workflow for customer onboarding
          await n8nEvents.paymentComplete({
            userId,
            email,
            amount,
            currency,
            stripePaymentId: paymentIntentId,
            productName: session.metadata?.productName || 'Limitless Life Program',
            firstName: user[0].firstName,
            lastName: user[0].lastName,
          });

          console.log(`Payment processed for session: ${session.id}`);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session expired: ${session.id}`);

        // Track expired checkout for analytics
        const email = session.customer_details?.email;
        if (email) {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (user.length > 0) {
            await trackEvent({
              sessionId: session.metadata?.sessionId || '',
              userId: user[0].id,
              eventType: 'pricing_view',
              eventData: {
                email,
                checkoutExpired: true,
              },
            });
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment_intent succeeded: ${paymentIntent.id}`);

        // If this wasn't handled by checkout.session.completed, handle it here
        const userId = paymentIntent.metadata.userId;
        const email = paymentIntent.metadata.email;

        if (userId && email) {
          // Get user details
          const user = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

          if (user.length > 0) {
            const amount = paymentIntent.amount / 100;
            const currency = paymentIntent.currency.toUpperCase();

            // Store payment record
            await db.insert(payments).values({
              userId,
              stripePaymentId: paymentIntent.id,
              amount,
              currency,
              status: 'succeeded',
              paymentDate: new Date(),
              metadata: paymentIntent.metadata,
            });

            // Track payment event
            await trackEvent({
              sessionId: paymentIntent.metadata.sessionId || '',
              userId,
              eventType: 'payment_complete',
              eventData: {
                email,
                amount,
                currency,
                stripePaymentId: paymentIntent.id,
              },
            });

            // Trigger n8n workflow
            await n8nEvents.paymentComplete({
              userId,
              email,
              amount,
              currency,
              stripePaymentId: paymentIntent.id,
              productName: paymentIntent.metadata.productName || 'Limitless Life Program',
              firstName: user[0].firstName,
              lastName: user[0].lastName,
            });
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment_intent failed: ${paymentIntent.id}`);

        const userId = paymentIntent.metadata.userId;
        const email = paymentIntent.metadata.email;

        if (userId && email) {
          // Store failed payment record
          await db.insert(payments).values({
            userId,
            stripePaymentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency.toUpperCase(),
            status: 'failed',
            paymentDate: new Date(),
            metadata: {
              ...paymentIntent.metadata,
              lastPaymentError: paymentIntent.last_payment_error?.message,
            },
          });
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice paid: ${invoice.id}`);
        // TODO: Handle subscription invoice payments if you add subscriptions later
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice payment failed: ${invoice.id}`);
        // TODO: Handle failed invoice payments if you add subscriptions later
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return 200 to acknowledge receipt of the event
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 * Although webhooks don't need CORS, this helps with testing
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'POST, OPTIONS',
    },
  });
}
