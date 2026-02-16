// ============================================================================
// Fillout Submissions Airtable Integration
// ============================================================================
// This module provides functions to interact with the Fillout submissions table
// in Airtable, including listing, filtering, and retrieving submissions.
//
// Environment Variables Required:
// - AIRTABLE_FILLOUT_BASE_ID: The Airtable base ID for Fillout data
// - AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN: PAT for accessing Fillout Airtable
// - AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID: Table ID for Fillout submissions
// ============================================================================

import type { AirtableRecord, Submission } from '@/types/submission';

// ============================================================================
// Constants and Configuration
// ============================================================================

function getAirtableConfig() {
  const AIRTABLE_FILLOUT_BASE_ID = process.env.AIRTABLE_FILLOUT_BASE_ID;
  const AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN = process.env.AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN;
  const AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID = process.env.AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID;

  if (!AIRTABLE_FILLOUT_BASE_ID || !AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN || !AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID) {
    throw new Error(
      'Missing required Fillout Airtable environment variables: ' +
      'AIRTABLE_FILLOUT_BASE_ID, AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN, AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID'
    );
  }

  return {
    AIRTABLE_FILLOUT_BASE_ID,
    AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN,
    AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID,
    AIRTABLE_FILLOUT_API_URL: `https://api.airtable.com/v0/${AIRTABLE_FILLOUT_BASE_ID}/${AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID}` as const,
  };
}

// ============================================================================
// Type Definitions
// ============================================================================

interface AirtableListResponse {
  records: AirtableRecord[];
  offset?: string;
}

interface GetSubmissionsParams {
  pageSize?: number;
  offset?: string;
  filterByFormula?: string;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch submissions from Airtable with optional pagination and filtering
 *
 * @param params - Optional parameters for pagination and filtering
 * @returns Promise resolving to records and optional pagination offset
 *
 * @example
 * // Get first page of submissions
 * const { records, offset } = await getSubmissions({ pageSize: 10 });
 *
 * @example
 * // Get next page using offset
 * const { records, offset: nextOffset } = await getSubmissions({ offset });
 *
 * @example
 * // Filter by score
 * const { records } = await getSubmissions({
 *   filterByFormula: '{Score} >= 50'
 * });
 */
export async function getSubmissions(params: GetSubmissionsParams = {}): Promise<{
  records: AirtableRecord[];
  offset?: string;
}> {
  const config = getAirtableConfig();
  const searchParams = new URLSearchParams();

  if (params.pageSize) {
    searchParams.append('pageSize', params.pageSize.toString());
  }

  if (params.offset) {
    searchParams.append('offset', params.offset);
  }

  if (params.filterByFormula) {
    searchParams.append('filterByFormula', params.filterByFormula);
  }

  const response = await fetch(`${config.AIRTABLE_FILLOUT_API_URL}?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${config.AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // Enable Next.js caching with 60-second revalidation
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
  }

  const data: AirtableListResponse = await response.json();
  return { records: data.records, offset: data.offset };
}

/**
 * Fetch a single submission by ID from Airtable
 *
 * @param id - The Airtable record ID
 * @returns Promise resolving to the submission record or null if not found
 *
 * @example
 * const submission = await getSubmissionById('rec123xyz');
 * if (submission) {
 *   console.log('Found:', submission.fields.Name);
 * }
 */
export async function getSubmissionById(id: string): Promise<AirtableRecord | null> {
  const config = getAirtableConfig();
  const response = await fetch(`${config.AIRTABLE_FILLOUT_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${config.AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // Enable Next.js caching with 60-second revalidation
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Map an Airtable record to the Submission type
 *
 * This function transforms the raw Airtable record into a standardized
 * Submission object with calculated fields like type (based on score)
 * and mapped tier values.
 *
 * @param record - The raw Airtable record
 * @returns A normalized Submission object
 *
 * @example
 * const submission = mapAirtableRecordToSubmission(airtableRecord);
 * console.log(submission.type); // 'course' | 'coaching' | 'whale'
 */
export function mapAirtableRecordToSubmission(record: AirtableRecord): Submission {
  const fields = record.fields;

  // Determine type based on score
  let type: Submission['type'] = 'course';
  if (fields.Score >= 80) {
    type = 'whale';
  } else if (fields.Score >= 50) {
    type = 'coaching';
  }

  // Map submission type string to tier enum
  const tierMap: Record<string, Submission['tier']> = {
    'Course': 'course',
    'Coaching': 'll',
    'Whale/LHC': 'lhc',
  };
  const tier = tierMap[fields['Submission Type']] || 'course';

  return {
    id: record.id,
    name: fields.Name || '',
    email: fields.Email || '',
    score: fields.Score || 0,
    type,
    tier,
    submittedAt: record.createdTime,
    utmCampaign: fields.utm_campaign || fields.UTM_Campaign || undefined,
    utmSource: fields.utm_source || fields.UTM_Source || undefined,
    utmMedium: fields.utm_medium || fields.UTM_Medium || undefined,
    status: fields.Status || 'submitted',
    fullData: fields,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Build an Airtable filter formula to filter submissions by score range
 *
 * @param minScore - Minimum score (inclusive)
 * @param maxScore - Maximum score (inclusive), optional
 * @returns An Airtable formula string
 *
 * @example
 * const formula = buildScoreFilterFormula(50, 79);
 * // Returns: "AND({Score} >= 50, {Score} <= 79)"
 */
export function buildScoreFilterFormula(minScore: number, maxScore?: number): string {
  if (maxScore !== undefined) {
    return `AND({Score} >= ${minScore}, {Score} <= ${maxScore})`;
  }
  return `{Score} >= ${minScore}`;
}

/**
 * Build an Airtable filter formula to filter by tier
 *
 * @param tier - The tier to filter by
 * @returns An Airtable formula string
 *
 * @example
 * const formula = buildTierFilterFormula('lhc');
 * // Returns: "{Submission Type} = 'Whale/LHC'"
 */
export function buildTierFilterFormula(tier: Submission['tier']): string {
  const tierToSubmissionType: Record<Submission['tier'], string> = {
    course: 'Course',
    ll: 'Coaching',
    lhc: 'Whale/LHC',
  };
  return `{Submission Type} = "${tierToSubmissionType[tier]}"`;
}

/**
 * Build an Airtable filter formula to filter by status
 *
 * @param status - The status to filter by
 * @returns An Airtable formula string
 *
 * @example
 * const formula = buildStatusFilterFormula('submitted');
 * // Returns: "{Status} = 'submitted'"
 */
export function buildStatusFilterFormula(status: string): string {
  return `{Status} = "${status}"`;
}
