import Image from "next/image"

export default function FeaturedTestimonial() {
  return (
    <section className="bg-white pt-8 pb-16 w-full">
      <div className="container mx-auto px-4 mt-6">
        <blockquote className="text-base md:text-lg italic text-gray-800 text-center mb-6">
          "This program completely transformed my life. As a CEO working 70+ hour weeks, I was constantly exhausted and my health was suffering. After just 8 weeks in this program, my energy levels are through the roof, I've lost 22 pounds, and I'm more productive than ever."
        </blockquote>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-gray-200">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Michael Richards"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>

            <div>
              <p className="font-bold text-gray-900 text-sm">Michael Richards</p>
              <p className="text-gray-600 text-xs">CEO, Quantum Technologies</p>
            </div>
          </div>

          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#940909] fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
