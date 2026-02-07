import { useEffect, useRef, useState } from "react";
import { VSLProgress } from "@/types/vsl.types";
import {
  getSessionId,
  getUserId,
  shouldTrackMilestone,
  trackVSLEvent,
} from "@/lib/vslAnalytics";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useSession } from "@/hooks/useSession";

export const useVSLTracking = (videoId: string) => {
  const sessionId_old = useRef(getSessionId());
  const userId_old = useRef(getUserId());
  const startTime = useRef<number>(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Use the new session management hook
  const { session } = useSession();
  const { trackEvent } = useAnalytics(session?.sessionId || "");

  const trackPlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      startTime.current = Date.now();

      // Old tracking system
      trackVSLEvent({
        type: "play",
        videoId,
        timestamp: Date.now(),
        userId: userId_old.current,
        sessionId: sessionId_old.current,
      });

      // New analytics system
      if (session?.sessionId) {
        trackEvent("vsl_start", { videoId });
      }
    }
  };

  const trackPause = (currentTime: number) => {
    // Old tracking system
    trackVSLEvent({
      type: "pause",
      videoId,
      timestamp: Date.now(),
      userId: userId_old.current,
      sessionId: sessionId_old.current,
      currentTime,
    });
  };

  const trackProgress = (progress: VSLProgress) => {
    if (shouldTrackMilestone(progress.percentage)) {
      const watchDuration = Math.floor((Date.now() - startTime.current) / 1000);

      // Old tracking system
      trackVSLEvent({
        type: "progress",
        videoId,
        timestamp: Date.now(),
        userId: userId_old.current,
        sessionId: sessionId_old.current,
        progress: progress.percentage,
        currentTime: progress.currentTime,
      });

      // New analytics system - track milestones
      if (session?.sessionId) {
        if (progress.percentage >= 95) {
          trackEvent("vsl_milestone", { videoId, percent: 95, durationWatched: watchDuration });
        }
        if (progress.percentage >= 90) {
          trackEvent("vsl_milestone", { videoId, percent: 90, durationWatched: watchDuration });
        }
        if (progress.percentage >= 75) {
          trackEvent("vsl_milestone", { videoId, percent: 75, durationWatched: watchDuration });
        }
        if (progress.percentage >= 50) {
          trackEvent("vsl_milestone", { videoId, percent: 50, durationWatched: watchDuration });
        }
        if (progress.percentage >= 25) {
          trackEvent("vsl_milestone", { videoId, percent: 25, durationWatched: watchDuration });
        }
      }
    }
  };

  const trackComplete = () => {
    const totalWatchTime = Math.floor((Date.now() - startTime.current) / 1000);

    // Old tracking system
    trackVSLEvent({
      type: "complete",
      videoId,
      timestamp: Date.now(),
      userId: userId_old.current,
      sessionId: sessionId_old.current,
      metadata: { totalWatchTime },
    });

    // New analytics system
    if (session?.sessionId) {
      trackEvent("vsl_complete", { videoId, duration: totalWatchTime });
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted) {
        trackVSLEvent({
          type: "drop_off",
          videoId,
          timestamp: Date.now(),
          userId: userId_old.current,
          sessionId: sessionId_old.current,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasStarted, videoId]);

  return {
    trackPlay,
    trackPause,
    trackProgress,
    trackComplete,
  };
};
