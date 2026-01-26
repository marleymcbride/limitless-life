"use client";

import { CTAButton } from "./ui/cta-button";

export default function UrgencyFinalCTA() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="prose prose-lg max-w-none mobile-text-large body-copy light-mode-copy">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              The Choice Is Yours
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-12">
            You can keep fighting your body, forcing yourself through each day
            with stimulants and willpower. Or you can work with your body's
            natural intelligence and experience the transformation you deserve.
          </p>

          <p className="mini-heading text-gray-900 leading-relaxed mb-6">
            Three Months From Today...
          </p>

          <div className="space-y-6 mb-12">
            <div className="text-left">
              <p className="text-gray-800 font-bold leading-relaxed mb-4">
                If You Do Nothing:
              </p>
              <p className="text-gray-700 leading-relaxed mb-0">
                Still relying on coffee to function
              </p>
              <p className="text-gray-700 leading-relaxed mb-0">
                Same afternoon energy crashes
              </p>
              <p className="text-gray-700 leading-relaxed mb-0">
                Same stress and sleep problems
              </p>
              <p className="text-gray-700 leading-relaxed mb-0">
                Same health concerns
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Another 90 days of feeling like crap
              </p>
            </div>

            <div className="text-left">
              <p className="text-gray-800 font-bold leading-relaxed mb-4">
                If You Join The Limitless Protocol:
              </p>
              <p className="text-gray-700 leading-relaxed mb-0">
                Wake up naturally energized
              </p>
              <p className="text-gray-700 leading-relaxed mb-0">
                Sustained energy all day
              </p>
              <p className="text-gray-700 leading-relaxed mb-0">
                Mental clarity and focus
              </p>
              <p className="text-gray-700 leading-relaxed mb-0">
                Better sleep and recovery
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Transformation in every area of life
              </p>
            </div>
          </div>

          <p className="mini-heading text-gray-900 leading-relaxed mb-6">
            Remember: I Only Accept 10 Clients Per Month
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Once these spots are filled, the application process closes. This
            ensures every client gets the personal attention and support they
            need to succeed.
          </p>
          <p className="text-gray-700 leading-relaxed mb-12">
            The question isn't whether this works. The question is whether
            you're ready to stop fighting your body and start working with it.
          </p>
        </div>

        <div className="text-center mt-12">
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Apply To Transform Your Life Today
          </a>

          <p className="text-gray-600 mt-6">
            Your future self will thank you for the decision you make today.
          </p>
        </div>
      </div>
    </section>
  );
}
