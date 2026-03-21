import React from 'react';

interface VariantArticleProps {
  children: React.ReactNode;
}

export function VariantArticle({ children }: VariantArticleProps) {
  return (
    <div style={{ backgroundColor: '#0B151B' }}>
      <div className="py-12 px-4">
        <article className="mx-auto" style={{ maxWidth: '1100px' }}>
          <div className="py-16">
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
