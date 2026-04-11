import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

/**
 * Verify API key from request headers
 * Used to protect webhook endpoints from unauthorized access
 *
 * SECURITY: Fails closed if WEBHOOKS_API_KEY is not configured
 */
export async function verifyApiKey(): Promise<{ valid: boolean; error?: NextResponse }> {
  const headerList = await headers();
  const apiKey = headerList.get('x-api-key');

  // Get expected API key from environment
  const expectedApiKey = process.env.WEBHOOKS_API_KEY;

  // Fail closed - if no API key is configured, deny access
  if (!expectedApiKey) {
    console.error('[API Auth] WEBHOOKS_API_KEY not configured, denying access');
    return {
      valid: false,
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Server configuration error' },
        { status: 401 }
      ),
    };
  }

  // Use constant-time comparison to prevent timing attacks
  if (!apiKey) {
    return {
      valid: false,
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Missing API key' },
        { status: 401 }
      ),
    };
  }

  // Constant-time comparison
  const keyBuffer = Buffer.from(apiKey);
  const expectedKeyBuffer = Buffer.from(expectedApiKey);
  if (keyBuffer.length !== expectedKeyBuffer.length) {
    return {
      valid: false,
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid API key' },
        { status: 401 }
      ),
    };
  }

  let result = 0;
  for (let i = 0; i < keyBuffer.length; i++) {
    result |= keyBuffer[i] ^ expectedKeyBuffer[i];
  }

  if (result !== 0) {
    return {
      valid: false,
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid API key' },
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
