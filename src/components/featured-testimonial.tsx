import Image from "next/image"

export default function FeaturedTestimonial() {
  return (
    <section className="bg-black pt-12 pb-16 w-full text-white">
      <div className="container mx-auto px-4 mt-6">
        <blockquote className="text-lg md:text-xl italic text-gray-300 text-center mb-8">
          "Marley is the only coach who gets the unique energy challenges high-performers face. His Limitless Protocol transformed my productivity and cut my recovery time in half. After just 8 weeks, my energy levels are through the roof, I've lost 22 pounds, and I'm more productive than ever."
        </blockquote>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-3">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-[#940909]/30">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Michael Richards"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>

            <div>
              <p className="font-bold text-white text-base">Michael Richards</p>
              <p className="text-gray-400 text-sm">CEO, Quantum Technologies</p>
            </div>
          </div>

          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#940909] fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
