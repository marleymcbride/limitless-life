"use client";

import { bigIdeaGradientDesktop, bigIdeaGradientMobile } from "@/lib/utils";

export default function BigIdeaSection() {
  return (
    <section className="w-full text-white relative pt-10 pb-20 overflow-hidden">
      {/* Big Idea gradients - gradual red fade from 50% */}
      <div className="hidden md:block">{bigIdeaGradientDesktop}</div>
      <div className="block md:hidden">{bigIdeaGradientMobile}</div>

      {/* Grain overlay - using hero opacity (0.10) to prevent lightening */}
      <div className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" seed=\"1\"/><feColorMatrix type=\"saturate\" values=\"0\"/></filter><rect width=\"100\" height=\"100\" fill=\"%23141414\" filter=\"url(%23noise)\" opacity=\"1.0\"/></svg>')",
          opacity: 0.10,
          zIndex: 25,
          mixBlendMode: 'hard-light'
        }}
      ></div>

      {/* Darkening overlay - compensates for grain lightening while preserving texture */}
      <div className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          zIndex: 26,
          mixBlendMode: 'saturation'
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-30 hero-full-width">
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
            <strong>1.</strong> Your performance at work suffers.
            </p>

            <p className="text-gray-200 leading-relaxed mb-2">
            <strong>2.</strong>  Your body will keep breaking down from your training.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
            <strong>3.</strong>  And you have nothing left for your kids or personal life.
            </p>


            <p className="text-gray-200 leading-relaxed mb-6">
              What&apos;s the difference between you and the guy you who wakes up ready to attack every day?
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              The guy who doesn&apos;t need three coffees to function or alcohol to unwind?
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              The guy who has 6 pack abs but only spends a couple days a week in the gym?
            </p>


            <p className="text-gray-200 leading-relaxed mb-6">
              Well, it&apos;s just one thing you&apos;re missing...
            </p>



            <div className="text-gray-200 text-2xl leading-relaxed mb-6">
            <strong>Energy.</strong>
            </div>


            <p className="text-gray-200 leading-relaxed mb-6">
              That&apos;s when I realized I&apos;d been neglecting the GREATEST asset to life all this time.
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
