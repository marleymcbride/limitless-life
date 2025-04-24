import ApplyNowButton from "./apply-now-button"
import { bgClasses, masculinePattern } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function SolutionSection() {
  return (
    <section className={`w-full py-20 text-white ${bgClasses.darkRed} relative`}>
      {masculinePattern}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">Introducing</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">The Limitless Protocol</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Not Another Workout Plan or Diet - A Complete Reset of Your Energy Systems
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h3 className="mb-4 text-2xl font-bold">The Complete System For High-Performers</h3>
            <p className="mb-4 text-lg">
              The Limitless Protocol isn't another workout plan or diet. It's a complete reset of your energy systems that eliminates caffeine dependency, restores natural vitality, and transforms your body in just 12 weeks.
            </p>
            <p className="mb-4 text-lg">
              Unlike generic fitness programs - one-size-fits-all health advice, Limitless specifically engineered for busy executives - entrepreneurs - high-performing men in their 30s, 40s, and 50s.
            </p>
            <p className="text-lg">
              We don't just focus on one aspect of health. Our proprietary system targets all four critical systems determining your energy - physical appearance - mental clarity - overall performance. Working together - not against each other.
            </p>
          </div>

          {/* Micro-testimonial for social proof */}
          <MicroTestimonial
            quote="The difference with Limitless is that it's a complete system. Not just training, not just nutrition. Everything works together."
            name="Kevin P."
            title="Senior Partner, Law Firm"
            metric="2x Daily Energy"
          />

          <div className="grid gap-8 md:grid-cols-2 mt-12">
            <div className="rounded-lg bg-white/10 border border-white/20 p-6 shadow-lg transform transition-all hover:scale-105">
              <h4 className="mb-3 text-xl font-bold">System 1: Metabolic Optimization</h4>
              <p className="text-white/90">
                Advanced metabolic profiling identifies unique energy pathways - optimizes them using precision nutrition protocols. No caffeine needed. Natural energy all day long.
              </p>
            </div>

            <div className="rounded-lg bg-white/10 border border-white/20 p-6 shadow-lg transform transition-all hover:scale-105">
              <h4 className="mb-3 text-xl font-bold">System 2: Physiological Restoration</h4>
              <p className="text-white/90">
                Recalibrate hormonal balance - sleep architecture - recovery mechanisms. Your body rebuilds naturally overnight. Wake up feeling incredible without alarm clock.
              </p>
            </div>

            <div className="rounded-lg bg-white/10 border border-white/20 p-6 shadow-lg transform transition-all hover:scale-105">
              <h4 className="mb-3 text-xl font-bold">System 3: Cognitive Enhancement</h4>
              <p className="text-white/90">
                Neurocognitive training system optimizes mental performance - focus - stress resilience. Eliminate brain fog. Make better decisions. Think clearly all day.
              </p>
            </div>

            <div className="rounded-lg bg-white/10 border border-white/20 p-6 shadow-lg transform transition-all hover:scale-105">
              <h4 className="mb-3 text-xl font-bold">System 4: Behavioral Integration</h4>
              <p className="text-white/90">
                Sustainable habit engineering fits your busy lifestyle. No willpower needed. System does the work - not you. Lasting results without requiring hours of your time each day.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <ApplyNowButton />
          </div>
        </div>
      </div>
    </section>
  )
}
