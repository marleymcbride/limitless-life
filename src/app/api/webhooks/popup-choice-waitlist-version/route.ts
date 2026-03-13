import { NextRequest, NextResponse } from 'next/server';
import { queueWebhook } from '@/lib/webhookQueue';
import { db } from '@/lib/db';
import { waitlistSignups } from '@/db/schema';
import { eq } from 'drizzle-orm';

const N8N_WAITLIST_WEBHOOK_URL = process.env.N8N_WAITLIST_WEBHOOK_URL || 'https://n8n.marleymcbride.co/webhook/waitlist-sync';

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

    // Map choice to interest level and choice description
    let interestLevel: 'cohort-hot' | 'cohort-warm' | 'cohort-future';
    let choiceDescription: string;
    let leadScore: number;
    let leadTemperature: 'cold' | 'warm' | 'hot';

    if (choice === 'yes') {
      interestLevel = 'cohort-hot';
      choiceDescription = 'Yes, save me a spot!';
      leadScore = 80;
      leadTemperature = 'hot';
    } else if (choice === 'maybe') {
      interestLevel = 'cohort-warm';
      choiceDescription = 'Maybe, I\'d like more details';
      leadScore = 60;
      leadTemperature = 'warm';
    } else {
      interestLevel = 'cohort-future';
      choiceDescription = 'I\'m not ready this cohort but keep me in the loop';
      leadScore = 30;
      leadTemperature = 'cold';
    }

    // Extract first name from full name
    const firstName = name?.split(' ')[0] || null;

    // Check if waitlist signup already exists
    const existingSignup = await db
      .select()
      .from(waitlistSignups)
      .where(eq(waitlistSignups.email, email))
      .limit(1);

    const now = new Date();

    if (existingSignup.length > 0) {
      // Update existing signup
      await db
        .update(waitlistSignups)
        .set({
          firstName,
          choice,
          choiceDescription,
          interestLevel,
          leadScore,
          leadTemperature,
          tier,
          lastSeen: now,
          updatedAt: now,
        })
        .where(eq(waitlistSignups.email, email));

      console.log(`[Waitlist Signup] Updated existing signup for ${email} - choice: ${choice}, interest: ${interestLevel}`);
    } else {
      // Insert new waitlist signup
      await db.insert(waitlistSignups).values({
        email,
        firstName,
        choice,
        choiceDescription,
        interestLevel,
        leadScore,
        leadTemperature,
        flowType: flowType || 'waitlist',
        tier,
        cohortLaunchDate: new Date('2026-05-01'), // May 1st cohort
      });

      console.log(`[Waitlist Signup] Created new signup for ${email} - choice: ${choice}, interest: ${interestLevel}`);
    }

    // Queue webhook to n8n for Airtable sync (fire-and-forget)
    queueWebhook({
      endpoint: N8N_WAITLIST_WEBHOOK_URL,
      payload: {
        event: 'waitlist_signup',
        data: {
          email,
          name,
          choice,
          choiceDescription,
          interestLevel,
          interestType,
          leadScore,
          leadTemperature,
          tier,
          flowType: flowType || 'waitlist',
          timestamp,
        },
        source: 'limitless-waitlist-popup',
      },
      maxAttempts: 3,
    }).catch((error) => {
      // Silently fail - don't block response if n8n fails
      console.error('[Waitlist Signup] Failed to queue n8n webhook:', error);
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error('[Waitlist Signup] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process waitlist signup' },
      { status: 500, headers: corsHeaders }
    );
  }
}
