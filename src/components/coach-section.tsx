import Image from "next/image"

export default function CoachSection() {
  return (
    <section className="w-full bg-black py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <Image
              src="/placeholder.svg?height=600&width=400"
              alt="Coach"
              width={400}
              height={600}
              className="rounded-lg"
            />
          </div>

          <div className="md:w-2/3">
            <h2 className="mb-6 text-3xl font-bold">Meet Your Coach</h2>

            <p className="mb-4">
              Ten years ago, I was exactly where you are now. Working 70+ hours a week, carrying an extra 30 pounds, and
              running on caffeine and willpower. My doctor told me I was heading for a heart attack before 45 if I
              didn't change.
            </p>

            <p className="mb-4">
              After trying every diet, workout program, and productivity hack with minimal results, I realized the
              problem wasn't lack of effort—it was approaching health as isolated pieces instead of an integrated
              system.
            </p>

            <p className="mb-4">
              I spent years researching, testing, and refining what would become The Limitless Method. I transformed my
              own health, dropping 35 pounds, doubling my energy, and eliminating my need for blood pressure
              medication—all while growing my business by 300%.
            </p>

            <p className="mb-4">
              Now, I've helped hundreds of executives and entrepreneurs achieve similar transformations. As a certified
              performance coach with specializations in metabolic optimization and stress physiology, I've developed a
              system specifically for busy, high-performing men who need results without adding hours to their already
              packed schedules.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="rounded-full bg-zinc-800 px-4 py-2 text-sm">Certified Performance Coach</div>
              <div className="rounded-full bg-zinc-800 px-4 py-2 text-sm">Metabolic Optimization Specialist</div>
              <div className="rounded-full bg-zinc-800 px-4 py-2 text-sm">Stress Physiology Expert</div>
              <div className="rounded-full bg-zinc-800 px-4 py-2 text-sm">Behavioral Change Master</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
