// N8N Webhook Client - Limitless Protocol Premium Waitlist Integration
// Connects directly to the live N8N webhook for Systeme.io contact management

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

/**
 * Submit to N8N webhook for Limitless Protocol waitlist
 * Automatically creates contact in Systeme.io with proper tagging
 */
export async function submitToN8nWebhook(
  email: string,
  firstName: string,
  _source: string = "limitless-protocol-premium-waitlist" // Keep for compatibility, not sent to webhook
): Promise<void> {
  // Live N8N webhook endpoint from environment
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WAITLIST_WEBHOOK ||
    "https://n8n.marleymcbride.co/webhook/programme-waitlist-leads";

  // Validate inputs
  if (!email?.trim()) {
    throw new Error("Email address is required");
  }

  if (!firstName?.trim()) {
    throw new Error("First name is required");
  }

  // Email format validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email.trim())) {
    throw new Error("Please enter a valid email address");
  }

  // Prepare payload (only send fields N8N expects)
  const payload: WebhookPayload = {
    email: email.trim(),
    firstName: firstName.trim(),
    // Note: source parameter is kept for compatibility but not sent to webhook
  };

  try {
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
          errorMessage = "Please check your email and name are correct";
          break;
        case 503:
          errorMessage =
            "Service temporarily unavailable. Please try again in a moment.";
          break;
        case 429:
          errorMessage =
            "Too many requests. Please wait a moment and try again.";
          break;
        case 500:
        case 502:
        case 504:
          errorMessage = "Server error. Please try again in a moment.";
          break;
        default:
          errorMessage =
            "Unable to join waitlist. Please try again or contact support.";
      }

      throw new Error(errorMessage);
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
      console.warn(
        "Could not parse webhook response as JSON, assuming success"
      );
      return;
    }

    // Handle application-level errors from N8N
    if (result && result.success === false) {
      const errorMessage =
        result.message || result.error || "Failed to join waitlist";
      throw new Error(errorMessage);
    }

    // Success - function completes without throwing
  } catch (error) {
    // Handle network errors
    if (error instanceof Error) {
      if (
        error.message.includes("fetch") ||
        error.message.includes("network") ||
        error.message.includes("Failed to fetch")
      ) {
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      }
      // Re-throw form validation and API errors as-is
      throw error;
    }

    // Handle unexpected error types
    throw new Error("An unexpected error occurred. Please try again.");
  }
}

/**
 * Email validation utility
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email.trim());
}

/**
 * Form data validation utility
 */
export function validateFormData(
  email: string,
  firstName: string
): string | null {
  if (!email?.trim()) {
    return "Email address is required";
  }

  if (!validateEmail(email)) {
    return "Please enter a valid email address";
  }

  if (!firstName?.trim()) {
    return "First name is required";
  }

  if (firstName.trim().length < 2) {
    return "Please enter your full first name";
  }

  return null;
}

// Export types for TypeScript support
export type { WebhookPayload, WebhookResponse };
