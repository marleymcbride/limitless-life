"use client"

import { useEffect, useRef, useState } from "react"

export default function EnhancedVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showButton, setShowButton] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Handle client-side mounting and scroll detection
  useEffect(() => {
    setIsMounted(true)

    // Auto-play video when mounted, but keep it muted
    if (videoRef.current) {
      // Ensure video is muted to enable autoplay
      videoRef.current.muted = true
      setIsMuted(true)

      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("Auto-play prevented:", error)
          })
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle mute function and hide play button
  const handleVideoClick = () => {
    if (!videoRef.current) return

    // Hide the play button when clicked
    setShowButton(false)

    if (videoRef.current.paused) {
      // If video is somehow paused, play it
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            // Also unmute if we're playing manually
            videoRef.current!.muted = false
            setIsMuted(false)
          })
          .catch(() => {
            // Handle play error
            setIsPlaying(false)
          })
      }
    } else {
      // Toggle mute state
      const newMutedState = !videoRef.current.muted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  return (
    <div className="relative w-full max-w-[600px] mx-auto overflow-hidden rounded-lg bg-black shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] transform scale-80" style={{ transform: "scale(0.8)", transformOrigin: "center center" }}>
      {/* Force 16:9 aspect ratio with hardcoded dimensions */}
      <div className="w-full" style={{ position: 'relative', paddingTop: '56.25%' }}>
        {isMounted ? (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full cursor-pointer object-cover"
            poster="/images/marley-desk-video-thumbnail.jpg"
            onClick={handleVideoClick}
            playsInline
            muted
            loop
            autoPlay
          >
            {/* Using a reliable video source */}
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full cursor-pointer bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url('/images/marley-desk-video-thumbnail.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="bg-[#940909]/80 rounded-full h-20 w-20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="white"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Play button overlay - visible until clicked */}
      {isMounted && isPlaying && showButton && (
        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center z-20"
          onClick={handleVideoClick}
        >
          {/* Red play button with translucent background */}
          <div className="bg-[#940909]/80 rounded-full h-20 w-20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      )}

      {/* Sound indicator - only shown when mounted and scrolled */}
      {isMounted && hasScrolled && !showButton && (
        <div className="absolute bottom-3 right-3 flex items-center rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          </svg>
          <span className="ml-1">Tap to unmute</span>
        </div>
      )}
    </div>
  )
}
