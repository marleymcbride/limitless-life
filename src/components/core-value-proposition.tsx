"use client";

import { bgClasses } from "@/lib/utils";

export default function CoreValueProposition() {
  return (
    <section className={`w-full ${bgClasses.white} pt-10 pb-6 text-black relative`}>
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
              If coaching myself and my clients for over a decade has taught me anything, it&apos;s most guys don&apos;t struggle with willpower, their body is broken inside.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              So instead of training harder or eating less, we actually fix what&apos;s broken.
            </p>

            <p className="text-gray-800 leading-relaxed mb-8">
              And it became clear there are four common problems guys make over and over.. but once we fixed these the results started coming almost overnight.
            </p>

            <p className="text-gray-800 !lg:text-3xl text-center leading-relaxed mb-4" style={{fontSize: "1.8rem"}}>
              <strong>You&apos;ve been told you need to:</strong>
            </p>

            <p className="text-gray-900 leading-relaxed mb-4">
              1. <strong>Cut calories, skip meals, and restrict your food intake.</strong>
            </p>

            <p className="text-gray-900 leading-relaxed mb-4">
              2. <strong>Train 4, 5, 6 days a week and push yourself harder in the gym.</strong>
            </p>

            <p className="text-gray-900 leading-relaxed mb-4">
              3. <strong>Use discipline + willpower to control your drinking and lifestyle habits.</strong>
            </p>

            <p className="text-gray-900 leading-relaxed mb-8">
              4. <strong>Take a load of supplements and track every part of your life.</strong>
            </p>

            <p className="text-gray-900 leading-relaxed mb-6">
              And if you&apos;re not where you want to be right now, it&apos;s probably because you&apos;re wasting years doing these outdated, inefficient methods.
            </p>

            <p className="text-gray-00 leading-relaxed mb-6">
              But what I found is <span className="underline font-bold">the secret is actually to do LESS.</span>
            </p>

            <p className="text-gray-900 leading-relaxed mb-6">
              And all you need is an easy, repeatable system you can do on autopilot for the next 5-10 years.
            </p>

            <p className="text-gray-900 leading-relaxed mb-6">
              Because once you fix what&apos;s broken inside, your body finally starts working like it was meant to.
            </p>

            <p className="text-gray-900 leading-relaxed mb-6">
              It&apos;s like turning back on a tap.. where your energy comes back, cravings to food and alcohol disappear, and your body finally looks like it should.
            </p>

            <p className="text-gray-900 leading-relaxed mb-6">
              Not because you&apos;re trying harder or found that one &apos;magic&apos; supplement, because you addresssed the root causes inside holding you back.
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
