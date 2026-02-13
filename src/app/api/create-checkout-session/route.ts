import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from 'next/headers';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia" as any, // Use any to allow flexibility with Stripe API versions
  });
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const isRateLimited = (ip: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const key = ip;
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  if (record.count >= limit) {
    return true;
  }
  record.count++;
  return false;
};

const tierPrices = {
  protocol: parseInt(process.env.PRICE_PROTOCOL || "29900"),
  life: parseInt(process.env.PRICE_LIFE || "164900"),
  'life-whatsapp': parseInt(process.env.PRICE_WHATSAPP || "499700"),
  vip: parseInt(process.env.PRICE_VIP || "800000"),
};

const tierNames = {
  protocol: "The Limitless Protocol",
  life: "Limitless Life",
  'life-whatsapp': "Limitless Life + WhatsApp",
  vip: "Limitless VIP",
};

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Stripe Price IDs for each tier/payment combination
const stripePriceIds = {
  protocol: {
    full: process.env.STRIPE_PRICE_PROTOCOL_FULL,
  },
  life: {
    full: process.env.STRIPE_PRICE_LIFE_FULL,
    '2pay': process.env.STRIPE_PRICE_LIFE_2PAY,
    '3pay': process.env.STRIPE_PRICE_LIFE_3PAY,
  },
  'life-whatsapp': {
    full: process.env.STRIPE_PRICE_WHATSAPP_FULL,
    '2pay': process.env.STRIPE_PRICE_WHATSAPP_2PAY,
    '3pay': process.env.STRIPE_PRICE_WHATSAPP_3PAY,
  },
  vip: {
    full: process.env.STRIPE_PRICE_VIP_FULL,
    '2pay': process.env.STRIPE_PRICE_VIP_2PAY,
    monthly: process.env.STRIPE_PRICE_VIP_MONTHLY,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (isRateLimited(ip, 5, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { tier, paymentPlan, customerEmail, customerName } = await request.json();

    console.log('[CreateCheckoutSession] Creating session:', { tier, customerEmail, customerName });

    // Email is now optional - Stripe will collect it during checkout
    // Only validate if provided
    if (customerEmail && !isValidEmail(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // Validate tier exists
    if (!tier || !tierPrices[tier as keyof typeof tierPrices]) {
      return NextResponse.json(
        { error: "Invalid tier selected" },
        { status: 400 }
      );
    }

    // Validate payment plan exists for this tier
    const tierPaymentPlans = stripePriceIds[tier as keyof typeof stripePriceIds];
    if (!tierPaymentPlans || !paymentPlan) {
      return NextResponse.json(
        { error: "Invalid payment plan for selected tier" },
        { status: 400 }
      );
    }

    const stripePriceId = tierPaymentPlans[paymentPlan as keyof typeof tierPaymentPlans];
    if (!stripePriceId) {
      return NextResponse.json(
        { error: "Stripe Price ID not configured for this tier/payment combination" },
        { status: 500 }
      );
    }

    // Get session data to include UTM parameters
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    // Parse session cookie for UTM params (if available)
    let utmSource: string | undefined;
    let utmCampaign: string | undefined;
    let utmMedium: string | undefined;
    let sessionId: string | undefined;

    if (sessionCookie?.value) {
      try {
        // Session cookie might contain session ID or UTM data
        // The exact format depends on your session implementation
        sessionId = sessionCookie.value;
      } catch (e) {
        // Ignore parsing errors
      }
    }

    const stripe = getStripe();

    // Build checkout session options
    const checkoutSessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: "subscription", // Changed from "payment" to support installments
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/application?cancelled=true`,
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: false,
      client_reference_id: tier,
    };

    // Only include customer_email if provided (pre-fill the field)
    if (customerEmail) {
      checkoutSessionOptions.customer_email = customerEmail;
    }

    // Include metadata for n8n workflows
    const metadata: Record<string, string> = {
      tier: tier.charAt(0).toUpperCase() + tier.slice(1),
      paymentPlan: paymentPlan,
      utm_source: utmSource || '',
      utm_campaign: utmCampaign || '',
      utm_medium: utmMedium || '',
      sessionId: sessionId || '',
    };

    // Only include email in metadata if provided
    if (customerEmail) {
      metadata.email = customerEmail;
    }

    // Include name in metadata if provided
    if (customerName) {
      metadata.customerName = customerName;
    }

    checkoutSessionOptions.metadata = metadata;

    const session = await stripe.checkout.sessions.create(checkoutSessionOptions);

    // Return both sessionId and url for modern Stripe.js integration
    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

// Cleanup old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(rateLimitMap.entries());
  for (const [key, record] of entries) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 300000); // Cleanup every 5 minutes
