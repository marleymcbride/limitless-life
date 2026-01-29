import { NextRequest, NextResponse } from "next/server";
import { VSLAnalyticsEvent } from "@/types/vsl.types";

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
 */
const isValidEventType = (type: string): boolean => {
  const validTypes = [
    'video_start',
    'video_pause',
    'video_resume',
    'video_complete',
    'video_progress',
    'video_error',
    'engagement',
    'click',
  ];
  return validTypes.includes(type);
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
    const { type, videoId, sessionId, ...rest } = body;

    // Validate required fields
    if (!type || !videoId || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // TODO: Store analytics event in your database/analytics service
    // For now, we silently acknowledge receipt

    return NextResponse.json({ success: true });

  } catch (error) {
    // Log error for debugging
    console.error('Analytics endpoint error:', error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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
