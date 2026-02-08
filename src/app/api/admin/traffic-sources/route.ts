import { NextResponse } from 'next/server';
import { airtable } from '@/lib/airtable';
import { isAuthenticated } from '@/lib/admin-auth';

interface TrafficSourceStats {
  source: string;
  campaign: string;
  visitors: number;
  hotLeads: number;
  payments: number;
  roi: number;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get all leads
    const allLeads = await airtable.leads.getAll();

    // Get all payments
    const allPayments = await airtable.payments.getAll();

    // Group leads by UTM source and campaign
    const leadsMap = new Map<string, { visitors: number; hotLeads: number }>();
    const paymentsMap = new Map<string, { count: number; total: number }>();

    allLeads.forEach((record) => {
      const source = record.get('UTMSource') as string || 'Direct';
      const campaign = record.get('UTMCampaign') as string || 'None';
      const temperature = record.get('Temperature') as 'Hot' | 'Warm' | 'Cold';

      const key = `${source}|${campaign}`;

      if (!leadsMap.has(key)) {
        leadsMap.set(key, { visitors: 0, hotLeads: 0 });
      }

      const stats = leadsMap.get(key)!;
      stats.visitors++;
      if (temperature === 'Hot') {
        stats.hotLeads++;
      }
    });

    // Group payments by UTM source (by matching email)
    allPayments.forEach((record) => {
      const email = record.get('Email') as string;
      const amount = record.get('Amount') as number;

      // Find the lead with this email to get UTM params
      const lead = allLeads.find((l) => l.get('Email') === email);
      const source = lead?.get('UTMSource') as string || 'Direct';
      const campaign = lead?.get('UTMCampaign') as string || 'None';

      const key = `${source}|${campaign}`;

      if (!paymentsMap.has(key)) {
        paymentsMap.set(key, { count: 0, total: 0 });
      }

      const stats = paymentsMap.get(key)!;
      stats.count++;
      stats.total += amount;
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
