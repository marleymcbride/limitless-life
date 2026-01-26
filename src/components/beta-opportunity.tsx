export default function BetaOpportunity() {
  return (
    <>
      <div className="dark-section-with-grain">
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-5xl relative z-30">

        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
          >
            Beta Access
          </h2>
        </div>

        <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

          <p className="text-gray-200 leading-relaxed mb-6">
            The Limitless Protocol is updated for 2026.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            All the systems work. The framework is dialed in. The results are consistent.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            Before I release this publicly, I'm opening 10 spots at a reduced rate.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            Why?
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            Your feedback helps me refine the final release. That's the whole thing.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            You get the complete 90-day transformation. All the systems. All the coaching. All the support.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            Same program. Lower price. Limited to 10 spots.
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
        </section>
      </div>
    </>
  );
}
