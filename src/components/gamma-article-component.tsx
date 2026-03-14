import React from 'react';

interface GammaArticleProps {
  children: React.ReactNode;
}

export function GammaArticle({ children }: GammaArticleProps) {
  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#FFFFFF' }}>
      <article className="mx-auto" style={{ maxWidth: '1100px' }}>
        <div className="py-16" style={{ paddingLeft: 'calc(3rem + 90px)', paddingRight: 'calc(3rem + 90px)' }}>
          {children}
        </div>
      </article>
    </div>
  );
}
