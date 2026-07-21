"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
      "No commitment (minimum 2 month term)",
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

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";
  const [selectedPlan, setSelectedPlan] = useState<string>("4-month");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

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
  const firstName = name.split(' ')[0];

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: '#050A0F', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
    >
      <div className="w-full py-5 px-4 text-center bg-[#940909]">
        <p className="text-white text-lg font-bold">
          🚨 There are 5 spots left to join as a Founding Member
        </p>
      </div>

      <div className="flex justify-center pt-10 pb-6 pb-10 scale-[1.2]">
        <img
          src="/images/LIMITLESS LIFE LOGO 2026.png"
          alt="Limitless Life"
          className="h-10"
        />
      </div>

      <div className="flex-1 flex items-start justify-center px-6 pb-12">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-white text-center mb-2 tracking-tight">
            Secure Your Place
          </h1>
          {firstName && (
            <p className="text-gray-300 text-center text-lg mb-14">
              Hey {firstName}
            </p>
          )}
          {!firstName && <div className="mb-8"></div>}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-3">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full p-5 rounded-md border-2 transition-all cursor-pointer text-left ${
                      isSelected
                        ? "bg-[#2d2d2e] border-[#FFFFFF]/20"
                        : "bg-[#222223] border-[#FFFFFF]/10 hover:bg-[#2d2d2e] hover:border-[#FFFFFF]/15"
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
                  className="w-full font-bold text-white bg-[#940909] hover:bg-[#7b0707] py-5 px-6 rounded-md text-base"
                >
                  {isLoading ? "Redirecting to Stripe..." : "Secure My Place"}
                </button>
              </div>
            </div>

            <div className="md:col-span-3 space-y-6">
              <div className="rounded-lg p-8 border border-[#FFFFFF]/10" style={{ backgroundColor: '#222223' }}>
                <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
                  Investment breakdown
                </h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-lg">Full price investment</span>
                    <span className="text-gray-400 text-lg line-through">{currentPlan?.originalPrice}{currentPlan?.frequency && '/mo'}</span>
                  </div>
                  <div className="border-t border-[#FFFFFF]/8"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-lg">Founding member investment (50% off)</span>
                    <span className="text-white font-bold text-lg">{currentPlan?.price}{currentPlan?.frequency}</span>
                  </div>
                  <div className="border-t border-[#FFFFFF]/8"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-lg">Pay today</span>
                    <span className="text-white font-bold text-xl">{currentPlan?.deposit} deposit</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-8 border border-[#FFFFFF]/10" style={{ backgroundColor: '#222223' }}>
                <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
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
  );
}
