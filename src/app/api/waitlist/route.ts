import { NextRequest, NextResponse } from "next/server";

interface WebhookPayload {
  email: string;
  firstName: string;
}

interface WebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
  email?: string;
  timestamp?: string;
}

// Rate limiting for waitlist submissions
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const isRateLimited = (ip: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const key = ip;
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  if (record.count >= limit) {
    return true;
  }
  record.count++;
  return false;
};

/**
 * Enhanced email validation with length and character checks
 */
const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim();

  // Length check
  if (trimmed.length < 3 || trimmed.length > 254) {
    return false;
  }

  // Format validation with RFC-compliant regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return false;
  }

  // Additional security checks
  const localPart = trimmed.split('@')[0];
  const domain = trimmed.split('@')[1];

  // Local part validation
  if (localPart.length < 1 || localPart.length > 64) {
    return false;
  }

  // Domain validation
  if (domain.length < 3 || domain.length > 253) {
    return false;
  }

  // Check for suspicious patterns
  if (/[<>\"'`;]/.test(trimmed)) {
    return false;
  }

  return true;
};

/**
 * Enhanced name validation with length and character checks
 */
const isValidName = (name: string): boolean => {
  const trimmed = name.trim();

  // Length check
  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Character validation - allow letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Zà-ÿÀ-Ÿ\s\-']+$/;
  if (!nameRegex.test(trimmed)) {
    return false;
  }

  // Check for suspicious patterns
  if (/[<>\"`;/]/.test(trimmed)) {
    return false;
  }

  return true;
};

/**
 * POST /api/waitlist
 * Submit waitlist signup with enhanced validation and rate limiting
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 submissions per 5 minutes per IP
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (isRateLimited(ip, 3, 300000)) {
      return NextResponse.json(
        { error: "Too many signup attempts. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, firstName } = body;

    // Validate inputs
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    if (!firstName || typeof firstName !== 'string') {
      return NextResponse.json(
        { error: "First name is required" },
        { status: 400 }
      );
    }

    // Enhanced validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!isValidName(firstName)) {
      return NextResponse.json(
        { error: "Please enter a valid name (2-50 characters, letters only)" },
        { status: 400 }
      );
    }

    // Get webhook URL from server-side environment variable
    const webhookUrl = process.env.N8N_WAITLIST_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("N8N_WAITLIST_WEBHOOK_URL environment variable is not configured");
      return NextResponse.json(
        { error: "Service configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // Prepare payload with sanitized data
    const payload: WebhookPayload = {
      email: email.trim().toLowerCase(),
      firstName: firstName.trim(),
    };

    // Submit to N8N webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Handle HTTP error responses
    if (!response.ok) {
      let errorMessage: string;

      switch (response.status) {
        case 400:
          errorMessage = "Invalid submission data. Please check your inputs.";
          break;
        case 503:
          errorMessage = "Service temporarily unavailable. Please try again in a moment.";
          break;
        case 429:
          errorMessage = "Too many requests. Please wait a moment and try again.";
          break;
        case 500:
        case 502:
        case 504:
          errorMessage = "Server error. Please try again in a moment.";
          break;
        default:
          errorMessage = "Unable to join waitlist. Please try again or contact support.";
      }

      console.error(`N8N webhook error: ${response.status} ${errorMessage}`);
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    // Parse response if available
    let result: WebhookResponse | null = null;
    try {
      const responseText = await response.text();
      if (responseText) {
        result = JSON.parse(responseText);
      }
    } catch (_parseError) {
      // If JSON parsing fails but HTTP status was OK, assume success
      console.warn("Could not parse webhook response as JSON, assuming success");
      return NextResponse.json({
        success: true,
        message: "You're on the waitlist!"
      });
    }

    // Handle application-level errors from N8N
    if (result && result.success === false) {
      const errorMessage = result.message || result.error || "Failed to join waitlist";
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    // Success
    return NextResponse.json({
      success: true,
      message: "You're on the waitlist!"
    });

  } catch (error) {
    console.error("Waitlist submission error:", error);

    // Handle network errors
    if (error instanceof Error) {
      if (
        error.message.includes("fetch") ||
        error.message.includes("network") ||
        error.message.includes("Failed to fetch")
      ) {
        return NextResponse.json(
          { error: "Network error. Please check your connection and try again." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Cleanup old rate limit records periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const entries = Array.from(rateLimitMap.entries());
    for (const [key, record] of entries) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 300000); // Cleanup every 5 minutes
}
