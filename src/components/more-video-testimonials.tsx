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

          <div className="space-y-12 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
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
              <div className="text-left">
                <p className="text-lg text-white italic mb-4">
                  "I haven't felt this good in years."
                </p>
                <p className="text-gray-300">
                  Client was a 47-year-old CEO who was drinking 3 bottles of wine per night just to cope with the stress. Now completely sober and more productive than ever.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
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
              <div className="order-1 md:order-2 text-left">
                <p className="text-lg text-white italic mb-4">
                  "This system changed my life."
                </p>
                <p className="text-gray-300">
                  Client was a 38-year-old lawyer running on coffee and Adderall. Now completely stimulant-free and performing at his peak in the courtroom.
                </p>
              </div>
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