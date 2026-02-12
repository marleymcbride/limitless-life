import { db } from './db';
import { payments, sessions } from '../db/schema';
import { gte, lte, and, sql, desc, eq, count, sum } from 'drizzle-orm';

/**
 * Calculate Average Customer Lifetime Value (CLV)
 *
 * CLV = Total Revenue from customer ÷ Number of Customers
 *
 * Higher CLV = More valuable customer base
 */

export interface CLVData {
  averageCLV: number;
  clvByTier: {
    Access: number;
    Plus: number;
    Premium: number;
    Elite: number;
  };
  clvBySource: {
    [key: string]: number;
  };
  repeatPurchaseData: {
    repeatPurchaseRate: number; // % who bought 2+ times
    purchaseFrequency: number; // Average days between purchases
  };
}

export async function calculateCLV(
  startDate: Date,
  endDate: Date
): Promise<CLVData> {
  // Get total revenue in period
  const [revenueResult] = await db
    .select({
      totalRevenue: sql<number>`SUM(${payments.amount})`,
    })
    .from(payments)
    .where(
      and(
        eq(payments.status, 'succeeded'),
        gte(payments.createdAt, startDate),
        lte(payments.createdAt, endDate)
      )
    );

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  // Get total unique customers in period
  const [customerCount] = await db
    .select({
      count: sql<number>`COUNT(DISTINCT ${payments.userId})`,
    })
    .from(payments)
    .where(
      and(
        eq(payments.status, 'succeeded'),
        gte(payments.createdAt, startDate),
        lte(payments.createdAt, endDate)
      )
    );

  const totalCustomers = customerCount[0]?.count || 0;

  // Calculate average CLV
  const averageCLV = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  // CLV by tier
  const [clvByTier] = await db
    .select({
      tier: payments.tier,
      totalRevenue: sql<number>`SUM(${payments.amount})`,
      customerCount: sql<number>`COUNT(DISTINCT ${payments.userId})`,
    })
    .from(payments)
    .innerJoin(users, eq(payments.userId, users.id))
    .where(
      and(
        eq(payments.status, 'succeeded'),
        gte(payments.createdAt, startDate),
        lte(payments.createdAt, endDate)
      )
    )
    .groupBy(payments.tier);

  const clvByTierData: Record<string, number> = {};
  for (const row of clvByTier) {
    if (row.tier && row.customerCount) {
      clvByTierData[row.tier] = row.totalRevenue / row.customerCount;
    }
  }

  // CLV by source
  const [clvBySource] = await db
    .select({
      source: sessions.utmSource,
      totalRevenue: sql<number>`SUM(${payments.amount})`,
      customerCount: sql<number>`COUNT(DISTINCT ${payments.userId})`,
    })
    .from(payments)
    .innerJoin(sessions, eq(payments.userId, sessions.id))
    .where(
      and(
        eq(payments.status, 'succeeded'),
        gte(payments.createdAt, startDate),
        lte(payments.createdAt, endDate)
      )
    )
    .groupBy(sessions.utmSource);

  const clvBySourceData: Record<string, number> = {};
  for (const row of clvBySource) {
    if (row.source && row.customerCount) {
      clvBySourceData[row.source || '(none)'] = row.totalRevenue / row.customerCount;
    }
  }

  // Repeat purchase rate
  // Customers who bought 2+ times in period
  const [repeatCustomers] = await db
    .select({
      customerCount: sql<number>`COUNT(DISTINCT ${payments.userId})`,
    })
    .from(payments)
    .where(
      and(
        eq(payments.status, 'succeeded'),
        gte(payments.createdAt, startDate),
        lte(payments.createdAt, endDate)
      )
    )
    .groupBy(payments.userId)
    .having(sql`COUNT(*) >= 2`);

  const repeatCustomerCount = repeatCustomers.reduce((sum, row) => sum + row.customerCount, 0);

  // Purchase frequency (average days between purchases per customer)
  // This is complex - need to get all payments per customer, calculate gaps, then average
  // For simplicity: total payments ÷ total customers = approximate frequency
  const purchaseFrequency = totalCustomers > 0 ? Math.round(totalPayments / totalCustomers) : 0;

  return {
    averageCLV,
    clvByTier: clvByTierData,
    clvBySource: clvBySourceData,
    repeatPurchaseData: {
      repeatPurchaseRate,
      purchaseFrequency,
    },
  };
}

/**
 * Calculate revenue attribution by channel/campaign/tier
 */
export async function getRevenueAttribution(
  startDate: Date,
  endDate: Date,
  groupBy: 'source' | 'campaign' | 'tier'
): Promise<Array<{
  dimension: string;
  revenue: number;
  count: number;
  percentage: number;
}>> {
  // Build base query
  let query = db
    .select({
      totalRevenue: sql<number>`SUM(${payments.amount})`,
      paymentCount: sql<number>`COUNT(*)`,
    })
    .from(payments)
    .where(
      and(
        eq(payments.status, 'succeeded'),
        gte(payments.createdAt, startDate),
        lte(payments.createdAt, endDate)
      )
    );

  // Extend query based on groupBy
  if (groupBy === 'source') {
    query = db
      .select({
        totalRevenue: sql<number>`SUM(${payments.amount})`,
        source: sessions.utmSource,
        paymentCount: sql<number>`COUNT(*)`,
      })
      .from(payments)
      .innerJoin(sessions, eq(payments.userId, sessions.id))
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, startDate),
          lte(payments.createdAt, endDate),
        )
      )
      .groupBy(sessions.utmSource)
      .orderBy(desc(sql`SUM(${payments.amount})`));
  } else if (groupBy === 'campaign') {
    query = db
      .select({
        totalRevenue: sql<number>`SUM(${payments.amount})`,
        campaign: sessions.utmCampaign,
        paymentCount: sql<number>`COUNT(*)`,
      })
      .from(payments)
      .innerJoin(sessions, eq(payments.userId, sessions.id))
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, startDate),
          lte(payments.createdAt, endDate),
        )
      )
      .groupBy(sessions.utmCampaign)
      .orderBy(desc(sql`SUM(${payments.amount})`));
  } else if (groupBy === 'tier') {
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
          gte(payments.createdAt, startDate),
          lte(payments.createdAt, endDate)
        )
      )
      .groupBy(payments.tier)
      .orderBy(desc(sql`SUM(${payments.amount})`));
  }

  const [baseResult] = await query;

  // Calculate total revenue and percentage base
  const totalRevenue = baseResult[0]?.totalRevenue || 0;
  const attribution = await query;

  const result = attribution.map((item) => ({
    dimension: item.dimension || '(none)',
    revenue: item.totalRevenue || 0,
    count: item.paymentCount || 0,
    percentage: totalRevenue > 0 ? ((item.totalRevenue || 0) / totalRevenue * 100) : 0,
  }));

  return result;
}
