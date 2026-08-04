import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users, sessions, events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { trackEvent } from '@/lib/analytics.server';
import { n8nEvents } from '@/lib/n8nWebhooks';
import { updateUserLeadScore } from '@/lib/scoring';

const waitlistJoinSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  source: z.string().optional(), // e.g. 'offer-doc-waitlist', 'beta-cohort'
});

/**
 * POST /api/webhooks/waitlist-join
 *
 * Inline waitlist capture on the offer docs (used when the programme is OFF).
 * Writes the person straight into Postgres (users + email_submit event),
 * recalculates lead score, and queues the n8n sync — so they show up in the
 * Leads feed and Admin Dash immediately.
 *
 * Body:
 * - email: Contact email address
 * - firstName / lastName: Optional name
 * - source: Optional source tag (e.g. 'offer-doc-waitlist')
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, source } = waitlistJoinSchema.parse(body);
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('ll_session');
    const sessionId = sessionCookie?.value || 'unknown';

    // Find or create user
    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let userId: string;
    const isNewUser = user.length === 0;

    if (isNewUser) {
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          firstName,
          lastName,
          status: 'prospect',
          leadScore: 25, // identified + joined waitlist
          leadTemperature: 'warm',
          sourceSite: 'limitless-life.co',
          leadAction: 'email-signup',
          lastAction: 'email-signup',
        })
        .returning();
      userId = newUser.id;
    } else {
      userId = user[0].id;
    }

    // Track the waitlist_join event
    if (sessionId && sessionId !== 'unknown') {
      await trackEvent({
        sessionId,
        userId,
        eventType: 'waitlist_join',
        eventData: { email, firstName, lastName, source, flow: 'offer-doc-waitlist' },
      });

      // Link session to user identity + backfill prior anonymous events
      await db.update(sessions).set({ userId }).where(eq(sessions.id, sessionId));
      await db.update(events).set({ userId }).where(eq(events.sessionId, sessionId));
    }

    // Recalculate lead score now that the event exists
    updateUserLeadScore(userId).catch(err =>
      console.error('[waitlist-join] Score update failed:', err)
    );

    // Fetch user for n8n enrichment
    const [u] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    // Trigger n8n webhook for waitlist sync (fire-and-forget, queued)
    n8nEvents.emailSubmit({
      userId,
      email,
      firstName,
      lastName,
      leadScore: u?.leadScore ?? undefined,
      leadTemperature: u?.leadTemperature ?? undefined,
      sourceSite: u?.sourceSite ?? undefined,
      source: source || 'offer-doc-waitlist',
    }).catch(err => console.error('[waitlist-join] n8n send failed:', err));

    return NextResponse.json({ success: true, userId, isNewUser });
  } catch (error) {
    console.error('[waitlist-join] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
