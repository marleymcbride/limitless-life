import { NextRequest, NextResponse } from 'next/server';
import { fetchCampaigns } from '@/lib/airtable';
import { env } from '@/env.mjs';

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

    // Calculate revenuePerView for each campaign
    const campaignsWithMetrics: CampaignWithMetrics[] = campaigns.map((campaign) => ({
      ...campaign,
      revenuePerView: campaign.views > 0
        ? campaign.revenue / campaign.views
        : 0,
    }));

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
