import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getFunnelMetrics, getDropOffPoints } from '@/lib/funnel';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const metrics = await getFunnelMetrics(startDate, endDate);
    const dropOffs = await getDropOffPoints(startDate, endDate);

    // Build steps with dropOff and conversion data matching the component's FunnelStep interface
    const steps = metrics.map((m, i) => {
      const prevCount = i > 0 ? metrics[i - 1].count : m.count;
      const dropOff = i > 0 ? prevCount - m.count : 0;
      const dropOffPercentage = prevCount > 0 ? Math.round((dropOff / prevCount) * 100) : 0;
      const conversionRate = metrics[0].count > 0 ? Math.round((m.count / metrics[0].count) * 100) : 0;

      return {
        name: m.stage,
        eventType: m.stage,
        count: m.count,
        dropOff,
        dropOffPercentage,
        conversionRate,
      };
    });

    const totalDropOff = metrics.length > 1 ? metrics[0].count - metrics[metrics.length - 1].count : 0;
    const overallConversionRate = metrics.length > 0 && metrics[0].count > 0
      ? Math.round((metrics[metrics.length - 1].count / metrics[0].count) * 100)
      : 0;

    return NextResponse.json({
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      steps,
      totalDropOff,
      overallConversionRate,
    });
  } catch (error) {
    console.error('Error fetching funnel analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch funnel analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
