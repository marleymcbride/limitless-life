"use client"

import { useEffect, useRef, useState } from "react"

export default function EnhancedVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Handle client-side mounting and scroll detection
  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Safe toggle play function
  const togglePlay = () => {
    if (!videoRef.current) return

    if (videoRef.current.paused) {
      // When playing from pause, we need to unmute
      videoRef.current.muted = false

      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // Handle play error
            setIsPlaying(false)
          })
      }
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
      {/* Fixed 16:9 container */}
      <div className="w-full" style={{ paddingBottom: "56.25%" }}>
        {isMounted && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full cursor-pointer object-cover"
            poster="/placeholder.svg?height=1080&width=1920"
            onClick={togglePlay}
            playsInline
            muted
            loop
            controls={false}
          >
            {/* Using a reliable video source */}
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Placeholder when not mounted - exactly matching dimensions */}
        {!isMounted && (
          <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="text-gray-500">Image placeholder</div>
          </div>
        )}
      </div>

      {/* Play button overlay - visible on desktop only */}
      {isMounted && !isPlaying && (
        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center z-20 hidden md:flex"
          onClick={togglePlay}
        >
          {/* Circular backdrop */}
          <div className="bg-gray-400/70 rounded-full h-16 w-16 flex items-center justify-center">
            {/* Red play button */}
            <div className="bg-[#940909] rounded-full h-12 w-12 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Sound indicator - only shown when mounted and scrolled */}
      {isMounted && hasScrolled && (
        <div className="absolute bottom-3 right-3 flex items-center rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          </svg>
          <span className="ml-1">Tap for sound</span>
        </div>
      )}
    </div>
  )
}
