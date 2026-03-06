import React from 'react';

interface GammaHeaderProps {
  authorName: string;
  authorAvatar?: string;
  lastUpdated: string;
}

export function GammaHeader({ authorName, authorAvatar, lastUpdated }: GammaHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-12">
      {authorAvatar && (
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-16 h-16 rounded-full object-cover"
        />
      )}
      <div>
        <div className="font-semibold text-lg">{authorName}</div>
        <div className="text-gray-600 text-sm">
          · Last updated <time>{lastUpdated}</time>
        </div>
      </div>
    </div>
  );
}
