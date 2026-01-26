export default function DoesThisSoundLikeYou() {
  return (
    <section className="bg-black py-14 px-4 w-full" data-section="does-this-sound-like-you">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h2
            className="text-3xl h2-alternate md:text-5xl font-bold text-white mb-6 md:mb-12 lg:mb-12"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Does This Sound Like You?
          </h2>

          <div
            className="text-left space-y-5 mb-12"
            style={{
              maxWidth: "768px",
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "0.3rem",
            }}
          >
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
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
              <p className="text-white text-lg md:text-2xl lg:text-2xl mobile-text-large">
                  You wake up exhausted every morning
                </p>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
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
              <p className="text-white text-lg md:text-2xl lg:text-2xl mobile-text-large">
                  You can&apos;t focus at work like you used to
                </p>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
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
              <p className="text-white text-lg md:text-2xl lg:text-2xl mobile-text-large">
              No matter how much you train your gut just won&apos;t budge
                </p>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
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
              <p className="text-white text-lg md:text-2xl lg:text-2xl mobile-text-large">
                  You need multiple coffees to function and 2-3 drinks to wind
                  down
                </p>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
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
              <p className="text-white text-lg md:text-2xl lg:text-2xl mobile-text-large">
                  You have no energy left for the people who matter most
                </p>
            </div>
          </div>

          <p className="text-lg md:text-2xl lg:text-2xl mt-16 text-white mb-8 mobile-text-large">
            Well you&apos;re not alone, my friend...
          </p>
        </div>
      </div>
    </section>
  );
}
