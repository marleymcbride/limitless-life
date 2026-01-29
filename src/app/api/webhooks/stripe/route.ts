import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from 'next/headers';

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
          // Payment successful - you can now:
          // 1. Grant access to premium content
          // 2. Send confirmation emails
          // 3. Update your database
          // 4. Trigger fulfillment workflows

          console.log(`Payment successful for session: ${session.id}`);
          console.log(`Customer email: ${session.customer_details?.email}`);
          console.log(`Amount: ${session.amount_total} ${session.currency?.toUpperCase() || 'USD'}`);

          // TODO: Implement your post-payment logic here
          // Example: Update database, send emails, etc.
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session expired: ${session.id}`);
        // TODO: Handle expired sessions if needed
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment_intent succeeded: ${paymentIntent.id}`);
        // TODO: Handle successful payment intent if needed
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment_intent failed: ${paymentIntent.id}`);
        // TODO: Handle failed payments if needed
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
