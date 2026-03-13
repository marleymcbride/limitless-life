import React from 'react';

interface GammaCTAProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function GammaCTA({ href, children, onClick }: GammaCTAProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-blue-600 font-bold underline hover:text-blue-700 inline-block"
    >
      {children}
    </a>
  );
}
