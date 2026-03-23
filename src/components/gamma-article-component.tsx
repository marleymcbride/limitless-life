import React from 'react';

interface GammaArticleProps {
  children: React.ReactNode;
}

export function GammaArticle({ children }: GammaArticleProps) {
  return (
    <div style={{ backgroundColor: '#050A0F' }}>
      <div className="py-6 md:py-12 lg:py-12 px-4 ">
        <article className="mx-auto shadow-2xl rounded-lg" style={{ maxWidth: '1100px', backgroundColor: '#0B151B' }}>
          <div className="py-8 md:py-16 lg:py-16 pl-2 pr-4 sm:px-6 md:px-8 lg:pl-[calc(3rem+90px)] lg:pr-[calc(3rem+90px)]">
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
