import React from 'react';

interface GammaHeadlineProps {
  children: React.ReactNode;
}

export function GammaHeadline({ children }: GammaHeadlineProps) {
  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
      {children}
    </h1>
  );
}
