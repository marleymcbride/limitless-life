import React from 'react';

export function GammaParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg md:text-xl mb-6 text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
      {children}
    </p>
  );
}

export function GammaList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc list-inside mb-6 text-lg md:text-xl space-y-2 text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      {children}
    </ul>
  );
}

export function GammaBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-teal-400 pl-6 my-8 py-4">
      <p className="text-lg md:text-xl text-gray-900 space-y-2" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', whiteSpace: 'pre-line' }}>
        {children}
      </p>
    </blockquote>
  );
}

export function GammaSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      {children}
    </h2>
  );
}
