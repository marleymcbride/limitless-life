"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle autoplay once mounted
  useEffect(() => {
    if (!isMounted || !videoRef.current) return;

    // Try to autoplay the video (muted)
    const playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay started successfully
          setIsPlaying(true);
        })
        .catch((error) => {
          // Autoplay was prevented
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    }
  }, [isMounted]);

  // Safe toggle play function
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      // When playing from pause, we need to unmute
      videoRef.current.muted = false;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Handle play error
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black">
      {/* Video element with a reliable demo video */}
      <video
        ref={videoRef}
        className="aspect-video w-full cursor-pointer"
        poster="/placeholder.svg?height=720&width=1280"
        onClick={togglePlay}
        playsInline
        muted
        loop
        controls={false}
      >
        {/* Using a reliable video source */}
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Play button overlay (shows when video is paused) */}
      {(!isPlaying || !isMounted) && (
        <div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#940909] text-white transition-none hover:bg-[#7b0707]"
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

      {/* Sound indicator */}
      {isMounted && (
        <div className="absolute bottom-3 right-3 flex items-center rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          </svg>
          <span className="ml-1">Tap for sound</span>
        </div>
      )}
    </div>
  );
}
