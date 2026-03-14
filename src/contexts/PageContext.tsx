'use client';

import { createContext, useContext } from 'react';

type PageType = 'main' | 'waitlist';

interface PageContextType {
  pageType: PageType;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children, pageType }: { children: React.ReactNode; pageType: PageType }) {
  return (
    <PageContext.Provider value={{ pageType }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageType() {
  const context = useContext(PageContext);
  if (!context) {
    return { pageType: 'main' as PageType }; // Default to main
  }
  return context;
}
