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
import type { SubmissionListResponse } from '@/types/submission';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '50');
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const campaign = searchParams.get('campaign');
    const email = searchParams.get('email');

    // Build filter formula
    const filters: string[] = [];

    if (type) {
      const typeMap: Record<string, string> = {
        course: 'Score < 50',
        coaching: 'AND(Score >= 50, Score < 80)',
        whale: 'Score >= 80',
      };
      if (typeMap[type]) filters.push(typeMap[type]);
    }

    if (startDate) {
      filters.push(`IS_AFTER(CREATED_TIME(), '${startDate}')`);
    }

    if (endDate) {
      filters.push(`IS_BEFORE(CREATED_TIME(), '${endDate}')`);
    }

    if (campaign) {
      filters.push(`FIND(LOWER('${campaign}'), LOWER({utm_campaign})) > 0`);
    }

    if (email) {
      filters.push(`LOWER({Email}) = LOWER('${email}')`);
    }

    const filterByFormula = filters.length > 0 ? `AND(${filters.join(', ')})` : undefined;

    // Fetch all submissions (handle pagination)
    let allRecords: any[] = [];
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
    } while (offset && currentPage < 10); // Safety limit: max 1000 records

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
