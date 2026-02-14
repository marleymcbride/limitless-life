"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import VSLPlayer from "../../components/vsl-player";
import WhatYouGetSection from "../../components/what-you-get-section";
import PricingSelector from "../../components/pricing-selector";

export default function ApplicationClient() {
  const [showPricingEnroll, setShowPricingEnroll] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if enroll flag is in URL
    if (searchParams.get("enroll") === "true") {
      setShowPricingEnroll(true);
    }
  }, [searchParams]);

  // Restore scroll position after enroll popup closes
  useEffect(() => {
    if (!showPricingEnroll) {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [showPricingEnroll]);

  // Get tier from URL to pre-select in PricingSelector
  const tierParam = searchParams.get("tier");

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="py-8 md:py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6"
              style={{ lineHeight: "1.17" }}
            >
              The Complete Limitless Protocol Offer
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
              Watch a short video now to see how to proceed.
            </p>
          </div>

          {/* Video Presentation */}
          <div className="mb-16">
            <VSLPlayer
              libraryId="505300"
              videoId="ae86338e-0493-4ff0-bca9-87f9ad98dd89"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
              className="max-w-4xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <WhatYouGetSection />

      <section>
        <div className="mb-16"></div>
      </section>

      {/* Pricing Selector Popup - only render when enroll is active */}
      {showPricingEnroll && (
        <PricingSelector
          showEnroll={showPricingEnroll}
          onClose={() => setShowPricingEnroll(false)}
          initialTier={tierParam}
        />
      )}

    </main>
  );
}
