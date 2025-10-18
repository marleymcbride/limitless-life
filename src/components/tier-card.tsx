"use client";

import { useState } from "react";
import { CTAButton } from "./ui/cta-button";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface TierCardProps {
  tier: "access" | "plus" | "premium" | "elite";
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
  elite?: boolean;
}

export default function TierCard({
  tier,
  title,
  price,
  description,
  features,
  ctaText,
  popular = false,
  elite = false,
}: TierCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier: tier,
          customerEmail: "", // Could add email field in the future
        }),
      });

      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error("Failed to create checkout session");
      }

      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error.message;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // Could add error handling/toast here
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`relative rounded-lg p-8 border-2 ${
        elite
          ? "border-[#940909] bg-[#940909]/5"
          : popular
          ? "border-[#940909] bg-white shadow-lg scale-105"
          : "border-gray-200 bg-white"
      } transition-all duration-300 hover:scale-105`}
    >
      {/* Popular Badge */}
      {popular && !elite && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#940909] text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      {/* Elite Badge */}
      {elite && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#940909] to-[#B90021] text-white px-4 py-1 rounded-full text-sm font-semibold">
            Limited Spots
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3
          className={`text-2xl font-bold mb-2 ${
            elite ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-lg font-semibold mb-4 ${
            elite ? "text-white/90" : "text-gray-900"
          }`}
        >
          {price}
        </p>
        <p
          className={`text-sm leading-relaxed ${
            elite ? "text-white/80" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>

      {/* Features */}
      <div className="mb-8">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className={`flex items-start gap-3 ${
                elite ? "text-white/90" : "text-gray-700"
              }`}
            >
              <svg
                className="h-5 w-5 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <CTAButton
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full ${
          elite
            ? "bg-white text-[#940909] hover:bg-gray-100"
            : popular
            ? "hover:scale-105"
            : ""
        }`}
      >
        {isLoading ? "Processing..." : ctaText}
      </CTAButton>

      {/* Footer Note for Elite */}
      {elite && (
        <p className="text-xs text-white/70 text-center mt-4">
          Only 10 spots available per month
        </p>
      )}
    </div>
  );
}
