"use client";

import { Button } from "@/components/ui/button";
import {
  bgClasses,
  blackRedGradientOverlay,
  redAccentBottom,
  vignetteEffect,
} from "../lib/utils";

export default function DoesThisSoundLikeYou() {
  return (
    <section
      className={`py-16 md:py-24 px-4 w-full relative overflow-hidden ${bgClasses.blackRedGradient}`}
    >
      {blackRedGradientOverlay}
      {redAccentBottom}
      {vignetteEffect}

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main headline - Ed Lawrence style */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Does This Sound Like You?
          </h2>

          {/* Subheading - set up the 4% trap */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            You're successful. You make good money. You even try to eat well and
            hit the gym...
            <br />
            <span className="text-white font-semibold">
              But something's still fucking broken.
            </span>
          </p>

          {/* Pain points grid - Scott-specific executive struggles */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 text-left">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="text-lg text-white leading-relaxed">
                    <span className="font-semibold">
                      You wake up feeling like shit every morning
                    </span>{" "}
                    — despite getting "enough" sleep, you're groggy, anxious,
                    and need 2-3 coffees just to function like a human being
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="text-lg text-white leading-relaxed">
                    <span className="font-semibold">
                      Your energy crashes every 2-3 hours
                    </span>{" "}
                    — you're fighting constant brain fog, relying on caffeine
                    hits and sugar just to make it through another 14-hour day
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="text-lg text-white leading-relaxed">
                    <span className="font-semibold">
                      You need alcohol to "switch off"
                    </span>{" "}
                    — wine with dinner turned into wine before dinner, and now
                    you can't unwind without it (but you tell yourself it's just
                    stress management)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="text-lg text-white leading-relaxed">
                    <span className="font-semibold">
                      Your body's working against you
                    </span>{" "}
                    — despite eating "clean" and hitting the gym 4-5 times a
                    week, you're softer than you should be and recovery takes
                    forever
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="text-lg text-white leading-relaxed">
                    <span className="font-semibold">
                      Your sex drive is a joke
                    </span>{" "}
                    — what used to happen naturally now requires planning,
                    pills, or just doesn't happen at all (and your partner's
                    starting to notice)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="text-lg text-white leading-relaxed">
                    <span className="font-semibold">
                      You're always "one step from burnout"
                    </span>{" "}
                    — you're crushing it at work but your personal life is
                    falling apart, and you feel like you're holding it together
                    with caffeine and willpower
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="text-lg text-white leading-relaxed">
                    <span className="font-semibold">
                      Every program you've tried has failed
                    </span>{" "}
                    — you've spent thousands on trainers, nutritionists, and
                    "optimized" supplements, but nothing sticks or actually
                    fixes the root problem
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <p className="text-lg text-white leading-relaxed">
                    <span className="font-semibold">
                      You feel like you're "too successful" to complain
                    </span>{" "}
                    — everyone thinks you have it figured out, so you suffer in
                    silence while feeling like a fraud who's one bad day away
                    from collapse
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The 4% Trap revelation */}
          <div className="bg-black/40 backdrop-blur-sm border border-[#940909]/30 rounded-xl p-8 md:p-12 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Here's The Truth No One's Telling You...
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              You're trapped in what I call{" "}
              <span className="text-[#ff4444] font-bold">"The 4% Trap."</span>
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              95% of people live on the Standard American Diet, drinking every
              weekend, barely exercising. They access maybe 20% of their
              potential.
              <br />
              <br />
              <span className="text-white font-semibold">
                You're in the 4% who are "health conscious."
              </span>{" "}
              You go to the gym. You monitor your food. You cut back on booze.
              But you're still only accessing 50-60% of your potential.
              <br />
              <br />
              <span className="text-[#ff4444] font-bold">
                The 1% have systems that unlock 95-100% of their potential.
              </span>
              They feel incredible all day, every day, without fighting their
              body.
            </p>
          </div>

          {/* Transition to "You're not alone" */}
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              <span className="text-white font-semibold">
                You're not alone.
              </span>{" "}
              And this isn't your fault.
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              I used to wake up every morning feeling like I'd been hit by a
              truck. 6-8 coffees just to function. Wine every night to "unwind."
              Fighting my body every single day...
            </p>

            <Button
              size="lg"
              className="bg-[#940909] hover:bg-[#7a0707] text-white font-bold py-4 px-8 text-lg rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Show Me The Solution
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
