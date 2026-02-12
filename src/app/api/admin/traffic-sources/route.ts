import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, sessions } from '@/db/schema';
import { env } from '@/env.mjs';
import { desc, eq } from 'drizzle-orm';

interface TrafficSourceStats {
  source: string;
  campaign: string;
  visitors: number;
  hotLeads: number;
  payments: number;
  roi: number;
}

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
    // Get all users
    const allUsers = await db.select().from(users);

    // Get all payments
    const allPayments = await db.select().from(payments);

    // Create a map of userId -> most recent session (for UTM params)
    const sessionMap = new Map<string, { utmSource: string | null; utmCampaign: string | null; utmMedium: string | null }>();

    // Get all sessions and map to users
    const allSessions = await db.select().from(sessions).orderBy(desc(sessions.lastSeen));

    for (const session of allSessions) {
      if (session.userId && !sessionMap.has(session.userId)) {
        sessionMap.set(session.userId, {
          utmSource: session.utmSource,
          utmCampaign: session.utmCampaign,
          utmMedium: session.utmMedium,
        });
      }
    }

    // Group leads by UTM source and campaign
    const leadsMap = new Map<string, { visitors: number; hotLeads: number }>();

    allUsers.forEach((user) => {
      const sessionData = sessionMap.get(user.id);
      const source = sessionData?.utmSource || 'Direct';
      const campaign = sessionData?.utmCampaign || 'None';

      const key = `${source}|${campaign}`;

      if (!leadsMap.has(key)) {
        leadsMap.set(key, { visitors: 0, hotLeads: 0 });
      }

      const stats = leadsMap.get(key)!;
      stats.visitors++;
      if (user.leadScore >= 70) {
        stats.hotLeads++;
      }
    });

    // Group payments by UTM source (by matching userId)
    const paymentsMap = new Map<string, { count: number; total: number }>();

    allPayments.forEach((payment) => {
      const sessionData = sessionMap.get(payment.userId);
      const source = sessionData?.utmSource || 'Direct';
      const campaign = sessionData?.utmCampaign || 'None';

      const key = `${source}|${campaign}`;

      if (!paymentsMap.has(key)) {
        paymentsMap.set(key, { count: 0, total: 0 });
      }

      const stats = paymentsMap.get(key)!;
      stats.count++;
      stats.total += payment.amount || 0;
    });

    // Combine data and calculate ROI
    const stats: TrafficSourceStats[] = [];
    const allKeys = new Set<string>([
      ...Array.from(leadsMap.keys()),
      ...Array.from(paymentsMap.keys()),
    ]);

    allKeys.forEach((key) => {
      const [source, campaign] = key.split('|');
      const leadsStats = leadsMap.get(key) || { visitors: 0, hotLeads: 0 };
      const paymentsStats = paymentsMap.get(key) || { count: 0, total: 0 };

      // ROI = (payments / visitors) * 100 (simplified ROI calculation)
      const roi = leadsStats.visitors > 0
        ? Math.round((paymentsStats.total / leadsStats.visitors) * 100)
        : 0;

      stats.push({
        source,
        campaign,
        visitors: leadsStats.visitors,
        hotLeads: leadsStats.hotLeads,
        payments: paymentsStats.count,
        roi,
      });
    });

    // Sort by ROI descending
    stats.sort((a, b) => b.roi - a.roi);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traffic sources', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
