"use client";

import {
  SkipForward,
  Coffee,
  BatteryLow,
  Brain,
  Watch,
  Wine,
  Bed,
} from "lucide-react";
import {
  bgClasses,
  invertedGradientOverlay,
  strongRedAccent,
  vignetteEffect,
} from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";
import { Button } from "./ui/button";

export default function PainPoints() {
  const painPoints = [
    {
      icon: <SkipForward className="w-6 h-6 text-[#940909]" />,
      text: "Hitting snooze 5 times - dreading another day needing caffeine just to function - starting mornings already defeated",
      subtext:
        "You're supposed to be a high-performer. Why does waking up feel like torture?",
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#940909]" />,
      text: "Drinking 3-4 coffees every morning - still feeling foggy by 10am - needing more caffeine by 2pm - trapped in a cycle that's destroying your health",
      subtext:
        "That afternoon crash isn't normal. It's your body screaming for help.",
    },
    {
      icon: <BatteryLow className="w-6 h-6 text-[#940909]" />,
      text: "Energy crashes hitting like clockwork - feeling utterly depleted when family needs you most - no reserves left",
      subtext:
        "Your kids and partner deserve your best self, not your leftover energy.",
    },
    {
      icon: <Brain className="w-6 h-6 text-[#940909]" />,
      text: "Making costly decisions at work - brain fog preventing clear thinking - missing opportunities you should catch",
      subtext:
        "How many opportunities and promotions have slipped through your fingers?",
    },
    {
      icon: <Watch className="w-6 h-6 text-[#940909]" />,
      text: "Tasks taking twice as long - focus scattered - constantly distracted - productivity in freefall - career stalling",
      subtext:
        "Your reputation is being built right now. What message are you sending?",
    },
    {
      icon: <Wine className="w-6 h-6 text-[#940909]" />,
      text: "Needing alcohol just to wind down - can't relax naturally - drinking more frequently - sleep quality destroyed",
      subtext:
        "That 'harmless' nightly drink is sabotaging your next day before it starts.",
    },
    {
      icon: <Bed className="w-6 h-6 text-[#940909]" />,
      text: "Waking up feeling worse than when you went to bed - despite 7-8 hours sleep - body not recovering - aging rapidly",
      subtext:
        "This isn't normal tiredness. Your recovery systems are completely broken.",
    },
  ];

  return (
    <section className={`w-full py-20 px-0 bg-black relative`}>
      {invertedGradientOverlay}
      {strongRedAccent}
      {vignetteEffect}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#940909] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            THE BRUTAL TRUTH
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            But First, Let Me Guess... You Think You're Already
            'Health-Conscious'
          </h2>
          <p className="text-center text-xl mb-6 max-w-3xl mx-auto text-gray-300">
            You eat relatively well. Hit the gym 3-4 times a week. Take some
            vitamins. You're not like the 95% walking around drinking Coke for
            breakfast.
          </p>
          <p className="text-center text-xl mb-12 max-w-2xl mx-auto text-white font-bold">
            But here's the brutal truth: You're trapped in what I call the "4%
            Trap."
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-[#940909]/30">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">
              Scott's Daily Hell Sequence
            </h3>
            <p className="text-lg text-gray-300 mb-6 text-center">
              This is the exact 18-hour cycle most high-performers are trapped
              in. Sound familiar?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#940909]/20 p-4 rounded border-l-4 border-[#940909]">
                <p className="text-white font-bold">5:30 AM</p>
                <p className="text-gray-300">
                  Hit snooze 4 times, need coffee before speaking
                </p>
              </div>
              <div className="bg-[#940909]/20 p-4 rounded border-l-4 border-[#940909]">
                <p className="text-white font-bold">7:00 AM</p>
                <p className="text-gray-300">
                  Second coffee, still foggy, dreading meetings
                </p>
              </div>
              <div className="bg-[#940909]/20 p-4 rounded border-l-4 border-[#940909]">
                <p className="text-white font-bold">10:00 AM</p>
                <p className="text-gray-300">
                  Crash hits, third coffee, irritable with team
                </p>
              </div>
              <div className="bg-[#940909]/20 p-4 rounded border-l-4 border-[#940909]">
                <p className="text-white font-bold">2:00 PM</p>
                <p className="text-gray-300">
                  Fourth coffee, anxiety through the roof
                </p>
              </div>
              <div className="bg-[#940909]/20 p-4 rounded border-l-4 border-[#940909]">
                <p className="text-white font-bold">6:00 PM</p>
                <p className="text-gray-300">
                  Wine to "decompress," can't relax naturally
                </p>
              </div>
              <div className="bg-[#940909]/20 p-4 rounded border-l-4 border-[#940909]">
                <p className="text-white font-bold">11:00 PM</p>
                <p className="text-gray-300">
                  Scrolling phone, wired but exhausted
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl text-white font-bold mb-2">
                1:00 AM: Finally pass out, wake up feeling worse
              </p>
              <p className="text-gray-300 italic">
                Rinse and repeat for years...
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className="text-xl text-white font-bold mb-4">
            You think you're winning because you're not completely falling apart
            like most men.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            But you're closer to the struggling 95% than the thriving 1%. The 4%
            Trap makes you feel like you're doing well while slowly destroying
            your body and mind.
          </p>
        </div>

        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-white mb-6">
            Here's What This Cycle Is Actually Doing To You:
          </h3>
        </div>

        {/* Mobile view - only visible on small screens */}
        <div className="block sm:hidden">
          <div className="flex flex-col space-y-8 mx-auto">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="flex flex-col bg-black/40 backdrop-blur-sm rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-[1.02] border border-[#940909]/30"
              >
                <div className="flex items-start p-4">
                  <div className="p-2 bg-[#940909]/30 rounded-full flex-shrink-0 mr-4">
                    {point.icon}
                  </div>
                  <p className="text-lg text-white font-medium">{point.text}</p>
                </div>
                {point.subtext && (
                  <div className="bg-[#940909]/10 p-3 border-t border-[#940909]/30">
                    <p className="text-sm text-white/80 italic">
                      {point.subtext}
                    </p>
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
              <div
                key={index}
                className="flex flex-col bg-black/40 backdrop-blur-sm rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-[1.02] border border-[#940909]/30"
              >
                <div className="flex items-start p-5">
                  <div className="p-2 bg-[#940909]/30 rounded-full flex-shrink-0 mr-4">
                    {point.icon}
                  </div>
                  <p className="text-base text-white font-medium">
                    {point.text}
                  </p>
                </div>
                {point.subtext && (
                  <div className="bg-[#940909]/10 p-3 border-t border-[#940909]/30">
                    <p className="text-sm text-white/80 italic">
                      {point.subtext}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Micro-testimonial between sections for continuous proof */}
        <div className="max-w-4xl mx-auto mt-12">
          <MicroTestimonial
            quote="I'd hit snooze 6 times every morning. Now I'm up before my alarm, no caffeine needed."
            name="David H."
            title="Investment Director"
            metric="+70% Morning Energy"
          />
        </div>

        <div className="bg-[#940909] rounded-lg p-6 max-w-3xl mx-auto mt-12 shadow-md">
          <p className="text-white text-center text-xl font-medium">
            You're not alone. 95% of high-performing men are trapped in this
            cycle. But only 1% will escape it.
          </p>
        </div>

        {/* Tell Me More CTA Button */}
        <div className="flex justify-center mt-12">
          <a href="#more-info">
            <Button
              size="lg"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-4 px-8 rounded-md text-lg shadow-lg transition duration-300"
            >
              TELL ME MORE
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
