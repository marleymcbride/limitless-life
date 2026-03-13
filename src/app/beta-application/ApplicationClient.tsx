"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import VSLPlayer from "../../components/vsl-player";

export default function ApplicationClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewOffer = () => {
    setIsLoading(true);

    // Wait 1 second (to show loading state), then navigate smoothly
    setTimeout(() => {
      router.push("/intake-open-doc");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Content Container */}
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}
          >
            The Lifestyle Athlete 90-Day Reset
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-300 mb-12"
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}
          >
            Watch this short video to see if you're a fit for our beta cohort
          </p>

          {/* Video Presentation */}
          <div className="mb-12">
            <VSLPlayer
              libraryId="505300"
              videoId="ae86338e-0493-4ff0-bca9-87f9ad98dd89"
              autoplay={false}
              muted={false}
              preload={true}
              controls={true}
              className="max-w-4xl mx-auto"
            />
          </div>

          {/* CTA Button */}
          <button
            onClick={handleViewOffer}
            disabled={isLoading}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl"
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "View Full Offer & Apply"
            )}
          </button>

          {/* Subtext */}
          <p
            className="mt-6 text-sm text-gray-400"
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}
          >
            Only 10 spots available for the April cohort
          </p>
        </div>
      </div>
    </main>
  );
}
