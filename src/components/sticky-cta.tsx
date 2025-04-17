"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

export default function StickyCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 1000px
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 1000)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 bg-black/90 backdrop-blur-md border-t border-zinc-800 transform transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <div className="hidden md:block">
          <p className="text-white font-bold">Ready to transform your health?</p>
          <p className="text-gray-300 text-sm">Limited spots available this month</p>
        </div>
        <Button 
          className="bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-2 px-6 rounded-md flex items-center gap-2 transition-all hover:scale-105 ml-auto"
          asChild
        >
          <a href="#application">
            Claim Your Spot Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}