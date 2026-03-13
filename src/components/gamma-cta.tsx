import React from 'react';

interface GammaCTAProps {
  href: string;
  children: React.ReactNode;
}

export function GammaCTA({ href, children }: GammaCTAProps) {
  return (
    <a
      href={href}
      className="text-blue-600 font-bold underline hover:text-blue-700 inline-block"
    >
      {children}
    </a>
  );
}
