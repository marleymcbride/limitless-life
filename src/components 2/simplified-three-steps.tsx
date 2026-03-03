import { Check } from "lucide-react";
import { colorStrategy, buyerTypeUtils } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
  outcome: string;
  time: string;
}

export default function SimplifiedThreeStepsSection() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Reset Your Energy System",
      description:
        "Eliminate caffeine and alcohol dependencies while establishing your natural energy baseline through specific morning protocols.",
      outcome: "Wake up energized without coffee or stimulants",
      time: "Weeks 1-2",
    },
    {
      number: 2,
      title: "Optimize Your Performance",
      description:
        "Implement the 2-3 day training system and nutrition protocol that builds muscle while melting stress weight.",
      outcome: "Build elite physique while working less",
      time: "Weeks 3-6",
    },
    {
      number: 3,
      title: "Lock in Your Lifestyle",
      description:
        "Master the social situations, travel protocols, and stress management that make the results permanent.",
      outcome: "Maintain results forever without willpower",
      time: "Weeks 7-12",
    },
  ];

  return (
    <section className={`${colorStrategy.blackSections} py-20`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white/10 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            THE SYSTEM
          </span>
          <h2
            className={`${buyerTypeUtils.neanderthal.headlineClasses} mb-6 text-white`}
          >
            How It Works: 3 Simple Steps
          </h2>
          <p
            className={`text-xl md:text-2xl text-white/80 max-w-5xl mx-auto font-serif`}
          >
            No complexity. No confusion. Just a proven system that delivers
            results for busy high-performers.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${colorStrategy.whiteAccent} rounded-lg p-8 border-2 border-gray-300 relative`}
            >
              {/* Step Number */}
              <div
                className={`absolute -top-4 left-1/2 transform -translate-x-1/2`}
              >
                <div
                  className={`${colorStrategy.redCTA} w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-xl font-serif`}
                >
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="text-center pt-4">
                <h3
                  className={`text-xl font-black ${colorStrategy.blackSections} mb-4 font-serif`}
                >
                  {step.title}
                </h3>

                <p className={`text-gray-700 font-serif mb-6 leading-relaxed`}>
                  {step.description}
                </p>

                {/* Time Indicator */}
                <div
                  className={`inline-block ${colorStrategy.blackSections} px-4 py-2 rounded-lg mb-4`}
                >
                  <span
                    className={`text-sm font-bold text-white uppercase tracking-wider`}
                  >
                    {step.time}
                  </span>
                </div>

                {/* Outcome */}
                <div
                  className={`${colorStrategy.blackSections} rounded-lg p-4`}
                >
                  <div
                    className={`text-sm font-bold text-white uppercase tracking-wider mb-2`}
                  >
                    Result:
                  </div>
                  <div
                    className={`text-lg font-bold ${colorStrategy.redCTA} font-serif`}
                  >
                    {step.outcome}
                  </div>
                </div>
              </div>

              {/* Connection Lines (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className={`${colorStrategy.redCTA} w-8 h-1`}></div>
                  <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
                    <svg
                      className={`w-4 h-4 ${colorStrategy.redCTA}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Benefits - All Buyer Types */}
        <div className="max-w-5xl mx-auto">
          <div
            className={`${colorStrategy.whiteAccent} rounded-lg p-8 border border-gray-200`}
          >
            <h3
              className={`text-2xl font-black ${colorStrategy.blackSections} mb-6 text-center font-serif`}
            >
              What Makes This Different
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Check
                  className={`w-6 h-6 ${colorStrategy.redCTA} mr-3 flex-shrink-0 mt-1`}
                />
                <div>
                  <h4
                    className={`font-black ${colorStrategy.blackSections} font-serif mb-1`}
                  >
                    Built for High-Performers
                  </h4>
                  <p className={`text-gray-700 font-serif`}>
                    No 2-hour gym sessions. No meal prep that takes over your
                    Sunday.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Check
                  className={`w-6 h-6 ${colorStrategy.redCTA} mr-3 flex-shrink-0 mt-1`}
                />
                <div>
                  <h4
                    className={`font-black ${colorStrategy.blackSections} font-serif mb-1`}
                  >
                    Business-Optimized Results
                  </h4>
                  <p className={`text-gray-700 font-serif`}>
                    Better energy, focus, and performance where it matters most.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Check
                  className={`w-6 h-6 ${colorStrategy.redCTA} mr-3 flex-shrink-0 mt-1`}
                />
                <div>
                  <h4
                    className={`font-black ${colorStrategy.blackSections} font-serif mb-1`}
                  >
                    Complete Independence
                  </h4>
                  <p className={`text-gray-700 font-serif`}>
                    No supplements. No dependency. Just sustainable habits.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Check
                  className={`w-6 h-6 ${colorStrategy.redCTA} mr-3 flex-shrink-0 mt-1`}
                />
                <div>
                  <h4
                    className={`font-black ${colorStrategy.blackSections} font-serif mb-1`}
                  >
                    Guaranteed Results
                  </h4>
                  <p className={`text-gray-700 font-serif`}>
                    If you don't see the transformation, you don't pay. Simple.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
