import { Check, Sunrise, Dumbbell, Coffee, BookOpen } from "lucide-react"
import Image from "next/image"

export default function BenefitsSection() {
  return (
    <section className="w-full bg-grey py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">The Limitless Protocol Components</h2>
        <p className="text-center text-lg mb-12 mx-auto max-w-3xl">
          Our systems-based approach creates natural energy - lean physique - mental clarity without relying on willpower or extreme measures
        </p>

        <div className="mx-auto grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-zinc-800 p-6 border-l-4 border-[#940909] shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Sunrise className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Morning Fuel System
              </h3>
            </div>
            <p className="mb-4 text-gray-300">
              Exact, systemized routine of specific foods and actions in set order. Delivers clear thinking and smooth energy without caffeine or supplements.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Strategic nutrition timing for steady energy</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Precision hydration protocol for mental clarity</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Maintains steady energy after midday meals</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Takes under 20 minutes total to implement</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6 border-l-4 border-[#940909] shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Minimalist Training
              </h3>
            </div>
            <p className="mb-4 text-gray-300">
              Train just 2-3 times per week max. Focus on aesthetics and total body health. Protects CNS from overtaxing, prevents burnout, builds the "Natty Sweet Spot" physique.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Strategic compound and isolation exercises</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">No endless cardio or daily gym sessions</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Preserves muscle while accelerating fat loss</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Time-efficient workouts with maximum results</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6 border-l-4 border-[#940909] shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Limitless Flow
              </h3>
            </div>
            <p className="mb-4 text-gray-300">
              Natural high state - free from caffeine, alcohol or substances. Inner game focused, prioritizing mindset over trackers or willpower. Returns to childlike state of peace and joy.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Strategic caffeine elimination protocol</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Natural alcohol reduction system</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Mindset restructuring for natural relaxation</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Brain-based stress elimination techniques</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6 border-l-4 border-[#940909] shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Integration Framework
              </h3>
            </div>
            <p className="mb-4 text-gray-300">
              How all three systems work together to create effortless transformation. The complete roadmap from where you are now to total Limitless energy and physique.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Week-by-week implementation roadmap</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">High-performance habit installation process</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Real-world application for busy professionals</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Built-in troubleshooting and personalization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
