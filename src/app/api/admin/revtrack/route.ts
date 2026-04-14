import { NextRequest, NextResponse } from 'next/server';
import { fetchCampaigns, airtable } from '@/lib/airtable';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { sessions } from '@/db/schema';
import { users } from '@/db/schema';

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
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch campaigns from Airtable
    const campaigns = await fetchCampaigns();

    // Query database for session counts by campaign (clicks)
    const sessionResult = await db.execute(`
      SELECT
        COALESCE(utm_campaign, 'unknown') as campaign,
        COUNT(*) as total_sessions
      FROM sessions
      GROUP BY utm_campaign
    `);

    // Query database for email counts by campaign
    // Count users who came from each campaign (via their session)
    const emailResult = await db.execute(`
      SELECT
        COALESCE(s.utm_campaign, 'unknown') as campaign,
        COUNT(DISTINCT u.id) as total_emails
      FROM users u
      INNER JOIN sessions s ON s.user_id = u.id
      WHERE s.utm_campaign IS NOT NULL
        AND u.lead_action = 'email-signup'
      GROUP BY s.utm_campaign
    `);

    console.log('[REVTRACK] Email counts from DB:', JSON.stringify(emailResult?.rows || emailResult, null, 2));

    // Create maps of campaign -> counts
    const sessionRows = sessionResult?.rows || sessionResult;
    const sessionCountMap = new Map(
      sessionRows.map((row: any) => [row.campaign, parseInt(row.total_sessions)])
    );

    const emailRows = emailResult?.rows || emailResult;
    const emailCountMap = new Map(
      emailRows.map((row: any) => [row.campaign, parseInt(row.total_emails)])
    );

    console.log('[REVTRACK] Session counts from DB:', Object.fromEntries(sessionCountMap));
    console.log('[REVTRACK] Email counts from DB:', Object.fromEntries(emailCountMap));

    // Update campaigns with actual database data AND sync to Airtable
    const campaignsWithMetrics: CampaignWithMetrics[] = await Promise.all(
      campaigns.map(async (campaign) => {
        const clicks = sessionCountMap.get(campaign.utmCampaign) || 0;
        const emails = emailCountMap.get(campaign.utmCampaign) || 0;
        const views = campaign.views || 0; // YouTube views from Airtable

        // Update Airtable with latest counts from database
        if (campaign.utmCampaign && (clicks > 0 || emails > 0)) {
          try {
            console.log(`[REVTRACK] Updating Airtable campaign ${campaign.utmCampaign} with clicks: ${clicks}, emails: ${emails}`);
            await airtable.campaigns.updateMetrics(campaign.id, { clicks, emails });
          } catch (error) {
            console.error(`[REVTRACK] Failed to update Airtable for ${campaign.utmCampaign}:`, error);
          }
        }

        return {
          ...campaign,
          views,
          clicks,
          emails,
          revenuePerView: views > 0 ? campaign.revenue / views : 0,
        };
      })
    );

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
