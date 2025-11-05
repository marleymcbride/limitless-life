"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import ApplyNowButton from "./apply-now-button";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down at least 50% of the page height
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollThreshold = (pageHeight - viewportHeight) * 0.5;

      // Only show after significant scrolling (at least 3000px or 50% of page, whichever is greater)
      setIsVisible(window.scrollY > Math.max(3000, scrollThreshold));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/90 backdrop-blur-sm border-t border-[#940909]/60 py-3 px-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="hidden md:block">
          <p className="text-white font-bold">Natural Energy System</p>
          <p className="text-white/70 text-sm">
            Transform your energy in 12 weeks
          </p>
        </div>

        <div className="flex gap-4 items-center ml-auto">
          <button
            onClick={scrollToTop}
            className="p-2 bg-[#940909]/20 rounded-full"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </button>

          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-2 px-6 text-base rounded-md inline-block"
          >
            JOIN NOW
          </a>
        </div>
      </div>
    </div>
  );
}
