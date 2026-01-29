"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SMOOTH_IMAGE_CONFIG } from "@/config/smooth-image.config";

interface SmoothImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
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
  const [isInView, setIsInView] = useState(priority);
  const [shouldFadeIn, setShouldFadeIn] = useState(priority);
  const observerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<any>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      setShouldFadeIn(true);
      return;
    }

    if (isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
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

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const opacity = shouldFadeIn && !isLoading ? '1' : '0';
  const transform = shouldFadeIn && !isLoading ? 'scale(1)' : 'scale(1.05)';
  const filter = shouldFadeIn && !isLoading ? 'blur(0px)' : 'blur(4px)';

  const imageStyle = {
    ...style,
    opacity,
    transform,
    filter,
    transition: `all ${SMOOTH_IMAGE_CONFIG.animationDuration}ms ease-out`,
  };

  if (!isInView) {
    return (
      <div
        ref={observerRef}
        className={`bg-zinc-200 dark:bg-zinc-700 ${className}`}
        style={style}
        aria-hidden="true"
      />
    );
  }

  return (
    <div ref={observerRef} className="relative">
      {error ? (
        <div className={`bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center ${className}`} style={style}>
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
      ) : (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          sizes={sizes}
          priority={priority}
          quality={quality}
          unoptimized={unoptimized}
          className={className}
          style={imageStyle}
          onLoad={() => {
            setIsLoading(false);
          }}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
}
