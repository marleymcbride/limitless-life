import { Check, Trophy, Brain, Zap, Clock } from "lucide-react"

export default function ResultsSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold">Your Limitless Transformation</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Here's what you'll experience when following The Limitless Protocol
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#940909]">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-[#940909]/10 mr-4">
                <Zap className="w-6 h-6 text-[#940909]" />
              </div>
              <h3 className="text-xl font-bold">Energy Transformation</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Wake up naturally energized before your alarm ever rings</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Eliminate afternoon crashes and brain fog completely</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Break free from caffeine dependency completely</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Experience consistent daily energy without crashes</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#940909]">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-[#940909]/10 mr-4">
                <Trophy className="w-6 h-6 text-[#940909]" />
              </div>
              <h3 className="text-xl font-bold">Physical Transformation</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Lose 10-25 pounds without extreme dieting</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Develop lean muscle with just 2-3 workouts per week</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>See visible ab definition and muscle tone return</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Enjoy compliments about your physical transformation</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#940909]">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-[#940909]/10 mr-4">
                <Brain className="w-6 h-6 text-[#940909]" />
              </div>
              <h3 className="text-xl font-bold">Mental Transformation</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Experience razor-sharp focus that lasts all day</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Make better decisions faster with improved mental clarity</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Reduce stress and anxiety by 50% or more</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Enjoy deep, restorative sleep every night</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#940909]">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-[#940909]/10 mr-4">
                <Clock className="w-6 h-6 text-[#940909]" />
              </div>
              <h3 className="text-xl font-bold">Lifestyle Transformation</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Break free from alcohol dependence for relaxation</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Be fully present with your family and loved ones</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Accomplish more in fewer hours at work</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                <span>Develop sustainable habits that last for life</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
