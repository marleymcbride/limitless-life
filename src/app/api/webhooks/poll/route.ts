import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { webhookQueue } from '@/db/schema';
import { eq, and, lt, desc } from 'drizzle-orm';
import { verifyApiKey } from '@/lib/apiAuth';

/**
 * GET /api/webhooks/poll
 *
 * Poll for pending webhooks ready for delivery.
 * Marks returned webhooks as "processing" so they won't be returned again.
 *
 * Authentication: X-API-Key header required
 *
 * Query params:
 * - limit: number of webhooks to return (default: 10, max: 50)
 *
 * Returns:
 * {
 *   webhooks: [
 *     {
 *       id: string,
 *       targetUrl: string,
 *       payload: any,
 *       attemptCount: number,
 *       maxAttempts: number
 *     }
 *   ],
 *   polledAt: string (ISO timestamp)
 * }
 */
export async function GET(request: NextRequest) {
  // Verify API key
  const auth = await verifyApiKey();
  if (!auth.valid) {
    return auth.error!;
  }

  try {
    const url = request.nextUrl;
    const limit = Math.min(
      parseInt(url.searchParams.get('limit') || '10'),
      50
    );

    console.log(`[WEBHOOK POLL] Polling for pending webhooks (limit: ${limit})`);

    // Get pending webhooks that are ready to be processed
    const pendingWebhooks = await db
      .select()
      .from(webhookQueue)
      .where(
        and(
          eq(webhookQueue.status, 'pending'),
          lt(webhookQueue.nextAttemptAt, new Date())
        )
      )
      .orderBy(desc(webhookQueue.createdAt))
      .limit(limit);

    if (pendingWebhooks.length === 0) {
      console.log('[WEBHOOK POLL] No pending webhooks');
      return NextResponse.json({
        webhooks: [],
        polledAt: new Date().toISOString(),
      });
    }

    // Mark all returned webhooks as "processing"
    const webhookIds = pendingWebhooks.map((w) => w.id);
    await db
      .update(webhookQueue)
      .set({
        status: 'processing',
        lastAttemptAt: new Date(),
      })
      .where(eq(webhookQueue.id, webhookIds[0])); // Drizzle doesn't support batch update with where in

    // Mark each webhook individually (Drizzle limitation)
    for (const webhook of pendingWebhooks) {
      await db
        .update(webhookQueue)
        .set({
          status: 'processing',
          lastAttemptAt: new Date(),
        })
        .where(eq(webhookQueue.id, webhook.id));
    }

    console.log(
      `[WEBHOOK POLL] Returning ${pendingWebhooks.length} webhooks, marked as processing`
    );

    // Return simplified webhook data (only what n8n needs)
    const webhooks = pendingWebhooks.map((w) => ({
      id: w.id,
      targetUrl: w.targetUrl,
      payload: w.payload,
      attemptCount: w.attemptCount,
      maxAttempts: w.maxAttempts,
    }));

    return NextResponse.json({
      webhooks,
      polledAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[WEBHOOK POLL] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to poll webhooks',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
