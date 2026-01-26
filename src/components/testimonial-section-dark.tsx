"use client";

import Image from "next/image";

export default function TestimonialSectionDark() {
  return (
    <section className="results-proof-gradient py-16 px-0">
      <div className="container mx-auto max-w-7xl">
        {/* Desktop: Two columns side by side */}
        <div className="flex gap-8 justify-center items-start desktop-results-only">
          <div className="space-y-10">
            <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
              <Image
                src="/images/Testimonials/Luke social proof.png"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
                unoptimized={true}
              />
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
              <Image
                src="/images/Testimonials/Luis down 6kg.jpg"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
                unoptimized={true}
              />
            </div>
          </div>

          <div className="space-y-10">
            <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
              <Image
                src="/images/Testimonials/Matty feels so good.jpeg"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
                unoptimized={true}
              />
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md w-[337px]">
              <Image
                src="/images/Testimonials/Geoff feeling great.jpeg"
                alt="Client results"
                width={337}
                height={225}
                className="w-full h-auto"
                unoptimized={true}
              />
            </div>
          </div>
        </div>

        {/* Mobile: Single stacked column */}
        <div className="flex flex-col gap-6 justify-center items-center px-4 mobile-results-only">
          <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
            <Image
              src="/images/Testimonials/Luke social proof.png"
              alt="Client results"
              width={337}
              height={225}
              className="w-full h-auto"
              unoptimized={true}
            />
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
            <Image
              src="/images/Testimonials/Luis down 6kg.jpg"
              alt="Client results"
              width={337}
              height={225}
              className="w-full h-auto"
              unoptimized={true}
            />
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
            <Image
              src="/images/Testimonials/Matty feels so good.jpeg"
              alt="Client results"
              width={337}
              height={225}
              className="w-full h-auto"
              unoptimized={true}
            />
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-[337px]">
            <Image
              src="/images/Testimonials/Geoff feeling great.jpeg"
              alt="Client results"
              width={337}
              height={225}
              className="w-full h-auto"
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
