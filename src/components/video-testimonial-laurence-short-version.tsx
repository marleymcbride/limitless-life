"use client";

import SimpleVideoPlayer from "./simple-video-player";

export default function VideoTestimonialLaurenceShortVersion() {
  return (
    <section className="bg-black relative py-16 px-4 w-full">
      <div className="absolute bottom-0 left-0 w-full h-[33vh] bg-gradient-to-t from-[rgba(148,9,9,0.30)] via-[rgba(148,9,9,0.16)] to-transparent"></div>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
        <div className="text-center mb-8">
              <h2
                className="text-4xl md:text-4xl font-bold pt-4 -mb-14 text-white leading-tight"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Discover How to Wake up Feeling Fucking Great
              </h2>
            </div>

          {/* Desktop Video (Landscape) - Visible on desktop */}
          <div className="hidden md:block mb-12">
            <SimpleVideoPlayer
              videoId="3186cc14-31aa-4c0a-a187-e88ee58f6ce4"
              libraryId="576963"
              className="max-w-3xl mx-auto"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
            />
          </div>

          {/* Mobile Video (Portrait) - Visible on mobile */}
          <div className="block md:hidden lg:hidden mb-0">
            <div className="scale-[75%] origin-center">
              <SimpleVideoPlayer
                videoId="1f40cc5e-93ee-481f-b512-c3763ac88a7a"
                libraryId="576963"
                className="mx-auto"
                autoplay={false}
                muted={false}
                preload={true}
                controls={true}
                aspectRatio="9:16"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
            <a
              href="/application"
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 mb-6 text-lg rounded-md inline-block relative z-30"
            >
              Apply Now
            </a>
            </div>
      </div>
    </section>
  );
}
