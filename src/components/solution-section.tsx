import ApplyNowButton from "./apply-now-button"

export default function SolutionSection() {
    return (
      <section className="w-full py-16 text-white bg-dark-red">
        <div className="container mx-auto px-4">
          <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl">Introducing The Limitless Protocol</h2>
          <p className="mb-12 text-center text-xl">
            Not Another Workout Plan or Diet - A Complete Reset of Your Energy Systems
          </p>

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

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white/10 border border-white/20 p-6 shadow-lg">
                <h4 className="mb-3 text-xl font-bold">System 1: Metabolic Optimization</h4>
                <p>
                  Advanced metabolic profiling identifies unique energy pathways - optimizes them using precision nutrition protocols. No caffeine needed. Natural energy all day long.
                </p>
              </div>

              <div className="rounded-lg bg-white/10 border border-white/20 p-6 shadow-lg">
                <h4 className="mb-3 text-xl font-bold">System 2: Physiological Restoration</h4>
                <p>
                  Recalibrate hormonal balance - sleep architecture - recovery mechanisms. Your body rebuilds naturally overnight. Wake up feeling incredible without alarm clock.
                </p>
              </div>

              <div className="rounded-lg bg-white/10 border border-white/20 p-6 shadow-lg">
                <h4 className="mb-3 text-xl font-bold">System 3: Cognitive Enhancement</h4>
                <p>
                  Neurocognitive training system optimizes mental performance - focus - stress resilience. Eliminate brain fog. Make better decisions. Think clearly all day.
                </p>
              </div>

              <div className="rounded-lg bg-white/10 border border-white/20 p-6 shadow-lg">
                <h4 className="mb-3 text-xl font-bold">System 4: Behavioral Integration</h4>
                <p>
                  Sustainable habit engineering fits your busy lifestyle. No willpower needed. System does the work - not you. Lasting results without requiring hours of your time each day.
                </p>
              </div>
            </div>

            {/* Apply Now Button - Visible on mobile only */}
            <div className="block sm:hidden mt-12">
              <ApplyNowButton />
            </div>
          </div>
        </div>
      </section>
    )
  }
