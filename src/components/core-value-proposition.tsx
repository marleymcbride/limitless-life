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
          <div className="prose prose-lg max-w-none mobile-text-large body-copy prose-md !prose-p:text-center">
            <div className="text-center mb-6">
              <h2
                className="text-4-5xl md:text-5xl font-bold mb-0 text-gray-900 !max-w-sm mx-1"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.0", maxWidth:"100px"}}
              >
                After Working With Countless Men I Realised There&apos;s a Simpler Way to Get Healthy, Skyrocket Energy and Stay Lean Year-round
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mt-10 mb-6">
              If coaching myself and my clients for over a decade has taught me anything, it&apos;s that most guys don&apos;t struggle with willpower, they have a broken system.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              So instead of training harder or eating less, we fix what&apos;s fucked up inside.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And it became clear there are four common problems guys make over and over.. but once we fixed these the results started coming almost overnight:
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              <strong>1. Cutting calories, skipping meals, and restricting your food intake.</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              <strong>2. Training 4, 5, 6 days a week and pushing yourself harder in the gym.</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              <strong>3. Using discipline and willpower to control your drinking and lifestyle habits.</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              <strong>4. Taking the right supplements, tracking everything, and optimizing every aspect of your health.</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And if you&apos;re not where you want to be right now, it&apos;s probably because you&apos;re wasting years doing these outdated, inefficient methods.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              They told us to do more training, or use these complex diets... but what I found is: <span className="underline font-bold">the secret is actually to do LESS.</span>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And all you need is an easy, repeatable system you can do on autopilot for the next 5-10 years.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Because once you fix what&apos;s broken inside, your body finally starts working like it was meant to.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              It&apos;s like turning back on a tap.. where your energy comes back, cravings to food and alcohol disappear, and your body finally looks like it should.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Not because you&apos;re trying harder or found that one &apos;magic&apos; supplement, because you address the root causes inside holding you back.
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
