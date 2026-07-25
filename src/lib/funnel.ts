import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { and, gte, lte, eq, sql } from 'drizzle-orm';

export interface FunnelStage {
  name: string;
  description: string;
  order: number;
}

export interface FunnelMetrics {
  stage: string;
  count: number;
  dropoffRate?: number;
}

/**
 * Funnel stages in order — each maps to an eventType in the events table.
 * The concierge funnel uses a subset; other funnels (beta, 3weeks) add their own.
 */
export const FUNNEL_STAGES: FunnelStage[] = [
  { name: 'page_view', description: 'Visited landing page', order: 1 },
  { name: 'vsl_start', description: 'Started VSL', order: 2 },
  { name: 'email_submit', description: 'Submitted email', order: 3 },
  { name: 'application_start', description: 'Started application', order: 4 },
  { name: 'application_complete', description: 'Completed application', order: 5 },
  { name: 'pricing_view', description: 'Viewed pricing', order: 6 },
  { name: 'pricing_plan_selected', description: 'Selected plan on pricing', order: 7 },
  { name: 'checkout_initiated', description: 'Initiated checkout', order: 8 },
  { name: 'concierge_deposit_paid', description: 'Paid deposit', order: 9 },
  { name: 'payment_complete', description: 'Completed payment', order: 10 },
];

export function getNextStage(currentStage: string): string | null {
  const currentIndex = FUNNEL_STAGES.findIndex(s => s.name === currentStage);
  if (currentIndex === -1 || currentIndex === FUNNEL_STAGES.length - 1) {
    return null;
  }
  return FUNNEL_STAGES[currentIndex + 1].name;
}

export function calculateDropoffRate(currentCount: number, previousCount: number): number {
  if (previousCount === 0) return 0;
  return ((previousCount - currentCount) / previousCount) * 100;
}

/**
 * Get funnel metrics by querying the events table for each stage's eventType.
 * Each stage counts distinct sessions (not raw events) so a single user
 * viewing the pricing page 3 times only counts once.
 */
export async function getFunnelMetrics(startDate?: Date, endDate?: Date, _timeframe?: string): Promise<FunnelMetrics[]> {
  const results: FunnelMetrics[] = [];
  let previousCount = 0;

  for (const stage of FUNNEL_STAGES) {
    const conditions = [eq(events.eventType, stage.name as any)];
    if (startDate) conditions.push(gte(events.createdAt, startDate));
    if (endDate) conditions.push(lte(events.createdAt, endDate));

    // Count distinct sessionIds so a single visitor is only counted once per stage
    const [row] = await db
      .select({ count: sql<number>`count(distinct ${events.sessionId})` })
      .from(events)
      .where(and(...conditions));

    const count = row?.count || 0;
    const dropoffRate = previousCount > 0 ? calculateDropoffRate(count, previousCount) : 0;

    results.push({
      stage: stage.name,
      count,
      dropoffRate,
    });

    previousCount = count;
  }

  return results;
}

export interface DropOffPoint {
  stage: string;
  dropOffCount: number;
  dropOffRate: number;
}

/**
 * Calculate drop-off counts and rates between each stage.
 */
export async function getDropOffPoints(startDate: Date, endDate: Date): Promise<DropOffPoint[]> {
  const metrics = await getFunnelMetrics(startDate, endDate);
  return metrics.slice(0, -1).map((m, i) => ({
    stage: m.stage,
    dropOffCount: m.count - (metrics[i + 1]?.count || 0),
    dropOffRate: m.dropoffRate || 0,
  }));
}

/**
 * Get funnel broken down by UTM source — requires sessions.user_id to be set.
 * Falls back to eventData.source field for entries without session links.
 */
export async function getFunnelBySource(startDate: Date, endDate: Date): Promise<Record<string, FunnelMetrics[]>> {
  return {}; // Placeholder — requires session-user bridge to be fully populated first
}

export async function getFunnelByDevice(startDate: Date, endDate: Date): Promise<Record<string, FunnelMetrics[]>> {
  return {}; // Placeholder — same reason
}
