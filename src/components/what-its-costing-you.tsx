export default function WhatItsCostingYou() {
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
                What This Is Actually Costing You
              </h2>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              Let me be straight with you.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You&apos;ve probably got the success side sorted.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You&apos;re making good money, you&apos;ve got the career, the house.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              But if you actually look at your health?
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              It&apos;s in a pretty bad state.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Maybe your doctor&apos;s already warned you about your blood pressure or your blood sugar or something else.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              And you told yourself you&apos;d fix it.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              But you haven&apos;t.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              And the reality is you could be looking at heart disease, diabetes or even worse in the next few years.
            </p>

            <p className="text-white font-bold text-xl mb-6">
              Average medical costs in the US is over $75,000 per year in 2026.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              What could this mean for your job? Underperforming at work could be as serious as losing your career.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
            Or your family?
              How does your wife feel about your drinking?
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Or your kids, growing up with a dad who&apos;s never actually there.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              <strong>You don&apos;t get these years back.</strong>
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Every day you don&apos;t act is another day closer to this reality.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Really ask yourself, what is the cost of NOT fixing this costing you?
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
