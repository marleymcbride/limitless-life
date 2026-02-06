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
    const body = await req.json();
    const { email, firstName, lastName } = emailSubmitSchema.parse(body);
    const sessionId = getSessionId();

    // Find or create user
    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let userId: string;

    if (user.length === 0) {
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
    } else {
      userId = user[0].id;
    }

    // Track event in analytics
    await trackEvent({
      sessionId,
      userId,
      eventType: 'email_submit',
      eventData: { email, firstName, lastName },
    });

    // Trigger n8n webhook for Systeme.io sync
    await n8nEvents.emailSubmit({
      userId,
      email,
      firstName,
      lastName,
    });

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error('Email webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
