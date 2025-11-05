"use client";

import { CTAButton } from "./ui/cta-button";

export default function ResultsProof() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-8"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            What Your Life Could Look Like
          </h2>

          <div className="mb-12">
            <div className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Real results from men who were exactly where you are right now:
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">JS</span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900"
                      style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
                    >
                      Client J - 47 years old
                    </h3>
                    <p className="text-sm text-gray-600">16 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;I&apos;ve lost 31 pounds and haven&apos;t touched
                  alcohol in 8 months. My business has never been better because
                  I have the energy to actually focus.&quot;
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">MS</span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900"
                      style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
                    >
                      Client M - 52 years old
                    </h3>
                    <p className="text-sm text-gray-600">12 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;Down 28 lbs and my doctor is amazed at my bloodwork. I
                  feel like I&apos;m 35 again, not 52.&quot;
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">DR</span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900"
                      style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
                    >
                      Client D - 39 years old
                    </h3>
                    <p className="text-sm text-gray-600">20 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;I was skeptical but this actually works. 22 lbs lost and
                  my energy levels are through the roof. No more afternoon
                  crashes.&quot;
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">TK</span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900"
                      style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
                    >
                      Client T - 44 years old
                    </h3>
                    <p className="text-sm text-gray-600">14 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;My wife says I&apos;m like a different person. I&apos;ve
                  lost 24 lbs and actually want to be intimate again. This
                  system changed my marriage.&quot;
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">AR</span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900"
                      style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
                    >
                      Client A - 58 years old
                    </h3>
                    <p className="text-sm text-gray-600">24 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;I thought I was too old to change. Lost 18 lbs and my
                  doctor took me off all medications. I feel better than I have
                  in 20 years.&quot;
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">KL</span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900"
                      style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
                    >
                      Client K - 36 years old
                    </h3>
                    <p className="text-sm text-gray-600">10 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;I was a coffee addict. Now I wake up naturally
                  energized. 19 lbs gone and I&apos;m performing better at work
                  than ever before.&quot;
                </p>
              </div>
            </div>
          </div>
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block mt-16"
          >
            See If This Is Right For You
          </a>
        </div>
      </div>
    </section>
  );
}
