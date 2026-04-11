// ============================================================================
// Fillout Submissions API Route
// ============================================================================
// This route provides an endpoint to list and filter Fillout form submissions
// stored in Airtable. Supports pagination, type filtering, date range filtering,
// campaign filtering, and email filtering.
//
// Endpoint: GET /api/submissions
//
// Query Parameters:
// - page: Page number (default: 1)
// - pageSize: Number of items per page (default: 50)
// - type: Filter by submission type ('course' | 'coaching' | 'whale')
// - startDate: Filter submissions created after this date (ISO format)
// - endDate: Filter submissions created before this date (ISO format)
// - campaign: Filter by UTM campaign (partial match)
// - email: Filter by email (exact match, case-insensitive)
//
// Response Format:
// {
//   submissions: Submission[],
//   pagination: {
//     total: number,
//     page: number,
//     pageSize: number
//   }
// }
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, mapAirtableRecordToSubmission } from '@/lib/airtable-fillout';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import type { SubmissionListResponse, AirtableRecord } from '@/types/submission';

// Constants
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 100;
const MAX_AIRTABLE_PAGES = 10; // Safety limit: max 1000 records (10 * 100)

// Score thresholds for type filtering
const TYPE_SCORE_THRESHOLDS = {
  course: 50,
  coaching: {
    min: 50,
    max: 80,
  },
  whale: 80,
} as const;

// Maximum string lengths for input validation
const MAX_EMAIL_LENGTH = 255;
const MAX_CAMPAIGN_LENGTH = 255;
const MAX_STRING_LENGTH = 1000;

/**
 * Escapes user input for safe use in Airtable formulas
 * Prevents formula injection by doubling single quotes
 */
function escapeForFormula(value: string): string {
  return value.replace(/'/g, "''");
}

/**
 * Validates and returns a positive integer, or default value if invalid
 */
function validatePositiveInteger(value: string | null, defaultValue: number, max?: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed < 1) return defaultValue;
  if (max && parsed > max) return max;
  return parsed;
}

/**
 * Validates an ISO date string
 */
function isValidISOString(value: string): boolean {
  if (!value) return false;
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime()) && date.toISOString() === value;
}

/**
 * Validates an email address format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates string length
 */
function isValidStringLength(value: string, maxLength: number): boolean {
  return value.length > 0 && value.length <= maxLength;
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse and validate query parameters
    const page = validatePositiveInteger(searchParams.get('page'), DEFAULT_PAGE);
    const pageSize = validatePositiveInteger(searchParams.get('pageSize'), DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const campaign = searchParams.get('campaign');
    const email = searchParams.get('email');

    // Validate date parameters
    if (startDate && !isValidISOString(startDate)) {
      return NextResponse.json(
        { error: 'Invalid startDate format. Must be a valid ISO 8601 date string.' },
        { status: 400 }
      );
    }

    if (endDate && !isValidISOString(endDate)) {
      return NextResponse.json(
        { error: 'Invalid endDate format. Must be a valid ISO 8601 date string.' },
        { status: 400 }
      );
    }

    // Validate email format and length
    if (email) {
      if (!isValidEmail(email)) {
        return NextResponse.json(
          { error: 'Invalid email format.' },
          { status: 400 }
        );
      }
      if (!isValidStringLength(email, MAX_EMAIL_LENGTH)) {
        return NextResponse.json(
          { error: `Email must be between 1 and ${MAX_EMAIL_LENGTH} characters.` },
          { status: 400 }
        );
      }
    }

    // Validate campaign length
    if (campaign && !isValidStringLength(campaign, MAX_CAMPAIGN_LENGTH)) {
      return NextResponse.json(
        { error: `Campaign must be between 1 and ${MAX_CAMPAIGN_LENGTH} characters.` },
        { status: 400 }
      );
    }

    // Build filter formula with sanitized input
    const filters: string[] = [];

    if (type) {
      const typeMap: Record<string, string> = {
        course: `Score < ${TYPE_SCORE_THRESHOLDS.course}`,
        coaching: `AND(Score >= ${TYPE_SCORE_THRESHOLDS.coaching.min}, Score < ${TYPE_SCORE_THRESHOLDS.coaching.max})`,
        whale: `Score >= ${TYPE_SCORE_THRESHOLDS.whale}`,
      };
      if (typeMap[type]) filters.push(typeMap[type]);
    }

    if (startDate) {
      filters.push(`IS_AFTER(CREATED_TIME(), '${escapeForFormula(startDate)}')`);
    }

    if (endDate) {
      filters.push(`IS_BEFORE(CREATED_TIME(), '${escapeForFormula(endDate)}')`);
    }

    if (campaign) {
      filters.push(`FIND(LOWER('${escapeForFormula(campaign)}'), LOWER({utm_campaign})) > 0`);
    }

    if (email) {
      filters.push(`LOWER({Email}) = LOWER('${escapeForFormula(email)}')`);
    }

    const filterByFormula = filters.length > 0 ? `AND(${filters.join(', ')})` : undefined;

    // Fetch all submissions (handle pagination)
    // NOTE: This fetches all matching records from Airtable and then applies
    // client-side pagination. For large datasets, consider optimizing this by
    // using Airtable's native pagination or implementing cursor-based pagination.
    let allRecords: AirtableRecord[] = [];
    let offset: string | undefined;
    let currentPage = 0;

    do {
      const result = await getSubmissions({
        pageSize: 100,
        offset,
        filterByFormula,
      });

      allRecords = allRecords.concat(result.records);
      offset = result.offset;
      currentPage++;
    } while (offset && currentPage < MAX_AIRTABLE_PAGES);

    // Map to submission format
    const submissions = allRecords.map(mapAirtableRecordToSubmission);

    // Apply client-side pagination
    const total = submissions.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedSubmissions = submissions.slice(startIndex, endIndex);

    const response: SubmissionListResponse = {
      submissions: paginatedSubmissions,
      pagination: {
        total,
        page,
        pageSize,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
