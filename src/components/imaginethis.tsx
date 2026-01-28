"use client";

export default function ImagineThis() {
  return (
    <section className="bg-black py-24 px-4 w-full relative dark-section-with-grain">
      <div className="container mx-auto max-w-6xl relative z-30">
        <div className="text-center">
          {/* White round rectangle box with shadow - Mobile optimized */}
          <div
            className="rounded-2xl light-card-bg-small-orb p-8 md:p-14 md:pt-3 md:px-16 lg:px-20 mx-auto mobile-box-width"
            style={{
              boxShadow: "20px -10px 40px 5px rgba(45, 52, 65, 0.7)",
              width: "85%",
              maxWidth: "72rem"
            }}
          >
            <style jsx>{`
              @media (max-width: 768px) {
                .imaginethis-subheading {
                  font-size: 1.45rem !important;
                }
                .imaginethis-bullet {
                  font-size: 1.4rem !important;
                }
                .imaginethis-heading {
                  font-size: 3.5rem !important;
                }
              }
            `}</style>
            <div className="prose prose-lg max-w-none mobile-text-large body-copy imaginethis-mobile-text" style={{ fontSize: "1.04rem" }}>
              <h2
                className="imaginethis-heading text-6xl md:text-6xl font-bold pt-4 pb-5 md:pt-8 mb-6 md:mb-8 text-gray-900 leading-tight mt-2"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Imagine this
              </h2>



              <div className="text-left space-y-3 md:space-y-2 mt-8 md:mt-0 mb-8 md:mb-0 px-2 md:px-0">
                <div className="flex items-center gap-3 md:gap-4">


                  <p className="imaginethis-subheading text-gray-800 leading-relaxed text-md md:text-sm lg:text-sm mb-3 md:mb-4" style={{ fontSize: "0.8rem" }}>
                  <strong>You Had a Simple System That:</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "0.8rem", height: "0.8rem" }}>
                      <svg
                        className="w-3 h-3 text-white"
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

                  <p className="imaginethis-bullet text-gray-800 leading-relaxed text-sm" style={{ fontSize: "0.8rem" }}>
                  Has you feeling energized as soon as you wake
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "0.8rem", height: "0.8rem" }}>
                    <svg
                      className="w-3 h-3 text-white"
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
                  <p className="imaginethis-bullet text-gray-800 leading-relaxed text-sm" style={{ fontSize: "0.8rem" }}>
                  Loses your gut and get abs in only 2 days of training
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "0.8rem", height: "0.8rem" }}>
                    <svg
                      className="w-3 h-3 text-white"
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
                  <p className="imaginethis-bullet text-gray-800 leading-relaxed text-sm" style={{ fontSize: "0.8rem" }}>
                    Leaves you with energy for your family and life after work
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "0.8rem", height: "0.8rem" }}>
                    <svg
                      className="w-3 h-3 text-white"
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
                  <p className="imaginethis-bullet text-gray-800 leading-relaxed text-sm" style={{ fontSize: "0.8rem" }}>
                    Gets you off booze for good without needing willpower or AA
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
