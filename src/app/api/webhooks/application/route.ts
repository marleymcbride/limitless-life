import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSessionId } from '@/lib/session';
import { trackEvent } from '@/lib/analytics';
import { n8nEvents } from '@/lib/n8nWebhooks';
import { applicationSubmissions } from '@/db/schema';

const applicationStartSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const applicationStepSchema = z.object({
  email: z.string().email(),
  step: z.string(),
  stepNumber: z.number(),
  data: z.object({}).optional(),
});

const applicationCompleteSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  applicationData: z.object({}).optional(),
});

/**
 * POST /api/webhooks/application
 *
 * Webhook endpoint for application events (start, step, complete).
 * Tracks events and triggers n8n automation for Systeme.io sync.
 *
 * Body (for start):
 * - email: User email
 * - firstName: Optional first name
 * - lastName: Optional last name
 *
 * Body (for step):
 * - email: User email
 * - step: Step name
 * - stepNumber: Step number (1-N)
 * - data: Optional step data
 *
 * Body (for complete):
 * - email: User email
 * - firstName: Optional first name
 * - lastName: Optional last name
 * - applicationData: Optional full application data
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action;
    const sessionId = getSessionId();

    // Find user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const userId = user[0].id;

    switch (action) {
      case 'start': {
        const { email, firstName, lastName } = applicationStartSchema.parse(body);

        // Update user status
        await db
          .update(users)
          .set({
            status: 'lead',
            updatedAt: new Date(),
          })
          .where(eq(users.id, userId));

        // Track event
        trackEvent({
          sessionId,
          userId,
          eventType: 'application_start',
          eventData: { email, firstName, lastName },
        }).catch(console.error);

        // Trigger n8n webhook
        await n8nEvents.applicationStart({
          userId,
          email,
          firstName,
          lastName,
        });

        return NextResponse.json({ success: true, userId });
      }

      case 'step': {
        const { email, step, stepNumber, data } = applicationStepSchema.parse(body);

        // Track event
        trackEvent({
          sessionId,
          userId,
          eventType: 'application_step',
          eventData: { email, step, stepNumber, ...data },
        }).catch(console.error);

        // Store application submission data
        await db.insert(applicationSubmissions).values({
          userId,
          submissionData: { step, stepNumber, ...data },
          currentStep: stepNumber,
          isComplete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return NextResponse.json({ success: true, userId });
      }

      case 'complete': {
        const { email, firstName, lastName, applicationData } =
          applicationCompleteSchema.parse(body);

        // Update user status
        await db
          .update(users)
          .set({
            status: 'lead',
            updatedAt: new Date(),
          })
          .where(eq(users.id, userId));

        // Track event
        trackEvent({
          sessionId,
          userId,
          eventType: 'application_complete',
          eventData: { email, firstName, lastName, ...applicationData },
        }).catch(console.error);

        // Trigger n8n webhook
        await n8nEvents.applicationComplete({
          userId,
          email,
          firstName,
          lastName,
          applicationData,
        });

        return NextResponse.json({ success: true, userId });
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Application webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
