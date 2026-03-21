import React from 'react';

interface GammaArticleProps {
  children: React.ReactNode;
}

export function GammaArticle({ children }: GammaArticleProps) {
  return (
    <div style={{ backgroundColor: '#0B151B' }}>
      <div className="py-12 px-4 ">
        <article className="mx-auto shadow-2xl rounded-lg" style={{ maxWidth: '1100px', backgroundColor: '# 1B2930' }}>
          <div className="py-16" style={{ paddingLeft: 'calc(3rem + 90px)', paddingRight: 'calc(3rem + 90px)' }}>
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
