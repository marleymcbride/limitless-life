import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ImmediateProofSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Ed Lawrence-style proof introduction */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            When High-Performing Executives Ask For My Help, Results Like This
            Happen...
          </h2>
        </div>

        {/* Client L Transformation - Featured Proof */}
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-8 mb-16 border-l-4 border-[#940909]">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-2/3">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">15 months ago</span>
              </div>
              <blockquote className="text-lg text-gray-800 mb-4 italic">
                "I was drinking 3-4 beers every night just to wind down from
                work. My energy was shot, I'd gained 35 pounds, and my wife was
                worried about me. I thought this was just what success cost."
              </blockquote>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-[#940909]">
                    -35 lbs
                  </div>
                  <div className="text-sm text-gray-600">Weight Loss</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-[#940909]">
                    450+ days
                  </div>
                  <div className="text-sm text-gray-600">Alcohol-Free</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-[#940909]">
                    0 caffeine
                  </div>
                  <div className="text-sm text-gray-600">No crashes</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Client L.
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Investment Banking VP
                </div>
                <Badge variant="secondary" className="text-xs">
                  Verified Client
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Transition to pain agitation */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            But here's what most guys don't realize...
          </p>
        </div>

        {/* Scott's Pain Points - Does This Sound Like You? */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Does This Sound Like You, Scott?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-400">
              <h4 className="font-bold text-gray-900 mb-3">
                5:30 AM - The Daily Grind Begins
              </h4>
              <p className="text-gray-700">
                You wake up groggy despite 7 hours of sleep. First thought?
                Coffee. Then you're checking 30-50 emails before you've even
                brushed your teeth. Already behind.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-400">
              <h4 className="font-bold text-gray-900 mb-3">
                11:30 AM - The Crash Hits
              </h4>
              <p className="text-gray-700">
                That's your fourth coffee and you're still dragging. Brain fog
                setting in. Important decisions feel overwhelming. You used to
                handle this stuff easily.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-400">
              <h4 className="font-bold text-gray-900 mb-3">
                8:00 PM - The Escape
              </h4>
              <p className="text-gray-700">
                Client dinner means 2-3 drinks "for business." Or you collapse
                at home and pour something just to switch off from work mode.
                It's the only way you know how to unwind.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-400">
              <h4 className="font-bold text-gray-900 mb-3">
                11:00 PM - The Cycle Continues
              </h4>
              <p className="text-gray-700">
                Exhausted but your mind is racing. Poor sleep quality. Wake up
                tired. Reach for coffee. The cycle starts again. And you wonder
                why you feel like shit.
              </p>
            </div>
          </div>

          {/* Three-Tier Classification */}
          <div className="bg-gray-900 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-8">
              Here's The Truth Most Men Don't Want To Hear
            </h3>

            <div className="space-y-6">
              <div className="border-l-4 border-gray-500 pl-6">
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold mr-3">95%</span>
                  <span className="text-xl font-bold">
                    The Typical Lifestyle
                  </span>
                </div>
                <p className="text-gray-300">
                  Western diet, regular drinking, barely exercising. Always
                  tired, wired on caffeine, dependent on alcohol to wind down.{" "}
                  <span className="text-red-300 font-medium">
                    Accessing maybe 20% of their potential.
                  </span>
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold text-blue-400 mr-3">
                    4%
                  </span>
                  <span className="text-xl font-bold">
                    The Health-Conscious (That's You)
                  </span>
                </div>
                <p className="text-gray-300">
                  You hit the gym, monitor your food, cut back on booze. But
                  there's no real system. You're training and working too hard,
                  always one bad week from burnout.{" "}
                  <span className="text-blue-300 font-medium">
                    Accessing 50-60% of your potential.
                  </span>
                </p>
              </div>

              <div className="border-l-4 border-[#940909] pl-6 bg-[#940909]/10 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold mr-3">1%</span>
                  <span className="text-xl font-bold bg-[#940909] px-3 py-1 rounded">
                    The Limitless Elite
                  </span>
                </div>
                <p className="text-gray-300">
                  Intentional systems for energy, health, and performance. You
                  understand your body on a deeper level, making optimal health
                  effortless. No caffeine, no alcohol needed.{" "}
                  <span className="text-[#ff6b6b] font-medium">
                    Accessing 95-100% of your potential daily.
                  </span>
                </p>
              </div>
            </div>

            <div className="text-center mt-8 p-6 bg-black/30 rounded-lg">
              <p className="text-lg italic">
                "Most successful men are trapped in the 4% category. They think
                they're winning, but they're actually closer to the struggling
                95% than the thriving 1%."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
