import { db } from './db';
import { events, users, leadAlerts } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { LEAD_SCORING_RULES } from './analytics';
import { n8nEvents, alertHotLead } from './n8nWebhooks';

export type LeadTemperature = 'cold' | 'warm' | 'hot';

// Milestone scores for Phase 2 (60-100pts)
const MILESTONE_SCORES = {
  TIER_SELECTED: 70,
  PAYMENT_PLAN_SELECTED: 85,
  CHECKOUT_INITIATED: 95,
  PAYMENT_COMPLETE: 100,
} as const;

/**
 * Determine if user is in Phase 1 (Engagement) or Phase 2 (Purchase Intent)
 */
function getScorePhase(currentScore: number): 'engagement' | 'purchase_intent' {
  if (currentScore >= 60) return 'purchase_intent';
  return 'engagement';
}

export interface LeadScore {
  score: number;
  temperature: LeadTemperature;
  breakdown: {
    eventType: string;
    count: number;
    points: number;
  }[];
}

/**
 * Calculate lead score based on all events for a user
 */
export async function calculateLeadScore(userId: string): Promise<LeadScore> {
  // Get all events for this user
  const userEvents = await db
    .select()
    .from(events)
    .where(eq(events.userId, userId));

  // Calculate base score from events
  const breakdown = new Map<string, { count: number; points: number }>();
  let totalScore = 0;
  let currentPhase: 'engagement' | 'purchase_intent' = 'engagement';

  for (const event of userEvents) {
    const eventType = event.eventType;

    // Determine phase based on current total
    currentPhase = getScorePhase(totalScore);

    // Phase 1: Add points incrementally
    if (currentPhase === 'engagement') {
      const basePoints = LEAD_SCORING_RULES[eventType] || 0;
      let points = basePoints;

      // Special handling for vsl_milestone
      if (eventType === 'vsl_milestone' && event.eventData) {
        const percent = event.eventData.percent || 0;
        points = Math.floor((percent / 100) * 60);
      }

      totalScore += points;

      const current = breakdown.get(eventType) || { count: 0, points: 0 };
      breakdown.set(eventType, {
        count: current.count + 1,
        points: current.points + points,
      });
    }
    // Phase 2: Milestone overrides
    else {
      // Check if this event triggers a milestone
      if (['tier_select_protocol', 'tier_select_life', 'tier_select_whatsapp', 'tier_select_concierge'].includes(eventType)) {
        totalScore = MILESTONE_SCORES.TIER_SELECTED;
      } else if (eventType === 'payment_plan_select') {
        totalScore = MILESTONE_SCORES.PAYMENT_PLAN_SELECTED;
      } else if (eventType === 'stripe_checkout_initiated') {
        totalScore = MILESTONE_SCORES.CHECKOUT_INITIATED;
      } else if (eventType === 'payment_complete') {
        totalScore = MILESTONE_SCORES.PAYMENT_COMPLETE;
      }

      const current = breakdown.get(eventType) || { count: 0, points: 0 };
      breakdown.set(eventType, {
        count: current.count + 1,
        points: MILESTONE_SCORES[eventType as keyof typeof MILESTONE_SCORES] || 0,
      });
    }
  }

  // Determine temperature
  const temperature = getTemperature(totalScore);

  return {
    score: totalScore,
    temperature,
    breakdown: Array.from(breakdown.entries()).map(([eventType, data]) => ({
      eventType,
      count: data.count,
      points: data.points,
    })),
  };
}

/**
 * Get lead temperature based on score
 */
export function getTemperature(score: number): LeadTemperature {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
}

/**
 * Check if user is a hot lead
 */
export async function isHotLead(userId: string): Promise<boolean> {
  const result = await calculateLeadScore(userId);
  return result.temperature === 'hot';
}

/**
 * Update user's lead score in database and trigger n8n webhooks
 */
export async function updateUserLeadScore(userId: string): Promise<void> {
  // Get previous state
  const previousUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (previousUser.length === 0) {
    return; // User doesn't exist
  }

  const previousTemperature = previousUser[0].leadTemperature;
  const email = previousUser[0].email;

  // Calculate new score
  const scoreData = await calculateLeadScore(userId);

  // Get most recent tier selection from events
  const userEvents = await db
    .select()
    .from(events)
    .where(eq(events.userId, userId))
    .orderBy(sql`${events.createdAt} DESC`)
    .limit(20);

  const tierSelectEvent = userEvents.find(e =>
    ['tier_select_protocol', 'tier_select_life', 'tier_select_whatsapp', 'tier_select_concierge'].includes(e.eventType)
  );

  // Map tier event to tier interest enum
  const tierInterestMap = {
    tier_select_protocol: 'access',
    tier_select_life: 'plus',
    tier_select_whatsapp: 'premium',
    tier_select_concierge: 'elite',
  } as const;

  const tierInterest = tierSelectEvent
    ? tierInterestMap[tierSelectEvent.eventType as keyof typeof tierInterestMap]
    : previousUser[0].tierInterest;

  // Update database
  await db
    .update(users)
    .set({
      leadScore: scoreData.score,
      leadTemperature: scoreData.temperature,
      tierInterest,
    })
    .where(eq(users.id, userId));

  // Trigger n8n webhooks if temperature changed
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
    // Get user's recent events for activity summary
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
      applicationStarted: recentEvents.some(e => e.eventType === 'application_start'),
      applicationCompleted: recentEvents.some(e => e.eventType === 'application_complete'),
      pricingViewed: recentEvents.some(e => e.eventType === 'pricing_view'),
    };

    // Create lead alert record in Postgres
    await db.insert(leadAlerts).values({
      id: crypto.randomUUID(),
      userId,
      alertType: 'hot_lead',
      sentAt: new Date(),
      firstContactAt: null,
      responseTimeSeconds: null,
    });

    // Legacy n8n event (via queue)
    n8nEvents.hotLeadAlert({
      userId,
      email,
      score: scoreData.score,
      firstName: previousUser[0].firstName,
      lastName: previousUser[0].lastName,
      lastActivity: recentEvents[0]?.createdAt?.toISOString(),
      activitySummary,
    });

    // Direct n8n webhook (fire-and-forget, per specialist requirements)
    const firstName = previousUser[0].firstName || '';
    const lastName = previousUser[0].lastName || '';
    const name = [firstName, lastName].filter(Boolean).join(' ') || email;

    // Generate activity description for hot lead alert
    const activities: string[] = [];
    if (activitySummary.vslWatched) {
      activities.push(`Watched VSL ${activitySummary.vslCompletionPercent}%`);
    }
    if (activitySummary.pricingViewed) {
      activities.push('Viewed pricing page');
    }
    if (activitySummary.applicationStarted) {
      activities.push(activitySummary.applicationCompleted ? 'Completed application' : 'Started application');
    }
    const whatTheyDid = activities.join(', ') || 'Reached hot lead threshold';

    alertHotLead({
      email,
      name,
      score: scoreData.score,
      whatTheyDid,
      phone: previousUser[0].phone || undefined,
      becameHotAt: new Date().toISOString(),
    }).catch(error => {
      console.error('[n8n] Hot lead alert failed (non-blocking):', error);
      // Don't throw - score is already updated in database
    });
  }
}

/**
 * Get hot leads (score >= 70)
 */
export async function getHotLeads(limit: number = 50) {
  const hotLeads = await db
    .select()
    .from(users)
    .where(sql`${users.leadScore} >= 70`)
    .orderBy(sql`${users.leadScore} DESC`)
    .limit(limit);

  return hotLeads;
}

/**
 * Get warm leads (score >= 40 and < 70)
 */
export async function getWarmLeads(limit: number = 50) {
  const warmLeads = await db
    .select()
    .from(users)
    .where(and(sql`${users.leadScore} >= 40`, sql`${users.leadScore} < 70`))
    .orderBy(sql`${users.leadScore} DESC`)
    .limit(limit);

  return warmLeads;
}
