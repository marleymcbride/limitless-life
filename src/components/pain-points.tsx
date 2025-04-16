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
      <div className="w-full max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          Does This Sound Like You?
        </h2>
        
        <div className="space-y-4">
          {painPoints.map((point, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mt-1 mr-3 text-[#940909] flex-shrink-0" />
              <p className="text-lg text-gray-300">{point}</p>
            </div>
          ))}
        </div>
        
        <p className="text-gray-400 text-center mt-8">You're not alone...</p>
      </div>
    </section>
  )
}