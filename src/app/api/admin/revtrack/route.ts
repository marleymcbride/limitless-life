import { NextRequest, NextResponse } from 'next/server';
import { fetchCampaigns } from '@/lib/airtable';
import { env } from '@/env.mjs';
import { db } from '@/lib/db';
import { sessions } from '@/db/schema';

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
  // TODO: Re-enable authentication once we have proper client-side auth
  // const apiKey = request.headers.get('x-admin-api-key');
  // if (apiKey !== env.ADMIN_API_KEY) {
  //   return NextResponse.json(
  //     { error: 'Unauthorized' },
  //     { status: 401 }
  //   );
  // }

  try {
    // Fetch campaigns from Airtable
    const campaigns = await fetchCampaigns();

    // Query database for session counts by campaign
    const result = await db.execute(`
      SELECT
        COALESCE(utm_campaign, 'unknown') as campaign,
        COUNT(*) as total_sessions
      FROM sessions
      GROUP BY utm_campaign
    `);

    console.log('[REVTRACK] Raw DB result:', JSON.stringify(result, null, 2));

    // Create map of campaign -> session count
    const rows = result?.rows || result;
    const sessionCountMap = new Map(
      rows.map((row: any) => [row.campaign, parseInt(row.total_sessions)])
    );

    console.log('[REVTRACK] Session counts from DB:', Object.fromEntries(sessionCountMap));

    // Update campaigns with actual database data
    const campaignsWithMetrics: CampaignWithMetrics[] = campaigns.map((campaign) => {
      const views = sessionCountMap.get(campaign.utmCampaign) || 0;

      return {
        ...campaign,
        views,
        clicks: views, // For now, clicks = views (every page view is a click)
        revenuePerView: views > 0 ? campaign.revenue / views : 0,
      };
    });

    return NextResponse.json({
      campaigns: campaignsWithMetrics,
      total: campaignsWithMetrics.length,
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
