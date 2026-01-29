// Waitlist Client - Limitless Protocol Premium Waitlist Integration
// Secure server-side API integration for waitlist signups

interface WaitlistResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit to waitlist via secure server-side API
 * @param email - User's email address
 * @param firstName - User's first name
 * @param source - Optional source tracking (kept for compatibility)
 * @throws Error with message if submission fails
 */
export async function submitToN8nWebhook(
  email: string,
  firstName: string,
  _source: string = "limitless-protocol-premium-waitlist" // Keep for compatibility, not used
): Promise<void> {
  // Client-side validation for immediate feedback
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

  // Call server-side API endpoint
  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        firstName: firstName.trim(),
      }),
    });

    const result: WaitlistResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to join waitlist");
    }

    if (!result.success) {
      throw new Error(result.error || "Failed to join waitlist");
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
      // Re-throw API errors as-is
      throw error;
    }

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
export type { WaitlistResponse };
