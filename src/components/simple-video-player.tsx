"use client";

import { useEffect, useRef, useState } from "react";

interface SimpleVideoPlayerProps {
  libraryId: string;
  videoId: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  preload?: boolean;
  controls?: boolean;
}

export default function SimpleVideoPlayer({
  libraryId,
  videoId,
  className = "",
  autoplay = false,
  muted = false,
  preload = true,
  controls = true,
}: SimpleVideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "//assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
    script.async = true;
    script.onload = () => {
      console.log("Simple Player.js loaded");
      initializePlayer();
    };
    script.onerror = () => {
      console.error("Failed to load Player.js");
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initializePlayer = () => {
    if (!iframeRef.current || !window.playerjs) return;

    try {
      const player = new window.playerjs.Player(iframeRef.current);

      player.on("ready", () => {
        console.log("Simple Video Player ready");
        setIsReady(true);
        setIsLoading(false);

        if (autoplay) {
          if (muted) {
            player.mute();
          }
          player.play();
        }
      });
    } catch (error) {
      console.error("Failed to initialize simple player:", error);
      setIsLoading(false);
    }
  };

  const thumbnailUrl = `https://vz-8f43891f-169.b-cdn.net/${videoId}/thumbnail.jpg`;

  // Simple iframe URL without extra controls
  const iframeUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=${autoplay}&muted=${muted}&preload=${preload}&controls=${controls}&responsive=true&loop=false&t=${Date.now()}`;

  return (
    <div className={`simple-video-player relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${thumbnailUrl})`,
              filter: "blur(20px) brightness(0.3)",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white text-xs">Loading...</p>
          </div>
        </div>
      )}

      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="eager"
        />
      </div>
    </div>
  );
}
