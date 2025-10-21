export default function DoesThisSoundLikeYou() {
  return (
    <section className="bg-black py-20 px-4 w-full">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-12"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Does This Sound Like You?
          </h2>

          <div className="text-left space-y-6 mb-12" style={{ maxWidth: '768px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '60px', paddingRight: '16px' }}>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
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
              <p className="text-2xl text-white">
                <span className="font-normal">
                  You wake up exhausted every morning
                </span>
              </p>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
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
              <p className="text-2xl text-white">
                <span className="font-normal">
                No matter how much you train, your gut just won&apos;t budge
                </span>
              </p>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
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
              <p className="text-2xl text-white">
                <span className="font-normal">
                  You can&apos;t focus at work like you used to
                </span>
              </p>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
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
              <p className="text-2xl text-white">
                <span className="font-normal">
                  You need multiple coffees to function and 2-3 drinks to wind down
                </span>
              </p>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
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
              <p className="text-2xl text-white">
                <span className="font-normal">
                  You have no energy left for people who matter most
                </span>
              </p>
            </div>
          </div>

          <p className="text-2xl mt-12 text-white mb-8">You&apos;re not alone, my friend...</p>
        </div>
      </div>
    </section>
  );
}
