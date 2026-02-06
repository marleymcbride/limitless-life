import { db } from './db';
import { webhook_queue } from '../db/schema';
import { eq, and, lt, sql } from 'drizzle-orm';

export interface WebhookJob {
  id: string;
  endpoint: string;
  payload: any;
  attempts: number;
  maxAttempts: number;
  status: 'pending' | 'processing' | 'delivered' | 'failed';
  lastAttemptAt?: Date;
  nextAttemptAt?: Date;
  errorMessage?: string;
}

/**
 * Queue a webhook for delivery
 */
export async function queueWebhook(data: {
  endpoint: string;
  payload: any;
  maxAttempts?: number;
}): Promise<string> {
  const [webhook] = await db
    .insert(webhook_queue)
    .values({
      endpoint: data.endpoint,
      payload: data.payload,
      attempts: 0,
      maxAttempts: data.maxAttempts || 3,
      status: 'pending',
      nextAttemptAt: new Date(),
    })
    .returning();

  return webhook.id;
}

/**
 * Process pending webhooks from the queue
 */
export async function processWebhookQueue(): Promise<{
  processed: number;
  failed: number;
  remaining: number;
}> {
  // Get pending webhooks that are ready to be processed
  const pendingWebhooks = await db
    .select()
    .from(webhook_queue)
    .where(
      and(
        eq(webhook_queue.status, 'pending'),
        lt(webhook_queue.nextAttemptAt, new Date())
      )
    )
    .limit(10); // Process 10 at a time

  let processed = 0;
  let failed = 0;

  for (const webhook of pendingWebhooks) {
    // Mark as processing
    await db
      .update(webhook_queue)
      .set({
        status: 'processing',
        lastAttemptAt: new Date(),
      })
      .where(eq(webhook_queue.id, webhook.id));

    // Attempt to deliver webhook
    const result = await deliverWebhook(
      webhook.endpoint,
      webhook.payload,
      webhook.attempts + 1
    );

    if (result.success) {
      // Mark as delivered
      await db
        .update(webhook_queue)
        .set({
          status: 'delivered',
          attempts: webhook.attempts + 1,
          deliveredAt: new Date(),
        })
        .where(eq(webhook_queue.id, webhook.id));

      processed++;
    } else {
      // Calculate next attempt time with exponential backoff
      const backoffMinutes = Math.pow(5, webhook.attempts); // 1min, 5min, 25min
      const nextAttemptAt = new Date(Date.now() + backoffMinutes * 60 * 1000);

      // Check if max attempts reached
      if (webhook.attempts + 1 >= webhook.maxAttempts) {
        // Mark as failed
        await db
          .update(webhook_queue)
          .set({
            status: 'failed',
            attempts: webhook.attempts + 1,
            lastAttemptAt: new Date(),
            errorMessage: result.error,
          })
          .where(eq(webhook_queue.id, webhook.id));

        failed++;
      } else {
        // Retry later
        await db
          .update(webhook_queue)
          .set({
            status: 'pending',
            attempts: webhook.attempts + 1,
            lastAttemptAt: new Date(),
            nextAttemptAt,
            errorMessage: result.error,
          })
          .where(eq(webhook_queue.id, webhook.id));
      }
    }
  }

  // Get remaining count
  const [remainingCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(webhook_queue)
    .where(eq(webhook_queue.status, 'pending'));

  return {
    processed,
    failed,
    remaining: remainingCount.count,
  };
}

/**
 * Deliver a webhook to an endpoint
 */
async function deliverWebhook(
  endpoint: string,
  payload: any,
  attemptNumber: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Attempt': attemptNumber.toString(),
        'X-Webhook-ID': crypto.randomUUID(),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get webhook queue statistics
 */
export async function getWebhookQueueStats(): Promise<{
  pending: number;
  processing: number;
  delivered: number;
  failed: number;
}> {
  const [pending] = await db
    .select({ count: sql<number>`count(*)` })
    .from(webhook_queue)
    .where(eq(webhook_queue.status, 'pending'));

  const [processing] = await db
    .select({ count: sql<number>`count(*)` })
    .from(webhook_queue)
    .where(eq(webhook_queue.status, 'processing'));

  const [delivered] = await db
    .select({ count: sql<number>`count(*)` })
    .from(webhook_queue)
    .where(eq(webhook_queue.status, 'delivered'));

  const [failed] = await db
    .select({ count: sql<number>`count(*)` })
    .from(webhook_queue)
    .where(eq(webhook_queue.status, 'failed'));

  return {
    pending: pending.count,
    processing: processing.count,
    delivered: delivered.count,
    failed: failed.count,
  };
}

/**
 * Clean up old delivered webhooks (older than 7 days)
 */
export async function cleanupOldWebhooks(): Promise<number> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const result = await db
    .delete(webhook_queue)
    .where(
      and(
        eq(webhook_queue.status, 'delivered'),
        sql`${webhook_queue.deliveredAt} < ${sevenDaysAgo}`
      )
    );

  return result.rowCount || 0;
}
