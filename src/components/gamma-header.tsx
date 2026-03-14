import React from 'react';

interface GammaHeaderProps {
  authorName: string;
  authorAvatar?: string;
  lastUpdated: string;
}

export function GammaHeader({ authorName, authorAvatar, lastUpdated }: GammaHeaderProps) {
  return (
    <div className="flex items-center justify-center gap-4 -mt-6 mb-8">
      {authorAvatar && (
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-11 h-11 rounded-full object-cover"
        />
      )}
      <div className="flex items-center gap-2" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        <div className="text-base" style={{ color: '#374151' }}>{authorName}</div>
        <div style={{ color: '#374151' }} className="text-base">
          · Last updated <time>{lastUpdated}</time>
        </div>
      </div>
    </div>
  );
}
