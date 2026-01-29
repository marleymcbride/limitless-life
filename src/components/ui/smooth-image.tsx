"use client";

import React, { useState, useRef, useEffect } from "react";
import { SMOOTH_IMAGE_CONFIG } from "@/config/smooth-image.config";

interface SmoothImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Enable preloading for above-fold images
  quality?: number;
  fill?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  unoptimized?: boolean;
}

export default function SmoothImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  fill = false,
  sizes,
  style,
  unoptimized = false,
}: SmoothImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Start in view if priority
  const [shouldFadeIn, setShouldFadeIn] = useState(priority); // Controls when to start fade-in
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    // Don't observe if already in view
    if (isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Start the delayed fade-in
          setTimeout(() => {
            setShouldFadeIn(true);
          }, SMOOTH_IMAGE_CONFIG.fadeInDelay);
          observer.disconnect();
        }
      },
      {
        rootMargin: SMOOTH_IMAGE_CONFIG.rootMargin,
        threshold: SMOOTH_IMAGE_CONFIG.intersectionThreshold,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={style}>
      {/* Blur placeholder that stays visible during fade-in */}
      <div
        className={`absolute inset-0 bg-zinc-200 dark:bg-zinc-700 transition-opacity ease-out ${
          shouldFadeIn && !isLoading ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: `${SMOOTH_IMAGE_CONFIG.animationDuration}ms` }}
      />

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-200 dark:bg-zinc-700">
          <svg
            className="w-8 h-8 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : isInView ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-all ease-out ${
            shouldFadeIn && !isLoading ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm"
          }`}
          style={{
            ...style,
            transitionDuration: `${SMOOTH_IMAGE_CONFIG.animationDuration}ms`
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      ) : null}
    </div>
  );
}
