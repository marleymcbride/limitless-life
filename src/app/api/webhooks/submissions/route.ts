// src/app/api/webhooks/submissions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { trackSubmissionEvent } from '@/lib/events/submission';
import type { Submission } from '@/types/submission';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate webhook payload
    if (!body.id || !body.email) {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    // Map webhook payload to submission type
    const submission: Submission = {
      id: body.id,
      name: body.name || '',
      email: body.email,
      score: body.score || 0,
      type: body.type || 'course',
      tier: body.tier || 'course',
      submittedAt: body.submittedAt || new Date().toISOString(),
      utmCampaign: body.utm_campaign,
      utmSource: body.utm_source,
      utmMedium: body.utm_medium,
      status: body.status || 'submitted',
      fullData: body.fullData || body,
    };

    // Track the submission event
    await trackSubmissionEvent(submission);

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Error processing submission webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
