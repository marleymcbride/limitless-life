import { bgClasses } from "@/lib/utils";

export default function WhySmallNumber() {
  return (
    <>
    <section className="w-full results-proof-gradient pt-16 pb-12 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>

          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0 text-white"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
              >
                Why I Only Work With A Small Number Of Clients Each Month
              </h2>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              For you to get a life-changing trasnformation, I need to actually know you and work closely with you.
            </p>

            <p className="text-gray-200 leading-relaxed mb-8">
            Because of this I only let in a handful of clients each month.
            </p>


            <div className="text-gray-200  text-2Oxl leading-relaxed mb-4">
            <strong>What you&apos;ll get when you&apos;re inside:</strong>
            </div>

            <div className="bg-white/10 backdrop-blur-sm py-10 px-6 md:px-6 lg:px-6 rounded-lg mt-8 mb-10 border border-white/20">
              <ul className="space-y-4 why-small-bullets">
                <li className="flex items-start">
                  <span className="text-[#ff4444] font-bold mr-3 mt-1">•</span>
                  <div className="text-gray-200">VIP access to me every day, not just some do it yourself &apos;plan&apos;.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ff4444] font-bold mr-3 mt-1">•</span>
                  <div className="text-gray-200">Daily support via WhatsApp, not &ldquo;check-ins&ldquo; once in a while.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ff4444] font-bold mr-3 mt-1">•</span>
                  <div className="text-gray-200">Hormone and blood test anaylsis, not just cookie-cutter generic slop.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ff4444] font-bold mr-3 mt-1">•</span>
                  <div className="text-gray-200">Cutting-edge custom   health protocols, from 12 years of experience.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ff4444] font-bold mr-3 mt-1">•</span>
                  <div className="text-gray-200">High-level results and performance monitoring to make sure we are always on track.</div>
                </li>

                 {/*<li className="flex items-start">
                  <span className="text-[#ff4444] font-bold mr-3 mt-1">•</span>
                  <div className="text-gray-200">A tight-knit community of high-performers</div>
                </li>*/}
              </ul>
            </div>

            <p className="text-white leading-relaxed font-bold text-xl">
            If that’s the kind of environment you thrive thrive in, I&apos;d love to welcome you inside.
            </p>

          </div>

          {/* CTA Button */}
          <div className="text-center mt-10 mb-10O">
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
      <style jsx>{`
        @media (max-width: 768px) {
          .why-small-bullets div {
            font-size: 1.22rem !important;
          }
        }
      `}</style>
    </>
  );
}
