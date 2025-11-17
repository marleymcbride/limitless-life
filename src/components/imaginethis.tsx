"use client";

export default function ImagineThis() {
  return (
    <section className="bg-black pt-20 pb-0 px-4 w-full">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          {/* White round rectangle box with shadow */}
          <div className="rounded-2xl bg-white p-14 md:pt-12 lg:px-24 inline-block shadow-2xl mx-4 max-w-4xl">
            <h2
              className="text-2xl md:text-5xl font-bold text-black mb-6"
              style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
            >
              Imagine this
            </h2>
            <div className="space-y-4">
              <p
                className="text-xl md:text-lg font-semibold text-black mb-2"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                You Had a Simple Daily System That:
              </p>

              <div className="text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <p className="text-black leading-relaxed">
                    Gives you consistent energy from morning to night
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <p className="text-black leading-relaxed">
                    Builds a lean body training just twice a week
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <p className="text-black leading-relaxed">
                    Leaves you with energy for your family and life outside work
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
