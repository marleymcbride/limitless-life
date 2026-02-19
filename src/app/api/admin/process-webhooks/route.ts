import { NextRequest, NextResponse } from 'next/server';
import { processWebhookQueue, getWebhookQueueStats } from '@/lib/webhookQueue';
import { isAuthenticated } from '@/lib/admin-auth';

/**
 * POST /api/admin/process-webhooks
 *
 * Manually trigger webhook queue processing (for testing/debugging)
 */
export async function POST(request: NextRequest) {
  // Verify admin authentication using session cookie
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    console.log('[ADMIN] Manual webhook processing triggered');

    // Process pending webhooks
    const result = await processWebhookQueue();

    // Get queue statistics
    const stats = await getWebhookQueueStats();

    console.log('[ADMIN] Webhook processing complete:', result);
    console.log('[ADMIN] Queue stats:', stats);

    return NextResponse.json({
      success: true,
      ...result,
      stats,
    });
  } catch (error) {
    console.error('[ADMIN] Webhook processing error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process webhooks',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/process-webhooks
 *
 * Get webhook queue statistics
 */
export async function GET(request: NextRequest) {
  // Verify admin authentication using session cookie
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const stats = await getWebhookQueueStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('[ADMIN] Stats fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
