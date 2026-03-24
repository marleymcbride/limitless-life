import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments } from '@/db/schema';
import { env } from '@/env.mjs';
import { gte, sql, and, desc, eq } from 'drizzle-orm';

/**
 * GET /api/admin/stats
 * Fetch dashboard summary metrics
 */
export async function GET(request: NextRequest) {
  // TODO: Re-enable authentication once we have proper client-side auth
  // const apiKey = request.headers.get('x-admin-api-key');
  // if (apiKey !== env.ADMIN_API_KEY) {
  //   return NextResponse.json(
  //     { error: 'Unauthorized' },
  //     { status: 401 }
  //   );
  // }

  try {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Get total visitors (unique users)
    const totalVisitors = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    // Get hot leads (leadScore >= 70)
    const hotLeads = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(sql`${users.leadScore} >= 70`);

    // Get total payments this month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const totalPaymentsThisMonth = await db
      .select({ amount: sql<number>`COALESCE(SUM(${payments.amount}), 0)` })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, startOfMonth)
        )
      );

    const paymentsThisMonth = totalPaymentsThisMonth[0]?.amount || 0;

    // Get actual counts from query results
    const totalVisitorsCount = totalVisitors[0]?.count || 0;
    const hotLeadsCount = hotLeads[0]?.count || 0;

    // Calculate conversion rate (hot leads / total visitors * 100)
    const conversionRate = totalVisitorsCount > 0
      ? Math.round((hotLeadsCount / totalVisitorsCount) * 100)
      : 0;

    return NextResponse.json({
      totalVisitors: totalVisitorsCount,
      hotLeads: hotLeadsCount,
      paymentsThisMonth: Math.round(paymentsThisMonth),
      conversionRate,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
