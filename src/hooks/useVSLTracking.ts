import { useEffect, useRef, useState } from "react";
import { VSLProgress } from "@/types/vsl.types";
import { shouldTrackMilestone } from "@/lib/vslAnalytics";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useSession } from "@/hooks/useSession";

export const useVSLTracking = (videoId: string) => {
  const startTime = useRef<number>(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Use the new session management hook
  const { session } = useSession();
  const { trackEvent } = useAnalytics(session?.sessionId || "");

  const trackPlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      startTime.current = Date.now();

      // Track VSL start event
      if (session?.sessionId) {
        trackEvent("vsl_start", { videoId });
      }
    }
  };

  const trackPause = (currentTime: number) => {
    // Track pause event
    if (session?.sessionId) {
      trackEvent("vsl_pause", { videoId, currentTime });
    }
  };

  const trackProgress = (progress: VSLProgress) => {
    if (shouldTrackMilestone(progress.percentage)) {
      const watchDuration = Math.floor((Date.now() - startTime.current) / 1000);

      // Track VSL milestone events
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

    // Track VSL complete event
    if (session?.sessionId) {
      trackEvent("vsl_complete", { videoId, duration: totalWatchTime });
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted) {
        // Track drop-off event when user leaves page
        if (session?.sessionId) {
          trackEvent("vsl_drop_off", { videoId });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasStarted, videoId, session]);

  return {
    trackPlay,
    trackPause,
    trackProgress,
    trackComplete,
  };
};
