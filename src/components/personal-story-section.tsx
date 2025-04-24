import Image from "next/image"

export default function PersonalStorySection() {
  return (
    <section className="w-full bg-dark-red py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <Image
              src="/placeholder.svg?height=600&width=400"
              alt="Marley McBride"
              width={400}
              height={600}
              className="rounded-lg"
            />
          </div>

          <div className="md:w-2/3">
            <h2 className="mb-6 text-3xl font-bold">My Journey From Burnout to Breakthrough</h2>

            <p className="mb-4 text-lg">
              My life was a trainwreck. 3-4 coffees every morning. Half bottle of wine at night just to wind down. Gained 24 pounds in 6 months. Brain fog constantly. This was my life for 7 years.
            </p>

            <p className="mb-4 text-lg">
              Working 70+ hours a week. Carrying extra 30 pounds. Running on caffeine - willpower. Doctor told me heading for heart attack before 45 if didn't change.
            </p>

            <p className="mb-4 text-lg">
              Tried every diet - workout program - productivity hack. Minimal results. Problem wasn't lack of effort - was approaching health as isolated pieces instead of system.
            </p>

            <p className="mb-4 text-lg">
              Mornings were worst. Hitting snooze 5-6 times. Dragging myself out of bed feeling like death. First thought every day - need coffee now. Couldn't function without it.
            </p>

            <p className="mb-4 text-lg">
              Evenings no better. So wired and anxious couldn't turn brain off. Pouring drinks just to relax. Sleeping pills when alcohol wasn't enough. Waking up feeling worse than before.
            </p>

            <p className="mb-4 text-lg">
              Body falling apart. Clothes didn't fit. Avoiding mirrors after shower. Blood pressure through roof. Testosterone levels bottomed out. Constant brain fog ruining my work.
            </p>

            <div className="mt-6 text-xl font-semibold">
              This wasn't living. It was barely surviving.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
