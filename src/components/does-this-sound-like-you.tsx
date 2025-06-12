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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
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
                — despite 7+ hours sleep, you need 3 coffees just to function
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
              <p className="text-lg text-white leading-relaxed">
                <span className="font-semibold">
                  Energy crashes every 2-3 hours
                </span>{" "}
                — fighting brain fog and caffeine dependency all day long
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
              <p className="text-lg text-white leading-relaxed">
                <span className="font-semibold">
                  Need alcohol to "switch off"
                </span>{" "}
                — can't unwind after 14-hour days without wine or whiskey
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-[#940909] rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
              <p className="text-lg text-white leading-relaxed">
                <span className="font-semibold">
                  Body's working against you
                </span>{" "}
                — training 5x a week but still soft, tired, with zero sex drive
              </p>
            </div>
          </div>

          {/* Quick transition */}
          <div className="text-center">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              You're successful, you make good money, you even try to stay
              healthy...
              <br />
              <span className="text-white font-semibold">
                But something's still broken.
              </span>
            </p>

            <p className="text-lg text-gray-300 mb-8">
              You're not alone. I used to wake up every morning feeling like I'd
              been hit by a truck...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
