"use client";

export default function ImagineThis() {
  return (
    <section className="bg-black pt-20 pb-20 px-4 w-full">
      <div className="container mx-auto max-w-6xl relative z-10 hero-full-width">
        <div className="text-center">
          {/* White round rectangle box with shadow */}
          <div className="rounded-2xl bg-white p-14 md:pt-12 md:px-16 lg:px-20 shadow-2xl mx-4 max-w-6xl w-full hero-full-width">
            <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>
              <h2
                className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight mt-2"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Imagine this
              </h2>

              

              <div className="text-left space-y-2 mb-10 -ml-12">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0">

                  </div>

                  <p className="text-gray-800 leading-relaxed text-sm mb-4">
                  You Had a Simple System That:
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <p className="text-gray-800 leading-relaxed text-sm">
                  Has you feeling energized as soon as you wake
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 leading-relaxed text-sm">
                  Builds a lean body in only 2 days of training
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 leading-relaxed text-sm">
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
