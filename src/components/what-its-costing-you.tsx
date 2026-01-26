import { bgClasses } from "@/lib/utils";

export default function WhatItsCostingYou() {
  return (
    <section className="w-full results-proof-gradient pt-16 pb-12 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>

          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0 text-white"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
              >
                How Much is NOT Fixing This Costing You?
              </h2>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              I'm not going to sell you on <span className="italic">"make more money through health"</span> because that's not what this is about.
            </p>

            <p className="text-gray-200 leading-relaxed mb-8">
              But here's what I will say:
            </p>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg my-10 border border-white/20">
              <p className="text-gray-200 leading-relaxed mb-4">
                If you're making £100k+ and operating at 60% capacity because of brain fog, energy crashes, and caffeine dependency...
              </p>
              <p className="text-white font-bold text-xl mb-4">
                You're leaving £40k+ worth of performance on the table every year.
              </p>
            </div>

            <p className="text-gray-200 leading-relaxed mb-4">
              How many deals have you fumbled because you couldn't focus in the afternoon?
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              How many meetings have you phoned in because you were exhausted?
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              How many opportunities have you missed because you didn't have the energy to follow through?
            </p>

            <p className="text-white font-bold leading-relaxed mb-4">
              How many times has your wife initiated and you've been too tired?
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              How many moments with your kids have you missed because you were collapsed on the couch?
            </p>

            <p className="text-white font-bold text-xl mt-10 mb-4">
              This isn't about making more money.
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              It's about not losing what you already have.
            </p>

            <p className="text-gray-200 leading-relaxed">
              Your performance. Your marriage. Your health. Your time with your kids.
            </p>

            <p className="text-white font-bold text-xl mt-6">
              Every day this continues, you're losing more.
            </p>

          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a
              href="/application"
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 text-lg rounded-md inline-block relative z-30"
            >
              Apply Now
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
