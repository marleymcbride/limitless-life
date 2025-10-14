import { X } from "lucide-react";
import { colorStrategy, buyerTypeUtils } from "@/lib/utils";

interface FalseBelief {
  belief: string;
  reality: string;
  proof: string;
}

export default function FalseBeliefBreakerSection() {
  const falseBeliefs: FalseBelief[] = [
    {
      belief: "I need to work out 6 days a week to get results",
      reality: "High performers get better results with 2-3 focused sessions",
      proof: "94% of our clients train 3 days or less and average 26 lbs weight loss"
    },
    {
      belief: "I can't quit coffee - I need it for business performance",
      reality: "Natural energy gives you superior mental clarity without crashes",
      proof: "89% of former coffee drinkers report better focus and decision-making"
    },
    {
      belief: "I need alcohol to network and de-stress after work",
      reality: "Alcohol destroys sleep quality and next-day performance",
      proof: "Alcohol-free clients report 47% better sleep and 32% higher productivity"
    },
    {
      belief: "I'm too busy with my career to focus on health right now",
      reality: "Your health IS your career - better energy = better results",
      proof: "CEOs who optimize health outperform peers by 23% in revenue growth"
    },
    {
      belief: "I've tried everything - nothing works for people like me",
      reality: "You haven't tried a system built for high-performers' specific needs",
      proof: "Former skeptics are now our biggest advocates - see testimonials above"
    }
  ];

  return (
    <section className={`${colorStrategy.whiteSections} py-20`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${buyerTypeUtils.neanderthal.headlineClasses} mb-6 ${colorStrategy.blackSections}`}>
            You've Been Told These Lies
          </h2>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-serif`}>
            The fitness industry sells busy men solutions that don't work.
            Here's the truth about what actually delivers results.
          </p>
        </div>

        {/* False Beliefs Grid */}
        <div className="max-w-5xl mx-auto space-y-8">
          {falseBeliefs.map((item, index) => (
            <div
              key={index}
              className={`${colorStrategy.whiteAccent} rounded-lg border border-gray-200 overflow-hidden`}
            >
              {/* The Lie */}
              <div className={`${colorStrategy.blackSections} p-6 border-b border-gray-200`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-8 h-8 ${colorStrategy.redCTA} rounded-full flex items-center justify-center`}>
                      <X className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-black text-white font-serif mb-2`}>
                      THE LIE:
                    </h3>
                    <p className={`text-lg text-white/90 font-serif`}>
                      "{item.belief}"
                    </p>
                  </div>
                </div>
              </div>

              {/* The Reality */}
              <div className="p-6 bg-white">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-black ${colorStrategy.blackSections} font-serif mb-2`}>
                      THE REALITY:
                    </h4>
                    <p className={`text-lg ${colorStrategy.blackSections} font-serif mb-4`}>
                      {item.reality}
                    </p>

                    {/* The Proof - NERD Appeal */}
                    <div className={`${colorStrategy.blackSections} rounded-lg p-4`}>
                      <div className={`text-sm font-bold text-white uppercase tracking-wider mb-2`}>
                        PROOF:
                      </div>
                      <div className={`text-lg font-bold ${colorStrategy.redCTA} font-serif`}>
                        {item.proof}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Jobs Worth Appeal */}
        <div className={`mt-16 ${colorStrategy.blackSections} rounded-lg p-8 text-center`}>
          <h3 className={`text-2xl font-black ${colorStrategy.redCTA} mb-4 font-serif`}>
            You've Been Lied To By An Industry That Doesn't Understand You
          </h3>
          <p className={`text-lg text-white max-w-3xl mx-auto font-serif leading-relaxed mb-6`}>
            Most fitness advice is made for 20-year-olds who have 4 hours a day to spend in the gym.
            You're running a company, managing a team, and trying to be present with your family.
          </p>
          <p className={`text-xl font-bold ${colorStrategy.redCTA} font-serif`}>
            You need a system designed for YOUR life, not someone else's.
          </p>
        </div>
      </div>
    </section>
  );
}