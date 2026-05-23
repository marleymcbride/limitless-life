'use client';

import React, { useState, useEffect, useRef } from 'react';
import { betaUnifiedGradientWithSpotlightDesktopNoBottomRed, betaUnifiedGradientWithSpotlightMobileNoBottomRed, vignetteEffect } from '@/lib/utils';

interface ATFBackgroundWrapperProps {
  children?: React.ReactNode;
  height?: string;
  fadeChildrenOnScroll?: boolean;
  className?: string;
}

export default function ATFBackgroundWrapper({
  children,
  height = 'min-h-[100vh]',
  fadeChildrenOnScroll = true,
  className = '',
}: ATFBackgroundWrapperProps) {
  const [childOpacity, setChildOpacity] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fadeChildrenOnScroll) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Fade out as user scrolls down through section
      // Start fading when section reaches top of viewport
      // Fully fade out when scrolled past 50% of section
      const fadeStart = sectionHeight * 0.3;
      const fadeEnd = sectionHeight * 0.7;

      if (sectionTop < fadeStart) {
        const fadeProgress = (fadeStart - sectionTop) / (fadeStart - fadeEnd);
        setChildOpacity(Math.max(0, 1 - fadeProgress));
      } else {
        setChildOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fadeChildrenOnScroll]);

  return (
    <section
      ref={sectionRef}
      className={`pt-2 md:pt-6 pb-16 px-4 ${height} sm:pb-16 flex flex-col relative w-full overflow-hidden bg-black ${className}`}
    >
      {/* Background Layers - Exact Match to ATF (No Bottom Red) */}
      <div className="hidden md:block">{betaUnifiedGradientWithSpotlightDesktopNoBottomRed}</div>
      <div className="block md:hidden">{betaUnifiedGradientWithSpotlightMobileNoBottomRed}</div>
      <div className="hero-grain-overlay"></div>
      <div className="hero-darkening-overlay"></div>
      {vignetteEffect}

      {/* Content Container - Fades on scroll if enabled */}
      <div
        className="flex relative z-30 flex-col mx-auto h-full transition-opacity duration-300"
        style={{
          opacity: childOpacity,
        }}
      >
        {children}
      </div>
    </section>
  );
}
