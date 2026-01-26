"use client";

import { CTAButton } from "./ui/cta-button";

export default function ExclusivityPersonalAttention() {
  return (
    <section className="bg-black py-20 px-4 w-full">
      <div className="container mx-auto max-w-5xl">
        <div className="prose prose-lg max-w-none mobile-text-large body-copy dark-mode-copy">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              This Isn't For Everyone. And That's Intentional.
            </h2>
          </div>

          <p className="text-gray-200 leading-relaxed mb-12">
            I work personally with every client. This means I can only accept a
            limited number of high-performers who are ready to transform.
          </p>

          <div className="space-y-8 mb-12">
            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                Limitless Access
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                Complete access to The Limitless Protocol system including all
                training modules, nutrition protocols, and recovery strategies.
              </p>
              <p className="text-gray-200 leading-relaxed mb-0">
                Full 4-Step System Protocol • Video Training Library
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                Nutrition & Supplement Guides • Mobile App Access
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                Limitless Plus
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                Everything in Limitless Access PLUS bi-weekly group coaching
                calls and personalized protocol adjustments.
              </p>
              <p className="text-gray-200 leading-relaxed mb-0">
                Everything in Tier 1 • Bi-Weekly Group Coaching Calls
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                Monthly Protocol Reviews • Private Community Access
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                Limitless Premium
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                Everything in Limitless Plus PLUS weekly 1-on-1 calls and direct
                messaging access with me personally.
              </p>
              <p className="text-gray-200 leading-relaxed mb-0">
                Everything in Tier 2 • Weekly 1-on-1 Coaching Calls
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                Direct Messaging Access • Priority Protocol Adjustments
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                Limitless Elite - 10 Spots Only
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                Everything in Limitless Premium PLUS in-person strategy session,
                full lifestyle integration, and lifetime access to all future
                updates.
              </p>
              <p className="text-gray-200 leading-relaxed mb-0">
                Everything in Tier 3 • In-Person Strategy Session
              </p>
              <p className="text-gray-200 leading-relaxed mb-0">
                Full Lifestyle Integration • Lifetime Access Guarantee
              </p>
              <p className="text-gray-200 leading-relaxed mb-6">
                First Priority for All New Features
              </p>
            </div>
          </div>

          <p className="mini-heading text-white leading-relaxed mb-6">
            Why I Only Accept 10 Elite Clients Per Month
          </p>
          <p className="text-gray-200 leading-relaxed mb-12">
            Personal attention is non-negotiable. Every client gets weekly
            1-on-1 time with me, custom protocol adjustments, and priority
            support. This cannot be scaled.
          </p>
        </div>

        <div className="text-center mt-12">
          <a
            id="apply-for-elite-spots"
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
            style={{ scrollMarginTop: '200px' }}
          >
            Apply For One Of The 10 Elite Spots
          </a>
        </div>
      </div>
    </section>
  );
}
