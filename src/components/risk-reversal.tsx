import { Shield, CheckCircle } from "lucide-react";
import { colorStrategy, buyerTypeUtils } from "@/lib/utils";

export default function RiskReversalSection() {
  const guaranteePoints = [
    {
      title: "Complete Transformation",
      description:
        "If you don't lose 20+ lbs, quit caffeine/alcohol completely, and build elite physique - you pay nothing.",
    },
    {
      title: "Business Performance",
      description:
        "If your energy, focus, and decision-making don't improve measurably - you pay nothing.",
    },
    {
      title: "Time Investment",
      description:
        "If you can't maintain the system with 2-3 gym days per week - you pay nothing.",
    },
    {
      title: "No Questions Asked",
      description:
        "If you're not 100% satisfied for any reason - you pay nothing. No hoops, no hassles.",
    },
  ];

  return (
    <section className={`${colorStrategy.blackSections} py-20`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className={`${colorStrategy.redCTA} p-4 rounded-full`}>
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2
            className={`${buyerTypeUtils.neanderthal.headlineClasses} mb-6 text-white`}
          >
            100% Money-Back Guarantee
          </h2>
          <p
            className={`text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-serif`}
          >
            I guarantee your transformation. If this system doesn't deliver
            everything I promise, you don't pay a dime.
          </p>
        </div>

        {/* Main Guarantee Statement */}
        <div
          className={`max-w-4xl mx-auto ${colorStrategy.whiteAccent} rounded-lg p-8 border-2 border-yellow-400 mb-12`}
        >
          <div className="text-center">
            <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-lg mb-4">
              <span className="font-black text-lg font-serif">
                MY PERSONAL GUARANTEE
              </span>
            </div>

            <h3
              className={`text-2xl font-black ${colorStrategy.blackSections} mb-6 font-serif`}
            >
              "Transform Completely or Pay Nothing"
            </h3>

            <p
              className={`text-lg ${colorStrategy.blackSections} font-serif leading-relaxed mb-6`}
            >
              I'm putting all the risk on myself. Because I know this system
              works for high-performers who actually implement it. You will see
              results that blow your mind, or you won't pay a cent.
            </p>

            <div
              className={`${colorStrategy.blackSections} rounded-lg p-6 text-center`}
            >
              <div
                className={`text-3xl font-black ${colorStrategy.redCTA} font-serif mb-2`}
              >
                100% MONEY-BACK
              </div>
              <div
                className={`text-lg font-bold text-white uppercase tracking-wider`}
              >
                No Questions. No Hassles. No Risk.
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Breakdown */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {guaranteePoints.map((point, index) => (
            <div
              key={index}
              className={`${colorStrategy.whiteAccent} rounded-lg p-6 border border-gray-200`}
            >
              <div className="flex items-start">
                <CheckCircle
                  className={`w-6 h-6 ${colorStrategy.redCTA} mr-3 flex-shrink-0 mt-1`}
                />
                <div>
                  <h4
                    className={`text-lg font-black ${colorStrategy.blackSections} font-serif mb-2`}
                  >
                    {point.title}
                  </h4>
                  <p className={`text-gray-700 font-serif leading-relaxed`}>
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Risk Reversal - Jobs Worth Appeal */}
        <div className={`max-w-4xl mx-auto text-center`}>
          <div
            className={`${colorStrategy.whiteAccent} rounded-lg p-8 border-2 border-gray-300`}
          >
            <h3
              className={`text-xl font-black ${colorStrategy.blackSections} mb-4 font-serif`}
            >
              You've Been Burned Before. I Get It.
            </h3>
            <p
              className={`text-lg ${colorStrategy.blackSections} font-serif leading-relaxed mb-6`}
            >
              Most programs overpromise and underdeliver. That's why I'm taking
              all the risk. You either get the complete transformation I
              promise, or you don't pay. Period.
            </p>

            <div className={`${colorStrategy.blackSections} rounded-lg p-6`}>
              <div className={`text-lg font-bold text-white mb-2 font-serif`}>
                The worst-case scenario?
              </div>
              <div
                className={`text-2xl font-black ${colorStrategy.redCTA} font-serif`}
              >
                You try it for free and learn what actually works.
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-12 text-center`}>
          <p className={`text-lg text-white/80 font-serif mb-4`}>
            This guarantee is backed by my reputation and the results of
            hundreds of high-performing men just like you.
          </p>
          <div
            className={`inline-block ${colorStrategy.redCTA} px-6 py-3 rounded-lg font-bold font-serif`}
          >
            No fine print. No loopholes. No risk to you.
          </div>
        </div>
      </div>
    </section>
  );
}
