import React from 'react';

export function GammaParagraph({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-xl md:text-xl lg:text-xl mb-8 md:mb-6 lg:mb-6 text-gray-100 ${className || ''}`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
      {children}
    </div>
  );
}

export function GammaList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={`list-disc list-inside mb-6 text-lg md:text-xl space-y-2 text-gray-100 ${className || ''}`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      {children}
    </ul>
  );
}

export function GammaOrderedList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ol className={`list-decimal list-inside mb-6 text-xl md:text-xl space-y-4 text-gray-100 ${className || ''}`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      {children}
    </ol>
  );
}

export function GammaBlockquote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <blockquote className={`border-l-2 border-teal-400 pl-6 my-8 py-4 ${className || ''}`}>
      <div className="text-lg md:text-xl text-gray-100 space-y-2" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', whiteSpace: 'pre-line' }}>
        {children}
      </div>
    </blockquote>
  );
}

export function GammaSectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-2xl md:text-3xl font-bold mt-10 mb-6 text-gray-100 text-center ${className || ''}`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      {children}
    </h2>
  );
}

export function GammaMiniHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-2.5xl -mr-4 md:text-2xl lg:text-2xl font-bold text-gray-100 block md:inline lg:inline ${className || ''}`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      {children}
    </span>
  );
}

export function GammaDivider({ className }: { className?: string }) {
  return (
    <div className={`w-[60%] mx-auto border-t border-gray-600 my-8 ${className || ''}`} />
  );
}
