"use client";

import { useState } from "react";
import { CTAButton } from "./ui/cta-button";

type Tier = 'protocol' | 'life' | 'life-whatsapp' | 'vip' | null;
type PaymentPlan = 'full' | '2pay' | '3pay' | 'monthly' | null;

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
