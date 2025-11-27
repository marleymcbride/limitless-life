"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Email pattern validation
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function LimitlessEmailSignup() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const validateEmail = (emailValue: string) => {
    if (!emailValue) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when user starts typing
    if (emailError && value) {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      return;
    }
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Submit to N8N webhook with dual-endpoint fallback
      const { submitToN8nWebhook } = await import("../lib/n8n-webhook-client");

      await submitToN8nWebhook(
        email,
        "", // firstName - empty for this form
        "limitless-waitlist" // source tracking
      );

      // Success - show success message
      setSubmitResult({
        success: true,
        message:
          "🎉 You're on the waitlist! Check your email for exclusive updates.",
      });

      // Reset form
      setEmail("");
    } catch (error) {
      // Handle N8N webhook errors with professional messages
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again later.";

      setSubmitResult({
        success: false,
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* What You'll Get Box */}
      <div className="p-6 mx-auto mt-0 mb-8 max-w-2xl text-left rounded-lg bg-zinc-800/70">
        <h3 className="mb-4 text-lg font-bold text-center text-white">
          What you'll get when Limitless launches:
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="flex-shrink-0 mt-1 mr-3 text-left text-red-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="16" height="16" fill="currentColor" />
              </svg>
            </span>
            <span>
              <strong>The Anti-Stack™</strong> - Natural energy without
              caffeine, supplements, or crashes
            </span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 mt-1 mr-3 text-left text-red-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="16" height="16" fill="currentColor" />
              </svg>
            </span>
            <span>
              <strong>The Power Presence Method™</strong> - Build elite physique
              in 2-3 sessions per week
            </span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 mt-1 mr-3 text-left text-red-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="16" height="16" fill="currentColor" />
              </svg>
            </span>
            <span>
              <strong>The Limitless Flow System™</strong> - Break free from
              alcohol, caffeine, and modern vices
            </span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 mt-1 mr-3 text-left text-red-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="16" height="16" fill="currentColor" />
              </svg>
            </span>
            <span>
              <strong>Early Bird Pricing</strong> - Exclusive discounts for
              waitlist members only
            </span>
          </li>
        </ul>
      </div>

      {submitResult && (
        <div
          className={`mb-6 p-4 rounded-lg text-center ${
            submitResult.success
              ? "bg-green-700/20 text-green-100 border border-green-700/30"
              : "bg-red-700/20 text-red-100 border border-red-700/30"
          }`}
        >
          {submitResult.message}
        </div>
      )}

      {!submitResult?.success && (
        <>
          {/* CTA Text */}
          <p className="mt-6 mb-8 text-center text-zinc-300">
            Join the waitlist to be first in line when we launch:
          </p>

          {/* Email Form */}
          <div className="mx-auto mb-8 max-w-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your Email Address..."
                  className={`w-full p-5 h-13 text-base bg-zinc-800 border border-zinc-700 rounded text-white ${
                    emailError ? "border-red-500" : ""
                  }`}
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-400">{emailError}</p>
                )}
              </div>
              <Button
                type="submit"
                className="p-5 w-full h-16 text-lg font-bold text-white bg-red-700 rounded hover:bg-red-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining Waitlist..." : "Join The Waitlist →"}
              </Button>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="flex gap-6 justify-center items-center text-sm text-zinc-400">
            <span className="flex gap-1 items-center">
              <span className="text-red-500">✓</span> First to know
            </span>
            <span className="flex gap-1 items-center">
              <span className="text-red-500">✓</span> Exclusive pricing
            </span>
            <span className="flex gap-1 items-center">
              <span className="text-red-500">✓</span> No spam
            </span>
          </div>
        </>
      )}
    </>
  );
}
