"use client";

import SimpleVideoPlayer from "./simple-video-player";

export default function VideoTestimonialCTA() {
  return (
    <section className="bg-black relative py-16 px-4 w-full">
      <div className="absolute bottom-0 left-0 w-full h-[33vh] bg-gradient-to-t from-[rgba(148,9,9,0.30)] via-[rgba(148,9,9,0.16)] to-transparent"></div>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <div className="max-w-md mx-auto mb-0">
            <p className="text-base md:text-2xl lg:text-4xl max-w-md text-white font-normal">
              &ldquo;The sleep was better, how I was feeling at work, it&apos;s crazy to think how much more energy you have&rdquo;
            </p>
          </div>

          {/* Desktop Video (Landscape) - Visible on desktop */}
          <div className="hidden md:block mb-12">
            {/* videoId="368df0e9-76ca-44e2-a76f-c31009b53ce7" */}
            <SimpleVideoPlayer
              libraryId="576963"
              className="max-w-3xl mx-auto"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
            />
          </div>

          {/* Mobile Video (Portrait) - Visible on mobile */}
          <div className="block md:hidden mb-12">
            {/* videoId="1161903f-2e87-4801-aed1-9b4c6a385cec" */}
            <SimpleVideoPlayer
              libraryId="576963"
              className="max-w-[80%] mx-auto"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
              aspectRatio="9:16"
            />
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
