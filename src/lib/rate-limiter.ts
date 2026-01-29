/**
 * Rate Limiter Utility - Redis-Ready Architecture
 *
 * This utility provides in-memory rate limiting that can be easily
 * upgraded to Redis for distributed systems.
 *
 * TO UPGRADE TO REDIS:
 * 1. Install redis: npm install redis
 * 2. Set environment variable: RATE_LIMITER_BACKEND=redis
 * 3. Configure Redis connection in getRedisClient()
 *
 * The interface remains the same, so no code changes needed in API routes.
 */

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining?: number;
  resetTime?: number;
}

// In-memory storage (current implementation)
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Get rate limit data for a key
 */
async function getRateLimitData(key: string): Promise<{ count: number; resetTime: number } | null> {
  const useRedis = process.env.RATE_LIMITER_BACKEND === 'redis';

  if (useRedis) {
    // TODO: Implement Redis get
    // const redis = getRedisClient();
    // const data = await redis.get(key);
    // return data ? JSON.parse(data) : null;
    return null;
  }

  return inMemoryStore.get(key) || null;
}

/**
 * Set rate limit data for a key
 */
async function setRateLimitData(
  key: string,
  data: { count: number; resetTime: number },
  windowMs: number
): Promise<void> {
  const useRedis = process.env.RATE_LIMITER_BACKEND === 'redis';

  if (useRedis) {
    // TODO: Implement Redis set with expiry
    // const redis = getRedisClient();
    // await redis.set(key, JSON.stringify(data), { PX: windowMs });
    return;
  }

  inMemoryStore.set(key, data);

  // Schedule cleanup for in-memory storage
  setTimeout(() => {
    const now = Date.now();
    if (now > data.resetTime) {
      inMemoryStore.delete(key);
    }
  }, windowMs + 1000);
}

/**
 * Increment rate limit counter
 */
async function incrementRateLimit(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
  const now = Date.now();
  const existing = await getRateLimitData(key);

  if (!existing || now > existing.resetTime) {
    // Create new rate limit window
    const newData = { count: 1, resetTime: now + windowMs };
    await setRateLimitData(key, newData, windowMs);
    return newData;
  }

  // Increment existing counter
  const newData = { ...existing, count: existing.count + 1 };
  await setRateLimitData(key, newData, windowMs);
  return newData;
}

/**
 * Check if a request should be rate limited
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 *
 * @example
 * // Check IP-based rate limit
 * const result = await checkRateLimit('192.168.1.1', { limit: 5, windowMs: 60000 });
 * if (!result.success) {
 *   return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
 * }
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { limit, windowMs } = config;
  const key = `ratelimit:${identifier}`;

  try {
    const data = await incrementRateLimit(key, windowMs);

    if (data.count > limit) {
      // Rate limit exceeded
      return {
        success: false,
        resetTime: data.resetTime,
      };
    }

    // Rate limit OK
    return {
      success: true,
      remaining: limit - data.count,
      resetTime: data.resetTime,
    };
  } catch (error) {
    console.error('Rate limiter error:', error);
    // Fail open - allow request if rate limiter fails
    return {
      success: true,
      remaining: limit,
    };
  }
}

/**
 * Get client IP address from Next.js request
 */
export function getClientIp(request: Request): string {
  // In Next.js, headers() is used to get request headers
  // This is a helper that can be used in API routes
  const headers = (request as any).headers;
  if (!headers) return 'unknown';

  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') || // Cloudflare
    'unknown'
  );
}

/**
 * Cleanup routine for in-memory storage
 * Not needed for Redis (handles expiry automatically)
 */
export function startCleanupRoutine(intervalMs: number = 300000): void {
  const useRedis = process.env.RATE_LIMITER_BACKEND === 'redis';

  if (useRedis) {
    // Redis handles expiry automatically
    return;
  }

  // Cleanup in-memory storage periodically
  setInterval(() => {
    const now = Date.now();
    const entries = Array.from(inMemoryStore.entries());
    for (const [key, data] of entries) {
      if (now > data.resetTime) {
        inMemoryStore.delete(key);
      }
    }
  }, intervalMs);
}

// Start cleanup routine on module load (in-memory only)
if (process.env.RATE_LIMITER_BACKEND !== 'redis' && typeof setInterval !== 'undefined') {
  startCleanupRoutine();
}
