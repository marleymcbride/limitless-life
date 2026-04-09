import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/admin-auth';

// Simple in-memory rate limiting for login attempts
// In production, use Redis or a database-backed solution
const loginAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getClientIdentifier(req: NextRequest): string {
  // Get IP address from various headers (handle proxies/load balancers)
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip'); // Cloudflare

  const ip = forwardedFor?.split(',')[0]?.trim() ||
             realIp?.trim() ||
             cfConnectingIp?.trim() ||
             'unknown';

  return ip;
}

function checkRateLimit(identifier: string): { allowed: boolean; remaining?: number } {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier);

  if (!attempts || now > attempts.resetTime) {
    // First attempt or window expired
    loginAttempts.set(identifier, {
      count: 1,
      resetTime: now + ATTEMPT_WINDOW,
    });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (attempts.count >= MAX_ATTEMPTS) {
    // Check if lockout period has passed
    const lockoutEnd = attempts.resetTime + LOCKOUT_TIME;
    if (now < lockoutEnd) {
      const remainingMinutes = Math.ceil((lockoutEnd - now) / 60000);
      return { allowed: false, remaining: remainingMinutes };
    }
    // Lockout expired, reset
    loginAttempts.set(identifier, {
      count: 1,
      resetTime: now + ATTEMPT_WINDOW,
    });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  // Increment attempts
  attempts.count++;
  loginAttempts.set(identifier, attempts);
  return { allowed: true, remaining: MAX_ATTEMPTS - attempts.count };
}

function recordFailedAttempt(identifier: string): void {
  const attempts = loginAttempts.get(identifier);
  if (attempts) {
    attempts.count++;
    loginAttempts.set(identifier, attempts);
  }
}

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);

  // Check rate limiting
  const rateLimit = checkRateLimit(clientId);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many failed attempts. Please try again later.',
        retryAfter: rateLimit.remaining
      },
      { status: 429 }
    );
  }

  try {
    const { password } = await req.json();

    const success = await authenticateAdmin(password);

    if (success) {
      // Clear failed attempts on successful login
      loginAttempts.delete(clientId);
      return NextResponse.json({ success: true });
    }

    // Record failed attempt
    recordFailedAttempt(clientId);

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid password',
        remainingAttempts: rateLimit.remaining
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('[login] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
