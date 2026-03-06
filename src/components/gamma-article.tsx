import React from 'react';

interface GammaArticleProps {
  children: React.ReactNode;
}

export function GammaArticle({ children }: GammaArticleProps) {
  return (
    <article className="max-w-3xl mx-auto bg-white px-8 py-16 md:px-16">
      {children}
    </article>
  );
}
