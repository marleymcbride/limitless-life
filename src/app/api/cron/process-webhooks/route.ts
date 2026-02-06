import { NextRequest, NextResponse } from 'next/server';
import { processWebhookQueue, getWebhookQueueStats, cleanupOldWebhooks } from '@/lib/webhookQueue';
import { env } from '@/env.mjs';

/**
 * POST /api/cron/process-webhooks
 *
 * Cron job endpoint to process pending webhooks in the queue.
 *
 * This endpoint should be called by a cron job scheduler (e.g., Vercel Cron).
 * Recommended frequency: Every 1-5 minutes.
 *
 * Headers:
 * - x-cron-api-key: Required for authentication
 *
 * Returns:
 * - processed: Number of webhooks successfully delivered
 * - failed: Number of webhooks that failed after max retries
 * - remaining: Number of webhooks still pending
 * - stats: Overall queue statistics
 */
export async function POST(req: NextRequest) {
  try {
    // Verify cron API key
    const apiKey = req.headers.get('x-cron-api-key');
    if (apiKey !== env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Process pending webhooks
    const result = await processWebhookQueue();

    // Get queue statistics
    const stats = await getWebhookQueueStats();

    // Clean up old delivered webhooks (run cleanup 10% of the time)
    const shouldCleanup = Math.random() < 0.1;
    let cleanedUp = 0;
    if (shouldCleanup) {
      cleanedUp = await cleanupOldWebhooks();
    }

    return NextResponse.json({
      success: true,
      ...result,
      stats,
      cleanedUp,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, error: 'Cron job failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cron/process-webhooks
 *
 * Get webhook queue statistics (for monitoring)
 */
export async function GET(req: NextRequest) {
  try {
    // Verify API key
    const apiKey = req.headers.get('x-admin-api-key');
    if (apiKey !== env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const stats = await getWebhookQueueStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
