"use client";

import { CTAButton } from "./ui/cta-button";

export default function CoreValueProposition() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-8"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            After Working With Countless Exhausted Men, I Realised There Are
            Only 3 Things You Need To Restore Your Energy
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            I spent years trying everything. Complex systems, expensive
            supplements, punishing workouts. But the real breakthrough came when
            I stopped looking for more solutions and started understanding what
            was actually broken.
          </p>

          <div className="space-y-8 mb-12">
            <div className="text-left">
              <h3
                className="text-2xl font-bold text-black mb-4"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                Fix why you wake up feeling rough every day
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Your morning energy isn't a caffeine problem - it's a signaling
                problem. Your body is sending you clear signals that something
                is fundamentally wrong. Once you fix the root cause, you'll wake
                up naturally energized without any stimulants.
              </p>
            </div>

            <div className="text-left">
              <h3
                className="text-2xl font-bold text-black mb-4"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                Work with your body's natural rhythms, not against them
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                High-performers try to force their bodies through sheer
                willpower. But your body has incredible intelligence. When you
                learn to work with its natural systems instead of fighting them,
                everything becomes easier and the results become permanent.
              </p>
            </div>

            <div className="text-left">
              <h3
                className="text-2xl font-bold text-black mb-4"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                Build a system that works even when you're busy
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                The biggest lie in fitness is that you need to spend hours in
                the gym. That's impossible for successful men. The right system
                delivers incredible results with just 2-3 focused sessions per
                week, because it works with your lifestyle instead of against
                it.
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
