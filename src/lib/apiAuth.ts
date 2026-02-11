import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

/**
 * Verify API key from request headers
 * Used to protect webhook endpoints from unauthorized access
 */
export async function verifyApiKey(): Promise<{ valid: boolean; error?: NextResponse }> {
  const headerList = await headers();
  const apiKey = headerList.get('x-api-key');

  // Get expected API key from environment
  const expectedApiKey = process.env.WEBHOOKS_API_KEY;

  // If no API key is configured, allow access (development mode)
  if (!expectedApiKey) {
    console.warn('[API Auth] WEBHOOKS_API_KEY not configured, allowing access');
    return { valid: true };
  }

  // If API key is provided but doesn't match, deny access
  if (!apiKey || apiKey !== expectedApiKey) {
    return {
      valid: false,
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or missing API key' },
        { status: 401 }
      ),
    };
  }

  return { valid: true };
}

/**
 * Helper to send unauthorized response
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized', message: 'Invalid or missing API key' },
    { status: 401 }
  );
}
