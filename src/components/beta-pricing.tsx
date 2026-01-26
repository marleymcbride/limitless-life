export default function BetaPricing() {
  return (
    <>
      <div className="dark-section-with-grain" style={{
        background: 'linear-gradient(135deg, rgba(56, 56, 56, 1) 0%, rgba(31, 31, 31, 1) 40%, rgba(31, 30, 30, 0.995) 45%, rgba(31, 28, 28, 0.99) 50%, rgba(30, 26, 26, 0.985) 55%, rgba(30, 23, 23, 0.98) 60%, rgba(30, 20, 20, 0.975) 65%, rgba(32, 17, 17, 0.97) 70%, rgba(35, 15, 15, 0.965) 75%, rgba(38, 13, 13, 0.96) 80%, rgba(42, 11, 11, 0.955) 85%, rgba(46, 9, 9, 0.95) 90%, rgba(50, 8, 8, 0.945) 95%, rgba(55, 7, 7, 0.94) 100%)'
      }}>
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-5xl relative z-30">

        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
          >
            Beta Pricing
          </h2>
        </div>

        <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

          <p className="text-gray-200 leading-relaxed mb-6">
            Regular price for the Limitless Protocol is <span className="text-white font-bold">£3,997</span>.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            For the first 10 beta spots, it's <span className="text-white font-bold">£997</span>.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            You save <span className="text-white font-bold">£3,000</span>.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            Use code <span className="text-white font-bold">BETA-TESTER</span> at checkout.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            Once the 10 spots are gone, pricing returns to regular.
          </p>

          <p className="text-gray-200 leading-relaxed">
            No exceptions.
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
