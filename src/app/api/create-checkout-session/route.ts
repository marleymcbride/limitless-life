import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { users, events } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

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
  protocol: parseInt(process.env.PRICE_LIMITLESSPROTOCOL || "29700"),
  life: parseInt(process.env.PRICE_LIMITLESSLIFE || "259700"),
  'life-whatsapp': parseInt(process.env.PRICE_LIMITLESSLIFEWHATSAPP || "439700"),
  concierge: parseInt(process.env.PRICE_LIMITLESSHEALTHCONCIERGE || "689700"),
  beta: parseInt(process.env.PRICE_LIMITLESSBETA || "99700"), // Beta cohort PIF price
  'beta-waitlist': 0, // Price is handled via Stripe Price ID
};

const tierNames = {
  protocol: "The Limitless Protocol",
  life: "Limitless Life",
  'life-whatsapp': "Limitless Life + WhatsApp",
  concierge: "Limitless Health Concierge",
  beta: "Beta Cohort (Full Payment)",
  'beta-waitlist': "Beta Waitlist Deposit",
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
    weekly: process.env.STRIPE_PRICE_LIFE_WEEKLY,
    '3pay': process.env.STRIPE_PRICE_LIFE_3PAY,
    '2pay': process.env.STRIPE_PRICE_LIFE_2PAY,
    full: process.env.STRIPE_PRICE_LIFE_FULL,
  },
  'life-whatsapp': {
    weekly: process.env.STRIPE_PRICE_WHATSAPP_WEEKLY,
    '3pay': process.env.STRIPE_PRICE_WHATSAPP_3PAY,
    '2pay': process.env.STRIPE_PRICE_WHATSAPP_2PAY,
    full: process.env.STRIPE_PRICE_WHATSAPP_FULL,
  },
  concierge: {
    weekly: process.env.STRIPE_PRICE_CONCIERGE_WEEKLY,
    '6pay': process.env.STRIPE_PRICE_CONCIERGE_6PAY,
    '3pay': process.env.STRIPE_PRICE_CONCIERGE_3PAY,
    full: process.env.STRIPE_PRICE_CONCIERGE_FULL,
  },
  beta: {
    full: process.env.STRIPE_PRICE_BETA_FULL || 'price_1TDQAkDglwfGELM8vcjtlrXt', // Beta cohort PIF
  },
  'beta-waitlist': {
    full: process.env.STRIPE_PRICE_BETA_WAITLIST_DEPOSIT,
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

    const { tier, paymentPlan, customerEmail, customerName, couponID } = await request.json();

    console.log('[CreateCheckoutSession] Creating session:', { tier, customerEmail, customerName });
    console.log('[CreateCheckoutSession] Available tiers:', Object.keys(tierPrices));
    console.log('[CreateCheckoutSession] Tier exists in tierPrices?', tier, tierPrices[tier as keyof typeof tierPrices]);

    // Email is now optional - Stripe will collect it during checkout
    // Only validate if provided
    if (customerEmail && !isValidEmail(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // Validate tier exists
    if (!tier || !(tier in tierPrices)) {
      console.log('[CreateCheckoutSession] Tier validation failed:', { tier, tierKeys: Object.keys(tierPrices) });
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

    // Determine checkout mode: subscription for recurring payments, payment for one-time
    const checkoutMode = paymentPlan === 'full' ? "payment" : "subscription";

    // Build checkout session options
    const checkoutSessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: checkoutMode, // Use subscription for installments, payment for full
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

    // For beta tier, apply the £3,000 discount coupon automatically
    if (tier === 'beta') {
      delete (checkoutSessionOptions as any).allow_promotion_codes;
      checkoutSessionOptions.discounts = [{ coupon: process.env.BETA_COUPON_ID || 'vK0QBnoc' }];
      console.log('[CreateCheckoutSession] Applying beta discount coupon');
    }
    // For other tiers, disable promotion codes unless specific coupon provided
    else if (couponID) {
      delete (checkoutSessionOptions as any).allow_promotion_codes;
      checkoutSessionOptions.discounts = [{ coupon: couponID }];
      console.log('[CreateCheckoutSession] Applying coupon:', couponID);
    } else {
      checkoutSessionOptions.allow_promotion_codes = false;
    }

    const session = await stripe.checkout.sessions.create(checkoutSessionOptions);

    // Track pricing plan selection and checkout initiation events
    if (customerEmail) {
      try {
        console.log('[Checkout] Looking for user with email:', customerEmail);

        // Find user by email
        const userRecords = await db
          .select()
          .from(users)
          .where(eq(users.email, customerEmail))
          .limit(1);

        console.log('[Checkout] User records found:', userRecords.length);

        if (userRecords.length > 0) {
          const user = userRecords[0];
          console.log('[Checkout] Found user:', user.id, user.email);

          // Get session ID from cookie for event tracking
          const sessionCookie = cookieStore.get('ll_session');
          const sessionId = sessionCookie?.value;

          // Track pricing plan selection
          const pricingEvent = {
            id: crypto.randomUUID(),
            sessionId: sessionId || crypto.randomUUID(),
            userId: user.id,
            eventType: 'pricing_plan_selected',
            eventData: {
              tier: tier,
              plan: paymentPlan,
              email: customerEmail,
              timestamp: new Date().toISOString(),
            },
            createdAt: new Date(),
          };

          console.log('[Checkout] Inserting pricing event:', pricingEvent);
          await db.insert(events).values(pricingEvent);

          // Track checkout initiation
          const checkoutEvent = {
            id: crypto.randomUUID(),
            sessionId: sessionId || crypto.randomUUID(),
            userId: user.id,
            eventType: 'checkout_initiated',
            eventData: {
              tier: tier,
              paymentPlan: paymentPlan,
              email: customerEmail,
              stripeSessionId: session.id,
              timestamp: new Date().toISOString(),
            },
            createdAt: new Date(),
          };

          console.log('[Checkout] Inserting checkout event:', checkoutEvent);
          await db.insert(events).values(checkoutEvent);

          console.log('[Checkout] ✓ Events tracked successfully:', { userId: user.id, tier, paymentPlan });
        } else {
          console.warn('[Checkout] ✗ User NOT found for email:', customerEmail);
          console.warn('[Checkout] Available users count:', await db.select({ count: sql`COUNT(*)` }).from(users));
        }
      } catch (error) {
        console.error('[Checkout] ✗ Failed to track events:', error);
        // Don't fail the checkout if tracking fails
      }
    } else {
      console.warn('[Checkout] No customerEmail provided');
    }

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
