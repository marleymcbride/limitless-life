"use client";

import { useState } from "react";
import VSLPlayer from "./vsl-player";
import { VSLProgress } from "@/types/vsl.types";

interface VSLHeroSectionProps {
  libraryId: string;
  videoId: string;
}

export default function VSLHeroSection({
  libraryId,
  videoId,
}: VSLHeroSectionProps) {
  const [watchProgress, setWatchProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const handleProgress = (progress: VSLProgress) => {
    setWatchProgress(progress.percentage);

    if (progress.percentage >= 50 && !showCTA) {
      setShowCTA(true);
    }
  };

  const handleComplete = () => {
    setHasCompleted(true);
    setShowCTA(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6" style={{ lineHeight: "1.4" }}>
            Stop Waking Up
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              Feeling Like Shit
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            The exact system high-earning men use to ditch caffeine, quit
            alcohol, and reclaim natural energy — without willpower or
            suffering.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto mb-8 sm:mb-12">
          <VSLPlayer
            libraryId={libraryId}
            videoId={videoId}
            onProgress={handleProgress}
            onComplete={handleComplete}
            className="shadow-2xl"
            autoplay={false}
            muted={false}
            preload={true}
          />
        </div>

        {watchProgress > 0 && watchProgress < 95 && (
          <div className="max-w-5xl mx-auto mb-6">
            <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-600 h-full transition-none duration-0"
                style={{ width: `${watchProgress}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-400 mt-2">
              {Math.floor(watchProgress)}% watched
            </p>
          </div>
        )}

        {showCTA && (
          <div className="text-center 
            {hasCompleted ? (
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-white font-semibold">
                  Ready to start your transformation?
                </p>
                <button
                  onClick={() => {
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg sm:text-xl font-bold rounded-lg hover:from-orange-600 hover:to-red-700 transition-none duration-0 shadow-xl hover:shadow-2xl transform 
                >
                  Apply for Limitless Now
                </button>
                <p className="text-sm text-gray-400">
                  Limited spots available • No credit card required
                </p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm sm:text-base">
                Keep watching to see how this works...
              </p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        . {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
