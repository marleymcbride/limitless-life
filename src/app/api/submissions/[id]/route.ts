import { NextRequest, NextResponse } from 'next/server';
import { getSubmissionById, mapAirtableRecordToSubmission } from '@/lib/airtable-fillout';
import type { Submission } from '@/types/submission';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const record = await getSubmissionById(params.id);

    if (!record) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    const submission = mapAirtableRecordToSubmission(record);
    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}
