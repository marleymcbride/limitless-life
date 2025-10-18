"use client";

import {
  bgClasses,
  blackRedGradientOverlay,
  vignetteEffect,
} from "../lib/utils";

export default function ImagineThis() {
  return (
    <section className={`${bgClasses.blackRedGradient} py-20 px-4 w-full`}>
      {blackRedGradientOverlay}
      {vignetteEffect}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-12"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Imagine...
          </h2>
          <div className="space-y-10">
            <h3
              className="text-3xl md:text-4xl font-semibold text-white"
              style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
            >
              You Had a Simple Daily System That:
            </h3>
            <p className="text-2xl text-left md:text-3xl text-gray-200 leading-relaxed">
              Restores your natural energy and eliminates the afternoon crashes
              without needing coffee
            </p>
            <p className="text-2xl text-left md:text-3xl text-gray-200 leading-relaxed">
              Transforms your body by melting stubborn fat while building lean
              muscle with only 2 days per week
            </p>
            <p className="text-2xl text-left md:text-3xl text-gray-200 leading-relaxed">
              Gets you off the booze effortlessly and rebuilds your mental
              clarity so your body and mind become unstoppable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
