"use client";

import { useState, useRef, useEffect } from "react";
import { VideoQuality, VideoQualityOption } from "@/types/vsl.types";

interface VideoQualitySelectorProps {
  currentQuality: VideoQuality;
  onQualityChange: (quality: VideoQuality) => void;
  availableQualities?: VideoQuality[];
  className?: string;
}

const DEFAULT_QUALITIES: VideoQualityOption[] = [
  { label: "Auto", value: "auto", description: "Automatically select best quality" },
  { label: "1080p", value: "1080p", description: "Full HD - Best quality" },
  { label: "720p", value: "720p", description: "HD - Good quality" },
  { label: "480p", value: "480p", description: "SD - Saves data" }
];

export default function VideoQualitySelector({
  currentQuality,
  onQualityChange,
  availableQualities = ["auto", "1080p", "720p", "480p"],
  className = ""
}: VideoQualitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter qualities based on availability
  const qualityOptions = DEFAULT_QUALITIES.filter(option =>
    availableQualities.includes(option.value)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQualitySelect = (quality: VideoQuality) => {
    onQualityChange(quality);
    setIsOpen(false);
  };

  const getCurrentLabel = () => {
    const option = qualityOptions.find(opt => opt.value === currentQuality);
    return option?.label || "Auto";
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white bg-black/50 hover:bg-black/70 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium border border-white/20"
        aria-label="Select video quality"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
        <span>{getCurrentLabel()}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 min-w-[160px]">
          <div className="py-1" role="menu">
            {qualityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleQualitySelect(option.value)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors flex flex-col ${
                  currentQuality === option.value
                    ? "bg-red-600 text-white"
                    : "text-gray-200 hover:bg-white/10 hover:text-white"
                }`}
                role="menuitem"
                aria-current={currentQuality === option.value}
              >
                <span className="font-medium">{option.label}</span>
                {option.description && (
                  <span className="text-xs opacity-75 mt-0.5">
                    {option.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}