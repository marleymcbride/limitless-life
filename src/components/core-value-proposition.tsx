"use client";

import { bgClasses } from "@/lib/utils";

export default function CoreValueProposition() {
  return (
    <section className={`w-full ${bgClasses.white} pt-10 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* THE ACTUAL CONTENT - Natural flow, casual tone */}
          <div className="prose prose-lg max-w-none mobile-text-large body-copy">
            <div className="text-center mb-6">
              <h2
                className="text-4-5xl md:text-5xl font-bold mb-4 text-gray-900"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.0" }}
              >
                After Working With Countless Men I Realised There&apos;s a Simple Way to Get Healthy, Stay Lean Year-round and Skyrocket Energy
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
              I was done with the complex, hustle and grind systems.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              What I needed was a simpler solution where my health and fitness felt fun to me, not like a chore.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And more importantly would work with my busy schedule and life, rather than the other way round.
            </p>

            {/* Three key points with same styling as personal story */}
            <h3
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              Fix why you wake up feeling rough every day
            </h3>
            <p className="text-gray-800 leading-relaxed mb-6">
              Your morning energy isn&apos;t a caffeine problem - it&apos;s a signaling
              problem. Your body is sending you clear signals that something
              is fundamentally wrong. Once you fix the root cause, you&apos;ll wake
              up naturally energized without any stimulants.
            </p>

            <h3
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              Work with your body&apos;s natural rhythms, not against them
            </h3>
            <p className="text-gray-800 leading-relaxed mb-6">
              High-performers try to force their bodies through sheer
              willpower. But your body has incredible intelligence. When you
              learn to work with its natural systems instead of fighting them,
              everything becomes easier and the results become permanent.
            </p>

            <h3
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              Build a system that works even when you&apos;re busy
            </h3>
            <p className="text-gray-800 leading-relaxed mb-6">
              The biggest lie in fitness is that you need to spend hours in
              the gym. That&apos;s impossible for successful men. The right system
              delivers incredible results with just 2-3 focused sessions per
              week, because it works with your lifestyle instead of against
              it.
            </p>

            {/* CTA Button - matching personal story style */}
            <div className="text-center mt-12">
              <a
                href="/application"
                className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 mb-6 text-lg rounded-md inline-block relative z-30"
              >
                Show me how
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
