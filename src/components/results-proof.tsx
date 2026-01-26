"use client";

import Image from "next/image";

export default function ResultsProof() {
  return (
    <section id="results-proof" className="results-proof-gradient py-20 px-0">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl  font-bold text-white mb-2 -mt-6"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Results created
          </h2>

          <div className="mb-10">
            <div className="text-xl  md:text-xl text-center lg:text-md font-thin text-white-300 mb-4" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
              (from guys using this new system)
            </div>
          </div>

          {/* Desktop: Two columns side by side */}
          <div
            className="flex gap-8 justify-center items-start desktop-results-only "
          >
            <div className="space-y-10">
              <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
                <Image
                  src="/images/Testimonials/Gav social proof - 10lbs in 8 weeks.png"
                  alt="Client results"
                  width={337}
                  height={225}
                  className="w-full h-auto"
                />
              </div>

              <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
                <Image
                  src="/images/Testimonials/Matty down 19kg.jpeg"
                  alt="Client results"
                  width={337}
                  height={225}
                  className="w-full h-auto"
                />
              </div>

              <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
                <Image
                  src="/images/Testimonials/Luis social proof.png"
                  alt="Client results"
                  width={337}
                  height={225}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="space-y-10">
              <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
                <Image
                  src="/images/Testimonials/Lewis hits 168 feels great.png"
                  alt="Client results"
                  width={337}
                  height={225}
                  className="w-full h-auto"
                />
              </div>

              <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
                <Image
                  src="/images/Testimonials/Aaron testimonial - great energy.png"
                  alt="Client results"
                  width={337}
                  height={225}
                  className="w-full h-auto"
                />
              </div>

              <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
                <Image
                  src="/images/Testimonials/Geoff - best shape ever been in.jpg"
                  alt="Client results"
                  width={337}
                  height={225}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Mobile: Single stacked column */}
          <div
            className="flex flex-col gap-6 justify-center items-center px-4 mobile-results-only "
          >
            <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
              <Image
                src="/images/Testimonials/Gav social proof - 10lbs in 8 weeks.png"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
              />
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
              <Image
                src="/images/Testimonials/Matty down 19kg.jpeg"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
              />
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
              <Image
                src="/images/Testimonials/Luis social proof.png"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
              />
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
              <Image
                src="/images/Testimonials/Lewis hits 168 feels great.png"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
              />
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
              <Image
                src="/images/Testimonials/Aaron social proof - great energy.png"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
              />
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
              <Image
                src="/images/Testimonials/Geoff - best shape ever been in.jpg"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
              />
            </div>
          </div>
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block mt-12 relative z-30 "
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
