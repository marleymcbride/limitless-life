"use client";

import VSLPlayer from "../../components/vsl-player";
import OfferAccordion from "../../components/offer-accordion";
import TierCard from "../../components/tier-card";

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
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6" style={{ lineHeight: "1.17" }}>
              The Complete Limitless Protocol Offer
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Watch my detailed presentation of what you get with each tier, then choose the perfect fit for your transformation journey.
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

      {/* Offer Details Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              What You Get With The Limitless Protocol
            </h2>
            <p className="text-lg text-gray-700">
              Every tier includes access to our proven system, with varying levels of personal support.
            </p>
          </div>

          <OfferAccordion />
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section id="pricing-section" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Choose Your Transformation Level
            </h2>
            <p className="text-lg text-gray-700">
              Select the tier that best fits your goals and timeline for transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <TierCard
              tier="access"
              title="Limitless Access"
              price="$2,997"
              description="Complete access to The Limitless Protocol system including all training modules, nutrition protocols, and recovery strategies."
              features={[
                "Full 4-Step System Protocol",
                "Video Training Library",
                "Nutrition & Supplement Guides",
                "Mobile App Access",
                "Email Support"
              ]}
              ctaText="Choose Access"
            />

            <TierCard
              tier="plus"
              title="Limitless Plus"
              price="$4,997"
              description="Everything in Limitless Access PLUS bi-weekly group coaching calls and personalized protocol adjustments."
              features={[
                "Everything in Tier 1",
                "Bi-Weekly Group Coaching Calls",
                "Monthly Protocol Reviews",
                "Private Community Access",
                "Priority Email Support"
              ]}
              ctaText="Choose Plus"
              popular={true}
            />

            <TierCard
              tier="premium"
              title="Limitless Premium"
              price="$8,997"
              description="Everything in Limitless Plus PLUS weekly 1-on-1 calls and direct messaging access with me personally."
              features={[
                "Everything in Tier 2",
                "Weekly 1-on-1 Coaching Calls",
                "Direct Messaging Access",
                "Priority Protocol Adjustments",
                "Personal Accountability"
              ]}
              ctaText="Choose Premium"
            />

            <TierCard
              tier="elite"
              title="Limitless Elite"
              price="$14,997"
              description="Everything in Limitless Premium PLUS in-person strategy session, full lifestyle integration, and lifetime access to all future updates."
              features={[
                "Everything in Tier 3",
                "In-Person Strategy Session",
                "Full Lifestyle Integration",
                "Lifetime Access Guarantee",
                "First Priority for All Updates"
              ]}
              ctaText="Choose Elite"
              elite={true}
            />
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                Ready to Transform Your Life?
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Join high-performers who have already built top 1% physiques, restored their energy, and transformed their lives.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span>✓ 90-day money-back guarantee</span>
                <span>•</span>
                <span>✓ Secure checkout</span>
                <span>•</span>
                <span>✓ Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Your Transformation Starts Now
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            The choice is yours: continue feeling like you are today, or take the first step toward limitless energy and performance.
          </p>
          <div className="text-center">
            <button
              className="bg-[#B90021] hover:bg-[#940909] text-white font-bold py-6 px-12 text-xl rounded-sm transition-none duration-0 focus:outline-none"
              onClick={scrollToPricing}
            >
              Choose Your Transformation Level
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}