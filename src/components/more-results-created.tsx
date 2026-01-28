"use client";

import Image from "next/image";

export default function ClientTransformationGallery() {
  return (
    <section className="w-full bg-white pt-14 pb-14 px-10">

        <div className="text-center mb-6">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 mx-8 text-gray-900"
              style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1"}}
            >
              More results created
            </h2>
        </div>


        {/* Desktop: 3 in a row */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 gap-8 max-w-7xl py-6 mx-auto">
          {/* Rob transformation */}
          <div className="relative">
            <Image
              src="/images/Testimonials/Before vs afters/Rob-before vs after.jpg"
              alt="Rob transformation"
              width={400}
              height={500}
              className="rounded-lg shadow-xl w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Marley's Transformation (Center) */}
          <div className="relative">
            <Image
              src="/images/Testimonials/Before vs afters/Marley 2014 vs 2025.png"
              alt="Marley transformation"
              width={400}
              height={500}
              className="rounded-lg shadow-xl w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Matty */}
          <div className="relative">
            <Image
              src="/images/Testimonials/Before vs afters/Matty - before vs after.jpeg"
              alt="Matty"
              width={400}
              height={500}
              className="rounded-lg shadow-xl w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mobile: Stacked */}
        <div className="flex flex-col gap-10 md:hidden max-w-lg w-[80%] px-10 mx-auto">


          {/* Rob transformation */}
          <div className="relative">
            <Image
              src="/images/Testimonials/Before vs afters/Rob-before vs after.jpg"
              alt="Rob transformation"
              width={400}
              height={500}
              className="rounded-lg shadow-xl w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Marley's Transformation (Center) */}
          <div className="relative">
            <Image
              src="/images/Testimonials/Before vs afters/Marley 2014 vs 2025.png"
              alt="Marley transformation"
              width={400}
              height={500}
              className="rounded-lg shadow-xl w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Matty */}
          <div className="relative">
            <Image
              src="/images/Testimonials/Before vs afters/Matty - before vs after.jpeg"
              alt="Matty"
              width={400}
              height={500}
              className="rounded-lg shadow-xl w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Apply Now
          </a>
        </div>
    </section>
  );
}
