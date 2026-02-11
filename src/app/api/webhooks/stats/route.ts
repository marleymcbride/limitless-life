import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { webhookQueue } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { verifyApiKey } from '@/lib/apiAuth';

/**
 * GET /api/webhooks/stats
 *
 * Get webhook queue statistics.
 * Useful for monitoring and alerting.
 *
 * Authentication: X-API-Key header required
 *
 * Returns:
 * {
 *   pending: number,
 *   processing: number,
 *   delivered: number,
 *   failed: number,
 *   total: number
 * }
 */
export async function GET() {
  // Verify API key
  const auth = await verifyApiKey();
  if (!auth.valid) {
    return auth.error!;
  }

  try {
    const [pending] = await db
      .select({ count: sql<number>`count(*)` })
      .from(webhookQueue)
      .where(eq(webhookQueue.status, 'pending'));

    const [processing] = await db
      .select({ count: sql<number>`count(*)` })
      .from(webhookQueue)
      .where(eq(webhookQueue.status, 'processing'));

    const [delivered] = await db
      .select({ count: sql<number>`count(*)` })
      .from(webhookQueue)
      .where(eq(webhookQueue.status, 'delivered'));

    const [failed] = await db
      .select({ count: sql<number>`count(*)` })
      .from(webhookQueue)
      .where(eq(webhookQueue.status, 'failed'));

    const [total] = await db
      .select({ count: sql<number>`count(*)` })
      .from(webhookQueue);

    return NextResponse.json({
      pending: pending.count,
      processing: processing.count,
      delivered: delivered.count,
      failed: failed.count,
      total: total.count,
    });
  } catch (error) {
    console.error('[WEBHOOK STATS] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get webhook stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
