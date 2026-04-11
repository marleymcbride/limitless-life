import { NextRequest, NextResponse } from 'next/server';
import { getSubmissionById, mapAirtableRecordToSubmission } from '@/lib/airtable-fillout';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import type { Submission } from '@/types/submission';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
