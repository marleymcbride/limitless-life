"use client"

import { CheckCircle2 } from "lucide-react"

export default function PainPoints() {
  const painPoints = [
    "You're successful in your career, but your physical health is suffering",
    "You're constantly tired, stressed, and lacking the energy you once had",
    "You've tried diets and workout plans, but nothing sticks with your busy schedule",
    "You know you need to prioritize your health, but don't know where to start"
  ]

  return (
    <section className="w-full py-16 px-0 bg-[radial-gradient(ellipse_at_center,#1a1a1a_0%,#0a0a0a_70%,#050505_100%)]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white text-center mb-10">
          Does This Sound Like You?
        </h2>

        {/* Mobile view - only visible on small screens */}
        <div className="block sm:hidden">
          <div className="flex flex-col space-y-8 mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-[#940909] flex-shrink-0 mr-3 mt-1" />
                <p className="text-xl text-gray-300">{point}</p>
              </div>
            ))}

            <p className="text-gray-400 text-center mt-4 text-base">You're not alone...</p>
          </div>
        </div>

        {/* Desktop view - hidden on small screens */}
        <div className="hidden sm:block">
          <div className="flex justify-center">
            <div className="relative mx-auto">
              <div className="w-[750px] mx-auto relative">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex items-start mb-8 pl-[100px]">
                    <div className="absolute -ml-8">
                      <CheckCircle2 className="w-6 h-6 text-[#940909] flex-shrink-0" />
                    </div>
                    <p className="text-base md:text-lg text-gray-300">{point}</p>
                  </div>
                ))}

                <p className="text-gray-400 text-center mt-12 text-sm">You're not alone...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
