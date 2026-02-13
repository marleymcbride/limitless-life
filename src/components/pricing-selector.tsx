"use client";

import { useState } from "react";
import { CTAButton } from "./ui/cta-button";

type Tier = 'protocol' | 'life' | 'life-whatsapp' | 'vip' | null;
type PaymentPlan = 'full' | '2pay' | '3pay' | 'monthly' | null;

const tierContent = {
  protocol: {
    title: "The Limitless Protocol",
    tagline: "Complete transformation system",
    basePrice: "$299",
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
    basePrice: "$1,649",
    features: [
      "Everything in Protocol, plus:",
      "Weekly 1-on-1 coaching calls (4 total)",
      "Personalized nutrition protocol",
      "Workout plan customization",
      "Priority email support",
    ],
    paymentOptions: ['full', '2pay', '3pay'],
  },
  'life-whatsapp': {
    title: "Limitless Life + WhatsApp Access",
    tagline: "Direct access to your coach",
    basePrice: "$4,997",
    features: [
      "Everything in Limitless Life, plus:",
      "Unlimited WhatsApp messaging",
      "Same-day response guarantee",
      "Form check via video",
      "Real-time protocol adjustments",
    ],
    paymentOptions: ['full', '2pay', '3pay'],
  },
  vip: {
    title: "Limitless VIP (6-Month Program)",
    tagline: "Premium everything, extended support",
    basePrice: "$8,000",
    features: [
      "Everything in Life + WhatsApp, plus:",
      "6 months of coaching (2 extra months)",
      "Priority scheduling (first access)",
      "Quarterly in-person assessment",
      "Custom supplement protocol",
      "VIP community access",
    ],
    paymentOptions: ['full', '2pay', 'monthly'],
  },
} as const;

export default function PricingSelector() {
  const [selectedTier, setSelectedTier] = useState<Tier>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentPlan>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column: Tier Selection */}
      <div className="space-y-3">
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
                  {tier === 'vip' && (
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
                    Choose Installment Plan
                  </label>
                  <select
                    value={selectedPayment || ''}
                    onChange={(e) => setSelectedPayment(e.target.value as PaymentPlan)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="" disabled>Select payment option</option>
                    {content.paymentOptions.includes('full') && (
                      <option value="full">Pay in Full - {content.basePrice}</option>
                    )}
                    {content.paymentOptions.includes('2pay') && (
                      <option value="2pay">2 Payments</option>
                    )}
                    {content.paymentOptions.includes('3pay') && (
                      <option value="3pay">3 Payments</option>
                    )}
                    {content.paymentOptions.includes('monthly') && (
                      <option value="monthly">Monthly Payments</option>
                    )}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right Column: Dynamic Details */}
      <div className="tier-details">
        {/* TODO: Task 5 - Add details display */}
      </div>
    </div>
  );
}
