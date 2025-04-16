"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Auto-play when in view on mobile
  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlaying) {
            videoRef.current?.play().catch(() => {
              // Auto-play was prevented
              console.log('Autoplay prevented')
            })
            setIsPlaying(true)
          } else if (!entry.isIntersecting && isPlaying) {
            videoRef.current?.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(videoRef.current)

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play().catch(() => {
        console.log('Play was prevented')
      })
      setIsPlaying(true)
    } else {
      videoRef.current?.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black">
      {/* Video element */}
      <video
        ref={videoRef}
        className="aspect-video w-full cursor-pointer"
        poster="/placeholder.svg?height=720&width=1280"
        onClick={togglePlay}
        playsInline
        controls
      >
        {/* Sample video source - replace with your actual video */}
        <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play button overlay (shows when video is paused) */}
      {!isPlaying && (
        <div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-purple-700 text-white transition-all hover:bg-purple-600"
          onClick={togglePlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
      )}

      {/* Sound indicator for mobile */}
      <div className="absolute bottom-3 right-3 flex items-center rounded-full bg-black/50 px-3 py-1 text-xs text-white md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        </svg>
        <span className="ml-1">Tap for sound</span>
      </div>
    </div>
  )
}