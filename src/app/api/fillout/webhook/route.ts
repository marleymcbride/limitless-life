import { NextRequest, NextResponse } from 'next/server';
import { verifyFilloutApiKey, validateFilloutPayload, parseFilloutWebhook } from '@/lib/fillout';
import { findOrCreateUser } from '@/lib/user-operations';
import { db } from '@/lib/db';
import { sessions, events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { updateUserLeadScore } from '@/lib/scoring';

/**
 * Fillout Webhook Endpoint
 *
 * Receives form submissions from Fillout and:
 * 1. Validates the API key
 * 2. Creates or updates user record
 * 3. Tracks the submission as an event
 * 4. Triggers lead score recalculation
 */

// Use a constant session ID for webhook events (webhooks don't have browser sessions)
const WEBHOOK_SESSION_ID = '00000000-0000-0000-0000-000000000000';

/**
 * Ensure webhook session exists
 */
async function ensureWebhookSession() {
  const existing = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, WEBHOOK_SESSION_ID))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(sessions).values({
      id: WEBHOOK_SESSION_ID,
      firstSeen: new Date(),
      lastSeen: new Date(),
    });
  }
}

export async function POST(request: Request) {
  try {
    // Log ALL headers for debugging
    const allHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      allHeaders[key] = value;
    });
    console.log('[Fillout Webhook] All headers:', JSON.stringify(allHeaders, null, 2));

    // 1. Verify API key
    const authHeader = request.headers.get('authorization');
    if (!verifyFilloutApiKey(authHeader)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Parse and validate payload
    const rawPayload = await request.json();

    if (!validateFilloutPayload(rawPayload)) {
      console.error('[Fillout Webhook] Invalid payload:', rawPayload);
      return NextResponse.json(
        { success: false, error: 'Invalid payload - email is required' },
        { status: 400 }
      );
    }

    // 3. Normalize the submission data
    const submission = parseFilloutWebhook(rawPayload);

    console.log('[Fillout Webhook] Processing submission for email:', submission.email);

    // 4. Ensure webhook session exists
    await ensureWebhookSession();

    // 5. Find or create user
    const { userId, isNewUser } = await findOrCreateUser(submission);

    console.log('[Fillout Webhook] User ID:', userId, 'New user:', isNewUser);

    // 6. Track the event
    // Use email_submit for initial submissions, application_complete for detailed forms
    const eventType = isNewUser ? 'email_submit' : 'application_complete';

    await db.insert(events).values({
      id: crypto.randomUUID(),
      sessionId: WEBHOOK_SESSION_ID,
      userId,
      eventType,
      eventData: {
        source: 'fillout',
        email: submission.email,
        fullName: submission.firstName && submission.lastName
          ? `${submission.firstName} ${submission.lastName}`.trim()
          : submission.firstName || submission.lastName || '',
        lookingFor: submission.lookingfor,
        howToGetHere: submission.howToGetHere,
        currentSituation: submission.currentSituation,
        problemsToSolve: submission.problemsToSolve,
        whatWellInstall: submission.whatWellInstall,
        desiredResult: submission.desiredResult,
        filloutScore: submission.score,
      },
    });

    console.log('[Fillout Webhook] Event tracked:', eventType);

    // 7. Update lead score (fire and forget)
    updateUserLeadScore(userId).catch((error) => {
      console.error('[Fillout Webhook] Failed to update lead score:', error);
    });

    // 8. Return success
    return NextResponse.json({
      success: true,
      userId,
      isNewUser,
      message: 'Webhook processed successfully',
    });

  } catch (error) {
    console.error('[Fillout Webhook] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
