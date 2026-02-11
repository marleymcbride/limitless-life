import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { webhookQueue } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyApiKey } from '@/lib/apiAuth';

/**
 * POST /api/webhooks/confirm
 *
 * Confirm webhook delivery (success or failure).
 * Marks webhooks as "delivered" or schedules retry.
 *
 * Authentication: X-API-Key header required
 *
 * Body:
 * {
 *   webhookId: string,
 *   status: 'delivered' | 'failed',
 *   errorMessage?: string (only for failed)
 * }
 *
 * Returns:
 * { success: boolean, message: string }
 */
export async function POST(request: NextRequest) {
  // Verify API key
  const auth = await verifyApiKey();
  if (!auth.valid) {
    return auth.error!;
  }

  try {
    const body = await request.json();
    const { webhookId, status, errorMessage } = body;

    if (!webhookId) {
      return NextResponse.json(
        { error: 'webhookId is required' },
        { status: 400 }
      );
    }

    if (status !== 'delivered' && status !== 'failed') {
      return NextResponse.json(
        { error: 'status must be "delivered" or "failed"' },
        { status: 400 }
      );
    }

    console.log(
      `[WEBHOOK CONFIRM] Webhook ${webhookId}: ${status}${errorMessage ? ` - ${errorMessage}` : ''}`
    );

    // Get current webhook state
    const [webhook] = await db
      .select()
      .from(webhookQueue)
      .where(eq(webhookQueue.id, webhookId))
      .limit(1);

    if (!webhook) {
      return NextResponse.json(
        { error: 'Webhook not found' },
        { status: 404 }
      );
    }

    if (status === 'delivered') {
      // Mark as delivered
      await db
        .update(webhookQueue)
        .set({
          status: 'delivered',
          attemptCount: webhook.attemptCount + 1,
          deliveredAt: new Date(),
        })
        .where(eq(webhookQueue.id, webhookId));

      console.log(`[WEBHOOK CONFIRM] Webhook ${webhookId} marked as delivered`);
    } else if (status === 'failed') {
      // Check if max attempts reached
      if (webhook.attemptCount + 1 >= webhook.maxAttempts) {
        // Mark as permanently failed
        await db
          .update(webhookQueue)
          .set({
            status: 'failed',
            attemptCount: webhook.attemptCount + 1,
            lastAttemptAt: new Date(),
            errorMessage: errorMessage || 'Max attempts reached',
          })
          .where(eq(webhookQueue.id, webhookId));

        console.log(
          `[WEBHOOK CONFIRM] Webhook ${webhookId} marked as failed (max attempts reached)`
        );
      } else {
        // Calculate next attempt time with exponential backoff
        const backoffMinutes = Math.min(Math.pow(5, webhook.attemptCount), 240); // Max 4 hours
        const nextAttemptAt = new Date(Date.now() + backoffMinutes * 60 * 1000);

        // Mark as pending for retry
        await db
          .update(webhookQueue)
          .set({
            status: 'pending',
            attemptCount: webhook.attemptCount + 1,
            lastAttemptAt: new Date(),
            nextAttemptAt,
            errorMessage: errorMessage || 'Delivery failed',
          })
          .where(eq(webhookQueue.id, webhookId));

        console.log(
          `[WEBHOOK CONFIRM] Webhook ${webhookId} scheduled for retry in ${backoffMinutes} minutes`
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Webhook marked as ${status}`,
    });
  } catch (error) {
    console.error('[WEBHOOK CONFIRM] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to confirm webhook',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
