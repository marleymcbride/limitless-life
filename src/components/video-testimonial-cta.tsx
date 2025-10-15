"use client";

import VSLPlayer from "./vsl-player";

export default function VideoTestimonialCTA() {
  return (
    <section className="bg-black relative py-16 px-4 w-full">
    <div className="absolute bottom-0 left-0 w-full h-[33vh]" style={{ background: "linear-gradient(to top, rgba(148, 9, 9, 0.30) 0%, rgba(148, 9, 9, 0.16) 50%, rgba(148, 9, 9, 0) 100%)" }}></div>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-3xl md:text-4xl text-white font-bold italic">
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