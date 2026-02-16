import { NextRequest, NextResponse } from 'next/server';
import { airtable } from '@/lib/airtable';
import { env } from '@/env.mjs';

/**
 * GET /api/admin/revtrack
 * Fetch campaigns with revenue per view calculations
 */
export async function GET(request: NextRequest) {
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
    const campaigns = await airtable.campaigns.fetchAll();

    // Calculate revenuePerView for each campaign
    const campaignsWithMetrics = campaigns.map((campaign) => ({
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
