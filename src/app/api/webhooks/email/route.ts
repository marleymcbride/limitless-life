import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users, sessions, events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { trackEvent } from '@/lib/analytics.server';
import { n8nEvents } from '@/lib/n8nWebhooks';
import { updateUserLeadScore } from '@/lib/scoring';

const emailSubmitSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  source: z.string().optional(), // e.g. 'limitless-concierge', 'beta-cohort', 'evergreen'
});

/**
 * POST /api/webhooks/email
 *
 * Webhook endpoint for email submission events.
 * Tracks the event and triggers n8n automation for Systeme.io sync.
 *
 * Body:
 * - email: Contact email address
 * - firstName: Optional first name
 * - lastName: Optional last name
 *
 * Returns:
 * - success: boolean
 * - userId: UUID of created/updated user
 */
export async function POST(req: NextRequest) {
  try {
    console.log('=== [EMAIL WEBHOOK] Request received ===');
    const body = await req.json();
    console.log('[EMAIL WEBHOOK] Request body:', body);
    const { email, firstName, lastName, source } = emailSubmitSchema.parse(body);
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('ll_session');
    const sessionId = sessionCookie?.value || 'unknown';
    console.log('[EMAIL WEBHOOK] Parsed data:', { email, firstName, lastName, source, sessionId });

    // Find or create user
    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let userId: string;
    const isNewUser = user.length === 0;

    if (isNewUser) {
      console.log('[EMAIL WEBHOOK] Creating new user in Railway database...');
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          firstName,
          lastName,
          status: 'prospect',
          leadScore: 10, // Email submit = 10 points
          leadTemperature: 'cold',
          tierInterest: source === 'limitless-concierge' ? 'lhc' : undefined,
          sourceSite: source === 'limitless-concierge' ? 'limitless-life.co' : undefined,
        })
        .returning();
      userId = newUser.id;
      console.log('[EMAIL WEBHOOK] User created in Railway:', { userId, email });
    } else {
      userId = user[0].id;
      console.log('[EMAIL WEBHOOK] Existing user found in Railway:', { userId, email });
    }

    // Track event in analytics — skip if no valid session
    if (sessionId && sessionId !== 'unknown') {
      console.log('[EMAIL WEBHOOK] Tracking event to analytics...');
      await trackEvent({
        sessionId,
        userId,
        eventType: 'email_submit',
        eventData: { email, firstName, lastName, source },
      });
      console.log('[EMAIL WEBHOOK] Event tracked successfully');

      // Link session to user identity
      await db.update(sessions)
        .set({ userId })
        .where(eq(sessions.id, sessionId));

      // Backfill userId on prior anonymous events for this session
      await db.update(events)
        .set({ userId })
        .where(eq(events.sessionId, sessionId));
    } else {
      console.log('[EMAIL WEBHOOK] Skipping event tracking — no valid session');
    }

    // Recalculate lead score now that email_submit event exists
    updateUserLeadScore(userId).catch(err =>
      console.error('[EMAIL WEBHOOK] Score update failed:', err)
    );

    // Fetch session + user data for n8n enrichment
    let sessionData: any = {};
    let userData: any = {};
    if (sessionId && sessionId !== 'unknown') {
      const [s] = await db.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1);
      if (s) sessionData = s;
    }
    const [u] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (u) userData = u;

    // Trigger n8n webhook for Systeme.io sync
    console.log('[EMAIL WEBHOOK] Sending to n8n webhook...');
    await n8nEvents.emailSubmit({
      userId,
      email,
      firstName,
      lastName,
      utmSource: sessionData.utmSource,
      utmCampaign: sessionData.utmCampaign,
      utmMedium: sessionData.utmMedium,
      utmContent: sessionData.utmContent,
      utmTerm: sessionData.utmTerm,
      referrer: sessionData.referrer,
      deviceType: sessionData.deviceType,
      browser: sessionData.browser,
      ipAddress: sessionData.ipAddress,
      country: sessionData.countryCode,
      leadScore: userData.leadScore,
      leadTemperature: userData.leadTemperature,
      tierInterest: userData.tierInterest,
      sourceSite: userData.sourceSite,
      source: source,
    });
    console.log('[EMAIL WEBHOOK] n8n webhook sent');

    console.log('=== [EMAIL WEBHOOK] Complete ===');
    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error('[EMAIL WEBHOOK] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
