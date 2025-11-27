"use client";

import { useState } from "react";
import VSLPlayer from "@/components/vsl-player";
import { VideoQuality } from "@/types/vsl.types";

export default function TestPage() {
  const [currentQuality, setCurrentQuality] = useState<VideoQuality>('auto');
  const [qualityChanges, setQualityChanges] = useState<string[]>([]);

  const handleQualityChange = (quality: VideoQuality) => {
    setCurrentQuality(quality);
    setQualityChanges(prev => [...prev, `Changed to: ${quality} at ${new Date().toLocaleTimeString()}`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Video Quality Selector Test</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Quality: {currentQuality}</h2>

          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-medium">Quality Changes Log:</h3>
            {qualityChanges.length === 0 ? (
              <p className="text-gray-400">No quality changes yet</p>
            ) : (
              qualityChanges.map((change, index) => (
                <div key={index} className="text-sm text-gray-300">
                  {index + 1}. {change}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">VSL Player with Quality Selector</h2>
          <VSLPlayer
            libraryId="your-library-id" // Replace with actual library ID
            videoId="your-video-id"     // Replace with actual video ID
            onQualityChange={handleQualityChange}
            showQualitySelector={true}
            availableQualities={["auto", "1080p", "720p", "480p"]}
            autoplay={false}
            muted={false}
            className="w-full"
          />
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Replace the libraryId and videoId with actual values</li>
            <li>Play the video</li>
            <li>Click the quality selector button (next to progress bar)</li>
            <li>Select different quality options</li>
            <li>Verify that quality changes are logged above</li>
            <li>Check that video playback continues smoothly</li>
          </ol>
        </div>
      </div>
    </div>
  );
}