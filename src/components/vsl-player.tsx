"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { VSLPlayerProps, VSLProgress, PlayerJSPlayer } from "@/types/vsl.types";
import { useVSLTracking } from "@/hooks/useVSLTracking";

export default function VSLPlayer({
  libraryId,
  videoId = "",
  className = "",
  onReady,
  onPlay,
  onPause,
  onProgress,
  onComplete,
  onUserStartedPlaying,
  onPauseOverlayChange,
  autoplay = true,
  muted = true,
  controls = true,
  preload = true,
  pauseOverlayContainer,
  passedJoinNowTime = false,
}: VSLPlayerProps & { onUserStartedPlaying?: () => void; passedJoinNowTime?: boolean; onPauseOverlayChange?: (isActive: boolean) => void }) {
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
  const [hasEnded, setHasEnded] = useState(false);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null);
  const [showPopupCTA, setShowPopupCTA] = useState(false);
  const hasShownPopupCTA = useRef(false);
  const popupCTATimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll function with "soft close" easing
  const smoothScrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top + start - 20; // 20px offset
    const distance = target - start;
    const duration = 2500; // 2.5 seconds for smooth, luxurious scroll
    let startTime: number | null = null;

    // Ease-in-out cubic function for "soft close" effect
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easedProgress = easeInOutCubic(progress);
      window.scrollTo(0, start + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    setTimestamp(Date.now().toString());
  }, []);

  // Find the container element for the pause overlay
  useEffect(() => {
    if (pauseOverlayContainer) {
      const element = document.getElementById(pauseOverlayContainer);
      if (element) {
        setContainerElement(element);
      }
    }
  }, [pauseOverlayContainer]);

  // Popup CTA timing logic - same as DelayedCTA
  useEffect(() => {
    // Don't do anything if we've already shown the CTA
    if (hasShownPopupCTA.current) {
      return;
    }

    // Convert currentTime from seconds to minutes
    const videoTimeInMinutes = progressRef.current.currentTime / 60;

    // If video past 10 min mark (or completed), show immediately
    if (hasEnded || videoTimeInMinutes >= 10) {
      setShowPopupCTA(true);
      hasShownPopupCTA.current = true;
      return;
    }

    // Calculate how long to wait based on current watch time
    let effectiveDelay: number;

    if (videoTimeInMinutes >= 5) {
      // If past 5 min, show after 1 more minute (60000ms)
      effectiveDelay = 60000;
    } else if (videoTimeInMinutes >= 3) {
      // If already past 3 min, show immediately
      setShowPopupCTA(true);
      hasShownPopupCTA.current = true;
      return;
    } else {
      // Otherwise, wait 3 minutes (180000ms) minus what we've already watched
      const timeAlreadyWatchedMs = videoTimeInMinutes * 60 * 1000;
      effectiveDelay = Math.max(0, 180000 - timeAlreadyWatchedMs);
    }

    // Clear any existing timer
    if (popupCTATimerRef.current) {
      clearTimeout(popupCTATimerRef.current);
    }

    // Set the timer
    popupCTATimerRef.current = setTimeout(() => {
      setShowPopupCTA(true);
      hasShownPopupCTA.current = true;
    }, effectiveDelay);

    return () => {
      if (popupCTATimerRef.current) {
        clearTimeout(popupCTATimerRef.current);
      }
    };
  }, [currentProgress, hasEnded]);

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
            !showResumeChoice &&
            !hasEnded
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
            // Reset hasEnded if video starts playing again
            setHasEnded(false);
          }
        });
      }
    }, 200);

    return () => clearInterval(checkInterval);
  }, [isReady, showPauseOverlay, showResumeChoice, hasEnded]);

  // Notify parent when pause overlay state changes
  useEffect(() => {
    onPauseOverlayChange?.(showPauseOverlay);
  }, [showPauseOverlay, onPauseOverlayChange]);

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
      setHasEnded(true);
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
          onUserStartedPlaying?.();
        }
      }, 100);
    }
  };

  const handleResume = () => {
    if (playerRef.current && savedPosition) {
      playerRef.current.setCurrentTime(savedPosition);
      playerRef.current.unmute();
      playerRef.current.play();
      setShowResumeChoice(false);
      setShowClickToUnmute(false);
      setIsMuted(false);
      onUserStartedPlaying?.();
    }
  };

  const handleRestart = () => {
    if (playerRef.current) {
      playerRef.current.setCurrentTime(0);
      playerRef.current.play();
      setShowResumeChoice(false);
      setShowClickToUnmute(true);
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

  const handleDismissOverlay = () => {
    console.log("Overlay dismissed");
    setShowPauseOverlay(false);
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

  // Letterbox calculations for 1.85:1 aspect ratio (1920x1040 in 16:9 container)
  const letterboxPaddingTop = "1.04%"; // (56.25% - 54.17%) / 2
  const letterboxHeight = "54.17%"; // 1040 / 1920 * 100

  const iframeUrl = timestamp ? `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=${autoplay}&muted=${muted}&preload=${preload}&controls=false&responsive=true&loop=false&hideControls=true&t=${timestamp}` : `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=${autoplay}&muted=${muted}&preload=${preload}&controls=false&responsive=true&loop=false&hideControls=true`;

  const thumbnailUrl = `https://vz-8f43891f-169.b-cdn.net/${videoId}/thumbnail.jpg`;

  return (
    <>
    <div className={`vsl-player-container relative overflow-hidden ${className}`}>
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

      {showResumeChoice && isReady && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden">
          <div className="vsl-resume-container text-center w-full max-w-[95%] max-h-full overflow-y-auto flex flex-col justify-center items-center md:justify-end md:pb-8" style={{ transform: "translateY(15%)" }}>
            <h2 className="vsl-resume-heading mobile-headline font-bold mb-7 md:mb-12 lg:mb-16 leading-tight text-white" style={{ fontSize: "22px" }}>
              Already started watching?
            </h2>
            <div className="flex flex-row gap-3 md:gap-12 lg:gap-16 justify-center items-center w-full">
              <button
                onClick={handleResume}
                className="flex flex-col items-center gap-1 md:gap-2 transition-opacity group hover:opacity-70"
              >
                <div className="w-10 h-10 md:w-11 lg:w-12 md:h-11 lg:h-12 rounded-full border-3 border-red-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="white" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span className="text-xs md:text-sm lg:text-base font-medium text-white">Continue</span>
              </button>
              <button
                onClick={handleRestart}
                className="flex flex-col items-center gap-1 md:gap-2 transition-opacity group hover:opacity-70"
              >
                <div className="w-10 h-10 md:w-11 lg:w-12 md:h-11 lg:h-12 rounded-full border-3 border-white flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 md:w-6 md:h-6 lg:w-7 lg:h-7"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                  </svg>
                </div>
                <span className="text-xs md:text-sm lg:text-base font-medium text-white">Start Again</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showPauseOverlay && !showResumeChoice && isReady && (
        <>
          {containerElement ? (
            createPortal(
              <div
                className="absolute inset-0 flex items-center justify-center z-[100] popup-fade-background"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(20,5,5,0) 0%, rgba(20,5,5,0) 22%, rgba(20,5,5,0.94) 23%, rgba(30,5,5,0.92) 50%, rgba(20,5,5,0.94) 77%, rgba(20,5,5,0.5) 82%, rgba(20,5,5,0.2) 86%, rgba(20,5,5,0) 92%, rgba(20,5,5,0) 100%)",
                  pointerEvents: "none",
                }}
              >
                <div
                  className="text-center text-white px-6 max-w-2xl"
                  style={{ pointerEvents: "auto" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={handleDismissOverlay}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
                    aria-label="Close"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="mb-4 sm:mb-8 popup-icon-container">
                    <svg
                      className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-red-600 popup-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                  </div>
                  <h2
                    className="text-2xl sm:text-5xl font-black mb-4 sm:mb-8 uppercase tracking-wider text-red-600 popup-heading"
                    style={{ textShadow: "0 0 20px rgba(220,38,38,0.5)" }}
                  >
                    DON'T GO YET!
                  </h2>
                  <h3 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6 text-white popup-subheading">
                    GIVE ME 2 MORE MINUTES
                  </h3>
                  <p className="text-lg sm:text-2xl mb-6 sm:mb-10 text-gray-200 popup-paragraph">
                    YOU WON'T REGRET IT...
                  </p>
                  <button
                    onClick={handleContinueWatching}
                    className="relative group bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-base sm:text-xl font-bold px-6 sm:px-12 py-2 sm:py-5 rounded-lg transition-none transform  shadow-2xl border-2 border-red-500 popup-button"
                    style={{ boxShadow: "0 0 40px rgba(220,38,38,0.6)" }}
                  >
                    <span className="relative z-10">Continue Watching</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  </button>

                  {/* CTA Button - positioned to overlay the original CTA button */}
                  {showPopupCTA && (
                    passedJoinNowTime ? (
                      <a
                        href="/application"
                        className="absolute left-1/2 transform -translate-x-1/2 bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-2 px-8 sm:py-5 sm:px-12 text-base sm:text-lg rounded-md inline-block transition-none duration-0 focus:outline-none z-[100] w-[280px] popup-cta-join"
                        style={{ top: 'calc(54.5% + 300px)' }}
                      >
                        JOIN NOW
                      </a>
                    ) : (
                      <a
                        href="#apply-for-elite-spots"
                        className="absolute left-1/2 transform -translate-x-1/2 bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-2 px-8 sm:py-5 sm:px-12 text-base sm:text-lg rounded-md inline-block transition-none duration-0 focus:outline-none z-[200] w-[280px] popup-cta-tell cursor-pointer"
                        style={{ top: 'calc(54.5% + 300px)' }}
                        onClick={(e) => {
                          e.preventDefault();
                          smoothScrollToElement("apply-for-elite-spots");
                        }}
                      >
                        TELL ME MORE
                      </a>
                    )
                  )}
                  <style>{`
                    @media (max-width: 640px) and (orientation: portrait) {
                      .popup-fade-background {
                        background: linear-gradient(to bottom, rgba(20,5,5,0) 0%, rgba(20,5,5,0) 27%, rgba(20,5,5,0.15) 28%, rgba(20,5,5,0.30) 29%, rgba(20,5,5,0.50) 30%, rgba(20,5,5,0.70) 30.5%, rgba(20,5,5,0.85) 30.8%, rgba(20,5,5,0.94) 31%, rgba(30,5,5,0.92) 50%, rgba(20,5,5,0.94) 58%, rgba(20,5,5,0.935) 58.3%, rgba(20,5,5,0.93) 58.6%, rgba(20,5,5,0.925) 58.9%, rgba(20,5,5,0.92) 59.2%, rgba(20,5,5,0.91) 59.5%, rgba(20,5,5,0.90) 59.8%, rgba(20,5,5,0.89) 60.1%, rgba(20,5,5,0.88) 60.4%, rgba(20,5,5,0.87) 60.7%, rgba(20,5,5,0.86) 61%, rgba(20,5,5,0.85) 61.3%, rgba(20,5,5,0.84) 61.6%, rgba(20,5,5,0.83) 61.9%, rgba(20,5,5,0.82) 62.2%, rgba(20,5,5,0.81) 62.5%, rgba(20,5,5,0.80) 62.8%, rgba(20,5,5,0.79) 63.1%, rgba(20,5,5,0.78) 63.4%, rgba(20,5,5,0.77) 63.7%, rgba(20,5,5,0.76) 64%, rgba(20,5,5,0.75) 64.3%, rgba(20,5,5,0.74) 64.6%, rgba(20,5,5,0.73) 64.9%, rgba(20,5,5,0.72) 65.2%, rgba(20,5,5,0.71) 65.5%, rgba(20,5,5,0.70) 65.8%, rgba(20,5,5,0.69) 66.1%, rgba(20,5,5,0.68) 66.4%, rgba(20,5,5,0.67) 66.7%, rgba(20,5,5,0.66) 67%, rgba(20,5,5,0.65) 67.3%, rgba(20,5,5,0.64) 67.6%, rgba(20,5,5,0.63) 67.9%, rgba(20,5,5,0.62) 68.2%, rgba(20,5,5,0.61) 68.5%, rgba(20,5,5,0.60) 68.8%, rgba(20,5,5,0.59) 69.1%, rgba(20,5,5,0.58) 69.4%, rgba(20,5,5,0.57) 69.7%, rgba(20,5,5,0.56) 70%, rgba(20,5,5,0.55) 70.3%, rgba(20,5,5,0.54) 70.6%, rgba(20,5,5,0.53) 70.9%, rgba(20,5,5,0.52) 71.2%, rgba(20,5,5,0.51) 71.5%, rgba(20,5,5,0.50) 71.8%, rgba(20,5,5,0.49) 72.1%, rgba(20,5,5,0.48) 72.4%, rgba(20,5,5,0.47) 72.7%, rgba(20,5,5,0.46) 73%, rgba(20,5,5,0.45) 73.3%, rgba(20,5,5,0.44) 73.6%, rgba(20,5,5,0.43) 73.9%, rgba(20,5,5,0.42) 74.2%, rgba(20,5,5,0.41) 74.5%, rgba(20,5,5,0.40) 74.8%, rgba(20,5,5,0.39) 75.1%, rgba(20,5,5,0.38) 75.4%, rgba(20,5,5,0.37) 75.7%, rgba(20,5,5,0.36) 76%, rgba(20,5,5,0.35) 76.3%, rgba(20,5,5,0.34) 76.6%, rgba(20,5,5,0.33) 76.9%, rgba(20,5,5,0.32) 77.2%, rgba(20,5,5,0.31) 77.5%, rgba(20,5,5,0.30) 77.8%, rgba(20,5,5,0.29) 78.1%, rgba(20,5,5,0.28) 78.4%, rgba(20,5,5,0.27) 78.7%, rgba(20,5,5,0.26) 79%, rgba(20,5,5,0.25) 79.3%, rgba(20,5,5,0.24) 79.6%, rgba(20,5,5,0.23) 79.9%, rgba(20,5,5,0.22) 80.2%, rgba(20,5,5,0.21) 80.5%, rgba(20,5,5,0.20) 80.8%, rgba(20,5,5,0.19) 81.1%, rgba(20,5,5,0.18) 81.4%, rgba(20,5,5,0.17) 81.7%, rgba(20,5,5,0.16) 82%, rgba(20,5,5,0.15) 82.3%, rgba(20,5,5,0.14) 82.6%, rgba(20,5,5,0.13) 82.9%, rgba(20,5,5,0.12) 83.2%, rgba(20,5,5,0.11) 83.5%, rgba(20,5,5,0.10) 83.8%, rgba(20,5,5,0.09) 84.1%, rgba(20,5,5,0.08) 84.4%, rgba(20,5,5,0.07) 84.7%, rgba(20,5,5,0.06) 85%, rgba(20,5,5,0.05) 85.3%, rgba(20,5,5,0.04) 85.6%, rgba(20,5,5,0.03) 85.9%, rgba(20,5,5,0.02) 86.2%, rgba(20,5,5,0.01) 86.5%, rgba(20,5,5,0) 87%, rgba(20,5,5,0) 100%) !important;
                      }
                      .popup-button {
                        position: absolute !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        top: calc(54.5% + 100px) !important;
                      }
                      .popup-cta-join {
                        top: calc(54.5% + 224px) !important;
                        width: 180px !important;
                        padding-left: 14px !important;
                        padding-right: 14px !important;
                      }
                      .popup-cta-tell {
                        top: calc(54.5% + 224px) !important;
                        width: 180px !important;
                        padding-left: 14px !important;
                        padding-right: 14px !important;
                      }
                    }
                    @media (max-height: 640px) and (orientation: landscape) {
                      .popup-fade-background {
                        background: linear-gradient(to bottom, rgba(20,5,5,0) 0%, rgba(20,5,5,0) 17%, rgba(20,5,5,0.15) 18%, rgba(20,5,5,0.30) 19%, rgba(20,5,5,0.50) 20%, rgba(20,5,5,0.70) 21%, rgba(20,5,5,0.85) 21.5%, rgba(20,5,5,0.94) 22%, rgba(30,5,5,0.92) 30%, rgba(30,5,5,0.92) 70%, rgba(20,5,5,0.94) 73%, rgba(20,5,5,0.92) 74%, rgba(20,5,5,0.86) 75%, rgba(20,5,5,0.78) 76%, rgba(20,5,5,0.70) 77%, rgba(20,5,5,0.60) 78%, rgba(20,5,5,0.50) 79%, rgba(20,5,5,0.40) 80%, rgba(20,5,5,0.30) 81%, rgba(20,5,5,0.20) 82%, rgba(20,5,5,0.12) 83%, rgba(20,5,5,0.06) 86%, rgba(20,5,5,0.04) 88%, rgba(20,5,5,0.02) 90%, rgba(20,5,5,0.01) 92%, rgba(20,5,5,0) 100%) !important;
                      }
                      .popup-icon {
                        width: 50px !important;
                        height: 50px !important;
                      }
                      .popup-icon-container {
                        margin-bottom: 13px !important;
                      }
                      .popup-heading {
                        font-size: 25px !important;
                        margin-bottom: 13px !important;
                      }
                      .popup-subheading {
                        font-size: 22px !important;
                        margin-bottom: 8px !important;
                      }
                      .popup-paragraph {
                        font-size: 22px !important;
                        margin-bottom: 17px !important;
                      }
                      .popup-button {
                        position: absolute !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        top: calc(54.5% + 60px) !important;
                        font-size: 16px !important;
                        padding-left: 42px !important;
                        padding-right: 42px !important;
                        padding-top: 10px !important;
                        padding-bottom: 10px !important;
                      }
                      .popup-cta-join {
                        top: calc(54.5% + 213px) !important;
                        width: 220px !important;
                        padding-left: 16px !important;
                        padding-right: 16px !important;
                      }
                      .popup-cta-tell {
                        top: calc(54.5% + 213px) !important;
                        width: 220px !important;
                        padding-left: 16px !important;
                        padding-right: 16px !important;
                      }
                    }
                  `}</style>
                </div>
              </div>,
              containerElement
            )
          ) : (
            <div
              className="fixed inset-0 flex items-center justify-center z-[100] popup-fade-background"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(20,5,5,0) 0%, rgba(20,5,5,0) 22%, rgba(20,5,5,0.94) 23%, rgba(30,5,5,0.92) 50%, rgba(20,5,5,0.94) 77%, rgba(20,5,5,0.5) 82%, rgba(20,5,5,0.2) 86%, rgba(20,5,5,0) 92%, rgba(20,5,5,0) 100%)",
                pointerEvents: "none",
              }}
            >
              <div
                className="text-center text-white px-6 max-w-2xl"
                style={{ pointerEvents: "auto" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={handleDismissOverlay}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
                  aria-label="Close"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="mb-4 sm:mb-8 popup-icon-container">
                  <svg
                    className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-red-600 popup-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                </div>
                <h2
                  className="text-2xl sm:text-5xl font-black mb-4 sm:mb-8 uppercase tracking-wider text-red-600 popup-heading"
                  style={{ textShadow: "0 0 20px rgba(220,38,38,0.5)" }}
                >
                  DON'T GO YET!
                </h2>
                <h3 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6 text-white popup-subheading">
                  GIVE ME 2 MORE MINUTES
                </h3>
                <p className="text-lg sm:text-2xl mb-6 sm:mb-10 text-gray-200 popup-paragraph">
                  YOU WON'T REGRET IT...
                </p>
                <button
                  onClick={handleContinueWatching}
                  className="relative group bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-base sm:text-xl font-bold px-6 sm:px-12 py-2 sm:py-5 rounded-lg transition-none transform  shadow-2xl border-2 border-red-500 popup-button"
                  style={{ boxShadow: "0 0 40px rgba(220,38,38,0.6)" }}
                >
                  <span className="relative z-10">Continue Watching</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </button>

                {/* CTA Button - positioned to overlay the original CTA button */}
                {showPopupCTA && (
                  passedJoinNowTime ? (
                    <a
                      href="/application"
                      className="absolute left-1/2 transform -translate-x-1/2 bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-2 px-8 sm:py-5 sm:px-12 text-base sm:text-lg rounded-md inline-block transition-none duration-0 focus:outline-none z-[200] w-[280px] popup-cta-join-fallback"
                      style={{ top: 'calc(54.5% + 300px)' }}
                    >
                      JOIN NOW
                    </a>
                  ) : (
                    <a
                      href="#apply-for-elite-spots"
                      className="absolute left-1/2 transform -translate-x-1/2 bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-2 px-8 sm:py-5 sm:px-12 text-base sm:text-lg rounded-md inline-block transition-none duration-0 focus:outline-none z-[200] w-[280px] popup-cta-tell-fallback cursor-pointer"
                      style={{ top: 'calc(54.5% + 300px)' }}
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollToElement("apply-for-elite-spots");
                      }}
                    >
                      TELL ME MORE
                    </a>
                  )
                )}
                <style>{`
                  @media (max-width: 640px) and (orientation: portrait) {
                    .popup-fade-background {
                      background: linear-gradient(to bottom, rgba(20,5,5,0) 0%, rgba(20,5,5,0) 27%, rgba(20,5,5,0.15) 28%, rgba(20,5,5,0.30) 29%, rgba(20,5,5,0.50) 30%, rgba(20,5,5,0.70) 30.5%, rgba(20,5,5,0.85) 30.8%, rgba(20,5,5,0.94) 31%, rgba(30,5,5,0.92) 50%, rgba(20,5,5,0.94) 58%, rgba(20,5,5,0.935) 58.3%, rgba(20,5,5,0.93) 58.6%, rgba(20,5,5,0.925) 58.9%, rgba(20,5,5,0.92) 59.2%, rgba(20,5,5,0.91) 59.5%, rgba(20,5,5,0.90) 59.8%, rgba(20,5,5,0.89) 60.1%, rgba(20,5,5,0.88) 60.4%, rgba(20,5,5,0.87) 60.7%, rgba(20,5,5,0.86) 61%, rgba(20,5,5,0.85) 61.3%, rgba(20,5,5,0.84) 61.6%, rgba(20,5,5,0.83) 61.9%, rgba(20,5,5,0.82) 62.2%, rgba(20,5,5,0.81) 62.5%, rgba(20,5,5,0.80) 62.8%, rgba(20,5,5,0.79) 63.1%, rgba(20,5,5,0.78) 63.4%, rgba(20,5,5,0.77) 63.7%, rgba(20,5,5,0.76) 64%, rgba(20,5,5,0.75) 64.3%, rgba(20,5,5,0.74) 64.6%, rgba(20,5,5,0.73) 64.9%, rgba(20,5,5,0.72) 65.2%, rgba(20,5,5,0.71) 65.5%, rgba(20,5,5,0.70) 65.8%, rgba(20,5,5,0.69) 66.1%, rgba(20,5,5,0.68) 66.4%, rgba(20,5,5,0.67) 66.7%, rgba(20,5,5,0.66) 67%, rgba(20,5,5,0.65) 67.3%, rgba(20,5,5,0.64) 67.6%, rgba(20,5,5,0.63) 67.9%, rgba(20,5,5,0.62) 68.2%, rgba(20,5,5,0.61) 68.5%, rgba(20,5,5,0.60) 68.8%, rgba(20,5,5,0.59) 69.1%, rgba(20,5,5,0.58) 69.4%, rgba(20,5,5,0.57) 69.7%, rgba(20,5,5,0.56) 70%, rgba(20,5,5,0.55) 70.3%, rgba(20,5,5,0.54) 70.6%, rgba(20,5,5,0.53) 70.9%, rgba(20,5,5,0.52) 71.2%, rgba(20,5,5,0.51) 71.5%, rgba(20,5,5,0.50) 71.8%, rgba(20,5,5,0.49) 72.1%, rgba(20,5,5,0.48) 72.4%, rgba(20,5,5,0.47) 72.7%, rgba(20,5,5,0.46) 73%, rgba(20,5,5,0.45) 73.3%, rgba(20,5,5,0.44) 73.6%, rgba(20,5,5,0.43) 73.9%, rgba(20,5,5,0.42) 74.2%, rgba(20,5,5,0.41) 74.5%, rgba(20,5,5,0.40) 74.8%, rgba(20,5,5,0.39) 75.1%, rgba(20,5,5,0.38) 75.4%, rgba(20,5,5,0.37) 75.7%, rgba(20,5,5,0.36) 76%, rgba(20,5,5,0.35) 76.3%, rgba(20,5,5,0.34) 76.6%, rgba(20,5,5,0.33) 76.9%, rgba(20,5,5,0.32) 77.2%, rgba(20,5,5,0.31) 77.5%, rgba(20,5,5,0.30) 77.8%, rgba(20,5,5,0.29) 78.1%, rgba(20,5,5,0.28) 78.4%, rgba(20,5,5,0.27) 78.7%, rgba(20,5,5,0.26) 79%, rgba(20,5,5,0.25) 79.3%, rgba(20,5,5,0.24) 79.6%, rgba(20,5,5,0.23) 79.9%, rgba(20,5,5,0.22) 80.2%, rgba(20,5,5,0.21) 80.5%, rgba(20,5,5,0.20) 80.8%, rgba(20,5,5,0.19) 81.1%, rgba(20,5,5,0.18) 81.4%, rgba(20,5,5,0.17) 81.7%, rgba(20,5,5,0.16) 82%, rgba(20,5,5,0.15) 82.3%, rgba(20,5,5,0.14) 82.6%, rgba(20,5,5,0.13) 82.9%, rgba(20,5,5,0.12) 83.2%, rgba(20,5,5,0.11) 83.5%, rgba(20,5,5,0.10) 83.8%, rgba(20,5,5,0.09) 84.1%, rgba(20,5,5,0.08) 84.4%, rgba(20,5,5,0.07) 84.7%, rgba(20,5,5,0.06) 85%, rgba(20,5,5,0.05) 85.3%, rgba(20,5,5,0.04) 85.6%, rgba(20,5,5,0.03) 85.9%, rgba(20,5,5,0.02) 86.2%, rgba(20,5,5,0.01) 86.5%, rgba(20,5,5,0) 87%, rgba(20,5,5,0) 100%) !important;
                    }
                    .popup-button {
                      position: absolute !important;
                      left: 50% !important;
                      transform: translateX(-50%) !important;
                      top: calc(54.5% + 120px) !important;
                    }
                    .popup-cta-join-fallback {
                      top: calc(54.5% + 224px) !important;
                      width: 180px !important;
                      padding-left: 14px !important;
                      padding-right: 14px !important;
                    }
                    .popup-cta-tell-fallback {
                      top: calc(54.5% + 224px) !important;
                      width: 180px !important;
                      padding-left: 14px !important;
                      padding-right: 14px !important;
                    }
                  }
                  @media (max-height: 640px) and (orientation: landscape) {
                    .popup-fade-background {
                      background: linear-gradient(to bottom, rgba(20,5,5,0) 0%, rgba(20,5,5,0) 17%, rgba(20,5,5,0.15) 18%, rgba(20,5,5,0.30) 19%, rgba(20,5,5,0.50) 20%, rgba(20,5,5,0.70) 21%, rgba(20,5,5,0.85) 21.5%, rgba(20,5,5,0.94) 22%, rgba(30,5,5,0.92) 30%, rgba(30,5,5,0.92) 70%, rgba(20,5,5,0.94) 73%, rgba(20,5,5,0.92) 74%, rgba(20,5,5,0.86) 75%, rgba(20,5,5,0.78) 76%, rgba(20,5,5,0.70) 77%, rgba(20,5,5,0.60) 78%, rgba(20,5,5,0.50) 79%, rgba(20,5,5,0.40) 80%, rgba(20,5,5,0.30) 81%, rgba(20,5,5,0.20) 82%, rgba(20,5,5,0.12) 83%, rgba(20,5,5,0.06) 86%, rgba(20,5,5,0.04) 88%, rgba(20,5,5,0.02) 90%, rgba(20,5,5,0.01) 92%, rgba(20,5,5,0) 100%) !important;
                    }
                    .popup-icon {
                      width: 50px !important;
                      height: 50px !important;
                    }
                    .popup-icon-container {
                      margin-bottom: 13px !important;
                    }
                    .popup-heading {
                      font-size: 25px !important;
                      margin-bottom: 13px !important;
                    }
                    .popup-subheading {
                      font-size: 22px !important;
                      margin-bottom: 8px !important;
                    }
                    .popup-paragraph {
                      font-size: 22px !important;
                      margin-bottom: 17px !important;
                    }
                    .popup-button {
                      position: absolute !important;
                      left: 50% !important;
                        transform: translateX(-50%) !important;
                      top: calc(54.5% + 160px) !important;
                      font-size: 16px !important;
                      padding-left: 42px !important;
                      padding-right: 42px !important;
                      padding-top: 10px !important;
                      padding-bottom: 10px !important;
                    }
                    .popup-cta-join-fallback {
                      top: calc(54.5% + 213px) !important;
                      width: 220px !important;
                      padding-left: 16px !important;
                      padding-right: 16px !important;
                    }
                    .popup-cta-tell-fallback {
                      top: calc(54.5% + 213px) !important;
                      width: 220px !important;
                      padding-left: 16px !important;
                      padding-right: 16px !important;
                    }
                  }
                `}</style>
              </div>
            </div>
          )}
        </>
      )}

      <div className="vsl-player-wrapper">
        <div className="relative w-full bg-black rounded-lg" style={{ paddingTop: "54.5%" }}>
          {showClickToUnmute && isReady && isMuted && (
            <div
              className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer bg-black/60 rounded-lg backdrop-blur-sm"
              onClick={handleUnmuteClick}
            >
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-red-600 rounded-2xl p-2 md:p-8 text-center w-full max-w-md shadow-2xl mx-4">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <div className="mb-1 md:mb-4 flex justify-center">
                    <svg className="w-full h-8 md:h-24" viewBox="0 0 400 100" fill="none" preserveAspectRatio="none">
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
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-0 md:mb-2">
                    The Video has Started.
                  </h3>
                  <p className="text-gray-300 text-xs md:text-lg">Click here to listen</p>
                </div>
              </div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            id={`vsl-player-${videoId}`}
            src={iframeUrl}
            className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-2xl"
            allow="autoplay"
            loading="eager"
            title="The Limitless Protocol"
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
      </div>

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
        @media (max-height: 640px) and (orientation: landscape) {
          .vsl-player-wrapper {
            transform: scale(0.8);
            transform-origin: center center;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </div>
    </>
  );
}
