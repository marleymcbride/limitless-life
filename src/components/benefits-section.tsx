import { CheckCircle } from "lucide-react"

export default function BenefitsSection() {
  return (
    <section className="w-full bg-zinc-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">The 4 Pillars of Transformation</h2>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-zinc-800 p-6">
            <h3 className="mb-4 flex items-center text-xl font-bold">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              Boundless Energy
            </h3>
            <ul className="space-y-3">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Wake up refreshed without needing an alarm</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Eliminate afternoon crashes and brain fog</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Maintain peak performance throughout your entire day</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Reduce or eliminate your dependence on caffeine</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6">
            <h3 className="mb-4 flex items-center text-xl font-bold">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              Physical Transformation
            </h3>
            <ul className="space-y-3">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Lose 10-20+ pounds of stubborn fat</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Build lean muscle without spending hours in the gym</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Fit into clothes you haven't worn in years</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Feel confident and proud when you look in the mirror</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6">
            <h3 className="mb-4 flex items-center text-xl font-bold">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              Mental Clarity
            </h3>
            <ul className="space-y-3">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Sharpen your focus and decision-making abilities</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Eliminate brain fog and mental fatigue</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Reduce stress and anxiety by 50% or more</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Sleep deeply and wake refreshed</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6">
            <h3 className="mb-4 flex items-center text-xl font-bold">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              Lifestyle Mastery
            </h3>
            <ul className="space-y-3">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Create sustainable habits that fit your busy schedule</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Reduce or eliminate alcohol dependence</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Be more present with your family and loved ones</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Achieve more in less time with optimized productivity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}