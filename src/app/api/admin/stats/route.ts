import { NextResponse } from 'next/server';
import { airtable } from '@/lib/airtable';
import { isAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const today = new Date();

    // Get total visitors (all leads)
    const allLeads = await airtable.leads.getAll();
    const totalVisitors = allLeads.length;

    // Get hot leads count
    const hotLeadsCount = await airtable.leads.getCount('Hot');

    // Get total payments for current month
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const totalPaymentsThisMonth = await airtable.payments.getTotalForMonth(currentYear, currentMonth);

    // Calculate conversion rate (hot leads / total visitors * 100)
    const conversionRate = totalVisitors > 0
      ? Math.round((hotLeadsCount / totalVisitors) * 100)
      : 0;

    return NextResponse.json({
      totalVisitors,
      hotLeadsCount,
      totalPaymentsThisMonth: Math.round(totalPaymentsThisMonth),
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
