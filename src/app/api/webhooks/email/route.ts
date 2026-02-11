import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSessionId } from '@/lib/session';
import { trackEvent } from '@/lib/analytics';
import { n8nEvents } from '@/lib/n8nWebhooks';

const emailSubmitSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
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
    const { email, firstName, lastName } = emailSubmitSchema.parse(body);
    const sessionId = getSessionId();
    console.log('[EMAIL WEBHOOK] Parsed data:', { email, firstName, lastName, sessionId });

    // Find or create user
    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let userId: string;

    if (user.length === 0) {
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
        })
        .returning();
      userId = newUser.id;
      console.log('[EMAIL WEBHOOK] User created in Railway:', { userId, email });
    } else {
      userId = user[0].id;
      console.log('[EMAIL WEBHOOK] Existing user found in Railway:', { userId, email });
    }

    // Track event in analytics
    console.log('[EMAIL WEBHOOK] Tracking event to analytics...');
    await trackEvent({
      sessionId,
      userId,
      eventType: 'email_submit',
      eventData: { email, firstName, lastName },
    });
    console.log('[EMAIL WEBHOOK] Event tracked successfully');

    // Trigger n8n webhook for Systeme.io sync
    console.log('[EMAIL WEBHOOK] Sending to n8n webhook...');
    await n8nEvents.emailSubmit({
      userId,
      email,
      firstName,
      lastName,
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
