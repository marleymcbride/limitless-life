"use client";

import VSLPlayer from "./vsl-player";

export default function MoreVideoTestimonials() {
  return (
    <section className="bg-black py-16 px-4 w-full">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            More Results From High-Performers Like You
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="mb-4">
                <VSLPlayer
                  libraryId="505300"
                  videoId="ae86338e-0493-4ff0-bca9-87f9ad98dd89"
                  className="w-full"
                  autoplay={false}
                  muted={false}
                  preload={true}
                  controls={true}
                />
              </div>
              <p className="text-lg text-white italic">
                "I haven't felt this good in years."
              </p>
            </div>

            <div>
              <div className="mb-4">
                <VSLPlayer
                  libraryId="505300"
                  videoId="ae86338e-0493-4ff0-bca9-87f9ad98dd89"
                  className="w-full"
                  autoplay={false}
                  muted={false}
                  preload={true}
                  controls={true}
                />
              </div>
              <p className="text-lg text-white italic">
                "This system changed my life."
              </p>
            </div>
          </div>

          <button
            className="bg-red-600 text-white font-bold py-4 px-8 text-lg rounded-lg"
            onClick={() => {
              const element = document.getElementById("application");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            See If This Is Right For You
          </button>
        </div>
      </div>
    </section>
  );
}