"use client";

import { CTAButton } from "./ui/cta-button";

export default function ProcessExplanation() {
  return (
    <section className="bg-black py-20 px-4 w-full">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-100 mb-12" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif' }}>
          Well after 3 years... I found a NEW way to live:
          </h3>

          <div className="space-y-8 mb-12 max-w-3xl mx-auto">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif' }}>
                1) How to Wake Up Energized Without Coffee
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Most people eat foods that work against their body&apos;s natural energy patterns. I discovered you can eat substantial food in the morning and actually feel better. This isn&apos;t about intermittent fasting or starving yourself—it&apos;s about working with your body instead of fighting it. You can wake up feeling great without needing any stimulants.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif' }}>
              2) How to Get In Your Best Shape With Just 2 Workouts A Week
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Training 2 days a week can be more effective than 5-6 days. Your body works as a whole system, not isolated parts. Less training eliminates the body aches and that dread of going to the gym. Plus it creates more time for recovery activities like sauna, swimming, hiking. The crazy part? Less frequent training actually delivers better results.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif' }}>
              3) How to End Your Dependence On Coffee And Alcohol
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                You can break free from the caffeine-alcohol cycle. Most people don&apos;t realize their baseline energy can be a consistent 60-70% without any stimulants. Humans weren&apos;t designed to need caffeine—its mainstream use is only about 100 years old. You can become naturally calm, confident, and comfortable without these crutches.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif' }}>
              4) How to Fix What&apos;s Really Holding You Back
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                You have to address the underlying health issues first—blood work, testosterone, gut health, adrenals. Skipping this step is like painting over a cracked wall. Only when your core health is resolved can other approaches work effectively. This is what makes everything else possible. You can&apos;t build a strong house on a broken foundation.
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