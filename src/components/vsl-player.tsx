"use client";

import { useEffect, useRef, useState } from "react";
import { VSLPlayerProps, VSLProgress, PlayerJSPlayer } from "@/types/vsl.types";
import { useVSLTracking } from "@/hooks/useVSLTracking";

export default function VSLPlayer({
  libraryId,
  videoId,
  className = "",
  onReady,
  onPlay,
  onPause,
  onProgress,
  onComplete,
  autoplay = true,
  muted = true,
  controls = true,
  preload = true,
}: VSLPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<PlayerJSPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showClickToUnmute, setShowClickToUnmute] = useState(true);
  const [showPauseOverlay, setShowPauseOverlay] = useState(false);
  const [showResumeChoice, setShowResumeChoice] = useState(false);
  const [savedPosition, setSavedPosition] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [timestamp] = useState(() => Date.now());
  const progressRef = useRef({ currentTime: 0, duration: 0 });

  const { trackPlay, trackPause, trackProgress, trackComplete } =
    useVSLTracking(videoId);

  const STORAGE_KEY = `vsl_position_${videoId}`;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const position = parseFloat(saved);
      if (position > 5) {
        setSavedPosition(position);
        setShowResumeChoice(true);
      }
    }
  }, [STORAGE_KEY]);

  // AGGRESSIVE pause detection - poll every 200ms
  useEffect(() => {
    if (!isReady || !playerRef.current) return;

    const checkInterval = setInterval(() => {
      if (playerRef.current) {
        playerRef.current.getPaused((isPaused: boolean) => {
          if (
            isPaused &&
            progressRef.current.currentTime > 1 &&
            !showResumeChoice
          ) {
            if (!showPauseOverlay) {
              console.log("🔴 PAUSE DETECTED - SHOWING OVERLAY");
              setShowPauseOverlay(true);
              setIsPlaying(false);
            }
          } else if (!isPaused && showPauseOverlay) {
            console.log("🟢 PLAY DETECTED - HIDING OVERLAY");
            setShowPauseOverlay(false);
            setIsPlaying(true);
          }
        });
      }
    }, 200);

    return () => clearInterval(checkInterval);
  }, [isReady, showPauseOverlay, showResumeChoice]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "//assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
    script.async = true;
    script.onload = () => {
      console.log("Player.js loaded");
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
      playerRef.current = player;

      player.on("ready", () => {
        console.log("VSL Player ready");
        setIsReady(true);
        setIsLoading(false);
        onReady?.();
        setupEventListeners(player);

        if (autoplay) {
          player.mute();
          player.play();
        }
      });
    } catch (error) {
      console.error("Failed to initialize player:", error);
      setIsLoading(false);
    }
  };

  const setupEventListeners = (player: PlayerJSPlayer) => {
    player.on("play", () => {
      console.log("VSL started playing");
      setIsPlaying(true);
      setShowPauseOverlay(false);
      setHasStartedPlaying(true);
      trackPlay();
      onPlay?.();
    });

    player.on("pause", () => {
      console.log("VSL paused - showing overlay");
      setIsPlaying(false);

      if (hasStartedPlaying && progressRef.current.currentTime > 2) {
        console.log("Triggering pause overlay");
        setShowPauseOverlay(true);
      }

      localStorage.setItem(
        STORAGE_KEY,
        progressRef.current.currentTime.toString()
      );
      trackPause(progressRef.current.currentTime);
      onPause?.(progressRef.current.currentTime);
    });

    player.on("timeupdate", (data: { seconds: number; duration: number }) => {
      const percentage = (data.seconds / data.duration) * 100;

      progressRef.current = {
        currentTime: data.seconds,
        duration: data.duration,
      };

      setCurrentProgress(percentage);
      localStorage.setItem(STORAGE_KEY, data.seconds.toString());

      const progress: VSLProgress = {
        currentTime: data.seconds,
        duration: data.duration,
        percentage,
      };

      if (percentage >= 90) progress.milestone = 90;
      else if (percentage >= 75) progress.milestone = 75;
      else if (percentage >= 50) progress.milestone = 50;
      else if (percentage >= 25) progress.milestone = 25;

      trackProgress(progress);
      onProgress?.(progress);

      if (percentage >= 95) {
        localStorage.removeItem(STORAGE_KEY);
        handleComplete();
      }
    });

    player.on("ended", () => {
      console.log("VSL ended");
      localStorage.removeItem(STORAGE_KEY);
      handleComplete();
    });
  };

  const handleComplete = () => {
    trackComplete();
    onComplete?.();
  };

  const handleUnmuteClick = () => {
    if (playerRef.current) {
      setShowClickToUnmute(false);
      playerRef.current.setCurrentTime(0);

      setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.unmute();
          playerRef.current.play();
          setIsMuted(false);
        }
      }, 100);
    }
  };

  const handleResume = () => {
    if (playerRef.current && savedPosition) {
      playerRef.current.setCurrentTime(savedPosition);
      playerRef.current.play();
      setShowResumeChoice(false);
    }
  };

  const handleRestart = () => {
    if (playerRef.current) {
      playerRef.current.setCurrentTime(0);
      playerRef.current.play();
      setShowResumeChoice(false);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleContinueWatching = () => {
    console.log("Continue watching clicked");
    if (playerRef.current) {
      setShowPauseOverlay(false);
      playerRef.current.play();
    }
  };

  const calculateProgressBarWidth = (percentage: number): number => {
    if (percentage <= 10) {
      return (percentage / 10) * 50;
    } else {
      const remaining = percentage - 10;
      const remainingScaled = (remaining / 90) * 50;
      return 50 + remainingScaled;
    }
  };

  const progressBarWidth = calculateProgressBarWidth(currentProgress);

  const iframeUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=${autoplay}&muted=${muted}&preload=${preload}&controls=false&responsive=true&loop=false&t=${timestamp}`;

  const thumbnailUrl = `https://vz-8f43891f-169.b-cdn.net/${videoId}/thumbnail.jpg`;

  return (
    <div className={`vsl-player-container relative ${className}`}>
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
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white text-sm font-medium">Loading video...</p>
          </div>
        </div>
      )}

      {showClickToUnmute && isReady && isMuted && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer bg-black/60 rounded-lg backdrop-blur-sm"
          onClick={handleUnmuteClick}
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-red-600 rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent rounded-2xl" />
            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <svg className="w-64 h-24" viewBox="0 0 400 100" fill="none">
                  {[...Array(40)].map((_, i) => {
                    const height = 10 + Math.random() * 70;
                    const y = (100 - height) / 2;
                    const delay = Math.random() * 1;
                    return (
                      <rect
                        key={i}
                        x={i * 10 + 2}
                        y={y}
                        width="1.5"
                        height={height}
                        fill="#DC2626"
                        opacity="0.9"
                      >
                        <animate
                          attributeName="height"
                          values={`${height};${height * 1.5};${height}`}
                          dur={`${0.8 + Math.random() * 0.4}s`}
                          repeatCount="indefinite"
                          begin={`${delay}s`}
                        />
                        <animate
                          attributeName="y"
                          values={`${y};${y - height * 0.25};${y}`}
                          dur={`${0.8 + Math.random() * 0.4}s`}
                          repeatCount="indefinite"
                          begin={`${delay}s`}
                        />
                      </rect>
                    );
                  })}
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                The Video has Started.
              </h3>
              <p className="text-gray-300 text-lg">Click here to listen</p>
            </div>
          </div>
        </div>
      )}

      {showResumeChoice && isReady && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg">
          <div className="text-center text-white px-6">
            <h2 className="text-3xl font-bold mb-8">
              You have already started watching this video
            </h2>
            <div className="flex gap-8 justify-center items-center">
              <button
                onClick={handleResume}
                className="flex flex-col items-center gap-2  transition-transform group"
              >
                <div className="w-20 h-20 rounded-full border-4 border-red-600 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <svg className="w-10 h-10" fill="white" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span className="text-xl">Continue watching?</span>
              </button>
              <button
                onClick={handleRestart}
                className="flex flex-col items-center gap-2  transition-transform group"
              >
                <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                  </svg>
                </div>
                <span className="text-xl">Start from beginning?</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showPauseOverlay && !showResumeChoice && isReady && (
        <div
          className="absolute inset-0 flex items-center justify-center z-[100] rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(139,0,0,0.8) 50%, rgba(0,0,0,0.95) 100%)",
            pointerEvents: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center text-white px-6 max-w-2xl">
            <div className="mb-6">
              <svg
                className="w-32 h-32 mx-auto text-red-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
            </div>
            <h2
              className="text-6xl font-black mb-6 uppercase tracking-wider text-red-600"
              style={{ textShadow: "0 0 20px rgba(220,38,38,0.5)" }}
            >
              DON'T GO YET!
            </h2>
            <h3 className="text-4xl font-bold mb-4 text-white">
              GIVE ME 2 MORE MINUTES
            </h3>
            <p className="text-3xl mb-8 text-gray-200">
              YOU WON'T REGRET IT...
            </p>
            <button
              onClick={handleContinueWatching}
              className="relative group bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-2xl font-bold px-16 py-6 rounded-lg transition-none transform  shadow-2xl border-2 border-red-500"
              style={{ boxShadow: "0 0 40px rgba(220,38,38,0.6)" }}
            >
              <span className="relative z-10">Continue Watching</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          ref={iframeRef}
          id={`vsl-player-${videoId}`}
          src={iframeUrl}
          className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-2xl"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="eager"
          title="Limitless Protocol VSL"
        />
      </div>

      {isReady && (
        <div className="w-full h-2 bg-white/20 mt-2 rounded-full overflow-hidden border-2 border-red-600/50 shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 transition-none duration-0 relative"
            style={{
              width: `${progressBarWidth}%`,
              boxShadow:
                "0 0 12px rgba(220,38,38,0.8), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        . {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        . {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
