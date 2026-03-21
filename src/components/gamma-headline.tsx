import React from 'react';

interface GammaHeadlineProps {
  children: React.ReactNode;
  className?: string;
}

export function GammaHeadline({ children, className }: GammaHeadlineProps) {
  return (
    <h1 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-100 ${className || ''}`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      {children}
    </h1>
  );
}
