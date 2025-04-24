import { Check, Zap } from "lucide-react"
import { bgClasses } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function ResultsSection() {
  const results = [
    "Wake up naturally energized before your alarm ever rings",
    "Eliminate caffeine dependency completely within 3 weeks",
    "Lose 12-25 pounds of stubborn body fat without feeling hungry",
    "Gain lean muscle with just 2-3 training sessions per week",
    "Experience clear, focused thinking all day without brain fog",
    "Feel calm and relaxed in the evenings without alcohol",
    "Fall asleep within minutes of hitting the pillow",
    "Improve all your vital health metrics across the board",
  ]

  return (
    <section className={`w-full py-20 ${bgClasses.white}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#940909] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">What You'll Get</span>
          <h2 className="text-3xl sm:text-4xl font-bold">The Limitless Results</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            Here's what high-performers experience after implementing The Limitless Protocol:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {results.map((result, index) => (
            <div key={index} className="flex items-start bg-gray-50 p-5 rounded-lg shadow-md transform transition hover:scale-[1.02]">
              <div className="p-2 bg-[#940909]/10 rounded-full flex-shrink-0 mr-4">
                <Zap className="w-5 h-5 text-[#940909]" />
              </div>
              <p className="text-base text-gray-800 font-medium">{result}</p>
            </div>
          ))}
        </div>

        {/* Micro-testimonial for social proof */}
        <div className="mt-16 max-w-4xl mx-auto">
          <MicroTestimonial
            quote="I'm performing at levels I never thought possible at 42. My team has noticed, my family has noticed, everyone's noticed."
            name="Thomas B."
            title="Regional Manager"
            metric="15 Years Younger"
          />
        </div>

        <div className="mt-12 text-center bg-gray-100 p-8 rounded-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Beyond Physical Results</h3>
          <p className="text-lg mb-6">
            The Limitless Protocol isn't just about looking better - it's about becoming a more powerful version of yourself in every domain:
          </p>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="flex items-start">
              <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
              <p>Greater respect from peers and colleagues</p>
            </div>
            <div className="flex items-start">
              <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
              <p>Improved presence in meetings and presentations</p>
            </div>
            <div className="flex items-start">
              <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
              <p>Enhanced leadership capabilities</p>
            </div>
            <div className="flex items-start">
              <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
              <p>Better relationship with family and partner</p>
            </div>
            <div className="flex items-start">
              <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
              <p>More confidence in all areas of life</p>
            </div>
            <div className="flex items-start">
              <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
              <p>Higher earning potential and career advancement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
