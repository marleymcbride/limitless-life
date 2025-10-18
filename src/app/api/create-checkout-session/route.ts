import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const tierPrices = {
  access: 299700, // $2,997 in cents
  plus: 499700,   // $4,997 in cents
  premium: 899700, // $8,997 in cents
  elite: 1499700,  // $14,997 in cents
};

const tierNames = {
  access: 'Limitless Access',
  plus: 'Limitless Plus',
  premium: 'Limitless Premium',
  elite: 'Limitless Elite',
};

export async function POST(request: NextRequest) {
  try {
    const { tier, customerEmail } = await request.json();

    if (!tier || !tierPrices[tier as keyof typeof tierPrices]) {
      return NextResponse.json(
        { error: 'Invalid tier selected' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tierNames[tier as keyof typeof tierNames],
              description: `The Limitless Protocol - ${tierNames[tier as keyof typeof tierNames]}`,
            },
            unit_amount: tierPrices[tier as keyof typeof tierPrices],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/application?cancelled=true`,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: false,
      client_reference_id: tier,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}