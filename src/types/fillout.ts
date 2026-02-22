/**
 * Fillout Webhook Types
 * Based on actual Fillout webhook payload structure
 */

export interface FilloutWebhookPayload {
  email: string;
  fullName: string;
  lookingfor: string[] | null;
  howToGetHere: string | null;
  currentSituation: string | null;
  " problemsToSolve": string | null; // Note: Fillout has a space in the key name
  whatWellInstall: string | null;
  desiredResult: string | null;
  score: number;
}

export interface ParsedFilloutSubmission {
  email: string;
  firstName?: string;
  lastName?: string;
  lookingFor?: string[];
  howToGetHere?: string;
  currentSituation?: string;
  problemsToSolve?: string;
  whatWellInstall?: string;
  desiredResult?: string;
  score?: number;
}

/**
 * Parse fullName into firstName and lastName
 */
export function parseFullName(fullName: string): { firstName?: string; lastName?: string } {
  if (!fullName || fullName.trim() === '') {
    return {};
  }

  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0] };
  }

  return {
    firstName: parts.slice(0, -1).join(' '),
    lastName: parts[parts.length - 1],
  };
}

/**
 * Normalize Fillout payload (fix the space in problemsToSolve)
 */
export function normalizeFilloutPayload(payload: FilloutWebhookPayload): ParsedFilloutSubmission {
  return {
    email: payload.email,
    ...parseFullName(payload.fullName),
    lookingfor: payload.lookingfor || undefined,
    howToGetHere: payload.howToGetHere || undefined,
    currentSituation: payload.currentSituation || undefined,
    problemsToSolve: payload[" problemsToSolve"] || undefined,
    whatWellInstall: payload.whatWellInstall || undefined,
    desiredResult: payload.desiredResult || undefined,
    score: payload.score || undefined,
  };
}
