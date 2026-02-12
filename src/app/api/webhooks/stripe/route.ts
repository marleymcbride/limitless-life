import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { users, payments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { trackEvent } from '@/lib/analytics';
import { n8nEvents, syncPaymentToAirtable } from '@/lib/n8nWebhooks';
import { calculateLeadScore } from '@/lib/scoring';

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

    // Note: Stripe API version must match your webhook configuration
    // Check: Stripe Dashboard → Developers → Webhooks
    // Update this when upgrading Stripe API versions
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16" as any,
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
        console.log('[STRIPE WEBHOOK] checkout.session.completed received');
        console.log('[STRIPE WEBHOOK] Session ID:', session.id);
        console.log('[STRIPE WEBHOOK] Payment status:', session.payment_status);
        console.log('[STRIPE WEBHOOK] Metadata:', session.metadata);

        if (session.payment_status === 'paid') {
          console.log('[STRIPE WEBHOOK] Payment is paid, processing...');
          // Try to get userId from metadata first (existing user)
          let userId = session.metadata?.userId;
          const email = session.metadata?.email || session.customer_details?.email;

          if (!email) {
            console.error('No email found in session');
            break;
          }

          // If no userId, find or create user by email (new user flow)
          if (!userId) {
            console.log('[STRIPE WEBHOOK] No userId in metadata, looking up user by email...');
            let user = await db
              .select()
              .from(users)
              .where(eq(users.email, email))
              .limit(1);

            if (user.length === 0) {
              console.log('[STRIPE WEBHOOK] User not found, creating new user in Railway...');
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
              console.log('[STRIPE WEBHOOK] Created new user from checkout:', { userId, email });
            } else {
              userId = user[0].id;
              console.log('[STRIPE WEBHOOK] Found existing user from checkout:', { userId, email });
            }
          }

          // Get user details (needed for firstName/lastName in n8n call)
          const user = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

          if (user.length === 0) {
            console.error('User not found after lookup:', userId);
            break;
          }

          // Calculate amount (from cents to dollars)
          const amount = (session.amount_total || 0) / 100;
          const currency = (session.currency || 'usd').toUpperCase();
          const paymentIntentId = session.payment_intent as string;

          // Check if payment already exists (idempotency)
          const existingPayment = await db
            .select()
            .from(payments)
            .where(eq(payments.stripePaymentIntentId, paymentIntentId))
            .limit(1);

          if (existingPayment.length > 0) {
            console.log('Payment already recorded, skipping duplicate:', paymentIntentId);
            return NextResponse.json({ received: true, status: 'duplicate' });
          }

          // Store payment record
          console.log('[STRIPE WEBHOOK] Storing payment in Railway database...');
          await db.insert(payments).values({
            userId,
            stripePaymentIntentId: paymentIntentId,
            amount,
            currency,
            tier, // Which tier they purchased
            status: 'succeeded',
            paymentDate: new Date(),
            metadata: {
              sessionId: session.id,
              ...session.metadata,
            },
          });
          console.log('[STRIPE WEBHOOK] Payment stored in Railway');

          // Update user status to customer
          console.log('[STRIPE WEBHOOK] Updating user status to customer...');
          await db
            .update(users)
            .set({
              status: 'customer',
              updatedAt: new Date(),
            })
            .where(eq(users.id, userId));
          console.log('[STRIPE WEBHOOK] User status updated');

          // Track payment event
          console.log('[STRIPE WEBHOOK] Tracking payment_complete event...');
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
          console.log('[STRIPE WEBHOOK] Event tracked successfully');

          // Calculate user's current lead score for n8n sync
          const scoreData = await calculateLeadScore(userId);

          // Determine tier from metadata or calculate from amount
          const amountInCents = session.amount_total || 0;
          let tier: 'Access' | 'Plus' | 'Premium' | 'Elite' = 'Access';
          if (amountInCents >= 1499700) tier = 'Elite';
          else if (amountInCents >= 899700) tier = 'Premium';
          else if (amountInCents >= 499700) tier = 'Plus';
          else tier = 'Access';

          // Sync to Airtable via n8n (fire-and-forget, non-blocking)
          syncPaymentToAirtable({
            email,
            firstName: user[0].firstName || undefined,
            lastName: user[0].lastName || undefined,
            tier, // Which tier they purchased
            amount: amountInCents, // in cents
            stripePaymentId: paymentIntentId,
            paymentDate: new Date().toISOString(),
            score: scoreData.score,
            phone: user[0].phone || undefined,
            utmSource: session.metadata?.utm_source,
            utmCampaign: session.metadata?.utm_campaign,
            utmMedium: session.metadata?.utm_medium,
          }).catch(error => {
            console.error('[n8n] Payment sync failed (non-blocking):', error);
            // Don't throw - payment is already saved to Railway
          });

          // Also trigger legacy n8n event for backward compatibility
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

          console.log(`Payment processed for session: ${session.id}, user: ${email}`);
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
              stripePaymentIntentId: paymentIntent.id,
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
            stripePaymentIntentId: paymentIntent.id,
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
