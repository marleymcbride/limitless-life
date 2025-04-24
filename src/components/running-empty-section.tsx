import { bgClasses, blackRedGradientOverlay, redAccentBottom, vignetteEffect } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function RunningEmptySection() {
  return (
    <section className={`w-full py-20 text-white relative overflow-hidden ${bgClasses.blackRedGradient}`}>
      {blackRedGradientOverlay}
      {redAccentBottom}
      {vignetteEffect}

      <div className="container mx-auto px-4 relative z-10">
        {/* First Section: "You're Running on Empty" content */}
        <h2 className="mb-12 text-center text-4xl font-bold relative">
          You&apos;re Running on Empty
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#940909]"></span>
        </h2>

        <div className="mx-auto max-w-3xl space-y-6 mb-16">
          <p className="text-lg">
            You wake up <span className="text-[#940909] font-semibold">tired</span>, even after a full night&apos;s sleep. The first thing you reach for is coffee – the first of
            many cups you&apos;ll need today just to function.
          </p>

          <p className="text-lg">
            You&apos;ve gained 10-20 pounds over the last few years. Your clothes don&apos;t fit right anymore. You avoid looking
            in the mirror when you get out of the shower.
          </p>

          <p className="text-lg">
            <span className="text-[#940909] font-semibold">Stress follows you everywhere</span>. Your mind races at night. You snap at your family over small things. You
            wonder if this is just what success costs.
          </p>

          <p className="text-lg">
            You find yourself pouring a drink 3-5 nights a week just to &quot;wind down.&quot; It&apos;s the only way you know how to
            switch off from work mode.
          </p>

          <p className="text-lg">
            Despite knowing something needs to change, you can&apos;t break free from your work-dominated lifestyle. There&apos;s
            always another deadline, another meeting, another crisis to handle.
          </p>
        </div>

        {/* Micro-testimonial for social proof */}
        <div className="mb-16">
          <MicroTestimonial
            quote="I had no idea how bad I felt until I experienced what it was like to feel good again. The contrast was shocking."
            name="Alex J."
            title="VP of Operations"
            metric="15 Years Younger"
          />
        </div>

        {/* Second Section: "The Three Ways to Live" content */}
        <h2 className="mb-10 text-center text-3xl font-bold">The Three Ways To Live</h2>
        <div className="mx-auto px-2 sm:px-0 max-w-4xl">
          <div className="mb-10 border-l-4 border-zinc-700 pl-6 py-2 hover:border-zinc-500 transition-all">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">The Typical Lifestyle (95% of men)</h3>
            <p className="mb-6 text-base sm:text-lg">
              Western diet, regular drinking, barely exercising. Constantly tired, wired on caffeine, dependent on alcohol to wind down. You're accessing maybe 20% of your potential, wasting 80% in a fog of low energy and bad habits.
            </p>
          </div>

          <div className="mb-10 border-l-4 border-zinc-500 pl-6 py-2 hover:border-zinc-300 transition-all">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">The Health-Conscious (4% of men)</h3>
            <p className="mb-6 text-base sm:text-lg">
              You hit the gym, monitor your food, cut back on booze. But there's no real system, you're training and working too hard, always one bad week from burnout. You're accessing 50-60% of your potential, but it's a constant struggle.
            </p>
          </div>

          <div className="mb-10 border-l-4 border-[#940909] pl-6 py-2 hover:scale-[1.02] hover:border-[#a52a2a] transition-all">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">The Limitless 1%</h3>
            <p className="mb-6 text-base sm:text-lg">
              Intentional systems for energy, health, and performance. You understand your body on a deeper level, making optimal health effortless. No caffeine, no alcohol needed — just pure, natural Glide Energy. You're unlocking 95-100% of your potential daily.
            </p>
          </div>

          <p className="font-bold text-base sm:text-lg text-center mt-12 max-w-2xl mx-auto">
            I was trapped in the health-conscious group for years. Always working hard, never feeling my best. The Limitless Protocol was the 1% path I was missing.
          </p>
        </div>
      </div>
    </section>
  )
}
