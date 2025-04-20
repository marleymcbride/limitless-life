import { Check } from "lucide-react"
import Image from "next/image"

export default function BenefitsSection() {
  return (
    <section className="w-full bg-zinc-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">The 4 Pillars of Transformation</h2>
        <p className="text-center text-base mb-12 mx-auto">Our comprehensive approach addresses every aspect of your health and performance to create lasting transformation</p>

        <div className="mx-auto grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-zinc-800 p-6 border-t-4 border-[#940909] transition-transform hover:scale-105">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#940909] flex items-center justify-center">
                <span className="text-xl font-bold">1</span>
              </div>
            </div>
            <h3 className="mb-4 text-center text-lg font-bold">
              Boundless Energy
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Wake up refreshed without needing an alarm</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Eliminate afternoon crashes and brain fog</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Maintain peak performance throughout your entire day</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Reduce or eliminate your dependence on caffeine</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6 border-t-4 border-[#940909] transition-transform hover:scale-105">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#940909] flex items-center justify-center">
                <span className="text-xl font-bold">2</span>
              </div>
            </div>
            <h3 className="mb-4 text-center text-lg font-bold">
              Physical Transformation
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Lose 10-20+ pounds of stubborn fat</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Build lean muscle without spending hours in the gym</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Fit into clothes you haven't worn in years</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Feel confident and proud when you look in the mirror</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6 border-t-4 border-[#940909] transition-transform hover:scale-105">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#940909] flex items-center justify-center">
                <span className="text-xl font-bold">3</span>
              </div>
            </div>
            <h3 className="mb-4 text-center text-lg font-bold">
              Mental Clarity
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Sharpen your focus and decision-making abilities</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Eliminate brain fog and mental fatigue</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Reduce stress and anxiety by 50% or more</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Sleep deeply and wake refreshed</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6 border-t-4 border-[#940909] transition-transform hover:scale-105">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#940909] flex items-center justify-center">
                <span className="text-xl font-bold">4</span>
              </div>
            </div>
            <h3 className="mb-4 text-center text-lg font-bold">
              Lifestyle Mastery
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Create sustainable habits that fit your busy schedule</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Reduce or eliminate alcohol dependence</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Be more present with your family and loved ones</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm">Achieve more in less time with optimized productivity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
