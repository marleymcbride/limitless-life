import React from "react";

export default function The3TestimonialsBoxV2() {
  return (
      <section className="pt-0 text-white lg:pb-0 mb-0 w-full bg-zinc-400/95">
        <div className="mx-4 md:mx-[3.5%]">
          <div className="p-10 md:p-0 lg:p-0 md:py-10 lg:py-10 mx-4 lg:-px-24 md:-px-24 mb-24 mt-20 rounded-2xl shadow-xl lg:max-w-full md:max-w-full bg-zinc-800/95">
            <div className="grid grid-cols-1 gap-8 md:gap-12 lg:gap-24 md:grid-cols-3">
              <div className="text-center md:text-left lg:text-left  lg:-ml-16 md:-ml-16 lg:mr-4 md:-mr-4">
                <img
                  src="/images/Display photos/luis2.jpeg"
                  alt="Luis"
                  className="object-cover mx-auto mb-4 w-24 h-24 rounded-full ring-[3px] ring-[#18181B]"
                />
                <p className="mb-6 text-xl font-normal leading-loose text-white">
                  &quot;It&apos;s mad to think how much more energy you have. I was feeling good, but now it&apos;s 10 fold.&quot;
                </p>
                <p className="text-lg font-semibold text-zinc-200">— Lewis, Energy Sector</p>
              </div>

              <div className="text-center md:text-left lg:text-left  lg:-ml-4 md:-ml-4 lg:-mr-6 md:-mr-6">
                <img
                  src="/images/Display photos/aaron.png"
                  alt="Aaron"
                  className="object-cover mx-auto mb-4 w-24 h-24 rounded-full ring-[3px] ring-[#18181B]"
                />
                <p className="mb-6 text-xl font-normal leading-loose text-white">&quot;I don&apos;t feel I&apos;ve ever had this much natural energy before than in the last few weeks.&quot;</p>
                <p className="text-lg font-semibold text-zinc-200">— Aaron, Business Exec</p>
              </div>

              <div className="text-center md:text-left lg:text-left lg:-mr-16 md:-mr-16 lg:ml-6 md:ml-6">
                <img
                  src="/images/Display photos/laurence.JPG"
                  alt="Laurence"
                  className="object-cover mx-auto mb-4 w-24 h-24 rounded-full ring-[3px] ring-[#18181B]"
                />
                <p className="mb-6 text-xl font-normal leading-loose text-white">&quot;Noticed more energy coming in, sleep has been better and I&apos;m feeling more focused.&quot;</p>
                <p className="text-lg font-semibold text-zinc-200">— Laurence, 52, ZH</p>
              </div>
            </div>
          </div>
        </div>
      </section>


  );
}

