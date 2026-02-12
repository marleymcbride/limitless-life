import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users, sessions, payments, events } from '@/db/schema';
import { sql, and, gte, lte, eq, or } from 'drizzle-orm';
import { env } from '@/env.mjs';

const schema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

/**
 * GET /api/analytics/abandoned
 *
 * Get abandoned funnel metrics - users who started but didn't complete
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Query Params:
 * - startDate: ISO datetime string (default: 30 days ago)
 * - endDate: ISO datetime string (default: now)
 *
 * Returns:
 * - abandonedAtStages: Users dropped at each funnel stage
 * - abandonmentReasons: Common reasons for abandonment
 * - totalAbandoned: Total users who abandoned
 * - abandonmentRate: Percentage of users who abandoned
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin API key
    const apiKey = req.headers.get('x-admin-api-key');
    if (apiKey !== env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = req.nextUrl;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Default to last 30 days if not specified
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    // Get users who watched VSL but didn't apply
    const vslWatchers = await db
      .select({
        userId: sessions.userId,
      })
      .from(sessions)
      .where(
        and(
          sql`${sessions.vslWatched} = true`,
          gte(sessions.lastSeen, start),
          lte(sessions.lastSeen, end)
        )
      );

    const vslWatcherIds = vslWatchers.map(v => v.userId);

    // Get those who applied (not abandoned at VSL)
    const applications = await db
      .select({
        userId: payments.userId,
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, start),
          lte(payments.createdAt, end)
        )
      );

    const applicantIds = applications.map(a => a.userId);
    const abandonedAtVsl = vslWatcherIds.filter(id => !applicantIds.includes(id));

    // Get users who started application but didn't complete
    const startedApps = await db
      .select({
        userId: sessions.userId,
      })
      .from(sessions)
      .where(
        and(
          sql`${sessions.applicationStarted} = true`,
          sql`${sessions.applicationStarted} = true`,
          gte(sessions.lastSeen, start),
          lte(sessions.lastSeen, end)
        )
      );

    const startedAppIds = startedApps.map(s => s.userId);
    const abandonedAtApplication = startedAppIds.filter(id => !applicantIds.includes(id));

    // Get users who viewed pricing but didn't apply
    const pricingViewers = await db
      .select({
        userId: sessions.userId,
      })
      .from(sessions)
      .where(
        and(
          sql`${sessions.pricingViewed} = true`,
          gte(sessions.lastSeen, start),
          lte(sessions.lastSeen, end)
        )
      );

    const pricingViewerIds = pricingViewers.map(p => p.userId);
    const abandonedAtPricing = pricingViewerIds.filter(id => !applicantIds.includes(id));

    const totalVisitors = vslWatcherIds.length;
    const totalAbandoned = abandonedAtVsl.length + abandonedAtApplication.length + abandonedAtPricing.length;
    const abandonmentRate = totalVisitors > 0 ? (totalAbandoned / totalVisitors) * 100 : 0;

    return NextResponse.json({
      success: true,
      abandonedAtStages: [
        { stage: 'VSL Watched', count: vslWatcherIds.length },
        { stage: 'Application Started', count: startedAppIds.length },
        { stage: 'Pricing Viewed', count: pricingViewerIds.length },
        { stage: 'Completed', count: applicantIds.length },
      ],
      abandonmentRates: {
        vslToApplication: vslWatcherIds.length > 0 ? (abandonedAtVsl.length / vslWatcherIds.length) * 100 : 0,
        applicationToPricing: startedAppIds.length > 0 ? (abandonedAtApplication.length / startedAppIds.length) * 100 : 0,
        pricingToPayment: pricingViewerIds.length > 0 ? (abandonedAtPricing.length / pricingViewerIds.length) * 100 : 0,
      },
      totalAbandoned,
      totalVisitors,
      abandonmentRate,
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching abandoned funnel data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch abandoned funnel data', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
