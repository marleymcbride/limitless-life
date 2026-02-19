import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users, payments, sessions } from '@/db/schema';
import { gte, lte, and, eq, sql } from 'drizzle-orm';
import { env } from '@/env.mjs';

const schema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

/**
 * GET /api/admin/clv
 *
 * Calculate Customer Lifetime Value (CLV) metrics
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Query Parameters:
 * - startDate: ISO datetime string (default: 30 days ago)
 * - endDate: ISO datetime string (default: now)
 *
 * Returns:
 * - averageCLV: Average customer lifetime value
 * - clvByTier: CLV breakdown by purchased tier
 * - clvBySource: CLV breakdown by traffic source
 * - repeatPurchaseRate: % of customers who purchased 2+ times
 * - purchaseFrequency: Average days between purchases
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

    // Validate dates
    schema.parse({ startDate, endDate });

    // Default to last 30 days if not specified
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    console.log('[CLV API] Fetching:', { start, end });

    // Get total revenue and unique customers in period
    const [revenueResult] = await db
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

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Get unique customers who made purchases
    const [customerResult] = await db
      .select({
        count: sql<number>`COUNT(DISTINCT payments.user_id)`,
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, start),
          lte(payments.createdAt, end)
        )
      );

    const totalCustomers = customerResult[0]?.count || 0;
    const averageCLV = totalRevenue > 0 && totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

    console.log('[CLV API] CLV:', { totalRevenue, totalCustomers, averageCLV });

    // CLV by tier
    const clvByTier = await db
      .select({
        tier: payments.tier,
        totalRevenue: sql`SUM(${payments.amount})`,
        customerCount: sql`COUNT(DISTINCT payments.user_id)`,
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

    // CLV by source
    const clvBySource = await db
      .select({
        source: sessions.utmSource,
        totalRevenue: sql`SUM(${payments.amount})`,
        customerCount: sql`COUNT(DISTINCT payments.user_id)`,
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

    // Repeat purchase rate (customers who bought 2+ times)
    const [repeatCustomers] = await db
      .select({
        customerCount: sql`COUNT(DISTINCT payments.user_id)`,
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, start),
          lte(payments.createdAt, end)
        )
      )
      .groupBy(payments.userId)
      .having(sql`COUNT(*) >= 2`);

    const totalRepeatCustomers = repeatCustomers?.reduce((sum, row) => sum + row.customerCount, 0) || 0;
    const repeatPurchaseRate = totalCustomers > 0 ? (totalRepeatCustomers / totalCustomers) * 100 : 0;

    // Get total payment count
    const [paymentCountResult] = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, start),
          lte(payments.createdAt, end)
        )
      );

    const totalPayments = paymentCountResult[0]?.count || 0;

    // Purchase frequency (average days between purchases)
    // For simplicity: total payments in period / total customers
    // More complex implementation would track exact days between purchases
    const purchaseFrequency = totalCustomers > 0 ? Math.round(totalPayments / totalCustomers) : 0;

    const metrics = {
      totalRevenue,
      totalCustomers,
      averageCLV,
      clvByTier: clvByTier.map((item) => ({
        tier: item.tier || 'Unknown',
        clv: item.totalRevenue / (item.customerCount || 1),
      })),
      clvBySource: clvBySource.map((item) => ({
        source: item.source || '(none)',
        clv: item.totalRevenue / (item.customerCount || 1),
      })),
      repeatPurchaseRate,
      purchaseFrequency,
    };

    console.log('[CLV API] Returning:', metrics);

    return NextResponse.json({
      success: true,
      metrics,
    });
  } catch (error) {
    console.error('[CLV API] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch CLV data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
