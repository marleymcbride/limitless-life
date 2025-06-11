import { bgClasses, strongRedAccent, vignetteEffect } from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";

export default function RunningEmptySection() {
  return (
    <section className="w-full py-20 text-white relative overflow-hidden bg-zinc-900">
      {/* Custom background with cool undertone */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-950 opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
      {vignetteEffect}

      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#940909]/10 rounded-bl-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#940909]/5 rounded-tr-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* First Section: "You're Running on Empty" content */}
        <h2 className="mb-12 text-center text-4xl font-bold relative">
          You&apos;re Running on Empty
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#940909]"></span>
        </h2>

        <div className="mx-auto max-w-3xl space-y-6 mb-16">
          <p className="text-lg text-white">
            You wake up{" "}
            <span className="text-[#ff6b6b] font-semibold">tired</span>, even
            after a full night&apos;s sleep. The first thing you reach for is
            coffee – the first of many cups you&apos;ll need today just to
            function.
          </p>

          <p className="text-lg text-white">
            You&apos;ve gained 10-20 pounds over the last few years. Your
            clothes don&apos;t fit right anymore. You avoid looking in the
            mirror when you get out of the shower.
          </p>

          <p className="text-lg text-white">
            <span className="text-[#ff6b6b] font-semibold">
              Stress follows you everywhere
            </span>
            . Your mind races at night. You snap at your family over small
            things. You wonder if this is just what success costs.
          </p>

          <p className="text-lg text-white">
            You find yourself pouring a drink 3-5 nights a week just to
            &quot;wind down.&quot; It&apos;s the only way you know how to switch
            off from work mode.
          </p>

          <p className="text-lg text-white">
            Despite knowing something needs to change, you can&apos;t break free
            from your work-dominated lifestyle. There&apos;s always another
            deadline, another meeting, another crisis to handle.
          </p>
        </div>

        {/* Micro-testimonial for social proof */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-black/50 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
            <MicroTestimonial
              quote="I had no idea how bad I felt until I experienced what it was like to feel good again. The contrast was shocking."
              name="Alex J."
              title="VP of Operations"
              metric="15 Years Younger"
            />
          </div>
        </div>

        {/* Second Section: "The Three Ways to Live" content */}
        <h2 className="mb-10 text-center text-3xl font-bold text-white">
          The Three Ways To Live
        </h2>
        <div className="mx-auto px-2 sm:px-0 max-w-4xl">
          <div className="mb-10 bg-gradient-to-r from-gray-900 to-black rounded-lg p-6 border-l-4 border-gray-500 hover:border-gray-300 transition-all shadow-md">
            <div className="flex items-center mb-4">
              <span className="text-lg font-bold text-white mr-3">95%</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                The Typical Lifestyle
              </h3>
            </div>
            <div className="p-4 bg-black/50 rounded-md">
              <p className="mb-2 text-base sm:text-lg text-white">
                Western diet, regular drinking, barely exercising. Constantly
                tired, wired on caffeine, dependent on alcohol to wind down.
              </p>
              <p className="text-base sm:text-lg text-white">
                <span className="text-red-300 font-medium">
                  You're accessing maybe 20% of your potential
                </span>
                , wasting 80% in a fog of low energy and bad habits.
              </p>
            </div>
          </div>

          <div className="mb-10 bg-gradient-to-r from-blue-900/20 to-zinc-900 rounded-lg p-6 border-l-4 border-blue-500 hover:border-blue-400 transition-all shadow-md">
            <div className="flex items-center mb-4">
              <span className="text-lg font-bold text-blue-400 mr-3">4%</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                The Health-Conscious
              </h3>
            </div>
            <div className="p-4 bg-zinc-800/70 rounded-md">
              <p className="mb-2 text-base sm:text-lg text-white">
                You hit the gym, monitor your food, cut back on booze. But
                there's no real system, you're training and working too hard,
                always one bad week from burnout.
              </p>
              <p className="text-base sm:text-lg text-white">
                <span className="text-blue-300 font-medium">
                  You're accessing 50-60% of your potential
                </span>
                , but it's a constant struggle.
              </p>
            </div>
          </div>

          <div className="mb-10 bg-gradient-to-r from-[#940909]/50 to-black/80 backdrop-blur-sm rounded-lg p-6 border-l-4 border-[#940909] hover:scale-[1.02] transition-all shadow-xl">
            <div className="flex items-center mb-4">
              <span className="text-lg font-bold text-white mr-3">1%</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white bg-[#940909] px-3 py-1 inline-block rounded">
                The Limitless Elite
              </h3>
            </div>
            <div className="p-4 bg-black/40 rounded-md">
              <p className="mb-2 text-base sm:text-lg text-white">
                Intentional systems for energy, health, and performance. You
                understand your body on a deeper level, making optimal health
                effortless. No caffeine, no alcohol needed — just pure, natural
                Glide Energy.
              </p>
              <p className="text-base sm:text-lg text-white">
                <span className="text-[#ff6b6b] font-medium">
                  You're unlocking 95-100% of your potential
                </span>{" "}
                daily.
              </p>
            </div>
          </div>

          <div className="font-bold text-base sm:text-lg text-center mt-12 max-w-2xl mx-auto p-6 bg-black/30 rounded-lg border border-[#940909]/30">
            <p className="text-white italic">
              "I was trapped in the health-conscious group for years. Always
              working hard, never feeling my best. The Limitless Protocol was
              the 1% path I was missing."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
