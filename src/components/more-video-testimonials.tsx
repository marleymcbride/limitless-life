"use client";

import SimpleVideoPlayer from "./simple-video-player";

export default function MoreVideoTestimonials() {
  return (
    <section className="bg-white py-16 px-4 w-full">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-8"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            What people are saying about the program
          </h2>

          <div className="space-y-12 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="w-[90%] md:w-full mx-auto md:mx-0">
                <SimpleVideoPlayer
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
                <p className="text-lg text-black italic mb-4">
                  &quot;I haven&apos;t felt this good in years.&quot;
                </p>
                <p className="text-black-300">
                  Client was a 47-year-old CEO who was drinking 3 bottles of
                  wine per night just to cope with the stress. Now completely
                  sober and more productive than ever.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 w-[90%] md:w-full mx-auto md:mx-0">
                <SimpleVideoPlayer
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
                  &quot;This system changed my life.&quot;
                </p>
                <p className="text-black-300">
                  Client was a 38-year-old lawyer running on coffee and
                  Adderall. Now completely stimulant-free and performing at his
                  peak in the courtroom.
                </p>
              </div>
            </div>
          </div>

          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
