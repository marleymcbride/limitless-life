"use client";

import SimpleVideoPlayer from "./simple-video-player";
import { CTAButton } from "./ui/cta-button";

export default function VideoTestimonialCTA() {
  return (
    <section className="bg-black relative py-16 px-4 w-full">
      <div className="grain-overlay"></div>
      <div className="absolute bottom-0 left-0 w-full h-[33vh] bg-gradient-to-t from-[rgba(148,9,9,0.30)] via-[rgba(148,9,9,0.16)] to-transparent"></div>
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          <div className="max-w-md mx-auto mb-12">
            <p className="text-base md:text-2xl lg:text-4xl max-w-md text-white font-normal italic">
              &ldquo;abc i haven&apos;t felt this good in years, abc i
              haven&apos;t felt this good in years.&rdquo;
            </p>
          </div>

          <div className="mb-12">
            <SimpleVideoPlayer
              libraryId="505300"
              videoId="ae86338e-0493-4ff0-bca9-87f9ad98dd89"
              className="max-w-3xl mx-auto"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
            />
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
