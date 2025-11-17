"use client";

import { useState, useEffect } from "react";

interface DelayedCTAProps {
  delay?: number; // delay in milliseconds, default 5 minutes
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function DelayedCTA({
  delay = 300000, // 5 minutes default
  href = "/application",
  className = "",
  children
}: DelayedCTAProps) {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showCTA) {
    return null;
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}