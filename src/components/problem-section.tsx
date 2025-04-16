export default function ProblemSection() {
    return (
      <section className="w-full bg-zinc-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl relative">
            You&apos;re Running on Empty
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#940909]"></span>
          </h2>

          <div className="mx-auto max-w-3xl space-y-6">
            <p>
              You wake up <span className="text-[#940909] font-semibold">tired</span>, even after a full night&apos;s sleep. The first thing you reach for is coffee – the first of
              many cups you&apos;ll need today just to function.
            </p>

            <p>
              You&apos;ve gained 10-20 pounds over the last few years. Your clothes don&apos;t fit right anymore. You avoid looking
              in the mirror when you get out of the shower.
            </p>

            <p>
              <span className="text-[#940909] font-semibold">Stress follows you everywhere</span>. Your mind races at night. You snap at your family over small things. You
              wonder if this is just what success costs.
            </p>

            <p>
              You find yourself pouring a drink 3-5 nights a week just to &quot;wind down.&quot; It&apos;s the only way you know how to
              switch off from work mode.
            </p>

            <p>
              Despite knowing something needs to change, you can&apos;t break free from your work-dominated lifestyle. There&apos;s
              always another deadline, another meeting, another crisis to handle.
            </p>

            <p className="mt-8 font-bold text-[#940909]">
              This isn&apos;t just in your head—it&apos;s a systemic breakdown of your energy, body, mind, and habits.
            </p>
          </div>
        </div>
      </section>
    )
  }