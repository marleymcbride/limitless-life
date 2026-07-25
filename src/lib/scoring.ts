import { db } from './db';
import { events, users, leadAlerts } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import { n8nEvents, alertHotLead } from './n8nWebhooks';

export type LeadTemperature = 'cold' | 'warm' | 'hot';

/**
 * Stage-based lead scoring — each user gets the score of their highest completed stage.
 * Simple, predictable: not accumulated points, just "what's the furthest they got?"
 *
 *  Score | Stage                         | Temperature
 *  ------|-------------------------------|-------------
 *  5     | Visited sales page            | cold
 *  8     | Scrolled the page             | cold
 *  10    | Started VSL                   | cold
 *  12    | Clicked a CTA                 | cold
 *  15    | Watched 50%+ of VSL           | cold
 *  20    | Watched entire VSL            | warm
 *  25    | Entered email (identified)    | warm
 *  35    | Viewed pricing / offer doc    | warm
 *  50    | Selected a plan / committed   | warm
 *  70    | Initiated checkout            | hot
 *  85    | Paid deposit                  | hot
 *  100   | Paid in full                  | hot
 */
const STAGES: { eventType: string; score: number }[] = [
  { eventType: 'page_view', score: 5 },
  { eventType: 'scroll_depth', score: 8 },
  { eventType: 'vsl_start', score: 10 },
  { eventType: 'cta_click', score: 12 },
  { eventType: 'vsl_milestone_50', score: 15 },
  { eventType: 'vsl_milestone_75', score: 15 },
  { eventType: 'vsl_complete', score: 20 },
  { eventType: 'email_submit', score: 25 },
  { eventType: 'pricing_view', score: 35 },
  { eventType: 'pricing_plan_selected', score: 50 },
  { eventType: 'checkout_initiated', score: 70 },
  { eventType: 'stripe_checkout_initiated', score: 70 },
  { eventType: 'concierge_deposit_paid', score: 95 },
  { eventType: 'payment_complete', score: 100 },
];

/** Highest score = highest stage reached */
function getHighestScore(userEvents: { eventType: string; eventData?: any }[]): number {
  let highest = 0;
  for (const event of userEvents) {
    // Handle vsl_milestone — check percentage from eventData
    if (event.eventType === 'vsl_milestone' && event.eventData?.percent >= 100) {
      // Full completion = score 20
      if (20 > highest) highest = 20;
      continue;
    }
    if (event.eventType === 'vsl_milestone' && event.eventData?.percent >= 50) {
      // Watched more than half = score 15
      if (15 > highest) highest = 15;
      continue;
    }

    for (const stage of STAGES) {
      if (event.eventType === stage.eventType && stage.score > highest) {
        highest = stage.score;
      }
    }
  }
  return highest;
}

/** Map score to temperature */
function getTemperature(score: number): LeadTemperature {
  if (score >= 60) return 'hot';
  if (score >= 25) return 'warm';
  return 'cold';
}

/** Map event type to human-readable label */
function getStageLabel(eventType: string): string {
  const labels: Record<string, string> = {
    page_view: 'Visited Page',
    scroll_depth: 'Scrolled',
    vsl_start: 'VSL Started',
    vsl_milestone_50: 'VSL 50%+',
    vsl_complete: 'VSL Complete',
    email_submit: 'Email Submitted',
    pricing_view: 'Pricing Viewed',
    pricing_plan_selected: 'Plan Selected',
    checkout_initiated: 'Checkout Initiated',
    stripe_checkout_initiated: 'Checkout Initiated',
    concierge_deposit_paid: 'Deposit Paid',
    payment_complete: 'Payment Complete',
  };
  return labels[eventType] || eventType;
}

export interface LeadScore {
  score: number;
  temperature: LeadTemperature;
  highestStage: string;
  breakdown: { eventType: string; score: number }[];
}

/**
 * Calculate lead score — finds the highest-stage event for this user.
 * Simple, predictable: score = highest stage reached, not accumulated points.
 */
export async function calculateLeadScore(userId: string): Promise<LeadScore> {
  const userEvents = await db
    .select({ eventType: events.eventType, eventData: events.eventData })
    .from(events)
    .where(eq(events.userId, userId));

  const matchedStages = STAGES.filter(s =>
    userEvents.some(e => e.eventType === s.eventType)
  );

  const highestMatch = matchedStages.reduce(
    (max, s) => (s.score > max.score ? s : max),
    { eventType: 'none', score: 0 }
  );

  return {
    score: highestMatch.score,
    temperature: getTemperature(highestMatch.score),
    highestStage: highestMatch.eventType === 'none' ? 'none' : getStageLabel(highestMatch.eventType),
    breakdown: matchedStages.map(s => ({
      eventType: s.eventType,
      score: s.score,
    })),
  };
}

/**
 * Update user's lead score in database and trigger n8n webhooks if temperature changed.
 */
export async function updateUserLeadScore(userId: string): Promise<void> {
  const previousUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (previousUser.length === 0) return;

  const previousTemperature = previousUser[0].leadTemperature;
  const email = previousUser[0].email;

  const scoreData = await calculateLeadScore(userId);

  await db
    .update(users)
    .set({
      leadScore: scoreData.score,
      leadTemperature: scoreData.temperature,
    })
    .where(eq(users.id, userId));

  // Fire n8n webhook if temperature changed
  if (previousTemperature !== scoreData.temperature) {
    n8nEvents.leadTemperatureChanged({
      userId,
      email,
      previousTemperature,
      newTemperature: scoreData.temperature,
      score: scoreData.score,
      firstName: previousUser[0].firstName,
      lastName: previousUser[0].lastName,
    });
  }

  // If became hot, trigger hot lead alert
  if (scoreData.temperature === 'hot' && previousTemperature !== 'hot') {
    const recentEvents = await db
      .select()
      .from(events)
      .where(eq(events.userId, userId))
      .orderBy(sql`${events.createdAt} DESC`)
      .limit(20);

    const activitySummary = {
      vslWatched: recentEvents.some(e => e.eventType === 'vsl_start'),
      vslCompletionPercent: recentEvents
        .filter(e => e.eventType === 'vsl_milestone')
        .sort((a, b) => (b.eventData?.percent || 0) - (a.eventData?.percent || 0))[0]
        ?.eventData?.percent || 0,
      pricingViewed: recentEvents.some(e => e.eventType === 'pricing_view'),
      pricingPlanSelected: recentEvents.some(e => e.eventType === 'pricing_plan_selected'),
      checkoutInitiated: recentEvents.some(e => e.eventType === 'checkout_initiated' || e.eventType === 'stripe_checkout_initiated'),
      depositPaid: recentEvents.some(e => e.eventType === 'concierge_deposit_paid'),
    };

    await db.insert(leadAlerts).values({
      id: crypto.randomUUID(),
      userId,
      alertType: 'hot_lead',
      sentAt: new Date(),
      firstContactAt: null,
      responseTimeSeconds: null,
    });

    n8nEvents.hotLeadAlert({
      userId,
      email,
      score: scoreData.score,
      firstName: previousUser[0].firstName,
      lastName: previousUser[0].lastName,
      lastActivity: recentEvents[0]?.createdAt?.toISOString(),
      activitySummary,
    });

    const firstName = previousUser[0].firstName || '';
    const lastName = previousUser[0].lastName || '';
    const name = [firstName, lastName].filter(Boolean).join(' ') || email;

    const activities: string[] = [];
    if (activitySummary.vslWatched) activities.push(`Watched VSL ${activitySummary.vslCompletionPercent}%`);
    if (activitySummary.pricingPlanSelected) activities.push('Selected a plan');
    if (activitySummary.checkoutInitiated) activities.push('Initiated checkout');
    if (activitySummary.depositPaid) activities.push('Paid deposit');
    if (activitySummary.pricingViewed && !activitySummary.pricingPlanSelected) activities.push('Viewed pricing');
    const whatTheyDid = activities.join(', ') || 'Reached hot threshold';

    alertHotLead({
      email,
      name,
      score: scoreData.score,
      whatTheyDid,
      becameHotAt: new Date().toISOString(),
    }).catch(() => {});
  }
}
