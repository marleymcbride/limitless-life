import React from 'react';

interface GammaArticleProps {
  children: React.ReactNode;
}

export function GammaArticle({ children }: GammaArticleProps) {
  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#0B151B' }}>
      <article className="mx-auto rounded-lg shadow-2xl" style={{ backgroundColor: '#1B2930', maxWidth: '1100px' }}>
        <div className="py-16 min-h-[150vh]" style={{ paddingLeft: 'calc(3rem + 90px)', paddingRight: 'calc(3rem + 90px)' }}>
          {children}
        </div>
      </article>
    </div>
  );
}
