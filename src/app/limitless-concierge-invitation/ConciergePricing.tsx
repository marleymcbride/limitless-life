"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const PLANS = [
  {
    id: "monthly" as const,
    label: "Limitless Concierge Monthly",
    originalPrice: "£700",
    price: "£350",
    frequency: "/month",
    deposit: "£197",
    badge: "",
    features: [
      "Full 1-to-1 concierge access",
      "Custom protocol design tailored to you",
      "Cancel anytime, no commitment required",
    ],
  },
  {
    id: "4-month" as const,
    label: "Limitless Concierge 4 Month",
    originalPrice: "£2,497",
    price: "£1,248",
    frequency: "",
    deposit: "£197",
    badge: "Most Popular",
    features: [
      "Full 1-to-1 concierge access",
      "Custom protocol design tailored to you",
      "Foundations phase prioritised and structured",
      "Save compared to month-to-month pricing",
    ],
  },
  {
    id: "6-month" as const,
    label: "Limitless Concierge 6 Month",
    originalPrice: "£3,497",
    price: "£1,748",
    frequency: "",
    deposit: "£197",
    badge: "Best Value",
    features: [
      "Full 1-to-1 concierge access",
      "Custom protocol design tailored to you",
      "Complete the full transformation journey",
      "Best overall value for your investment",
    ],
  },
];

export default function ConciergePricing() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";
  const [showPage, setShowPage] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("4-month");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showPage]);

  const handleCheckout = async () => {
    if (!selectedPlan) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: "limitless-concierge",
          paymentPlan: selectedPlan,
          customerEmail: email,
          customerName: name,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create checkout session");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("[Concierge Pricing] Error:", err);
      alert("Something went wrong. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlan = PLANS.find(p => p.id === selectedPlan);

  return (
    <>
      <span
        onClick={() => setShowPage(true)}
        className="text-blue-400 font-bold underline hover:text-blue-300 cursor-pointer md:hidden lg:hidden inline"
      >
        Click here to secure your<br /> place
      </span>
      <span
        onClick={() => setShowPage(true)}
        className="text-blue-400 font-bold underline hover:text-blue-300 cursor-pointer hidden md:inline-block lg:inline-block"
      >
        Click here to secure your place
      </span>

      {showPage && (
        <div className="fixed inset-0 z-[9999] flex flex-col overflow-x-hidden overflow-y-auto" style={{ backgroundColor: '#050A0F' }}>
          <div className="w-full py-5 px-4 text-center bg-[#940909]">
            <p className="text-white text-base font-bold">
            🚨 The first 5 clients to join will access 50% off
            </p>
          </div>

          <div className="flex justify-center pt-8 pb-16 pb-10 scale-[1.2]">
            <img
              src="/images/LIMITLESS LIFE LOGO 2026.png"
              alt="Limitless Life"
              className="h-10"
            />
          </div>

          <div className="flex-1 flex items-start justify-center px-6 pb-0">
            <div className="w-full max-w-4xl">
              <h1 className="text-3xl font-bold text-white text-center mb-16 tracking-tight">
              Choose Your Investment
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
                <div className="md:col-span-2 space-y-3">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`w-full p-5 rounded-lg border-2 transition-all cursor-pointer text-left ${
                          isSelected
                            ? "border-red-700/40 bg-red-700/20"
                            : "border-[#FFFFFF]/10 bg-[#141414]/40 hover:bg-red-700/30 hover:border-red-700/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-base font-bold">
                              {plan.label}
                            </p>
                            <p className="flex items-center gap-3 mt-1">
                              <span className="text-gray-400 text-base line-through">{plan.originalPrice}{plan.frequency && '/mo'}</span>
                              <span className="text-white text-lg font-bold">
                                {plan.price}{plan.frequency}
                              </span>
                            </p>
                          </div>
                          {plan.badge && (
                            <span className="shrink-0 text-sm text-white font-semibold">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-3">
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full font-bold text-white bg-[#940909] hover:bg-[#7b0707] py-5 px-6 rounded-lg text-base"
                    >
                      {isLoading ? "Redirecting to Stripe..." : "Secure My Place"}
                    </button>
                  </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                  <div className="rounded-xl p-8 border border-[#FFFFFF]/8" style={{ backgroundColor: '#06090E' }}>
                    <h3 className="text-lg font-bold text-white mb-6">
                      Pricing Breakdown
                    </h3>
                    <div className="space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-base">Original price</span>
                        <span className="text-gray-400 text-base line-through">{currentPlan?.originalPrice}{currentPlan?.frequency && '/mo'}</span>
                      </div>
                      <div className="border-t border-[#FFFFFF]/8"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-base">Your price (50% off)</span>
                        <span className="text-white font-bold text-xl">{currentPlan?.price}{currentPlan?.frequency}</span>
                      </div>
                      <div className="border-t border-[#FFFFFF]/8"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-base">Pay today</span>
                        <span className="text-white font-bold text-lg">{currentPlan?.deposit} deposit</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl p-8 border border-[#FFFFFF]/8" style={{ backgroundColor: '#06090E' }}>
                    <h3 className="text-lg font-bold text-white mb-6">
                      What's Included
                    </h3>
                    <ul className="space-y-4">
                      {currentPlan?.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-base leading-relaxed">
                          <span className="text-[#940909] mt-0.5 shrink-0 font-bold">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
