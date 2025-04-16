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
            videoRef.current?.play()
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
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current?.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black">
      {/* Placeholder for actual video - replace with your video source */}
      <video
        ref={videoRef}
        className="aspect-video w-full cursor-pointer"
        poster="/placeholder.svg?height=720&width=1280"
        onClick={togglePlay}
        playsInline
        controls
      >
        <source src="#" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play button overlay (shows when video is paused) */}
      {!isPlaying && (
        <div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70"
          onClick={togglePlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
    </div>
  )
}
