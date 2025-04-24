import Image from "next/image"
import { bgClasses } from "@/lib/utils"

export default function FeaturedTestimonial() {
  return (
    <section className="bg-black pt-12 pb-16 w-full text-white relative">
      {/* Black background base */}
      <div className="absolute inset-0 bg-black"></div>

      <div className="container mx-auto px-4 mt-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-zinc-900 to-black p-8 rounded-lg border border-zinc-800 shadow-xl">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#940909]/40 shadow-2xl flex-shrink-0">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Michael Richards"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>

            <div>
              <svg className="h-8 w-8 text-[#940909] mb-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="text-xl md:text-2xl text-gray-300 italic font-medium mb-6">
                "Marley is the only coach who actually understands the unique energy challenges high-performers face. His Limitless Protocol didn't just transform my productivity—it completely rewired my relationship with energy. After 8 weeks, I've lost 22 pounds, doubled my output, and haven't touched caffeine in 37 days."
              </blockquote>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <p className="font-bold text-white text-lg">Michael Richards</p>
                  <p className="text-gray-400">CEO, Quantum Technologies</p>
                </div>

                <div className="flex mt-3 sm:mt-0">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#940909] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual metrics for enhanced credibility */}
          <div className="grid grid-cols-3 gap-4 mt-8 border-t border-zinc-800 pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#940909]">22lbs</p>
              <p className="text-sm text-gray-400">Fat Lost</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#940909]">37 days</p>
              <p className="text-sm text-gray-400">Caffeine-Free</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#940909]">2x</p>
              <p className="text-sm text-gray-400">Productivity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
