export default function HowLimitlessProtocolWorks() {
  const systems = [
    {
      number: 1,
      title: "Limitless Morning",
      description: "A morning fuel system that designed to maximises your energy in the first 3 hours of your day. You will have lazer focus and smooth energy without caffeine or supplements, and eat MORE food in the morning unlike most methods. You'll feel fired up before you even leave the house."
    },
    {
      number: 2,
      title: "Limitless Training",
      description: "Our lifestyle training style, minimalist Training. Get results training 2-3 times per week. That's it. When your body is already fried, more training just burns you out faster. We target muscles that matter. We protect your CNS. Build masculine presence and aura."
    },
    {
      number: 3,
      title: "Limitless Flow",
      description: "A natural high state free from caffeine, alcohol, or substances. You will systematically eliminate dependency on alcohol without withdrawal hell. This is the same protocol that has helped countless guys get off booze for good. No AA meetings. No counting days. No willpower. Radiate REAL energy without endless coffees."
    },
    {
      number: 4,
      title: "Limitless Health",
      description: "Get your body working like it should - not patching it up with supplements. This is designed to supercharge your metabolism, unfuck your gut, and fix your low testosterone production. Expected increase of 200-300 ng/dL. This means: higher sex drive, more muscle mass, and losing that stubborn belly fat that won't budge. So your body works like it should again."
    }
  ];

  return (
    <>
      <div className="dark-section-with-grain">
        <section className="py-20 md:pr-24 lg:pr-24 w-full relative overflow-hidden">
          <div className="container w-full relative z-30">

            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl md:ml-24 lg:ml-24 lg:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
              >
                How The Limitless Protocol<sup style={{ fontSize: "0.4em", verticalAlign: "super" }}>™</sup> Works
              </h2>
              </div>
              <div className="text-center ml-24 mb-16">
              <p className="text-xl text-gray-300 pr- max-w-3xl">
                Follow these 4 simple systems to reach your Ultimate Male Form
              </p>
            </div>

            {/* Vertical steps with red guide line */}
            <div className="relative md:pl-24">
              {/* Red vertical guide line - outside the cards on the left */}
              <div className="absolute left-10 left-24 top-0 bottom-0 w-1 bg-[#940909]"></div>

              {/* Steps */}
              <div className="space-y-8">
                {systems.map((system, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-8 md:p-10 shadow-lg relative ml-20 md:ml-24 min-h-[280px] flex flex-col justify-center"
                  >
                    {/* Number circle - positioned on the red line (outside card) */}
                    <div className="absolute -left-10 -left-24 top-8 -translate-y-1/2 -translate-x-1/2">
                      <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold relative z-10 border-2 border-gray-300 border-opacity-30">
                        {system.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="py-8">
                      <h3
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
                        style={{ fontFamily: "Neuemontreal, sans-serif" }}
                      >
                        {system.title}
                      </h3>
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                        {system.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-16">
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
