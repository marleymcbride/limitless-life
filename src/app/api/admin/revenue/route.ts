import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { payments, sessions } from '@/db/schema';
import { gte, lte, and, eq, sql, desc } from 'drizzle-orm';
import { env } from '@/env.mjs';

const schema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(['source', 'campaign', 'tier']).optional(),
});

/**
 * GET /api/admin/revenue
 *
 * Calculate revenue metrics for business intelligence dashboard
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Query Params:
 * - startDate: ISO datetime string (default: 30 days ago)
 * - endDate: ISO datetime string (default: now)
 * - groupBy: 'source' | 'campaign' | 'tier' (how to group revenue)
 *
 * Returns:
 * - totalRevenue: Total revenue in date range
 * - revenueBreakdown: Array of revenue grouped by selected dimension
 * - metrics: Summary statistics
 */
export async function GET(request: NextRequest) {
  // Verify admin authentication using API key
  const apiKey = request.headers.get('x-admin-api-key');
  if (apiKey !== env.ADMIN_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = request.nextUrl;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const groupBy = searchParams.get('groupBy') || 'source';

    // Validate dates
    schema.parse({ startDate, endDate, groupBy });

    // Default to last 30 days if not specified
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    console.log('[REVENUE API] Fetching:', { start, end, groupBy });

    // Base query - get total revenue
    let query = db
      .select({
        totalRevenue: sql<number>`COALESCE(SUM(${payments.amount}), 0)`,
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, start),
          lte(payments.createdAt, end)
        )
      );

    const [totalResult] = await query;

    // Extend query based on groupBy
    let revenueBreakdown: any[] = [];
    let metrics = {
      totalPayments: 0,
      totalRevenue: totalResult[0]?.totalRevenue || 0,
      uniqueCustomers: 0,
      averageOrderValue: 0,
    };

    // Group by source (utm_source)
    if (groupBy === 'source') {
      query = db
        .select({
          totalRevenue: sql<number>`SUM(${payments.amount})`,
          source: sessions.utmSource,
          paymentCount: sql<number>`COUNT(*)`,
        })
        .from(payments)
        .innerJoin(sessions, eq(payments.userId, sessions.userId))
        .where(
          and(
            eq(payments.status, 'succeeded'),
            gte(payments.createdAt, start),
            lte(payments.createdAt, end)
          )
        )
        .groupBy(sessions.utmSource);

      const sourceResults = await query;

      revenueBreakdown = sourceResults.map((result) => ({
        source: result.source || '(none)',
        revenue: result.totalRevenue || 0,
        count: result.paymentCount || 0,
      }));

      // Calculate metrics
      metrics.totalPayments = sourceResults.reduce((sum, r) => sum + r.paymentCount, 0);
      metrics.uniqueCustomers = sourceResults.length;
      metrics.averageOrderValue = metrics.totalRevenue > 0 ? metrics.totalRevenue / metrics.uniqueCustomers : 0;
    }

    // Group by campaign (utm_campaign)
    if (groupBy === 'campaign') {
      query = db
        .select({
          totalRevenue: sql<number>`SUM(${payments.amount})`,
          campaign: sessions.utmCampaign,
          paymentCount: sql<number>`COUNT(*)`,
        })
        .from(payments)
        .innerJoin(sessions, eq(payments.userId, sessions.userId))
        .where(
          and(
            eq(payments.status, 'succeeded'),
            gte(payments.createdAt, start),
            lte(payments.createdAt, end)
          )
        )
        .groupBy(sessions.utmCampaign);

      const campaignResults = await query;

      revenueBreakdown = campaignResults.map((result) => ({
        campaign: result.campaign || '(none)',
        revenue: result.totalRevenue || 0,
        count: result.paymentCount || 0,
      }));

      // Update metrics
      metrics.totalPayments = campaignResults.reduce((sum, r) => sum + r.paymentCount, 0);
      metrics.uniqueCustomers = campaignResults.length;
      metrics.averageOrderValue = metrics.totalRevenue > 0 ? metrics.totalRevenue / metrics.uniqueCustomers : 0;
    }

    // Group by tier
    if (groupBy === 'tier') {
      query = db
        .select({
          totalRevenue: sql<number>`SUM(${payments.amount})`,
          tier: payments.tier,
          paymentCount: sql<number>`COUNT(*)`,
        })
        .from(payments)
        .where(
          and(
            eq(payments.status, 'succeeded'),
            gte(payments.createdAt, start),
            lte(payments.createdAt, end)
          )
        )
        .groupBy(payments.tier);

      const tierResults = await query;

      revenueBreakdown = tierResults.map((result) => ({
        tier: result.tier || 'Unknown',
        revenue: result.totalRevenue || 0,
        count: result.paymentCount || 0,
      }));

      // Update metrics
      metrics.totalPayments = tierResults.reduce((sum, r) => sum + r.paymentCount, 0);
      metrics.uniqueCustomers = tierResults.length;
      metrics.averageOrderValue = metrics.totalRevenue > 0 ? metrics.totalRevenue / metrics.uniqueCustomers : 0;
    }

    console.log('[REVENUE API] Returning:', metrics, revenueBreakdown);

    return NextResponse.json({
      success: true,
      metrics: {
        totalRevenue: metrics.totalRevenue,
        totalPayments: metrics.totalPayments,
        uniqueCustomers: metrics.uniqueCustomers,
        averageOrderValue: metrics.averageOrderValue,
      },
      revenueBreakdown,
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
        groupBy,
      },
    });
  } catch (error) {
    console.error('[REVENUE API] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch revenue data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
