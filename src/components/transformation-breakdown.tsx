import { colorStrategy, buyerTypeUtils } from "@/lib/utils";

interface Transformation {
  category: string;
  before: string;
  after: string;
  timeline: string;
  impact: string;
}

export default function TransformationBreakdownSection() {
  const transformations: Transformation[] = [
    {
      category: "Energy & Performance",
      before: "3-4 coffees daily, afternoon crashes, poor sleep quality",
      after: "Natural morning energy, consistent performance, deep sleep",
      timeline: "2-3 weeks",
      impact: "47% higher productivity, better decision-making"
    },
    {
      category: "Physical Transformation",
      before: "20-40 lbs of stress weight, poor body composition",
      after: "Elite physique, 11-14% body fat, visible muscle definition",
      timeline: "8-12 weeks",
      impact: "100% confidence in appearance, clothes fit better"
    },
    {
      category: "Mental Clarity",
      before: "Brain fog, anxiety, difficulty focusing in meetings",
      after: "Razor-sharp focus, calm under pressure, clear thinking",
      timeline: "3-4 weeks",
      impact: "Better leadership, improved problem-solving"
    },
    {
      category: "Social & Professional",
      before: "Alcohol dependency for networking, poor social energy",
      after: "Complete alcohol independence, natural social confidence",
      timeline: "4-6 weeks",
      impact: "Better networking, professional presence"
    },
    {
      category: "Health & Longevity",
      before: "Elevated stress markers, poor recovery, aging quickly",
      after: "Optimized health markers, fast recovery, biological age reversal",
      timeline: "6-8 weeks",
      impact: "Longer healthspan, better disease prevention"
    },
    {
      category: "Time & Freedom",
      before: "5-6 gym sessions per week, meal prep obsession",
      after: "2-3 efficient workouts, simple nutrition systems",
      timeline: "Immediate",
      impact: "10+ hours saved weekly, more family time"
    }
  ];

  return (
    <section className={`${colorStrategy.whiteSections} py-20`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${buyerTypeUtils.neanderthal.headlineClasses} mb-6 ${colorStrategy.blackSections}`}>
            What You'll Actually Achieve
          </h2>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-serif`}>
            This isn't about losing a few pounds. This is about completely upgrading
            your performance as a man, leader, and high-achiever.
          </p>
        </div>

        {/* Transformations Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {transformations.map((item, index) => (
            <div
              key={index}
              className={`${colorStrategy.whiteAccent} rounded-lg p-6 border border-gray-300`}
            >
              {/* Category Header */}
              <div className={`text-center mb-6`}>
                <h3 className={`text-xl font-black ${colorStrategy.blackSections} font-serif mb-2`}>
                  {item.category}
                </h3>
                <div className={`inline-block ${colorStrategy.blackSections} px-3 py-1 rounded-full`}>
                  <span className={`text-sm font-bold text-white uppercase tracking-wider`}>
                    {item.timeline}
                  </span>
                </div>
              </div>

              {/* Before/After */}
              <div className="space-y-4">
                <div className={`${colorStrategy.blackSections} rounded-lg p-4`}>
                  <div className={`text-sm font-bold text-white uppercase tracking-wider mb-2`}>
                    Before:
                  </div>
                  <p className={`text-gray-300 font-serif`}>
                    {item.before}
                  </p>
                </div>

                <div className="text-center">
                  <svg className={`w-6 h-6 ${colorStrategy.redCTA} mx-auto`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <div className={`bg-green-50 border border-green-200 rounded-lg p-4`}>
                  <div className={`text-sm font-bold text-green-800 uppercase tracking-wider mb-2`}>
                    After:
                  </div>
                  <p className={`text-green-700 font-serif font-semibold`}>
                    {item.after}
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div className={`mt-4 p-3 ${colorStrategy.blackSections} rounded-lg text-center`}>
                <div className={`text-sm font-bold text-white uppercase tracking-wider mb-1`}>
                  Business Impact:
                </div>
                <div className={`text-base font-bold ${colorStrategy.redCTA} font-serif`}>
                  {item.impact}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary - All Buyer Types */}
        <div className={`max-w-4xl mx-auto ${colorStrategy.blackSections} rounded-lg p-8 text-center`}>
          <h3 className={`text-2xl font-black ${colorStrategy.redCTA} mb-4 font-serif`}>
            This Is More Than Fitness. It's Performance Optimization.
          </h3>
          <p className={`text-lg text-white max-w-3xl mx-auto font-serif leading-relaxed mb-6`}>
            While other programs focus only on weight loss, we engineer complete life upgrades.
            You're not just building a better body - you're building a better business, better
            leadership, and a better legacy.
          </p>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-6`}>
            <div>
              <div className={`text-2xl font-black ${colorStrategy.redCTA} font-serif`}>
                100%
              </div>
              <div className={`text-sm text-white uppercase tracking-wider`}>
                Independence
              </div>
            </div>
            <div>
              <div className={`text-2xl font-black ${colorStrategy.redCTA} font-serif`}>
                2-3 days
              </div>
              <div className={`text-sm text-white uppercase tracking-wider`}>
                Per Week
              </div>
            </div>
            <div>
              <div className={`text-2xl font-black ${colorStrategy.redCTA} font-serif`}>
                12 weeks
              </div>
              <div className={`text-sm text-white uppercase tracking-wider`}>
                Total Timeline
              </div>
            </div>
            <div>
              <div className={`text-2xl font-black ${colorStrategy.redCTA} font-serif`}>
                Forever
              </div>
              <div className={`text-sm text-white uppercase tracking-wider`}>
                Results Last
              </div>
            </div>
          </div>

          <p className={`text-lg font-bold ${colorStrategy.redCTA} font-serif`}>
            The ROI on this transformation compounds for the rest of your life.
          </p>
        </div>
      </div>
    </section>
  );
}