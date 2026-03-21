import React from 'react';

interface GammaCTAProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export function GammaCTA({ href, children, onClick, className }: GammaCTAProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-blue-400 font-bold underline hover:text-blue-300 inline-block ${className || ''}`}
    >
      {children}
    </a>
  );
}
