import { Check, X } from "lucide-react"
import { bgClasses, masculinePattern } from "@/lib/utils"
import ApplyNowButton from "./apply-now-button"

export default function ComparisonTable() {
  const comparisonItems = [
    {
      criteria: "Energy Levels",
      before: "Constantly exhausted, dependent on caffeine and sugar",
      after: "Steady, sustainable energy from morning to night"
    },
    {
      criteria: "Body Composition",
      before: "Carrying 15-30+ lbs of excess weight, especially around the midsection",
      after: "Lean, strong physique with defined muscles and less body fat"
    },
    {
      criteria: "Mental Performance",
      before: "Brain fog, poor focus, difficulty making decisions",
      after: "Razor-sharp focus, quick decision-making, mental clarity"
    },
    {
      criteria: "Sleep Quality",
      before: "Restless, interrupted sleep, waking up exhausted",
      after: "Deep, restorative sleep, waking refreshed before the alarm"
    },
    {
      criteria: "Stress Management",
      before: "Overwhelmed by stress, frequent anxiety",
      after: "Calm, composed, and resilient even under pressure"
    },
    {
      criteria: "Work Productivity",
      before: "Scattered focus, procrastination, long hours with diminishing returns",
      after: "Laser focus, efficient work habits, accomplishing more in less time"
    },
    {
      criteria: "Health Markers",
      before: "Concerning blood pressure, blood sugar, and inflammation levels",
      after: "Optimized health markers across the board"
    },
    {
      criteria: "Family Time",
      before: "Too tired to be present, irritable with loved ones",
      after: "Fully engaged, patient, and energetic with family"
    }
  ]

  return (
    <section className={`w-full py-20 ${bgClasses.darkRed} relative`}>
      {masculinePattern}

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="mb-4 text-center text-3xl sm:text-4xl font-bold">Before & After: The Limitless Transformation</h2>
        <p className="text-center text-xl mb-12 max-w-3xl mx-auto">
          The choice is yours - continue struggling with energy drains or transform every aspect of your life
        </p>

        <div className="mx-auto max-w-5xl overflow-x-auto rounded-lg shadow-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left border-b border-white/10 w-1/4 bg-black/30">Criteria</th>
                <th className="p-4 text-left border-b border-white/10 w-3/8 bg-black/50">
                  <div className="flex items-center">
                    <X className="h-5 w-5 text-red-300 mr-2" />
                    <span>Before Limitless (Where You Are Now)</span>
                  </div>
                </th>
                <th className="p-4 text-left border-b border-white/10 w-3/8 bg-white/10">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-white mr-2" />
                    <span>After Limitless (Where You'll Be)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonItems.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-black/20" : "bg-black/10"}>
                  <td className="p-4 border-b border-white/10 font-medium">{item.criteria}</td>
                  <td className="p-4 border-b border-white/10 text-gray-300 bg-black/30">{item.before}</td>
                  <td className="p-4 border-b border-white/10 text-white bg-white/5 font-medium">{item.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-10 max-w-3xl mx-auto bg-black/20 p-6 rounded-lg">
          <p className="text-lg mb-6">
            <span className="font-bold">95% of men</span> stay stuck in the left column their entire lives. The <span className="font-bold">Limitless 1%</span> take action and transform every aspect of their existence.
          </p>

          <p className="text-xl font-bold mb-8">The choice is clear. Join the 1% who've discovered the Limitless secret.</p>

          <ApplyNowButton className="bg-white text-[#940909] hover:bg-gray-100" />
        </div>
      </div>
    </section>
  )
}
