"use client";

import { CTAButton } from "./ui/cta-button";

export default function FourStepSystem() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="prose prose-lg max-w-none mobile-text-large body-copy light-mode-copy">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              The 4-Step System That Transforms High-Performers
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-12">
            Simple, proven steps that work with your body's natural intelligence
            to restore your energy and transform your life.
          </p>

          <div className="space-y-8 mb-12">
            <div className="text-left">
              <p className="mini-heading text-gray-900 leading-relaxed mb-6">
                1) Cellular Recharge
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Reset your mitochondria and restore natural energy production.
                Say goodbye to afternoon crashes and brain fog.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-gray-900 leading-relaxed mb-6">
                2) Hormonal Optimization
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Naturally boost testosterone, reduce cortisol, and balance your
                hormones for peak performance and vitality.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-gray-900 leading-relaxed mb-6">
                3) Metabolic Reset
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Reprogram your metabolism to burn fat efficiently, build lean
                muscle, and maintain optimal body composition.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-gray-900 leading-relaxed mb-6">
                4) Lifestyle Integration
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Make the changes permanent by integrating them into your busy
                lifestyle. No willpower required.
              </p>
            </div>
          </div>

          <p className="mini-heading text-gray-900 leading-relaxed mb-6">
            Each Step Builds On The Previous One
          </p>
          <p className="text-gray-700 leading-relaxed mb-12">
            This isn't a random collection of tips. It's a systematic approach
            where each step creates the foundation for the next. By Step 4,
            the transformation is automatic and permanent.
          </p>
        </div>

        <div className="text-center mt-12">
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Start Your Transformation Today
          </a>
        </div>
      </div>
    </section>
  );
}
