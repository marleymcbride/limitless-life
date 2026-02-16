/**
 * n8n Webhook Endpoint for Event Tracking
 *
 * This endpoint receives event data from n8n workflows for first event detection.
 * It validates requests, checks for existing events, and records first-time events.
 *
 * Authentication: x-api-key header must match WEBHOOK_API_KEY environment variable
 */

import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface EventPayload {
  session_id: string;
  event_type: string;
  page_url: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  timestamp?: string;
}

interface WebhookResponse {
  success: boolean;
  message?: string;
  event_id?: number;
  error?: string;
}

/**
 * Validate webhook request payload
 */
function validatePayload(payload: any): { valid: boolean; error?: string } {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Invalid payload format' };
  }

  const required = ['session_id', 'event_type', 'page_url'];
  const missing = required.filter((field) => !payload[field]);

  if (missing.length > 0) {
    return { valid: false, error: `Missing required fields: ${missing.join(', ')}` };
  }

  // Validate session_id format
  if (typeof payload.session_id !== 'string' || payload.session_id.trim().length === 0) {
    return { valid: false, error: 'Invalid session_id format' };
  }

  // Validate event_type format
  if (typeof payload.event_type !== 'string' || payload.event_type.trim().length === 0) {
    return { valid: false, error: 'Invalid event_type format' };
  }

  // Validate page_url format
  if (typeof payload.page_url !== 'string' || payload.page_url.trim().length === 0) {
    return { valid: false, error: 'Invalid page_url format' };
  }

  return { valid: true };
}

/**
 * Find matching campaign based on UTM parameters or tracking URL
 */
async function findMatchingCampaign(
  client: any,
  payload: EventPayload
): Promise<string | null> {
  // Try exact tracking URL match
  const urlMatch = await client.query(
    `SELECT id FROM revtrack_campaigns
     WHERE status = 'active'
       AND tracking_url = $1
     LIMIT 1`,
    [payload.page_url]
  );

  if (urlMatch.rows.length > 0) {
    return urlMatch.rows[0].id;
  }

  // Try UTM campaign match
  if (payload.utm_campaign) {
    const campaignMatch = await client.query(
      `SELECT id FROM revtrack_campaigns
       WHERE status = 'active'
         AND name ILIKE '%' || $1 || '%'
       LIMIT 1`,
      [payload.utm_campaign]
    );

    if (campaignMatch.rows.length > 0) {
      return campaignMatch.rows[0].id;
    }
  }

  // Try UTM source + content match
  if (payload.utm_source && payload.utm_content) {
    const sourceMatch = await client.query(
      `SELECT id FROM revtrack_campaigns
       WHERE status = 'active'
         AND name ILIKE '%' || $1 || '%'
         AND name ILIKE '%' || $2 || '%'
       LIMIT 1`,
      [payload.utm_source, payload.utm_content]
    );

    if (sourceMatch.rows.length > 0) {
      return sourceMatch.rows[0].id;
    }
  }

  return null;
}

/**
 * POST handler for webhook endpoint
 */
export async function POST(request: NextRequest): Promise<NextResponse<WebhookResponse>> {
  try {
    // 1. Verify authentication
    const apiKey = request.headers.get('x-api-key');
    const expectedApiKey = process.env.WEBHOOK_API_KEY;

    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Parse and validate payload
    const payload: EventPayload = await request.json();
    const validation = validatePayload(payload);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // 3. Check if event already exists
      const existingEvent = await client.query(
        `SELECT id FROM revtrack_first_events
         WHERE session_id = $1
           AND event_type = $2
         LIMIT 1`,
        [payload.session_id, payload.event_type]
      );

      // Event already tracked - return success but don't create duplicate
      if (existingEvent.rows.length > 0) {
        return NextResponse.json({
          success: true,
          message: 'Event already tracked',
          event_id: existingEvent.rows[0].id,
        });
      }

      // 4. Find matching campaign
      const campaignId = await findMatchingCampaign(client, payload);

      // 5. Insert first event
      const occurredAt = payload.timestamp ? new Date(payload.timestamp) : new Date();

      const insertResult = await client.query(
        `INSERT INTO revtrack_first_events (
          session_id,
          campaign_id,
          event_type,
          page_url,
          occurred_at,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_content,
          utm_term,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
        ON CONFLICT (session_id, event_type)
        DO NOTHING
        RETURNING id`,
        [
          payload.session_id,
          campaignId,
          payload.event_type,
          payload.page_url,
          occurredAt,
          payload.utm_source || null,
          payload.utm_medium || null,
          payload.utm_campaign || null,
          payload.utm_content || null,
          payload.utm_term || null,
        ]
      );

      // 6. Update campaign counters if campaign was found
      if (campaignId) {
        await client.query(
          `UPDATE revtrack_campaigns
           SET first_events_count = first_events_count + 1,
               updated_at = NOW()
           WHERE id = $1`,
          [campaignId]
        );
      }

      // 7. Return success response
      const eventId = insertResult.rows[0]?.id;

      return NextResponse.json({
        success: true,
        message: 'Event tracked successfully',
        event_id: eventId,
      });

    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Webhook error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    },
  });
}
