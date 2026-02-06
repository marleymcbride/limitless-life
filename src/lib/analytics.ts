import { db } from './db';
import { events } from '../db/schema';
import { type EventType } from '../types';

export async function trackEvent(data: {
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData?: any;
}) {
  await db.insert(events).values({
    sessionId: data.sessionId,
    userId: data.userId,
    eventType: data.eventType,
    eventData: data.eventData || {},
    createdAt: new Date(),
  });
}

/**
 * Lead Scoring Rules
 *
 * VSL milestones are calculated percentage-based:
 * - 0-99%: proportionally scaled up to 60 points
 * - 100%: 60 points (max for VSL completion)
 *
 * Note: vsl_complete event is NOT scored separately to avoid double-counting.
 * The vsl_milestone event at 100% already gives the full 60 points.
 */
export const LEAD_SCORING_RULES: Record<EventType, number> = {
  vsl_start: 5,
  vsl_milestone: 0, // Calculated separately with percentage-based calculation
  // vsl_complete: 60, // REMOVED - already counted via vsl_milestone at 100%
  email_submit: 10,
  application_start: 30,
  application_step: 5,
  application_complete: 40,
  pricing_view: 20,
  cta_click: 5,
  page_view: 0,
  payment_complete: 100,
};
