import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistSignups } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * POST /api/webhooks/fillout-application
 * Handles Fillout form submission webhook
 * Updates waitlist_signups with application data and forwards to n8n
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Fillout webhook structure (adjust based on actual Fillout format)
    const { data } = body;

    // Extract form fields
    const email = data?.Email || data?.email;
    const firstName = data?.['First Name'] || data?.firstName || data?.name;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Build application fields object
    const applicationFields = {
      fitnessLevel: data?.['Fitness Level'] || data?.fitnessLevel || null,
      goals: data?.Goals || data?.goals || null,
      timeCommitment: data?.['Time Commitment'] || data?.timeCommitment || null,
      previousExperience: data?.['Previous Coaching Experience'] || data?.previousExperience || null,
      anythingElse: data?.['Anything else we should know?'] || data?.anythingElse || null,
      submittedAt: new Date().toISOString(),
    };

    // Find existing waitlist signup by email
    const existingSignup = await db
      .select()
      .from(waitlistSignups)
      .where(eq(waitlistSignups.email, email))
      .limit(1);

    if (existingSignup.length === 0) {
      // Create new waitlist signup if doesn't exist
      await db.insert(waitlistSignups).values({
        email,
        firstName,
        choice: 'yes', // Default to hot lead if they're applying
        choiceDescription: 'Applied via Fillout form',
        interestLevel: 'cohort-hot',
        leadScore: 80,
        leadTemperature: 'hot',
        status: 'applied',
        applicationFields,
        applicationDate: new Date(),
        flowType: 'waitlist',
        cohortLaunchDate: new Date('2026-05-01'),
      });
    } else {
      // Update existing signup with application data
      await db
        .update(waitlistSignups)
        .set({
          applicationFields,
          applicationDate: new Date(),
          status: 'applied',
          updatedAt: new Date(),
        })
        .where(eq(waitlistSignups.email, email));
    }

    // Forward to n8n for Airtable CRM sync (fire-and-forget)
    // TODO: Set up n8n webhook URL for application submissions
    fetch(process.env.N8N_WEBHOOK_URL || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'waitlist_application',
        email,
        firstName,
        applicationFields,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => {
      console.error('[Fillout Webhook] Failed to forward to n8n:', err);
      // Don't fail the webhook if n8n forwarding fails
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('[Fillout Webhook] Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhooks/fillout-application
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'fillout-application webhook',
  });
}
