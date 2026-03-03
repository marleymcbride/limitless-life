import { NextRequest, NextResponse } from 'next/server';
import { queueWebhook } from '@/lib/webhookQueue';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.marleymcbride.co';

function getCorsHeaders(origin: string | null): HeadersInit {
  // Allow requests from same origin and development
  const allowedOrigins = [
    'https://www.limitless-life.co',
    'https://limitless-life.co',
    'https://www.3weeks.co',
    'https://3weeks.co',
  ];

  if (origin && allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    };
  }

  // Development mode: allow all origins
  if (process.env.NODE_ENV === 'development') {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }

  // Production: allow same-origin requests
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  const headers = getCorsHeaders(origin);

  return new Response(null, { status: 204, headers });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    const body = await req.json();
    const { email, name, choice, interestType, tier, flowType, timestamp } = body;

    // Queue webhook to n8n for waitlist popup choice event
    // This will sync to Airtable with waitlist-specific flow type
    await queueWebhook({
      endpoint: `${N8N_WEBHOOK_URL}/popup-choice-waitlist-version`,
      payload: {
        event: 'popup_choice_waitlist',
        data: {
          email,
          name,
          choice,
          interestType, // 'tire_kicker' | 'course' | 'coaching'
          tier,
          flowType: flowType || 'waitlist', // Distinguish as waitlist flow
          timestamp,
        },
        source: 'limitless-waitlist-popup',
      },
      maxAttempts: 3,
    });

    console.log(`[Waitlist Popup Choice] Queued webhook for ${email} - choice: ${choice}, interest: ${interestType}, flow: ${flowType}`);

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error('Failed to queue waitlist popup choice webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process waitlist popup choice' },
      { status: 500, headers: corsHeaders }
    );
  }
}
