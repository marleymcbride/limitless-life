import { NextRequest, NextResponse } from 'next/server';

/**
 * TEST WEBHOOK ENDPOINT
 * This endpoint logs everything Fillout sends us for debugging.
 * DELETE THIS AFTER TESTING IS COMPLETE.
 */
export async function POST(request: Request) {
  try {
    // Log headers
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    console.log('=== FILLOUT TEST WEBHOOK ===');
    console.log('Headers:', JSON.stringify(headers, null, 2));

    // Log body
    const body = await request.json();
    console.log('Body:', JSON.stringify(body, null, 2));
    console.log('=== END FILLOUT TEST WEBHOOK ===');

    // Return the actual data for easier testing
    return NextResponse.json({
      success: true,
      message: 'Webhook received and logged',
      receivedHeaders: Object.keys(headers),
      receivedBodyKeys: Object.keys(body),
      // Include actual body data so we can see it in Fillout
      body: body,
    });
  } catch (error) {
    console.error('Test webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}
