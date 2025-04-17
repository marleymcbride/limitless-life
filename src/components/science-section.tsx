import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"

export default function ScienceSection() {
  const sciencePoints = [
    {
      title: "Metabolic Optimization",
      description: "Our proprietary protocol targets the cellular energy systems for maximum fat burning efficiency while preserving lean muscle mass.",
      icon: "/placeholder.svg?height=30&width=30"
    },
    {
      title: "Hormonal Balancing",
      description: "We focus on optimizing key hormones like testosterone, cortisol, and insulin that regulate energy, stress, and body composition.",
      icon: "/placeholder.svg?height=30&width=30"
    },
    {
      title: "Stress Recovery Protocol",
      description: "Our science-backed approach resets your nervous system's stress response for improved recovery and energy management.",
      icon: "/placeholder.svg?height=30&width=30"
    },
    {
      title: "Sleep Enhancement",
      description: "Advanced techniques to optimize sleep architecture for maximum cognitive and physical recovery.",
      icon: "/placeholder.svg?height=30&width=30"
    },
  ]

  return (
    <section className="w-full py-16 bg-black text-white relative overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto">
          <div className="md:w-1/2">
            <span className="inline-block mb-2 bg-[#940909] py-1 px-3 text-sm rounded-full">RESEARCH-BACKED</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Science Behind Your Transformation</h2>
            
            <p className="text-gray-300 mb-8">
              Unlike generic fitness programs, our approach is built on cutting-edge research in metabolic health, 
              hormonal optimization, and executive performance. We combine principles from:
            </p>
            
            <div className="space-y-6 mb-8">
              {sciencePoints.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center">
                    <Image src={point.icon} width={30} height={30} alt={point.title} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{point.title}</h3>
                    <p className="text-gray-300 text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-[#940909] font-bold cursor-pointer group">
              <span>Learn more about our methodology</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
              <h3 className="text-xl font-bold mb-4">Backed By Science</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black rounded p-4 text-center">
                  <p className="text-3xl font-bold text-[#940909]">94%</p>
                  <p className="text-sm text-gray-300">Client success rate</p>
                </div>
                <div className="bg-black rounded p-4 text-center">
                  <p className="text-3xl font-bold text-[#940909]">18.5</p>
                  <p className="text-sm text-gray-300">Avg. pounds lost</p>
                </div>
                <div className="bg-black rounded p-4 text-center">
                  <p className="text-3xl font-bold text-[#940909]">67%</p>
                  <p className="text-sm text-gray-300">Avg. stress reduction</p>
                </div>
                <div className="bg-black rounded p-4 text-center">
                  <p className="text-3xl font-bold text-[#940909]">5.3x</p>
                  <p className="text-sm text-gray-300">Energy improvement</p>
                </div>
              </div>
              
              <div className="border-t border-zinc-700 pt-4">
                <h4 className="font-bold mb-3">Developed With Leading Experts</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-zinc-900 rounded-full py-1 px-3 text-xs">Functional Medicine</div>
                  <div className="bg-zinc-900 rounded-full py-1 px-3 text-xs">Endocrinology</div>
                  <div className="bg-zinc-900 rounded-full py-1 px-3 text-xs">Performance Psychology</div>
                  <div className="bg-zinc-900 rounded-full py-1 px-3 text-xs">Executive Coaching</div>
                  <div className="bg-zinc-900 rounded-full py-1 px-3 text-xs">Sleep Science</div>
                </div>
                
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-zinc-900 rounded-full overflow-hidden relative">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Dr. Profile" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold">Dr. Michael Stevens</p>
                    <p className="text-xs text-gray-300">Chief Medical Advisor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}