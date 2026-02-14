"use client";

import VSLPlayer from "../../components/vsl-player";
import WhatYouGetSection from "../../components/what-you-get-section";
import PricingSelector from "../../components/pricing-selector";

export default function ApplicationClient() {
  const scrollToPricing = () => {
    const element = document.getElementById("pricing-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-black mb-6"
              style={{ lineHeight: "1.17" }}
            >
              The Complete Limitless Protocol Offer
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Watch the short video now to see how to proceed.
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

    </main>

  );
}
