import { bgClasses } from "@/lib/utils";

export default function WhatHappensIfYouDontFixThis() {
  return (
    <section className={`w-full ${bgClasses.white} pt-16 pb-12 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>

          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0 text-gray-900"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
              >
                What Happens If You Don&apos;t Fix This
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
             I want you to think about the legacy you want to leave.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Because, the money, the status, the success... that&apos;s all great.
              But if you feel like shit every day, what&apos;s the point?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              This could be the difference between reaching new levels and work, losing promotions, or even worse your job entirely.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And with a deteriorating body, it&apos;s not just your physique. You could be on the cusp of pre-diabetic, or serious health problems. And the cost of healthcare adds up very fast.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Or your family... maybe it &apos;s not the same with your partner.
              Maybe you have kids and you never have the energy for them. You never get those years back.
            </p>

            <p className="text-gray-800 font-bold text-xl">
              And the reality is if you don&apos;t change anything, things will keep getting worse.
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
