"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

const successMetrics = [
  {
    name: "Michael R.",
    age: 43,
    profession: "CFO",
    initialMetrics: {
      weight: 217,
      bodyFat: 28,
      energy: 4,
      stress: 8
    },
    finalMetrics: {
      weight: 189,
      bodyFat: 18,
      energy: 9,
      stress: 3
    },
    imageSrc: "/placeholder.svg?height=400&width=300",
    testimonial: "The program completely changed my relationship with food and exercise. I've got more energy than I've had in 15 years."
  },
  {
    name: "David L.",
    age: 46,
    profession: "CEO",
    initialMetrics: {
      weight: 225,
      bodyFat: 30,
      energy: 3,
      stress: 9
    },
    finalMetrics: {
      weight: 192,
      bodyFat: 16,
      energy: 8,
      stress: 4
    },
    imageSrc: "/placeholder.svg?height=400&width=300",
    testimonial: "As a busy CEO, I didn't think I had time for my health. This program proved me wrong. It's efficient, effective, and life-changing."
  },
  {
    name: "Robert J.",
    age: 41,
    profession: "VP of Sales",
    initialMetrics: {
      weight: 209,
      bodyFat: 26,
      energy: 5,
      stress: 7
    },
    finalMetrics: {
      weight: 184,
      bodyFat: 15,
      energy: 9,
      stress: 3
    },
    imageSrc: "/placeholder.svg?height=400&width=300",
    testimonial: "I've tried countless diets and programs before. This is the only one that actually delivered sustainable results that fit my executive lifestyle."
  }
]

export default function SuccessMetricsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === successMetrics.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500) // Match the transition duration
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? successMetrics.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500) // Match the transition duration
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 8000)
    return () => clearInterval(interval)
  }, [activeIndex])

  const activeClient = successMetrics[activeIndex]
  
  // Calculate differences for metrics
  const weightLoss = activeClient.initialMetrics.weight - activeClient.finalMetrics.weight
  const bodyFatReduction = activeClient.initialMetrics.bodyFat - activeClient.finalMetrics.bodyFat
  const energyGain = activeClient.finalMetrics.energy - activeClient.initialMetrics.energy
  const stressReduction = activeClient.initialMetrics.stress - activeClient.finalMetrics.stress

  return (
    <section className="w-full py-16 bg-zinc-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Real Transformations, Real Numbers</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12">See the exact results our clients achieve in just 12 weeks</p>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
            <button 
              className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
              onClick={prevSlide}
              aria-label="Previous client"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
            <button 
              className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
              onClick={nextSlide}
              aria-label="Next client"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Carousel Content */}
          <div className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 transition-all duration-500">
            <div className="grid md:grid-cols-2">
              {/* Image and Info */}
              <div className="relative">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image 
                    src={activeClient.imageSrc}
                    alt={`${activeClient.name} transformation`}
                    fill
                    className="object-cover transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-2xl font-bold">{activeClient.name}, {activeClient.age}</h3>
                    <p className="text-gray-300">{activeClient.profession}</p>
                  </div>
                </div>
              </div>
              
              {/* Metrics */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 text-center">12-Week Transformation</h3>
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-zinc-900 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400 mb-1">Weight</p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-gray-400 line-through">{activeClient.initialMetrics.weight}lbs</p>
                      <p className="text-xl font-bold">{activeClient.finalMetrics.weight}lbs</p>
                    </div>
                    <p className="text-[#940909] font-bold">-{weightLoss} lbs</p>
                  </div>
                  
                  <div className="bg-zinc-900 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400 mb-1">Body Fat %</p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-gray-400 line-through">{activeClient.initialMetrics.bodyFat}%</p>
                      <p className="text-xl font-bold">{activeClient.finalMetrics.bodyFat}%</p>
                    </div>
                    <p className="text-[#940909] font-bold">-{bodyFatReduction}%</p>
                  </div>
                  
                  <div className="bg-zinc-900 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400 mb-1">Energy (1-10)</p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-gray-400 line-through">{activeClient.initialMetrics.energy}</p>
                      <p className="text-xl font-bold">{activeClient.finalMetrics.energy}</p>
                    </div>
                    <p className="text-green-500 font-bold">+{energyGain}</p>
                  </div>
                  
                  <div className="bg-zinc-900 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400 mb-1">Stress (1-10)</p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-gray-400 line-through">{activeClient.initialMetrics.stress}</p>
                      <p className="text-xl font-bold">{activeClient.finalMetrics.stress}</p>
                    </div>
                    <p className="text-green-500 font-bold">-{stressReduction}</p>
                  </div>
                </div>
                
                {/* Testimonial */}
                <div className="bg-black/30 p-4 rounded-lg italic">
                  "{activeClient.testimonial}"
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {successMetrics.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-[#940909] w-6" : "bg-gray-400"
                }`}
                aria-label={`Go to client ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}