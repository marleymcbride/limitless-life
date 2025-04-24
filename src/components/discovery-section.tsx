import { Lightbulb } from "lucide-react"

export default function DiscoverySection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#940909] flex items-center justify-center mb-4">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">The 80/20 Discovery That Changed Everything</h2>
        </div>

        <div className="max-w-3xl mx-auto text-lg">
          <p className="mb-4">
            Then I discovered real problem wasn't motivation or discipline. It was my body's energy systems completely broken from years of stress - poor nutrition - substance dependency.
          </p>

          <p className="mb-4">
            Tried fixing symptoms - fatigue, weight gain, brain fog. But wasn't addressing root cause - systemic energy failure across four critical bodily systems.
          </p>

          <p className="mb-4">
            Found 80% of results came from fixing 20% of issues. Not more workouts - not another diet - not another productivity hack. Needed total system reset.
          </p>

          <p className="mb-4">
            <span className="font-semibold">Your body isn't broken - just running wrong program.</span> Coffee masking fatigue - not fixing it. Alcohol numbing stress - not releasing it. Exercise draining you - not energizing you.
          </p>

          <p className="mb-6">
            Created The Limitless Protocol. Complete systems approach to restore natural energy state. Reset four critical systems - Metabolic, Recovery, Hormonal, Neurological. All working together.
          </p>

          <div className="bg-[#940909]/10 p-6 rounded-lg border-l-4 border-[#940909] text-left">
            <p className="text-base font-semibold">
              "Remember how it felt waking up as a kid. Pure energy. No coffee needed. This is what we restore. Not through quick fixes or temporary solutions - through fundamental system recalibration."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
