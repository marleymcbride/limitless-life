import { Check, X } from "lucide-react";
import { colorStrategy, buyerTypeUtils } from "@/lib/utils";

interface ComparisonItem {
  feature: string;
  traditionalGyms: string;
  fadDiets: string;
  supplements: string;
  ourSystem: string;
}

export default function SwitcherComparisonTableSection() {
  const comparisonData: ComparisonItem[] = [
    {
      feature: "Natural energy without caffeine",
      traditionalGyms: "❌ Never addressed",
      fadDiets: "❌ Energy crashes",
      supplements: "❌ More dependency",
      ourSystem: "✅ Built-in energy system"
    },
    {
      feature: "Alcohol independence",
      traditionalGyms: "❌ Ignored completely",
      fadDiets: "❌ Makes cravings worse",
      supplements: "❌ Doesn't address habits",
      ourSystem: "✅ Complete elimination"
    },
    {
      feature: "Time commitment",
      traditionalGyms: "❌ 5-6 days per week",
      fadDiets: "❌ Constant meal prep",
      supplements: "❌ Daily pill regimen",
      ourSystem: "✅ 2-3 gym days maximum"
    },
    {
      feature: "Sustainable results",
      traditionalGyms: "❌ 80% quit within 6 months",
      fadDiets: "❌ 95% regain weight",
      supplements: "❌ Effects disappear when stopped",
      ourSystem: "✅ Lasting lifestyle change"
    },
    {
      feature: "Mental clarity & focus",
      traditionalGyms: "❌ Physical focus only",
      fadDiets: "❌ Brain fog from restriction",
      supplements: "❌ Temporary boost",
      ourSystem: "✅ Permanent mental upgrade"
    },
    {
      feature: "Business performance impact",
      traditionalGyms: "❌ Takes time from work",
      fadDiets: "❌ Low energy affects decisions",
      supplements: "❌ Dependency creates issues",
      ourSystem: "✅ Enhances professional edge"
    }
  ];

  return (
    <section className={`${colorStrategy.whiteSections} py-20`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${buyerTypeUtils.neanderthal.headlineClasses} mb-6 ${colorStrategy.blackSections}`}>
            Why High-Earners Switch to This Program
          </h2>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-serif`}>
            You've tried the traditional approaches. Here's why they fail busy professionals,
            and how this system is designed differently.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto overflow-hidden rounded-lg border-2 border-gray-300">
          {/* Header Row */}
          <div className={`${colorStrategy.blackSections} grid grid-cols-5 p-6 border-b-2 border-gray-300`}>
            <div className="text-left">
              <h3 className={`text-lg font-black text-white font-serif`}>Feature</h3>
            </div>
            <div className="text-center">
              <h3 className={`text-lg font-black text-white font-serif`}>Traditional Gyms</h3>
            </div>
            <div className="text-center">
              <h3 className={`text-lg font-black text-white font-serif`}>Fad Diets</h3>
            </div>
            <div className="text-center">
              <h3 className={`text-lg font-black text-white font-serif`}>Supplements</h3>
            </div>
            <div className={`${colorStrategy.blackSections} text-center relative`}>
              <div className="absolute inset-0 bg-[#940909] opacity-20"></div>
              <h3 className={`text-lg font-black ${colorStrategy.redCTA} font-serif relative`}>This System</h3>
            </div>
          </div>

          {/* Data Rows */}
          {comparisonData.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 p-6 border-b border-gray-200 ${
                index % 2 === 0 ? colorStrategy.whiteSections : colorStrategy.whiteAccent
              }`}
            >
              <div className="flex items-center">
                <span className={`text-lg font-semibold ${colorStrategy.blackSections} font-serif`}>
                  {item.feature}
                </span>
              </div>

              <div className="flex items-center justify-center">
                <span className="text-lg text-gray-600 font-serif">{item.traditionalGyms}</span>
              </div>

              <div className="flex items-center justify-center">
                <span className="text-lg text-gray-600 font-serif">{item.fadDiets}</span>
              </div>

              <div className="flex items-center justify-center">
                <span className="text-lg text-gray-600 font-serif">{item.supplements}</span>
              </div>

              <div className={`flex items-center justify-center ${buyerTypeUtils.neanderthal.resultClasses} font-serif font-bold`}>
                {item.ourSystem}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary - JOBS WORTH Appeal */}
        <div className={`mt-12 ${colorStrategy.blackSections} rounded-lg p-8 text-center`}>
          <h3 className={`text-2xl font-black ${colorStrategy.redCTA} mb-4 font-serif`}>
            The Difference is Clear
          </h3>
          <p className={`text-lg text-white max-w-3xl mx-auto font-serif leading-relaxed`}>
            Other approaches treat symptoms. We engineer the complete high-performance lifestyle
            that busy executives need to excel in business and dominate in life.
          </p>

          <div className="mt-6">
            <div className={`inline-block ${colorStrategy.redCTA} px-6 py-3 rounded-lg font-bold font-serif`}>
              No more wasted time. No more temporary fixes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}