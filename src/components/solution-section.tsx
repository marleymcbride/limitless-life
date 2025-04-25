import ApplyNowButton from "./apply-now-button"
import { bgClasses, masculinePattern } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function SolutionSection() {
  return (
    <section className="w-full py-20 text-white bg-zinc-900 relative">
      {masculinePattern}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">Introducing</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">The Limitless Protocol</h2>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Not Another Workout Plan or Diet - A Complete Reset of Your Energy Systems
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h3 className="mb-4 text-2xl font-bold text-white">The Complete System To Achieve Your Natty Sweet Spot</h3>
            <p className="mb-4 text-lg text-white">
              The Limitless Protocol isn't another workout plan or diet - it's a complete reset of your entire being. Transforms your <span className="font-bold">Body</span>, optimizes your <span className="font-bold">Hormones</span>, restores your <span className="font-bold">Health</span>, creates <span className="font-bold">Peace</span>, unleashes natural <span className="font-bold">Energy</span>, strengthens <span className="font-bold">Mental Health</span>, and ensures lasting <span className="font-bold">Happiness</span> - all in just 12 weeks.
            </p>
            <p className="mb-4 text-lg text-white">
              Most men chase isolated goals - bigger muscles - more weight loss - less stress. This fails because your body is a complete system. The Limitless Protocol integrates all 7 components of peak male existence - engineered specifically for high-performers in their 30s, 40s and 50s who refuse to compromise.
            </p>
            <p className="text-lg text-white">
              I help high-performing men quit alcohol permanently - eliminate fake energy crutches - drop 20-40 lbs of stress weight. You finally wake up sharp and dialled in every morning - see your elite body in the mirror - feel naturally high on life — without caffeine or alcohol ever again.
            </p>
          </div>

          {/* Micro-testimonial for social proof */}
          <MicroTestimonial
            quote="The difference with Limitless is that it's a complete system. Not just training, not just nutrition. Everything works together."
            name="Kevin P."
            title="Senior Partner, Law Firm"
            metric="2x Daily Energy"
          />

          <div className="grid gap-6 md:grid-cols-2 mt-12">
            <div className="rounded-lg bg-black/30 border border-white/20 p-6 shadow-lg transform transition-all hover:scale-105">
              <h4 className="mb-3 text-xl font-bold text-white">Body & Hormones System</h4>
              <p className="text-white/90">
                Perfect body composition (11-14% body fat) - optimized testosterone levels - bulletproof immunity. Builds the ideal male physique without endless training. Uses minimum effective dose approach - just 2-3 workouts weekly.
              </p>
            </div>

            <div className="rounded-lg bg-black/30 border border-white/20 p-6 shadow-lg transform transition-all hover:scale-105">
              <h4 className="mb-3 text-xl font-bold text-white">Energy & Health System</h4>
              <p className="text-white/90">
                Identifies broken energy pathways - rebuilds them through precision nutrition timing. No caffeine needed - boundless natural energy - total metabolic reboot. Wakes up feeling electric without stimulants. Optimizes all health markers.
              </p>
            </div>

            <div className="rounded-lg bg-black/30 border border-white/20 p-6 shadow-lg transform transition-all hover:scale-105">
              <h4 className="mb-3 text-xl font-bold text-white">Mental Health & Peace System</h4>
              <p className="text-white/90">
                Stress elimination protocol - anxiety destruction framework - deep sleep programming. Creates unshakable mental fortitude - laser-sharp focus. No more racing thoughts - just powerful clarity and natural confidence. No substances needed.
              </p>
            </div>

            <div className="rounded-lg bg-black/30 border border-white/20 p-6 shadow-lg transform transition-all hover:scale-105">
              <h4 className="mb-3 text-xl font-bold text-white">Happiness Integration System</h4>
              <p className="text-white/90">
                Life optimization framework - habit installation mechanics - purpose alignment system. Eliminates dependence on external validation. Creates true freedom from crutches - vices - quick fixes. Become the father - husband - leader your family deserves.
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
