import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * GET /api/verify-session?session_id=xxx
 * Verify a Stripe checkout session and return session details
 */
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Validate session ID format (Stripe session IDs start with 'cs_')
    if (!sessionId.startsWith('cs_') || sessionId.length !== 28) { // Stripe session IDs are always 28 chars
      return NextResponse.json(
        { error: "Invalid session ID format" },
        { status: 400 }
      );
    }

    // Initialize Stripe
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-01-27.acacia" as any, // Use any to allow flexibility with Stripe API versions
    });

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details'],
    });

    // Verify the session is paid
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        {
          error: "Payment not completed",
          status: session.payment_status,
          session: {
            id: session.id,
            payment_status: session.payment_status,
            status: session.status,
          }
        },
        { status: 402 }
      );
    }

    // Verify session status
    if (session.status !== 'complete') {
      return NextResponse.json(
        {
          error: "Session not complete",
          status: session.status,
          session: {
            id: session.id,
            payment_status: session.payment_status,
            status: session.status,
          }
        },
        { status: 400 }
      );
    }

    // Return session details (safe to expose to client)
    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        status: session.status,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
        currency: session.currency,
        client_reference_id: session.client_reference_id,
      }
    });

  } catch (error) {
    console.error("Session verification error:", error);

    if (error instanceof Error) {
      // Handle Stripe-specific errors
      if (error.message.includes('No such Checkout.Session')) {
        return NextResponse.json(
          { error: "Invalid session ID" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}
