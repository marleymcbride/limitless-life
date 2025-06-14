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
      className={`py-12 md:py-16 px-4 w-full relative overflow-hidden ${bgClasses.blackRedGradient}`}
    >
      {blackRedGradientOverlay}
      {redAccentBottom}
      {vignetteEffect}

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 pb-10 leading-tight">
            Does This Sound Like You?
          </h2>

          {/* Pain points - condensed to 4 key ones */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
              <p className="text-lg text-white leading-relaxed">
                <span className="font-semibold">
                  Wake up feeling like shit every morning
                </span>{" "}
                and needing 3 damn coffees just to function
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
              <p className="text-lg text-white leading-relaxed">
                <span className="font-semibold">No energy in the bedroom</span>{" "}
                despite taking all the latest "Testosterone Boosters"
              </p>
            </div>

            <div className="flex items-start space-x-3 mt-7">
              <div className="flex-shrink-0 w-5 h-5 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
              <p className="text-lg text-white leading-relaxed">
                <span className="font-semibold mt-10">
                  Needing a drink to "take the edge off"
                </span>{" "}
                after stressful days at work
              </p>
            </div>

            <div className="flex items-start space-x-3 mt-7">
              <div className="flex-shrink-0 w-5 h-5 bg-[#940909] rounded-full flex items-center justify-center mt-1 mb-10">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
              <p className="text-lg text-white leading-relaxed">
                Constantly in the gym, yet your
                <span className="font-semibold mb-8">
                  {" "}
                  body hasn't changed in months (well, years)..
                </span>{" "}
              </p>
            </div>
          </div>

          {/* Quick transition */}
          <div className="text-center mb-4">
            <p className="text-xl text-gray-300 mb-4 leading-relaxed">
              What's the use being "succesful" in work if you're
              <span className="font-bold mb-8">
                {" "}
                feeling like dog shit every day??
              </span>{" "}
              <br />
              {/* Spacer div to push headline down */}
              <div className="h-8"></div>
              <span className="text-white text-3xl text-lg:4xl font-bold mt-4">
                You're not alone .
              </span>
            </p>

            {/* Spacer div to push headline down */}
            <div className="h-6"></div>

            <p className="text-lg text-gray-300 mb-8">
              For 10 years of my life, I'd wake up every morning feeling like
              I'd been hit by a truck...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
