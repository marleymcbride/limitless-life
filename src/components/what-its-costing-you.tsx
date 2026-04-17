"use client";

import { usePageType } from "@/contexts/PageContext";

interface WhatItsCostingYouProps {
  onApplyNowClick?: (e: React.MouseEvent) => void;
}

export default function WhatItsCostingYou({ onApplyNowClick }: WhatItsCostingYouProps) {
  const { pageType } = usePageType();
  const ctaText = pageType === 'waitlist' ? 'Join the waitlist' : 'Join Now';
  return (
    <section className="w-full results-proof-gradient pt-16 pb-12 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>

          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            <div className="text-center mb-8">
              <h2
                className="text-2xl sm:text-3xl mx-0 md:text-4xl lg:text-5xl font-bold mb-0 text-white"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
              >
                What&apos;s This Actually Costing You?
              </h2>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              Let just lay it out.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You&apos;ve probably got the success side sorted.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You&apos;re making good money, you&apos;ve got the career, the house.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              But if you actually look at your health?
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You got complacent.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You didn&apos;t used to feel so drained, or have a belly forming.
            </p>

            <div className="text-gray-200 text-2.5xl py-1 leading-relaxed mb-6">
              <strong>When did you&apos;ve let your standards drop so far?</strong>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              The reality is you could be looking at heart disease, diabetes or even worse in the next few years.
            </p>

            <p className="text-white font-bold text-xl mb-6">
              Average medical costs in the US is over $75,000 per year in 2026.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              What could this mean for your job? Underperforming at work could be as serious as losing your career.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
            Or your family?
              How does your wife feel about your drinking?
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Or your kids, growing up with a dad who&apos;s never actually there.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Every day you gamble is another chance to fix your health gone.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              How long are you willing to play Russian Roulette?
            </p>

          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button
              onClick={onApplyNowClick}
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 text-lg rounded-md inline-block relative z-30"
            >
              {ctaText}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
