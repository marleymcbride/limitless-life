"use client";

import Image from "next/image";

export default function IntroducingLimitless() {
  return (
    <section className="introducing-limitless-bg py-20 px-4 w-full relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-30">
        <div className="text-center">
          <h2
            className="text-3xl md:text-4xl font-medium text-red-600 mb-4"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            ...
          </h2>
          <h2
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Box options 2
          </h2>

          <p className="text-xl text-white-300 mb-13 max-w-5xl text-left leading-relaxed"
          style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
          After X Y Z, I created a system that wakes you up energized, builds a lean body in 2 days per week, and has you feeling completely relaxed without needing alcohol.
          </p>

          {/* ELITE PHOTOSHOOT PHOTO */}
          <div className="my-10 flex justify-center">
            <figure className="relative w-full max-w-2xl">
              <Image
                src="/images/marley-elite-photoshoot.jpg"
                alt="Marley McBride - Elite Photoshoot"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl w-full h-auto"
                loading="lazy"
              />
              <figcaption className="mt-4 text-center text-gray-300 italic text-lg">
                This is me training 2 days per week, 3+ years sober, and more energy than I had at 25
              </figcaption>
            </figure>
          </div>

          <p className="text-xl text-white-300 mb-13 max-w-5xl mt-6 mb-12 text-left leading-relaxed"
          style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
          Here&apos;s why it works:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12 text-left">
                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    1. It Works Because It Does The Opposite
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Every program adds more—more gym time, more meal prep, more supplements. This removes what&apos;s destroying you. That&apos;s why it works when everything else fails.
                  </p>
                </div>

                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    2. It Works Because Willpower Is A Scam
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Other programs blame you when you fail. &quot;Just have more discipline.&quot; This fixes the biology so willpower becomes irrelevant.
                  </p>
                </div>

                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    3. It Works Because Training Less Actually Builds More
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Sounds backward but it&apos;s true. Your body builds muscle during recovery, not during training. Two days gives it time to actually grow.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-12 text-left">
                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    4. It Works Because It&apos;s Built For Your Actual Life
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Generic advice is for 25-year-olds with unlimited time. This works around demanding careers, constant travel, and family commitments.
                  </p>
                </div>

                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    5. It Works Because It Fixes Why You&apos;re Actually Tired
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    You&apos;re not tired because you need coffee. You need coffee because your energy production is broken. Fix that and coffee becomes optional.
                  </p>
                </div>

                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    6. It Works Because Hormones Restore Naturally
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Your testosterone comes back—300+ point increases on average—when you remove what&apos;s suppressing it. No TRT. No needles. No clinics.
                  </p>
                </div>
              </div>

          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
