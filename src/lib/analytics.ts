import { type EventType } from '../types';

// Client-side trackEvent - calls API route instead of database
export async function trackEvent(data: {
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData?: any;
}) {
  try {
    await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
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
  scroll_depth: 0, // Scroll depth tracked separately
  tier_click: 15, // High intent: user clicked a tier button

  // NEW: Tier selection scoring
  tier_view: 15,                 // User views tier options
  tier_select_protocol: 10,        // Protocol tier selection
  tier_select_life: 15,           // Life tier selection
  tier_select_life_whatsapp: 20,       // WhatsApp tier selection (corrected from tier_select_whatsapp)
  tier_select_concierge: 25,      // Concierge tier selection
  payment_plan_select: 10,         // Payment plan selection
  stripe_checkout_initiated: 20,   // Stripe checkout button click

  // Waitlist events
  waitlist_thank_you_viewed: 5,
  waitlist_variant_A_viewed: 10,   // Hot lead views thank you page
  waitlist_variant_B_viewed: 5,    // Warm lead views thank you page
  waitlist_variant_C_viewed: 2,    // Cold lead views thank you page
  waitlist_application_started: 30, // Started Fillout application
  waitlist_application_completed: 50, // Completed Fillout application
};
