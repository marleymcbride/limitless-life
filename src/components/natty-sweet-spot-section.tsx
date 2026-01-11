import Image from "next/image";
import {
  bgClasses,
  invertedGradientOverlay,
  strongRedAccent,
  vignetteEffect,
} from "@/lib/utils";
import { Check } from "lucide-react";

export default function NattySweetSpotSection() {
  // The 7 components of the Ultimate Male Form
  const components = [
    {
      name: "Body",
      description:
        "Lean, strong physique at 11-14% body fat. The sweet spot where you look jacked but still feel amazing.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Hormones",
      description:
        "Optimized testosterone and stress hormones. No energy crashes or mood swings. Pure masculine power.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Health",
      description:
        "Bulletproof immune system, strong heart, deep sleep, perfect digestion. Robust in every aspect.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Peace",
      description:
        "Mental clarity and calmness in chaos. No need for alcohol or substances to unwind. Complete control.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Energy",
      description:
        "All-day natural energy without caffeine. Waking up fired up before your alarm. Never crashing.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mental Health",
      description:
        "Rock-solid confidence. No anxiety. Clear thinking and decisive action in all situations.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Happiness",
      description:
        "Deep satisfaction in daily life. Finding joy in the journey, not just the destination.",
      icon: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <section className={`w-full py-20 px-4 ${bgClasses.blackRedGradient}`}>
      {invertedGradientOverlay}
      {strongRedAccent}
      {vignetteEffect}

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/10 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            THE COMPLETE TRANSFORMATION
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white">
            The Natty Sweet Spot
          </h2>
          <p className="text-3xl md:text-xl max-w-3xl mx-auto text-white">
            The ultimate state of male existence - where physique, hormones,
            health, and mindset align perfectly
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start mb-16 max-w-6xl mx-auto">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-[#940909]/30">
              <h3 className="text-2xl font-bold mb-4 text-white">
                What Is The Natty Sweet Spot?
              </h3>
              <p className="text-white/90 mb-4">
                It's not just about looking jacked - it's the perfect
                intersection of physical power, mental clarity, and life force
                energy.
              </p>
              <p className="text-white/90 mb-4">
                Most men chase single-digit body fat percentages - destroying
                their hormones - sacrificing everything for abs you can't even
                enjoy.
              </p>
              <p className="text-white/90 mb-4">
                Others just let go completely - getting soft - losing their edge
                - becoming shells of what they could be.
              </p>
              <p className="text-white/90 font-bold">
                The Natty Sweet Spot is different. It's balanced. It's powerful.
                It's sustainable. And it feels fucking amazing.
              </p>
            </div>

            <div className="mt-6 bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-[#940909]/30">
              <h3 className="text-2xl font-bold mb-4 text-white">
                What This Gives You:
              </h3>
              <ul className="space-y-2">
                <li className="flex">
                  <Check className="h-6 w-6 text-[#940909] mr-3 flex-shrink-0" />
                  <span className="text-white">
                    Elite body composition (11-14% body fat) without starvation
                  </span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-[#940909] mr-3 flex-shrink-0" />
                  <span className="text-white">
                    Optimal testosterone and stress hormone levels
                  </span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-[#940909] mr-3 flex-shrink-0" />
                  <span className="text-white">
                    Mental sharpness and focus without stimulants
                  </span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-[#940909] mr-3 flex-shrink-0" />
                  <span className="text-white">
                    Boundless natural energy from morning to night
                  </span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-[#940909] mr-3 flex-shrink-0" />
                  <span className="text-white">
                    Complete independence from caffeine and alcohol
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="The Natty Sweet Spot Transformation"
                width={500}
                height={600}
                className="object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <p className="text-white font-bold mb-2">
                    The Ultimate Male Transformation
                  </p>
                  <p className="text-sm text-white/80">
                    Balanced. Sustainable. Powerful.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-10 text-white">
            The 7 Components of The Natty Sweet Spot
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {components.map((component, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-[#940909]/30 transform transition hover:scale-[1.02]"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 mr-3 rounded-full bg-[#940909]/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white">{index + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {component.name}
                  </h4>
                </div>
                <p className="text-white/90">{component.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-bold mb-4 text-white">
            This is what I help high-performing men achieve.
          </p>
          <p className="text-3xl md:text-xl max-w-3xl mx-auto mb-6 text-white">
            Not just quitting alcohol and dropping weight - but reaching this
            state of complete optimization - where everything works together in
            perfect harmony.
          </p>
          <div className="inline-block bg-white/10 text-white font-bold backdrop-blur-sm p-5 rounded-lg border border-[#940909]/30 max-w-5xl mx-auto">
            <p className="text-xl">
              "I help high-performing men quit alcohol permanently, eliminate
              fake energy crutches, and drop the 20-40 lbs of stress weight … so
              you finally wake up sharp and dialled in every morning, see your
              elite body in the mirror, and feel naturally high on life —
              without ever needing another hit of caffeine or drop of alcohol
              again."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
