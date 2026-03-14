import React from 'react';

interface GammaHeadlineProps {
  children: React.ReactNode;
}

export function GammaHeadline({ children }: GammaHeadlineProps) {
  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      {children}
    </h1>
  );
}
