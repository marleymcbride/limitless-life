import React from 'react';

interface GammaHeaderProps {
  authorName: string;
  authorAvatar?: string;
  lastUpdated: string;
  className?: string;
}

export function GammaHeader({ authorName, authorAvatar, lastUpdated, className }: GammaHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row lg:flex-row items-center justify-center gap-2 md:gap-4 lg:gap-4 -mt-6 mb-8 ${className || ''}`}>
      {authorAvatar && (
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-11 h-11 rounded-full object-cover mt-0 md:mt-0 lg:mt-0"
        />
      )}
      <div className="flex items-center gap-2" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        <div className="text-base font-bold md:font-normal lg:font-normal" style={{ color: '#E1E5E8' }}>{authorName}</div>
        <div style={{ color: '#E1E5E8' }} className="text-base">
          · Last updated <time>{lastUpdated}</time>
        </div>
      </div>
    </div>
  );
}
