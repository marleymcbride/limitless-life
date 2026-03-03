"use client";

import Image from "next/image";

export default function TestimonialSection() {
  return (
    <section id="results-proof" className="bg-slate-100 py-20 px-0">
      <div className="container mx-auto max-w-7xl">

          {/* Desktop: Two columns side by side */}
          <div
            className="flex gap-5 justify-center items-start desktop-results-only "
          >
            <div className="space-y-3">
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

            <div className="space-y-3">
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

      </div>
    </section>
  );
}
