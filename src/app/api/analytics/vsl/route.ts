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

    console.log("VSL Analytics Event:", event);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process VSL analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
