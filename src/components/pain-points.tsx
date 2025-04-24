"use client"

import { SkipForward, Coffee, BatteryLow, Brain, Watch, Wine, Bed } from "lucide-react"

export default function PainPoints() {
  const painPoints = [
    {
      icon: <SkipForward className="w-6 h-6 text-[#940909]" />,
      text: "Hitting your alarm snooze 5 times because you dread facing another day on caffeine just to function"
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#940909]" />,
      text: "Drinking 3-4 coffees every morning - still feeling foggy and sluggish by 10am - needing more caffeine by 2pm"
    },
    {
      icon: <BatteryLow className="w-6 h-6 text-[#940909]" />,
      text: "Constant energy crashes - feeling utterly depleted by mid-afternoon - dreading evening responsibilities"
    },
    {
      icon: <Brain className="w-6 h-6 text-[#940909]" />,
      text: "Making poor decisions at work because your brain fog prevents clear thinking - missing opportunities"
    },
    {
      icon: <Watch className="w-6 h-6 text-[#940909]" />,
      text: "Taking twice as long to complete tasks - focus scattered - constantly distracted - productivity tanking"
    },
    {
      icon: <Wine className="w-6 h-6 text-[#940909]" />,
      text: "Needing alcohol just to wind down - can't relax naturally - sleep quality destroyed by drinking"
    },
    {
      icon: <Bed className="w-6 h-6 text-[#940909]" />,
      text: "Waking up feeling worse than when you went to bed - despite 7-8 hours sleep - body not recovering"
    }
  ]

  return (
    <section className="w-full py-16 px-0 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-black text-center mb-4">
          Does This Sound Like You?
        </h2>

        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          High-performing men come to us when they're experiencing these energy drains daily.
        </p>

        {/* Mobile view - only visible on small screens */}
        <div className="block sm:hidden">
          <div className="flex flex-col space-y-8 mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="p-2 bg-[#940909]/10 rounded-full flex-shrink-0 mr-4">
                  {point.icon}
                </div>
                <p className="text-lg text-gray-800">{point.text}</p>
              </div>
            ))}

            <p className="text-gray-600 text-center mt-8 text-base font-medium">
              You're not alone. This is exactly where 95% of men are stuck.
            </p>
          </div>
        </div>

        {/* Desktop view - hidden on small screens */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start bg-gray-50 p-5 rounded-lg shadow-sm">
                <div className="p-2 bg-[#940909]/10 rounded-full flex-shrink-0 mr-4">
                  {point.icon}
                </div>
                <p className="text-base text-gray-800">{point.text}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-center mt-12 text-lg font-medium">
            You're not alone. This is exactly where 95% of men are stuck.
          </p>
        </div>
      </div>
    </section>
  )
}
