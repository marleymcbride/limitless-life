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
      <div className="tier-selection">
        {/* TODO: Task 4 - Add tier list */}
      </div>

      {/* Right Column: Dynamic Details */}
      <div className="tier-details">
        {/* TODO: Task 5 - Add details display */}
      </div>
    </div>
  );
}
