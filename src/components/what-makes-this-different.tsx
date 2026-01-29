export default function EverythingIncluded() {
  const items = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Train LESS, Recover MORE",
      description: "You've been told you need to train 4-6 days per week to get results. But that approach doesn't focus on where the actual gains are made: during recovery.\n\nWe train 2-3 days per week using rest-focused training, and we use the Power Presence Method™ to build the muscles that create your masculine aura and presence."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Fix Root Causes, Not Symptoms",
      description: "Everything you've tried up to this point treats symptoms. Diets. Supplements. Willpower. That's why you always end up right back where you started.\n\nWe use The Bottleneck Test™ to identify exactly what's broken inside your body, then we use Metabolic Priming™ and the Hormone Reset™ to fix what's actually causing the problems."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Custom To Your Body, Not Cookie-Cutter",
      description: "You don't need a generic meal plan or some one-size-fits-all program. We identify YOUR specific constraints and build everything around your actual life and your actual body.\n\nYou get a personalized protocol designed for you - your schedule, your goals, your reality."
    }
  ];

  return (
    <>
      <div className="dark-section-with-grain" style={{
        background: 'linear-gradient(135deg, rgba(56, 56, 56, 1) 0%, rgba(31, 31, 31, 1) 40%, rgba(31, 30, 30, 0.995) 45%, rgba(31, 28, 28, 0.99) 50%, rgba(30, 26, 26, 0.985) 55%, rgba(30, 23, 23, 0.98) 60%, rgba(30, 20, 20, 0.975) 65%, rgba(32, 17, 17, 0.97) 70%, rgba(35, 15, 15, 0.965) 75%, rgba(38, 13, 13, 0.96) 80%, rgba(42, 11, 11, 0.955) 85%, rgba(46, 9, 9, 0.95) 90%, rgba(50, 8, 8, 0.945) 95%, rgba(55, 7, 7, 0.94) 100%)'
      }}>
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-6xl relative z-30">

        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl md:mx-24 lg:mx-24 lg:text-5xl font-bold text-white mb-18"
            style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
          >
            What Makes This Different
          </h2>
        </div>

        {/* Grid layout - 3 columns on desktop, 1 on mobile */}
        <div className="flex flex-col items-stretch gap-10 mb-24 md:grid md:grid-cols-2 lg:grid-cols-3">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white px-12 md:px-12 lg:px-12 rounded-lg p-6 md:p-8 shadow-lg relative min-h-[380px] flex flex-col mobile-box-width whatmakes-different-card"
            >
              {/* Icon */}
              <div className="text-gray-800 mb-4">
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  {item.title}
                </h3>
                <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line whatmakes-description">
                  {item.description}
                </div>
              </div>
            </div>
          ))}

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
      <style jsx>{`
        @media (max-width: 768px) {
          .whatmakes-different-card h3 {
            font-size: 1.75rem !important;
          }
          .whatmakes-different-card div.whatmakes-description {
            font-size: 1.22rem !important;
          }
        }
      `}</style>
    </>
  );
}
