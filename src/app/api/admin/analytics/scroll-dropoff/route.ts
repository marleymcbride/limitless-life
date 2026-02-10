import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { and, gte, lte, eq, sql } from 'drizzle-orm';

interface ScrollDropOffMetrics {
  threshold: number;
  users: number;
  dropOffFromPrevious: number;
  dropOffPercentage: number;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    // Default to last 30 days if not provided
    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const thresholds = [25, 50, 75, 100];
    const metrics: ScrollDropOffMetrics[] = [];

    // Get page views as baseline
    const pageViewsResult = await db
      .select({ count: sql<number>`count(distinct ${events.sessionId})` })
      .from(events)
      .where(
        and(
          eq(events.eventType, 'page_view'),
          gte(events.createdAt, startDate),
          lte(events.createdAt, endDate)
        )
      );
    const baseline = pageViewsResult[0]?.count || 0;

    let previousCount = baseline;

    for (const threshold of thresholds) {
      // Count unique users who reached this scroll depth
      const result = await db
        .select({ count: sql<number>`count(distinct ${events.sessionId})` })
        .from(events)
        .where(
          and(
            eq(events.eventType, 'scroll_depth'),
            gte(events.createdAt, startDate),
            lte(events.createdAt, endDate),
            sql`(${events.eventData}->>'depth')::int = ${threshold}`
          )
        );

      const count = result[0]?.count || 0;
      const dropOffFromPrevious = previousCount - count;
      const dropOffPercentage = previousCount > 0 ? Math.round((dropOffFromPrevious / previousCount) * 100) : 0;

      metrics.push({
        threshold,
        users: count,
        dropOffFromPrevious,
        dropOffPercentage,
      });

      previousCount = count;
    }

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching scroll drop-off analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch scroll drop-off analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
