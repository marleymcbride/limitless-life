"use client";

import { useState, useEffect } from "react";
import { CTAButton } from "./ui/cta-button";

type Tier = 'protocol' | 'life' | 'life-whatsapp' | 'concierge' | null;
type PaymentPlan = 'weekly' | '3pay' | '2pay' | '6pay' | 'full' | null;

const tierContent = {
  protocol: {
    title: "The Limitless Protocol",
    tagline: "Complete transformation system",
    basePrice: "$297",
    features: [
      "Full 4-Step System Protocol",
      "Video Training Library",
      "Nutrition & Supplement Guides",
      "Mobile App Access",
      "Email Support",
    ],
    paymentOptions: ['full'],
  },
  life: {
    title: "Limitless Life (4-Month Program)",
    tagline: "Comprehensive coaching + protocol",
    basePrice: "$2,597",
    features: [
      "Everything in Protocol, plus:",
      "Weekly 1-on-1 coaching calls (4 total)",
      "Personalized nutrition protocol",
      "Workout plan customization",
      "Priority email support",
    ],
    paymentOptions: ['weekly', '3pay', '2pay', 'full'],
  },
  'life-whatsapp': {
    title: "Limitless Life + WhatsApp Access",
    tagline: "Direct access to your coach",
    basePrice: "$4,397",
    features: [
      "Everything in Limitless Life, plus:",
      "Unlimited WhatsApp messaging",
      "Same-day response guarantee",
      "Form check via video",
      "Real-time protocol adjustments",
    ],
    paymentOptions: ['weekly', '3pay', '2pay', 'full'],
  },
  concierge: {
    title: "Limitless Health Concierge (6-Month Program)",
    tagline: "Premium everything, extended support",
    basePrice: "$6,897",
    features: [
      "Everything in Life + WhatsApp, plus:",
      "6 months of coaching (2 extra months)",
      "Priority scheduling (first access)",
      "Quarterly in-person assessment",
      "Custom supplement protocol",
      "VIP community access",
    ],
    paymentOptions: ['weekly', '6pay', '3pay', 'full'],
  },
} as const;

export default function PricingSelector() {
  const [selectedTier, setSelectedTier] = useState<Tier>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentPlan>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Enrollment popup state
  const [showPopup, setShowPopup] = useState(false);

  // Check for URL hash to determine which tier to pre-select
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'protocol' || hash === 'life' || hash === 'life-whatsapp' || hash === 'concierge') {
      setSelectedTier(hash as Tier);
      setShowPopup(true);
      console.log('[PricingSelector] Pre-selecting tier from URL hash:', hash);
      // Clear hash after reading to prevent re-triggering on refresh
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleCheckout = async () => {
    if (!selectedTier || !selectedPayment) return;

    setIsLoading(true);

    try {
      // Get user email from sessionStorage (set by email popup)
      const userEmail = typeof window !== 'undefined' ? sessionStorage.getItem('userEmail') : null;
      const userName = typeof window !== 'undefined' ? sessionStorage.getItem('userName') : null;

      console.log('[PricingSelector] Starting checkout:', { selectedTier, selectedPayment, userEmail });

      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier: selectedTier,
          paymentPlan: selectedPayment,
          customerEmail: userEmail,
          customerName: userName || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Checkout API error:', data);
        throw new Error(data.error || 'Failed to create checkout session');
      }

      const { url } = data;

      if (!url) {
        throw new Error("No checkout URL returned from checkout API");
      }

      // Redirect to Stripe checkout
      console.log('[PricingSelector] Redirecting to Stripe:', url);
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Column: Tier Selection */}
      <div className="order-2 md:order-1 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Program</h3>

        {(Object.keys(tierContent) as Array<Exclude<Tier, null>>).map((tier) => {
          const content = tierContent[tier];
          const isSelected = selectedTier === tier;

          return (
            <div key={tier}>
              <button
                onClick={() => {
                  setSelectedTier(tier);
                  setSelectedPayment(null); // Reset payment when tier changes
                }}
                className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-red-600 bg-red-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className={`font-bold text-lg mb-1 ${isSelected ? "text-gray-900" : "text-gray-800"}`}>
                      {content.title}
                    </h4>
                    <p className="text-sm text-gray-600">{content.tagline}</p>
                  </div>
                  <div className={`font-semibold ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                    {content.basePrice}
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-3">
                  {tier === 'life' && (
                    <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Most Popular
                    </span>
                  )}
                  {tier === 'concierge' && (
                    <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Limited Spots
                    </span>
                  )}
                </div>
              </button>

              {/* Installment Dropdown - shows when tier is selected */}
              {isSelected && (
                <div className="mt-3 pl-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Investment Plan
                  </label>
                  <select
                    value={selectedPayment || ''}
                    onChange={(e) => setSelectedPayment(e.target.value as PaymentPlan)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="" disabled>Select payment option</option>
                    {content.paymentOptions.includes('weekly') && (
                      <option value="weekly">Weekly Payments</option>
                    )}
                    {content.paymentOptions.includes('3pay') && (
                      <option value="3pay">3 Payments</option>
                    )}
                    {content.paymentOptions.includes('2pay') && (
                      <option value="2pay">2 Payments</option>
                    )}
                    {content.paymentOptions.includes('6pay') && (
                      <option value="6pay">6 Monthly Payments</option>
                    )}
                    {content.paymentOptions.includes('full') && (
                      <option value="full">One-time incentivized pricing</option>
                    )}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right Column: Dynamic Details */}
      <div className="order-1 md:order-2 md:sticky md:top-8">
        {!selectedTier ? (
          <div className="bg-gray-50 mt-11 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 11-5 5m5 5l2-2m-2-2L9 9l-5 5"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select a Program
            </h3>
            <p className="text-gray-600">
              Choose your transformation level from options on left.
            </p>
          </div>
        ) : (
          <div className="bg-white border-2 mt-11 border-gray-200 rounded-lg p-8 shadow-lg">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {tierContent[selectedTier].title}
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                {tierContent[selectedTier].tagline}
              </p>

            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h4>
              <ul className="space-y-3">
                {tierContent[selectedTier].features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <svg
                      className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Checkout Button */}
            <div className="border-t  border-gray-200 pt-6">
              <CTAButton
                onClick={() => window.location.href = '/enroll'}
                disabled={!selectedPayment || isLoading}
                className="w-full mx-auto text-center rounded-3xl"
              >
                {isLoading ? "Processing..." : (
                  <span className="flex mx-auto items-center gap-2">
                    Enroll Now
                  </span>
                )}
              </CTAButton>
              {!selectedPayment && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  Please select an installment plan above
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Enrollment Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-8 relative">
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 6L6 18M12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Enrollment</h3>
              <p className="text-gray-600">Select your program and payment preference to begin your transformation</p>
            </div>

            {/* Tier selection */}
            <div className="space-y-4 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Selected Program</h4>
              <p className="text-2xl font-bold text-red-600">{selectedTier ? tierContent[selectedTier].title : 'Select a Program'}</p>
            </div>

            {/* Payment options */}
            <div className="space-y-4 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Payment Plan</h4>
              <select
                value={selectedPayment || ''}
                onChange={(e) => setSelectedPayment(e.target.value as PaymentPlan)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select payment option</option>
                {selectedTier && tierContent[selectedTier]?.paymentOptions.map((option: string) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Continue button */}
            <CTAButton
              onClick={() => {
                setShowPopup(false);
                // Continue to checkout flow...
              }}
              disabled={!selectedPayment}
              className="w-full mx-auto text-center rounded-3xl"
            >
              Continue to Checkout
            </CTAButton>
          </div>
        </div>
      )}
    </div>
  );
}
