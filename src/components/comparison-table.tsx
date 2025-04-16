import { Check, X } from "lucide-react"

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
    <section className="w-full bg-black py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Before & After: The Limitless Transformation</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          See what life looks like before and after our 12-week program
        </p>

        <div className="mx-auto max-w-5xl overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left border-b border-zinc-800 w-1/4">Criteria</th>
                <th className="p-4 text-left border-b border-zinc-800 w-3/8 bg-zinc-800/50">
                  <div className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <span>Before Limitless</span>
                  </div>
                </th>
                <th className="p-4 text-left border-b border-zinc-800 w-3/8 bg-[#940909]/10">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-[#940909] mr-2" />
                    <span>After Limitless</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonItems.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-zinc-900/50" : ""}>
                  <td className="p-4 border-b border-zinc-800 font-medium">{item.criteria}</td>
                  <td className="p-4 border-b border-zinc-800 text-zinc-400 bg-zinc-800/20">{item.before}</td>
                  <td className="p-4 border-b border-zinc-800 text-white bg-[#940909]/5 font-medium">{item.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}