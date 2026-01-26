"use client";

export default function ImagineThisDark() {
  return (
    <section className="imaginethis-outer-bg py-24 px-4 w-full relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-30">
        <div className="text-center">
          {/* Black round rectangle box with shadow - Mobile optimized */}
          <div className="rounded-2xl dark-card-bg-small-orb p-8 md:p-14 md:pt-12 md:px-16 lg:px-20 shadow-2xl mx-auto md:mx-4 max-w-6xl w-full">
            <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.04rem" }}>
              <h2
                className="text-4xl md:text-6xl font-bold pt-4 md:pt-8 mb-6 md:mb-8 text-white leading-tight mt-2"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Imagine this
              </h2>



              <div className="text-left space-y-3 md:space-y-2 mt-8 md:mt-14 mb-8 md:mb-10 px-2 md:px-0">
                <div className="flex items-center gap-3 md:gap-4">


                  <p className="text-white leading-relaxed text-sm mb-3 md:mb-4" style={{ fontSize: "0.8rem" }}>
                  You Had a Simple System That:
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "0.8rem", height: "0.8rem" }}>
                      <svg
                        className="w-3 h-3 text-black"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ width: "0.6rem", height: "0.6rem" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                  </div>

                  <p className="text-white leading-relaxed text-sm" style={{ fontSize: "0.8rem" }}>
                  Has you feeling energized as soon as you wake
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "0.8rem", height: "0.8rem" }}>
                    <svg
                      className="w-3 h-3 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ width: "0.6rem", height: "0.6rem" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-white leading-relaxed text-sm" style={{ fontSize: "0.8rem" }}>
                  Builds a lean body in only 2 days of training
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "0.8rem", height: "0.8rem" }}>
                    <svg
                      className="w-3 h-3 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ width: "0.6rem", height: "0.6rem" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-white leading-relaxed text-sm" style={{ fontSize: "0.8rem" }}>
                    Leaves you with energy for your family and life after work
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
