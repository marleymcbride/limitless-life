"use client";

import { bigIdeaGradientDesktop, bigIdeaGradientMobile } from "@/lib/utils";

export default function BigIdeaSection() {
  return (
    <section className="w-full text-white relative pt-10 pb-20 overflow-hidden">
      {/* Big Idea gradients - gradual red fade from 50% */}
      <div className="hidden md:block">{bigIdeaGradientDesktop}</div>
      <div className="block md:hidden">{bigIdeaGradientMobile}</div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="prose prose-lg max-w-none mobile-text-large body-copy dark-mode-copy">
            {/* Main headline - matching Personal Story structure */}
            <div className="text-center mb-6">
              <p
                className="text-4xl md:text-3xl lg:text-4xl mb-4 text-white leading-tight"
                style={{ fontFamily: "Neuemontreal, sans-serif", fontWeight: "400" }}
              >
                But it all made sense when I realised...
              </p>
            </div>

            <div className="text-center mb-8">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Energy Is The Foundation Of Everything
              </h2>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              Without energy you have nothing.
            </p>

            <p className="text-gray-200 leading-relaxed mb-2">
              Your relationships suffer.
            </p>

            <p className="text-gray-200 leading-relaxed mb-2">
              Work becomes a dread.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              And your body falls apart because you don&apos;t have the energy to train properly or recover.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              If you had all the money and success in the world.. but you feel like shit every day...
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Would you want that? My guess is no.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              So why have you not been focussing on the SINGLE GREATEST asset to your life?
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              The guy you dream of being doesn&apos;t wake up feeling exhausted every day.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              He doesn&apos;t need three coffees to function or alcohol to unwind.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              He hits the gym a couple times a week and spends his time getting the best rest and recovery.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              The difference between you and him? Energy.
            </p>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a
              href="/application"
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
