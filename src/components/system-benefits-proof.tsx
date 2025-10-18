"use client";

import { CTAButton } from "./ui/cta-button";

export default function SystemBenefitsProof() {
  return (
    <section className="bg-black py-20 px-6 w-full">
      <div className="container mx-w-max max-w-6xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Why This System Will Work For You
          </h2>
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-8"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            (even if you&apos;re busy and nothing&apos;s worked before)
          </h2>

          <p className="text-3xl text-gray-300 mb-12 mt-12 max-w-3xl mx-auto">
            It works because...
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-left">
              <h3
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                1. It fixes your body&apos;s natural energy production
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Instead of forcing stimulants, we restore your body&apos;s
                ability to generate its own sustained energy throughout the day.
              </p>
            </div>

            <div className="text-left">
              <h3
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                2. It&apos;s designed to maximise the time you do have
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The system delivers incredible results with just 2-3 focused
                sessions per week, perfect for busy professionals.
              </p>
            </div>

            <div className="text-left">
              <h3
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                3. You aren&apos;t expected to use &apos;willpower&apos;,
                because we fix your body at the root
              </h3>
              <p className="text-gray-300 leading-relaxed">
                By addressing the fundamental signaling issues, the results
                become automatic and permanent without constant struggle.
              </p>
            </div>
          </div>

          <div className="text-center">
            <CTAButton
              onClick={() => {
                window.location.href = "/application";
              }}
            >
              See If This Is Right For You
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
