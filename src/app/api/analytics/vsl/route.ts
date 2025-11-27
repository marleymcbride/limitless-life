import { NextRequest, NextResponse } from "next/server";
import { VSLAnalyticsEvent } from "@/types/vsl.types";

export async function POST(request: NextRequest) {
  try {
    const event: VSLAnalyticsEvent = await request.json();

    if (!event.type || !event.videoId || !event.sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Analytics event received - no console output in production

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log error silently for debugging
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
