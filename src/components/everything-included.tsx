export default function EverythingIncluded() {
  const items = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "1-on-1 Coaching & Support",
      description: "Direct access to me for the entire program. Get any question answered and feedback on your training, nutrition, and lifestyle. This isn't a group program. You work directly with me."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "The Complete Limitless Systems",
      description: "All four systems laid out step-by-step. Morning Fuel System protocols. Exact training programs. Limitless Flow practices. Health optimization strategies. No guessing. Just follow the system."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Weekly Check-Ins & Adjustments",
      description: "We track progress weekly and adjust as needed. Energy levels. Body composition. Sleep quality. Work performance. If something's not working, we fix it immediately."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Accountability & Habit Architecture",
      description: "I help you build the habits that make this effortless. We don't rely on willpower. We build systems that make the right choices automatic."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Lifetime Access + Updates",
      description: "Keep all training materials forever. Get free updates as I refine the system. Your investment now covers you for life."
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
            Everything Included In The Limitless Protocol<sup style={{ fontSize: "0.4em", verticalAlign: "super" }}>™</sup>
          </h2>
        </div>

        {/* Grid layout - 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 md:p-8 shadow-lg relative min-h-[380px] flex flex-col"
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
                <p className="text-gray-700 text-base leading-relaxed">
                  {item.description}
                </p>
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
    </>
  );
}
