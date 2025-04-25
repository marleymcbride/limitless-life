import { Check, X } from "lucide-react"
import { bgClasses, invertedGradientOverlay, strongRedAccent, vignetteEffect } from "@/lib/utils"
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
    <section className={`w-full py-20 ${bgClasses.blackRedGradient} relative`}>
      {invertedGradientOverlay}
      {strongRedAccent}
      {vignetteEffect}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-white/10 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">THE TRANSFORMATION</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Before & After: The Limitless Shift</h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto">
            It's your choice - stay trapped in energy drains or transform every aspect of your life
          </p>
        </div>

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
                <tr key={index} className={index % 2 === 0 ? "bg-black/20 hover:bg-black/30 transition-colors" : "bg-black/10 hover:bg-black/20 transition-colors"}>
                  <td className="p-4 border-b border-white/10 font-medium">{item.criteria}</td>
                  <td className="p-4 border-b border-white/10 text-gray-300 bg-black/30">{item.before}</td>
                  <td className="p-4 border-b border-white/10 text-white bg-white/5 font-medium">{item.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-12 max-w-3xl mx-auto bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-[#940909]/30">
          <p className="text-xl mb-6">
            <span className="font-bold">95% of men</span> stay stuck in the left column their entire lives. The <span className="font-bold">Limitless 1%</span> take action and transform every aspect of their existence.
          </p>

          <p className="text-2xl font-bold mb-8">The choice is clear. Join the 1% who've discovered the Limitless secret.</p>

          <ApplyNowButton className="bg-white text-[#940909] hover:bg-gray-100" />
        </div>
      </div>
    </section>
  )
}
