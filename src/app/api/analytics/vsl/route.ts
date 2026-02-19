import { NextRequest, NextResponse } from "next/server";
import { VSLAnalyticsEvent } from "@/types/vsl.types";
import { db } from "@/lib/db";
import { events } from "@/db/schema";
import { uuid } from "drizzle-orm/pg-core";

// Rate limiting for analytics events (prevent spam)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const isRateLimited = (ip: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const key = ip;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  record.count++;
  return false;
};

/**
 * Sanitize string input to prevent injection attacks
 */
const sanitizeString = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>\"'`]/g, '') // Remove potentially dangerous characters
    .trim()
    .slice(0, 1000); // Limit length
};

/**
 * Validate event type to prevent injection
 * Allows alphanumeric, underscores, and hyphens
 */
const isValidEventType = (type: string): boolean => {
  // More permissive validation: allow alphanumeric + underscore + hyphen, max 50 chars
  const eventTypeRegex = /^[a-zA-Z0-9\-_]{1,50}$/;
  if (!eventTypeRegex.test(type)) {
    console.error('[VSL Analytics] Invalid event type format:', type);
    return false;
  }
  return true;
};

/**
 * Validate video ID format (UUID or similar)
 */
const isValidVideoId = (videoId: string): boolean => {
  // Allow alphanumeric, hyphens, underscores, 1-100 chars
  const videoIdRegex = /^[a-zA-Z0-9\-_]{1,100}$/;
  return videoIdRegex.test(videoId);
};

/**
 * Validate session ID format (UUID or similar)
 */
const isValidSessionId = (sessionId: string): boolean => {
  // Allow alphanumeric, hyphens, underscores, 1-100 chars
  const sessionIdRegex = /^[a-zA-Z0-9\-_]{1,100}$/;
  return sessionIdRegex.test(sessionId);
};

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 60 requests per minute per IP (analytics can be frequent)
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (isRateLimited(ip, 60, 60000)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await request.json();
    console.log('[VSL Analytics] Received event:', JSON.stringify(body, null, 2));

    const { type, videoId, sessionId, ...rest } = body;

    // Validate required fields
    if (!type || !videoId || !sessionId) {
      console.error('[VSL Analytics] Missing required fields:', { type, videoId, sessionId });
      return NextResponse.json(
        { error: "Missing required fields", received: { type, videoId, sessionId } },
        { status: 400 }
      );
    }

    // Validate types
    if (typeof type !== 'string' || typeof videoId !== 'string' || typeof sessionId !== 'string') {
      return NextResponse.json(
        { error: "Invalid field types" },
        { status: 400 }
      );
    }

    // Validate event type
    if (!isValidEventType(type)) {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
    }

    // Validate IDs
    if (!isValidVideoId(videoId)) {
      return NextResponse.json(
        { error: "Invalid video ID format" },
        { status: 400 }
      );
    }

    if (!isValidSessionId(sessionId)) {
      return NextResponse.json(
        { error: "Invalid session ID format" },
        { status: 400 }
      );
    }

    // Create sanitized event object
    const sanitizedEvent: VSLAnalyticsEvent = {
      type: sanitizeString(type) as VSLAnalyticsEvent['type'],
      videoId: sanitizeString(videoId),
      sessionId: sanitizeString(sessionId),
      ...rest, // Additional event data
    };

    // Store the VSL event in the database
    try {
      await db.insert(events).values({
        id: crypto.randomUUID(),
        sessionId: sanitizedEvent.sessionId,
        userId: sanitizedEvent.userId || null,
        eventType: `vsl_${sanitizedEvent.type}`,
        eventData: sanitizedEvent,
        createdAt: new Date(),
      });
    } catch (dbError) {
      // Log database error but don't fail the request
      console.error('Failed to store VSL event:', dbError);
    }

    const response = NextResponse.json({ success: true });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;

  } catch (error) {
    // Log error for debugging
    console.error('Analytics endpoint error:', error);

    const errorResponse = NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

// Cleanup old rate limit records periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const entries = Array.from(rateLimitMap.entries());
    for (const [key, record] of entries) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 300000); // Cleanup every 5 minutes
}
