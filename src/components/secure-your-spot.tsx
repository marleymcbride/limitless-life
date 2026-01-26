import { bgClasses } from "@/lib/utils";

export default function SecureYourSpot() {
  return (
    <section className="w-full results-proof-gradient pt-16 pb-12 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>

          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0 text-white"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
              >
                Secure Your Spot Before This Intake Fills
              </h2>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              I only take a handful of new clients each month, because I refuse to dilute the level of attention and results I deliver.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              If you wait and miss this intake, I can&apos;t promise a spot when we re-open.
            </p>

            <p className="text-gray-200 leading-relaxed mb-4">
              That means pushing back the transformation you could already be experiencing.
            </p>

            <p className="text-gray-200 leading-relaxed">
              Another month of under-performing at work, another month of not making progress with your body, another month of waking up like shit.
            </p>

            <p className="text-white font-bold text-xl mt-10">
              How much longer are you willing to feel like this?
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
