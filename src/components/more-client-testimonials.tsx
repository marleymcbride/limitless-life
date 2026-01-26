"use client";

import SimpleVideoPlayer from "./simple-video-player";
import Image from "next/image";

export default function VideoTestimonialCTA() {
  return (
    <section className="bg-white relative py-16 px-4 w-full">
      <div className="absolute bottom-0 left-0 w-full h-[33vh"></div>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <div className="max-w-md mx-auto mb-0">
            <p className="text-base md:text-2xl lg:text-3xl max-w-md text-black font-normal">
              &ldquo;It&apos;s working mate, lots of people in work talking about it&quot;
            </p>
          </div>

          {/* Desktop version - fixed width */}
          <div className="relative rounded-lg overflow-hidden shadow-md mx-auto mt-6 mb-4 hidden md:block" style={{ width: "438px" }}>
            <Image
              src="/images/Testimonials/Geoff - 3 month transformation v2.jpeg"
              alt="Client results"
              width={438}
              height={293}
              className="w-full h-auto"
            />
          </div>

          {/* Mobile version - responsive */}
          <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[90%] mx-auto mt-6 mb-4 block md:hidden">
            <Image
              src="/images/Testimonials/Geoff - 3 month transformation v2.jpeg"
              alt="Client results"
              width={438}
              height={293}
              className="w-full h-auto"
            />
          </div>

          <p className="text-sm text-gray-600 mb-12">
            Geoff, 3 months - Energy Sector
          </p>

          <div className="max-w-md mx-auto mb-0">
            <p className="text-base md:text-2xl lg:text-3xl max-w-md text-black font-normal">
            &ldquo;I feel stronger, bigger and more confident thanks to Marley&apos;s mentorship, coaching and friendship.&ldquo;
            </p>
          </div>

          {/* Desktop version - fixed width */}
          <div className="relative rounded-lg overflow-hidden shadow-md mx-auto mt-6 mb-4 hidden md:block" style={{ width: "438px" }}>
            <Image
              src="/images/Testimonials/Laurence - 10 week cut.png"
              alt="Client results"
              width={438}
              height={293}
              className="w-full h-auto"
            />
          </div>

          {/* Mobile version - responsive */}
          <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[90%] mx-auto mt-6 mb-4 block md:hidden">
            <Image
              src="/images/Testimonials/Laurence - 10 week cut.png"
              alt="Client results"
              width={438}
              height={293}
              className="w-full h-auto"
            />
          </div>

          <p className="text-sm text-gray-600 mb-12">
            Laurence, 10 weeks - age 53
          </p>

          {/* Desktop Video (Landscape) - Visible on desktop */}
          {/* <div className="hidden md:block mb-12">
            <SimpleVideoPlayer
              videoId="368df0e9-76ca-44e2-a76f-c31009b53ce7"
              libraryId="576963"
              className="max-w-3xl mt-10 mx-auto"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
            />
          </div> */}

          {/* Mobile Video (Portrait) - Visible on mobile */}
          {/* <div className="block md:hidden mb-12">
            <SimpleVideoPlayer
              videoId="1161903f-2e87-4801-aed1-9b4c6a385cec"
              libraryId="576963"
              className="max-w-[80%] mx-auto"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
              aspectRatio="9:16"
            />
          </div> */}



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
