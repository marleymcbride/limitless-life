import React from 'react';

interface VariantArticleProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export function VariantArticle({ children, backgroundColor = '#000000' }: VariantArticleProps) {
  return (
    <div style={{ backgroundColor }}>
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
