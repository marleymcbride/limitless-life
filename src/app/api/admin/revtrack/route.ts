import { NextRequest, NextResponse } from 'next/server';
import { fetchCampaigns } from '@/lib/airtable';
import { env } from '@/env.mjs';
import { db } from '@/lib/db';
import { sessions, campaignMetrics } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Campaign record with calculated metrics
 */
interface CampaignWithMetrics {
  id: string;
  name: string;
  category: 'comm' | 'video' | 'web';
  utmCampaign: string;
  sourceUrl?: string;
  publishedAt?: string;
  firstEventAt?: string;
  views: number;
  clicks: number;
  emails: number;
  sales: number;
  revenue: number;
  revenuePerView: number;
}

/**
 * GET /api/admin/revtrack
 * Fetch campaigns with revenue per view calculations
 */
export async function GET(request: NextRequest): Promise<NextResponse<{ campaigns: CampaignWithMetrics[]; total: number } | { error: string; message?: string }>> {
  // Verify admin authentication using API key
  const apiKey = request.headers.get('x-admin-api-key');
  if (apiKey !== env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Fetch campaigns from Airtable
    const campaigns = await fetchCampaigns();

    // Query database for session counts by campaign
    const sessionCounts = await db.execute(`
      SELECT
        COALESCE(utm_campaign, 'unknown') as campaign,
        COUNT(*) as total_sessions
      FROM sessions
      GROUP BY utm_campaign
    `);

    // Create map of campaign -> session count
    const sessionCountMap = new Map(
      sessionCounts.rows.map((row: any) => [row.campaign, parseInt(row.total_sessions)])
    );

    // Update campaigns with actual database data
    const campaignsWithRealMetrics = await Promise.all(
      campaigns.map(async (campaign) => {
        const views = sessionCountMap.get(campaign.utmCampaign) || 0;

        // Get clicks from campaign_metrics table
        const metrics = await db.query.campaignMetrics.findFirst({
          where: eq(campaignMetrics.campaignId, campaign.id)
        });

        return {
          ...campaign,
          views,
          clicks: metrics?.clicks || 0,
          emails: metrics?.emails || 0,
          sales: metrics?.sales || 0,
          revenue: metrics?.revenue || 0,
          revenuePerView: views > 0 ? (metrics?.revenue || 0) / views : 0,
        };
      })
    );

    return NextResponse.json({
      campaigns: campaignsWithRealMetrics,
      total: campaignsWithRealMetrics.length,
    });
  } catch (error) {
    console.error('Error fetching revtrack data:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch campaigns',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
