"use client"

import { SkipForward, Coffee, BatteryLow, Brain, Watch, Wine, Bed } from "lucide-react"
import { bgClasses } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function PainPoints() {
  const painPoints = [
    {
      icon: <SkipForward className="w-6 h-6 text-[#940909]" />,
      text: "Hitting snooze 5 times - dreading another day needing caffeine just to function - starting mornings already defeated",
      subtext: "You're supposed to be a high-performer. Why does waking up feel like torture?"
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#940909]" />,
      text: "Drinking 3-4 coffees every morning - still feeling foggy by 10am - needing more caffeine by 2pm - trapped in a cycle that's destroying your health",
      subtext: "That afternoon crash isn't normal. It's your body screaming for help."
    },
    {
      icon: <BatteryLow className="w-6 h-6 text-[#940909]" />,
      text: "Energy crashes hitting like clockwork - feeling utterly depleted when family needs you most - no reserves left",
      subtext: "Your kids and partner deserve your best self, not your leftover energy."
    },
    {
      icon: <Brain className="w-6 h-6 text-[#940909]" />,
      text: "Making costly decisions at work - brain fog preventing clear thinking - missing opportunities you should catch",
      subtext: "How many opportunities and promotions have slipped through your fingers?"
    },
    {
      icon: <Watch className="w-6 h-6 text-[#940909]" />,
      text: "Tasks taking twice as long - focus scattered - constantly distracted - productivity in freefall - career stalling",
      subtext: "Your reputation is being built right now. What message are you sending?"
    },
    {
      icon: <Wine className="w-6 h-6 text-[#940909]" />,
      text: "Needing alcohol just to wind down - can't relax naturally - drinking more frequently - sleep quality destroyed",
      subtext: "That 'harmless' nightly drink is sabotaging your next day before it starts."
    },
    {
      icon: <Bed className="w-6 h-6 text-[#940909]" />,
      text: "Waking up feeling worse than when you went to bed - despite 7-8 hours sleep - body not recovering - aging rapidly",
      subtext: "This isn't normal tiredness. Your recovery systems are completely broken."
    }
  ]

  return (
    <section className={`w-full py-20 px-0 ${bgClasses.white}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-black text-center mb-4">
          Your Body Is Running A Failed Program
        </h2>

        <p className="text-center text-xl mb-12 max-w-2xl mx-auto text-gray-800">
          High-performing men come to us when these energy drains become unbearable. Sound familiar?
        </p>

        {/* Mobile view - only visible on small screens */}
        <div className="block sm:hidden">
          <div className="flex flex-col space-y-8 mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-[1.02]">
                <div className="flex items-start p-4">
                  <div className="p-2 bg-[#940909]/10 rounded-full flex-shrink-0 mr-4">
                    {point.icon}
                  </div>
                  <p className="text-lg text-gray-800 font-medium">{point.text}</p>
                </div>
                {point.subtext && (
                  <div className="bg-[#940909]/5 p-3 border-t border-gray-200">
                    <p className="text-sm text-[#940909] italic">{point.subtext}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view - hidden on small screens */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-[1.02]">
                <div className="flex items-start p-5">
                  <div className="p-2 bg-[#940909]/10 rounded-full flex-shrink-0 mr-4">
                    {point.icon}
                  </div>
                  <p className="text-base text-gray-800 font-medium">{point.text}</p>
                </div>
                {point.subtext && (
                  <div className="bg-[#940909]/5 p-3 border-t border-gray-200">
                    <p className="text-sm text-[#940909] italic">{point.subtext}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Micro-testimonial between sections for continuous proof */}
        <div className="max-w-4xl mx-auto">
          <MicroTestimonial
            quote="I'd hit snooze 6 times every morning. Now I'm up before my alarm, no caffeine needed."
            name="David H."
            title="Investment Director"
            metric="+70% Morning Energy"
          />
        </div>

        <p className="text-gray-800 text-center mt-12 text-xl font-medium">
          You're not alone. 95% of high-performing men are trapped in this cycle. But only 1% will escape it.
        </p>
      </div>
    </section>
  )
}
