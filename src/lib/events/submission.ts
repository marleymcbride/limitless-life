// src/lib/events/submission.ts

import { db } from '@/lib/db';
import { events } from '@/db/schema';
import type { Submission } from '@/types/submission';

export async function trackSubmissionEvent(submission: Submission) {
  try {
    await db.insert(events).values({
      id: crypto.randomUUID(),
      sessionId: crypto.randomUUID(), // Will be replaced with actual session ID when integrated
      userId: null, // Will be linked to user ID if available
      eventType: 'application_submitted',
      eventData: {
        submission_id: submission.id,
        submission_type: submission.type,
        score: submission.score,
        tier: submission.tier,
        utm_source: submission.utmSource,
        utm_campaign: submission.utmCampaign,
        utm_medium: submission.utmMedium,
        email: submission.email,
        timestamp: submission.submittedAt,
      },
      createdAt: new Date(submission.submittedAt),
    });

    console.log('Submission event tracked:', submission.id);
  } catch (error) {
    console.error('Error tracking submission event:', error);
    // Don't throw - event tracking failure shouldn't break the flow
  }
}
