"use client";

import SimpleVideoPlayer from "./simple-video-player";
import { CTAButton } from "./ui/cta-button";

export default function MoreVideoTestimonials() {
  return (
    <section className="bg-white py-16 px-4 w-full relative">
      <div className="grain-overlay"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-8"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            More Results From Men Like You
          </h2>

          <div className="space-y-12 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
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
                <p className="text-gray-700">
                  Client was a 47-year-old CEO who was drinking 3 bottles of
                  wine per night just to cope with the stress. Now completely
                  sober and more productive than ever.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
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
                <p className="text-lg text-black italic mb-4">
                  &quot;This system changed my life.&quot;
                </p>
                <p className="text-gray-700">
                  Client was a 38-year-old lawyer running on coffee and
                  Adderall. Now completely stimulant-free and performing at his
                  peak in the courtroom.
                </p>
              </div>
            </div>
          </div>

          <CTAButton
            onClick={() => {
              window.location.href = "/application";
            }}
          >
            See If This Is Right For You
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
