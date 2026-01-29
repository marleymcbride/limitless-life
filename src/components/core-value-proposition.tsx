  "use client";

import { bgClasses } from "@/lib/utils";

export default function CoreValueProposition() {
  return (
    <section className={`w-full ${bgClasses.white} pt-12 pb-6 text-black relative`} data-section="core-value-proposition">
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>
          {/* THE ACTUAL CONTENT - Natural flow, casual tone */}
          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>
            <div className="text-center mb-6">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0 text-gray-900"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1"}}
              >
               After Seeing The Same Mistakes Over and Over I Realized There&apos;s a Simpler Way
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
              If being balls-deep in health and fitness for 12 years now has taught me anything:
            </p>

            <p className="text-gray-800 font-bold leading-relaxed mb-6">
             When it comes to your energy, conventional methods <span className="font-bold">do not work.</span>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
             Because for 99% of guys the problem isn&apos;t willpower, diet type, or their education.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
             It&apos;s their system.
            </p>

            <p className="text-gray-800 mini-heading mx-4 md:mx-auto lg:mx-auto py-4 md:py-0 lg:py-0 text-center leading-relaxed mt-8 mb-8">
            It became clear there are 4 common misbeliefs everyone gets wrong
            </p>

            <p className="text-gray-800 leading-relaxed mt-8 mb-8">
            The fitness industry has sold you, to get in shape you must:
            </p>

            <p className="text-gray-800 leading-relaxed mb-6" data-numbered-list="true">
            <strong>1. Cut calories, skip meals, and restrict your food intake</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6" data-numbered-list="true">
            <strong>2. Train 4-6 days a week and push yourself harder in the gym</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6" data-numbered-list="true">
            <strong>3. Use discipline to control your drinking and lifestyle habits</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6" data-numbered-list="true">
            <strong>4. Take a load of supplements and track every part of your life</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mt-8 mb-6">           
             But here&apos;s the truth...
            </p>

            <p className="text-gray-800 leading-relaxed mt-8 mb-6">           
             You can get incredible results without doing ANY of that shit.
            </p>

            <p className="text-gray-800 leading-relaxed mt-8 mb-8">
              But if it&apos;s that easy... why isn&apos;t everyone jacked with high energy?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Well, it&apos;s because most people treat the symptoms instead of the real problem.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              They keep jumping round outdated methods like Keto and fasting.. so they never build a simple, easy system they can repeat for the next 10-20 years.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And without a predicatable system that fixes the root problems in your body, you&apos;ll keep on spinning your wheels.
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
