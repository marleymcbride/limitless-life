"use client";

import { useState, useEffect, useRef } from "react";

interface DelayedCTAProps {
  delay?: number; // delay in milliseconds, default 3 minutes
  videoProgress?: number; // video progress percentage (0-100)
  videoCurrentTime?: number; // video current time in seconds
  videoHasEnded?: boolean; // whether video has been completed
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function DelayedCTA({
  delay = 180000, // 3 minutes default (reduced from 5)
  videoProgress = 0,
  videoCurrentTime = 0, // in seconds
  videoHasEnded = false,
  href = "/application",
  className = "",
  children
}: DelayedCTAProps) {
  const [showCTA, setShowCTA] = useState(false);
  const hasShownCTA = useRef(false); // Track if we've already shown the CTA
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't do anything if we've already shown the CTA
    if (hasShownCTA.current) {
      return;
    }

    // Convert videoCurrentTime from seconds to minutes
    const videoTimeInMinutes = videoCurrentTime / 60;

    // If video past 10 min mark (or completed), show immediately
    if (videoHasEnded || videoTimeInMinutes >= 10) {
      setShowCTA(true);
      hasShownCTA.current = true;
      return;
    }

    // Calculate how long to wait based on current watch time
    let effectiveDelay: number;

    if (videoTimeInMinutes >= 5) {
      // If past 5 min, show after 1 more minute (60000ms)
      effectiveDelay = 60000;
    } else if (videoTimeInMinutes >= 3) {
      // If already past 3 min, show immediately
      setShowCTA(true);
      hasShownCTA.current = true;
      return;
    } else {
      // Otherwise, wait the full delay minus what we've already watched
      const timeAlreadyWatchedMs = videoTimeInMinutes * 60 * 1000;
      effectiveDelay = Math.max(0, delay - timeAlreadyWatchedMs);
    }

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set the timer
    timerRef.current = setTimeout(() => {
      setShowCTA(true);
      hasShownCTA.current = true;
    }, effectiveDelay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay, videoCurrentTime, videoHasEnded]);

  if (!showCTA) {
    return null;
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}