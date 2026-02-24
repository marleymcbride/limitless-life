import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

/**
 * Forward lead data to n8n for Airtable sync
 * Fire-and-forget — non-blocking, doesn't affect user response
 */
async function forwardToN8n(email: string, source: string, timestamp: string) {
  const webhookMap: Record<string, string> = {
    '3weeks-email-capture': 'https://n8n.marleymcbride.co/webhook/3weeks-email-capture',
    'work-with-me-3weeks': 'https://n8n.marleymcbride.co/webhook/antistack-workwithme-leads',
  };

  const webhookUrl = webhookMap[source];
  if (!webhookUrl) {
    console.log('[n8n Forward] No webhook configured for source:', source);
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, timestamp }),
    });
    console.log('[n8n Forward] Successfully forwarded to n8n for:', email);
  } catch (error) {
    // Silently fail — don't let n8n errors affect the main flow
    console.error('[n8n Forward] Failed to forward to n8n:', error);
  }
}

/**
 * CORS headers for cross-origin requests from 3weeks.co
 */
function getCorsHeaders(origin: string | null) {
  // Allow requests from 3weeks.co (with and without www), limitless-life.co (with and without www), and localhost
  const allowedOrigins = [
    'https://3weeks.co',
    'https://www.3weeks.co',
    'https://limitless-life.co',
    'https://www.limitless-life.co',
    'http://localhost:3000', // For local development
  ];

  const originHeader = allowedOrigins.includes(origin || '')
    ? origin
    : 'https://www.limitless-life.co';

  return {
    'Access-Control-Allow-Origin': originHeader,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}

/**
 * OPTIONS /api/webhooks/leads
 *
 * Handle CORS preflight requests
 */
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}

/**
 * POST /api/webhooks/leads
 *
 * Webhook endpoint for multi-site lead capture
 * Accepts lead data from 3weeks.co, marleymcbride.co, etc.
 * Performs upsert logic to handle first-touch attribution
 *
 * Payload format:
 * {
 *   "email": "user@example.com",
 *   "source": "3weeks-email-capture" | "work-with-me-3weeks" | ...,
 *   "timestamp": "2026-02-24T12:00:00.000Z",
 *   "firstName": "John",  // optional
 *   "lastName": "Doe"     // optional
 * }
 */
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');

  try {
    const body = await req.json();

    // Validate required fields
    const { email, source, timestamp, firstName, lastName } = body;

    if (!email || !source || !timestamp) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: email, source, timestamp' },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    // Map source to lead_action and source_site
    let leadAction: string | null = null;
    let sourceSite: string | null = null;
    let leadTemperature: 'cold' | 'warm' | 'hot' = 'cold';

    switch (source) {
      case '3weeks-email-capture':
        leadAction = 'email-signup';
        sourceSite = '3weeks.co';
        leadTemperature = 'warm';
        break;
      case 'work-with-me-3weeks':
        leadAction = 'work-with-me';
        sourceSite = '3weeks.co';
        leadTemperature = 'hot';
        break;
      default:
        // Handle unknown sources gracefully
        sourceSite = 'other';
        leadTemperature = 'cold';
    }

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const now = new Date();
    const timestampDate = new Date(timestamp);

    if (existingUser.length > 0) {
      // User exists - UPDATE (preserve first touch, upgrade temperature)
      const user = existingUser[0];

      // Only upgrade temperature, never downgrade
      const tempOrder = { 'cold': 1, 'warm': 2, 'hot': 3 };
      const currentTempLevel = tempOrder[user.leadTemperature || 'cold'] || 1;
      const newTempLevel = tempOrder[leadTemperature];
      const finalTemperature = newTempLevel > currentTempLevel ? leadTemperature : user.leadTemperature;

      await db
        .update(users)
        .set({
          // Update action tracking
          leadAction: leadAction,
          lastAction: leadAction,
          lastSeenSite: sourceSite,
          lastSeen: now,
          // Upgrade temperature if hotter
          leadTemperature: finalTemperature,
          // Update name if provided
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          // Preserve first touch date
        })
        .where(eq(users.email, email));

      // Fire-and-forget: Forward to n8n for Airtable sync
      forwardToN8n(email, source, timestamp);

      return NextResponse.json({
        success: true,
        message: 'Lead updated',
        action: 'updated',
        email,
      }, { headers: getCorsHeaders(origin) });
    } else {
      // New user - INSERT
      await db.insert(users).values({
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        sourceSite,
        leadAction,
        lastAction: leadAction,
        lastSeenSite: sourceSite,
        firstTouchDate: timestampDate,
        lastSeen: now,
        createdAt: timestampDate,
        leadTemperature,
        leadScore: leadTemperature === 'hot' ? 80 : leadTemperature === 'warm' ? 50 : 20,
        status: 'prospect',
      });

      // Fire-and-forget: Forward to n8n for Airtable sync
      forwardToN8n(email, source, timestamp);

      return NextResponse.json({
        success: true,
        message: 'Lead captured',
        action: 'created',
        email,
      }, { headers: getCorsHeaders(origin) });
    }
  } catch (error) {
    console.error('[Leads Webhook] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to capture lead' },
      { status: 500, headers: getCorsHeaders(origin) }
    );
  }
}
