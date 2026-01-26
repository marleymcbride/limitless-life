import { bgClasses } from "@/lib/utils";

export default function FinalCTASection() {
  return (
    <section className="w-full results-proof-gradient pt-16 pb-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>

          <div className="prose prose-lg max-w-none mobile-text-large body-copy text-center" style={{ fontSize: "1.3rem" }}>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white"
              style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
            >
              Stop Putting Off Your Transformation
            </h2>

            <p className="text-white font-bold text-xl leading-relaxed mb-6">
              You know what's happening.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You can feel it.
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              Every morning you wake up exhausted. Every afternoon you crash. Every night you need alcohol to shut your brain off.
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              Your body's getting softer. Your energy's getting lower. Your wife's noticing.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              And you keep telling yourself you'll fix it.
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              Next month. After this project. When things calm down.
            </p>

            <p className="text-white font-bold text-xl mb-8">
              They're not going to calm down.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You'll be saying the same thing next year. And the year after.
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              Unless you actually do something about it.
            </p>

            <p className="text-gray-200 leading-relaxed mb-10">
              If you're still uncertain, DM me on Twitter or check out the testimonials.
            </p>

            <p className="text-gray-200 leading-relaxed mb-8">
              But if you're ready for a system that actually works, fill out the application below.
            </p>

            <p className="text-white font-bold text-xl mb-8">
              It's time to stop running on fumes and start feeling like the man you know you're capable of being.
            </p>

            <p className="text-gray-200 leading-relaxed mb-10">
              Spots are limited each month. Once we hit capacity, doors close until the next round.
            </p>

          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="/application"
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-5 px-16 text-xl rounded-md inline-block relative z-30"
            >
              Apply Now
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
