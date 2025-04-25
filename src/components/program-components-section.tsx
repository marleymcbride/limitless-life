import { Check, Sunrise, Dumbbell, Coffee, BookOpen } from "lucide-react"
import { bgClasses, invertedGradientOverlay, strongRedAccent, vignetteEffect } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function ProgramComponentsSection() {
  return (
    <section className={`w-full py-20 ${bgClasses.blackRedGradient} relative`}>
      {invertedGradientOverlay}
      {strongRedAccent}
      {vignetteEffect}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/10 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">THE METHODOLOGY</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Limitless Systems</h2>
          <p className="text-center text-xl mb-4 mx-auto max-w-3xl">
            Systematic approach to create natural energy - elite physique - razor-sharp mind
          </p>
          <p className="text-center text-lg mx-auto max-w-3xl">
            No willpower. No starvation. No bullshit 6-day gym routines.
          </p>
        </div>

        <div className="mx-auto grid gap-8 md:grid-cols-2 max-w-5xl">
          <div className="rounded-lg bg-black/40 backdrop-blur-sm p-6 border-l-4 border-[#940909] shadow-lg transform transition hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Sunrise className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Limitless Morning
              </h3>
            </div>
            <p className="mb-4 text-white/90">
              Exact, systemized routine of specific foods and actions in precise order. Pure natural energy without caffeine or supplements. Mental clarity from dawn to dusk.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Strategic nutrition timing for steady energy</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Precision hydration protocol for mental clarity</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Maintains steady energy after midday meals</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Takes under 20 minutes total to implement</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-black/40 backdrop-blur-sm p-6 border-l-4 border-[#940909] shadow-lg transform transition hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                The Limitless Training
              </h3>
            </div>
            <p className="mb-4 text-white/90">
              Train just 2-3 times per week max. Focus on aesthetics and total body health. Protects CNS from overtaxing, prevents burnout, builds the "Natty Sweet Spot" physique.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Strategic compound and isolation exercises</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">No endless cardio or daily gym sessions</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Preserves muscle while accelerating fat loss</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Time-efficient workouts with maximum results</span>
              </li>
            </ul>
          </div>

          {/* Micro-testimonial for social proof */}
          <div className="md:col-span-2 my-6">
            <MicroTestimonial
              quote="The Limitless Morning protocol alone was worth the entire investment. I haven't touched coffee in 4 months and have more energy than ever."
              name="Eric W."
              title="Sales Director"
              metric="120 Days Caffeine-Free"
            />
          </div>

          <div className="rounded-lg bg-black/40 backdrop-blur-sm p-6 border-l-4 border-[#940909] shadow-lg transform transition hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Limitless Flow
              </h3>
            </div>
            <p className="mb-4 text-white/90">
              Natural high state - free from caffeine, alcohol or substances. Inner game focused, prioritizing mindset over trackers or willpower. Returns to childlike state of peace and joy.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Strategic caffeine elimination protocol</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Natural alcohol reduction system</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Mindset restructuring for natural relaxation</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Brain-based stress elimination techniques</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-black/40 backdrop-blur-sm p-6 border-l-4 border-[#940909] shadow-lg transform transition hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Integration Framework
              </h3>
            </div>
            <p className="mb-4 text-white/90">
              How all three systems work together to create effortless transformation. The complete roadmap from where you are now to total Limitless energy and physique.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Week-by-week implementation roadmap</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">High-performance habit installation process</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Real-world application for busy professionals</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Built-in troubleshooting and personalization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
