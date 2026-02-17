import { NextRequest, NextResponse } from 'next/server';
import { queueWebhook } from '@/lib/webhookQueue';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.marleymcbride.co';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, choice, interestType, tier, timestamp } = body;

    // Queue webhook to n8n for popup choice event
    // This will sync to Airtable Leads table with interest classification
    await queueWebhook({
      endpoint: `${N8N_WEBHOOK_URL}/webhook/popup-choice`,
      payload: {
        event: 'popup_choice',
        data: {
          email,
          name,
          choice,
          interestType, // 'tire_kicker' | 'course' | 'coaching'
          tier,
          timestamp,
        },
        source: 'limitless-popup',
      },
      maxAttempts: 3,
    });

    console.log(`[Popup Choice] Queued webhook for ${email} - choice: ${choice}, interest: ${interestType}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to queue popup choice webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process popup choice' },
      { status: 500 }
    );
  }
}
