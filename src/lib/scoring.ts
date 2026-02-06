import { db } from './db';
import { events, users } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { LEAD_SCORING_RULES } from './analytics';

export type LeadTemperature = 'cold' | 'warm' | 'hot';

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

  for (const event of userEvents) {
    const basePoints = LEAD_SCORING_RULES[event.eventType] || 0;
    let points = basePoints;

    // Special handling for vsl_milestone - calculate based on percentage
    if (event.eventType === 'vsl_milestone' && event.eventData) {
      const percent = event.eventData.percent || 0;
      points = Math.floor((percent / 100) * 60); // Max 60 points for VSL completion
    }

    const current = breakdown.get(event.eventType) || { count: 0, points: 0 };
    breakdown.set(event.eventType, {
      count: current.count + 1,
      points: current.points + points,
    });
  }

  // Sum all points
  const totalScore = Array.from(breakdown.values()).reduce(
    (sum, entry) => sum + entry.points,
    0
  );

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
 * Update user's lead score in database
 */
export async function updateUserLeadScore(userId: string): Promise<void> {
  const scoreData = await calculateLeadScore(userId);

  await db
    .update(users)
    .set({
      leadScore: scoreData.score,
      leadTemperature: scoreData.temperature,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
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
