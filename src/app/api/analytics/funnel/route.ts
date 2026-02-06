import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getFunnelMetrics,
  getDropOffPoints,
  getFunnelBySource,
  getFunnelByDevice,
} from '@/lib/funnel';
import { env } from '@/env.mjs';

const schema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  breakdown: z.enum(['none', 'source', 'device']).optional(),
});

/**
 * GET /api/analytics/funnel
 *
 * Get funnel analytics metrics for the specified time period.
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Query Params:
 * - startDate: ISO datetime string (default: 30 days ago)
 * - endDate: ISO datetime string (default: now)
 * - breakdown: 'none' | 'source' | 'device' (default: 'none')
 *
 * Returns:
 * - funnel metrics, drop-off points, and optional breakdown by source/device
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin API key
    const apiKey = req.headers.get('x-admin-api-key');
    if (apiKey !== env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = req.nextUrl;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const breakdown = searchParams.get('breakdown') || 'none';

    // Default to last 30 days if not specified
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    // Validate dates
    schema.parse({ startDate: start.toISOString(), endDate: end.toISOString(), breakdown });

    // Get base funnel metrics
    const [metrics, dropOffs] = await Promise.all([
      getFunnelMetrics(start, end),
      getDropOffPoints(start, end),
    ]);

    const response: any = {
      success: true,
      metrics,
      dropOffs,
    };

    // Add breakdown if requested
    if (breakdown === 'source') {
      response.bySource = await getFunnelBySource(start, end);
    } else if (breakdown === 'device') {
      response.byDevice = await getFunnelByDevice(start, end);
    }

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error && 'message' in error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
