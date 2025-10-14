"use client";

import VSLPlayer from "./vsl-player";

export default function VideoTestimonialCTA() {
  return (
    <section className="bg-black py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-2xl text-white italic">
              "i haven't felt this good in years."
            </p>
          </div>

          <div className="mb-12">
            <VSLPlayer
              libraryId="505300"
              videoId="ae86338e-0493-4ff0-bca9-87f9ad98dd89"
              className="max-w-3xl mx-auto"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
            />
          </div>

          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-lg rounded-lg transition-none duration-0"
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