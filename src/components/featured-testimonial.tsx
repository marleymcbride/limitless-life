import Image from "next/image";
import { bgClasses } from "@/lib/utils";
import { Button } from "./ui/button";

export default function FeaturedTestimonial() {
  return (
    <section className={`w-full pt-0 pb-12 ${bgClasses.white} relative`}>
      <div className="container mx-auto px-4 mt-0 relative z-10">
        {/* Ed Lawrence Style Proof Opening */}
        <div className="text-center mb-8 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            When High-Performing Executives Ask For My Help, Results Like This
            Happen...
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Here's what happened when Michael — a CEO pulling 70-hour weeks —
            finally stopped accepting "tired all the time" as normal:
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-white p-8 pt-6 rounded-lg shadow-xl border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-[#940909]/40 shadow-xl flex-shrink-0">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Michael Richards"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>

            <div>
              <blockquote className="text-lg md:text-xl text-gray-700 italic font-medium mb-4">
                "I was running on 4 coffees a day and wine every night just to
                function. Marley's system didn't just fix my energy — it
                completely rebuilt how my body works. 8 weeks in: 22 pounds
                gone, productivity doubled, and I wake up naturally energized.
                Haven't touched caffeine in 37 days."
              </blockquote>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <p className="font-bold text-black text-lg">
                    Michael Richards
                  </p>
                  <p className="text-gray-600">
                    CEO, Quantum Technologies | $12M Annual Revenue
                  </p>
                </div>

                <div className="flex mt-3 sm:mt-0">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#940909] fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Visual metrics */}
          <div className="grid grid-cols-3 gap-4 mt-6 border-t border-gray-200 pt-5">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#940909]">
                22lbs
              </p>
              <p className="text-sm text-gray-600">Fat Lost</p>
              <p className="text-xs text-gray-500">8 weeks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#940909]">
                37 days
              </p>
              <p className="text-sm text-gray-600">Caffeine-Free</p>
              <p className="text-xs text-gray-500">Zero withdrawal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#940909]">
                2x
              </p>
              <p className="text-sm text-gray-600">Productivity</p>
              <p className="text-xs text-gray-500">Measurable boost</p>
            </div>
          </div>
        </div>

        {/* Subtle transition to next section */}
        <div className="text-center mt-8">
          <p className="text-gray-600 italic">
            Sound impossible? I used to think so too...
          </p>
        </div>
      </div>

      {/* Enhanced CTA Button */}
      <div className="flex justify-center mt-10">
        <a href="#more-info">
          <Button className="bg-[#940909] hover:bg-[#7e0808] text-white font-bold py-3 px-8 rounded text-base shadow-md transition duration-300">
            SHOW ME HOW →
          </Button>
        </a>
      </div>
    </section>
  );
}
