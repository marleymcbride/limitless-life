interface BetaOpportunityProps {
  ctaText?: string;
}

export default function BetaOpportunity({ ctaText = "Join Now" }: BetaOpportunityProps) {
  return (
    <>
      <div className="dark-section-with-grain">
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-5xl relative z-30">

        <div className="text-center mx-auto md:mx-24 lg:mx-24 mb-12">
          <h2white
            className="text-3xl mx-auto md:mx-24 lg:mx-24 md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
          >
            What is The Lifestyle Athlete Beta Cohort?
          </h2white>
        </div>

        <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

          <p className="text-gray-200 leading-relaxed mb-6">
            I've been quietly carfefully crafting and redesigining The Limitless Protocol for 2026.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            This is my most impactful programme to date, and i can't wait to see the results over the next 1-2 years.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            But before I release it publicly, I'm opening 10 spots at a reduced rate to get live feedback and help me improve it.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            The 10 selected beta testers will get the full Limitless experience for a fraction of the full cost, with all my time and effort dedicated to you.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
          So if you're serious about getting up to 30 hours of unrelenting energy per week, join the waitlist now.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 text-lg rounded-md inline-block relative z-30"
          >
            {ctaText}
          </a>
          </div>
          </div>
        </section>
      </div>
    </>
  );
}
