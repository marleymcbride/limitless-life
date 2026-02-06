import { db } from './db';
import { events, sessions } from '../db/schema';
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';

export interface FunnelStep {
  name: string;
  eventType: string;
  count: number;
  dropOff: number;
  dropOffPercentage: number;
  conversionRate: number;
}

export interface FunnelMetrics {
  period: {
    start: Date;
    end: Date;
  };
  steps: FunnelStep[];
  totalDropOff: number;
  overallConversionRate: number;
}

export interface DropOffPoint {
  step: string;
  dropOffCount: number;
  dropOffPercentage: number;
  commonReasons?: string[];
}

/**
 * Get funnel metrics for a specific time period
 */
export async function getFunnelMetrics(
  startDate: Date,
  endDate: Date = new Date()
): Promise<FunnelMetrics> {
  // Define funnel steps in order
  const funnelSteps = [
    { name: 'Page View', eventType: 'page_view' },
    { name: 'VSL Start', eventType: 'vsl_start' },
    { name: 'VSL 25% Milestone', eventType: 'vsl_milestone' },
    { name: 'VSL 50% Milestone', eventType: 'vsl_milestone' },
    { name: 'VSL 75% Milestone', eventType: 'vsl_milestone' },
    { name: 'VSL 95% Milestone', eventType: 'vsl_milestone' },
    { name: 'VSL Complete', eventType: 'vsl_complete' },
    { name: 'Email Submit', eventType: 'email_submit' },
    { name: 'Application Start', eventType: 'application_start' },
    { name: 'Application Complete', eventType: 'application_complete' },
    { name: 'Pricing View', eventType: 'pricing_view' },
    { name: 'Payment Complete', eventType: 'payment_complete' },
  ];

  const steps: FunnelStep[] = [];
  let previousCount = 0;

  for (const step of funnelSteps) {
    let count: number;

    // For VSL milestones, we need to filter by percentage
    if (step.eventType === 'vsl_milestone') {
      const milestonePercent = step.name.includes('25%')
        ? 25
        : step.name.includes('50%')
        ? 50
        : step.name.includes('75%')
        ? 75
        : 95;

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(events)
        .where(
          and(
            eq(events.eventType, step.eventType),
            gte(events.createdAt, startDate),
            lte(events.createdAt, endDate),
            sql`(${events.eventData}->>'percent')::int >= ${milestonePercent}`
          )
        );

      count = result[0]?.count || 0;
    } else {
      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(events)
        .where(
          and(
            eq(events.eventType, step.eventType),
            gte(events.createdAt, startDate),
            lte(events.createdAt, endDate)
          )
        );

      count = result[0]?.count || 0;
    }

    // Calculate metrics
    const dropOff = previousCount > 0 ? previousCount - count : 0;
    const dropOffPercentage =
      previousCount > 0 ? Math.round((dropOff / previousCount) * 100) : 0;
    const conversionRate =
      steps.length > 0
        ? Math.round((count / steps[0].count) * 100)
        : 100;

    steps.push({
      name: step.name,
      eventType: step.eventType,
      count,
      dropOff,
      dropOffPercentage,
      conversionRate,
    });

    previousCount = count;
  }

  const totalDropOff = steps[0].count - steps[steps.length - 1].count;
  const overallConversionRate = steps[steps.length - 1].conversionRate;

  return {
    period: {
      start: startDate,
      end: endDate,
    },
    steps,
    totalDropOff,
    overallConversionRate,
  };
}

/**
 * Identify drop-off points in the funnel
 */
export async function getDropOffPoints(
  startDate: Date,
  endDate: Date = new Date()
): Promise<DropOffPoint[]> {
  const metrics = await getFunnelMetrics(startDate, endDate);

  const dropOffPoints: DropOffPoint[] = [];

  for (let i = 1; i < metrics.steps.length; i++) {
    const step = metrics.steps[i];
    if (step.dropOff > 0) {
      dropOffPoints.push({
        step: step.name,
        dropOffCount: step.dropOff,
        dropOffPercentage: step.dropOffPercentage,
        commonReasons: getCommonDropOffReasons(step.name),
      });
    }
  }

  // Sort by drop-off count (highest first)
  dropOffPoints.sort((a, b) => b.dropOffCount - a.dropOffCount);

  return dropOffPoints;
}

/**
 * Get common reasons for drop-off at each step
 */
function getCommonDropOffReasons(step: string): string[] {
  const reasons: Record<string, string[]> = {
    'VSL Start': ['VSL not loading', 'Slow internet', 'Not interested in content'],
    'VSL 25% Milestone': ['Content not engaging', 'Video too long', 'Distractions'],
    'VSL 50% Milestone': ['Lost interest', "Doesn't resonate", 'Technical issues'],
    'VSL 75% Milestone': ['Price concerns', 'Not convinced', 'Comparison shopping'],
    'VSL 95% Milestone': ['Almost there - hesitancy', 'Need to think', 'External interruption'],
    'VSL Complete': ['Offer not clear', 'Want more info', 'Not ready to commit'],
    'Email Submit': ['Email form issues', 'Privacy concerns', 'Too many fields'],
    'Application Start': ['Application too long', 'Not ready to apply', 'Still deciding'],
    'Application Complete': ['Application abandonment', 'Technical issues', 'Complex form'],
    'Pricing View': ['Price too high', 'Payment options unclear', 'Need to discuss'],
    'Payment Complete': ['Payment issues', 'Changed mind', 'Technical error'],
  };

  return reasons[step] || ['Unknown reasons'];
}

/**
 * Get funnel metrics by traffic source
 */
export async function getFunnelBySource(
  startDate: Date,
  endDate: Date = new Date()
): Promise<
  Array<{
    source: string;
    count: number;
    conversionRate: number;
  }>
> {
  const sources = await db
    .select({
      source: sessions.utmSource,
      count: sql<number>`count(*)`,
    })
    .from(sessions)
    .where(
      and(gte(sessions.firstSeen, startDate), lte(sessions.firstSeen, endDate))
    )
    .groupBy(sessions.utmSource)
    .orderBy(desc(sql`count(*)`));

  const result = [];

  for (const source of sources) {
    // Get unique users from this source
    const sourceSessions = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(
        and(
          eq(sessions.utmSource, source.source || ''),
          gte(sessions.firstSeen, startDate),
          lte(sessions.firstSeen, endDate)
        )
      );

    const sessionIds = sourceSessions.map((s) => s.id);

    // Count conversions from this source
    const conversions = await db
      .select({ count: sql<number>`count(distinct ${events.userId})` })
      .from(events)
      .where(
        and(
          eq(events.eventType, 'payment_complete'),
          sql`${events.sessionId} = ANY(${sessionIds})`
        )
      );

    result.push({
      source: source.source || '(none)',
      count: source.count,
      conversionRate:
        source.count > 0
          ? Math.round((conversions[0]?.count || 0) / source.count / 10) // Rough estimate
          : 0,
    });
  }

  return result;
}

/**
 * Get funnel metrics by device type
 */
export async function getFunnelByDevice(
  startDate: Date,
  endDate: Date = new Date()
): Promise<
  Array<{
    device: string;
    pageViews: number;
    conversions: number;
    conversionRate: number;
  }>
> {
  const devices = await db
    .select({
      device: sessions.deviceType,
      pageViews: sql<number>`count(*)`,
    })
    .from(sessions)
    .where(
      and(gte(sessions.firstSeen, startDate), lte(sessions.firstSeen, endDate))
    )
    .groupBy(sessions.deviceType);

  const result = [];

  for (const device of devices) {
    // Get sessions for this device
    const deviceSessions = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(
        and(
          eq(sessions.deviceType, device.device || 'desktop'),
          gte(sessions.firstSeen, startDate),
          lte(sessions.firstSeen, endDate)
        )
      );

    const sessionIds = deviceSessions.map((s) => s.id);

    // Count conversions
    const conversions = await db
      .select({ count: sql<number>`count(*)` })
      .from(events)
      .where(
        and(
          eq(events.eventType, 'payment_complete'),
          sql`${events.sessionId} = ANY(${sessionIds})`
        )
      );

    result.push({
      device: device.device || 'desktop',
      pageViews: device.pageViews,
      conversions: conversions[0]?.count || 0,
      conversionRate:
        device.pageViews > 0
          ? Math.round((conversions[0]?.count || 0) / device.pageViews * 100)
          : 0,
    });
  }

  return result;
}
