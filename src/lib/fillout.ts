import type { FilloutWebhookPayload, ParsedFilloutSubmission } from '@/types/fillout';
import { normalizeFilloutPayload } from '@/types/fillout';

/**
 * Verify the Authorization header contains the correct API key
 */
export function verifyFilloutApiKey(authHeader: string | null): boolean {
  const expectedKey = process.env.FILLOUT_WEBHOOK_API_KEY;

  if (!expectedKey) {
    console.error('[Fillout] FILLOUT_WEBHOOK_API_KEY not configured');
    return false;
  }

  if (!authHeader) {
    console.error('[Fillout] Missing Authorization header');
    return false;
  }

  // Extract the token from "Bearer <token>"
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    console.error('[Fillout] Invalid Authorization header format (expected "Bearer <token>")');
    return false;
  }

  const providedKey = match[1];
  if (providedKey !== expectedKey) {
    console.error('[Fillout] Invalid API key');
    return false;
  }

  return true;
}

/**
 * Validate Fillout webhook payload
 */
export function validateFilloutPayload(payload: unknown): payload is FilloutWebhookPayload {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const data = payload as Partial<FilloutWebhookPayload>;

  // Email is required and must be a non-empty string
  if (typeof data.email !== 'string' || data.email.trim() === '') {
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return false;
  }

  // Score must be a number if present
  if (data.score !== undefined && typeof data.score !== 'number') {
    return false;
  }

  return true;
}

/**
 * Extract and normalize submission data from Fillout webhook
 */
export function parseFilloutWebhook(payload: FilloutWebhookPayload): ParsedFilloutSubmission {
  const normalized = normalizeFilloutPayload(payload);

  return {
    ...normalized,
    email: normalized.email.trim(), // Always trim email
  };
}

/**
 * Check if payload has valid email data
 */
export function hasValidEmail(payload: unknown): boolean {
  return validateFilloutPayload(payload);
}
