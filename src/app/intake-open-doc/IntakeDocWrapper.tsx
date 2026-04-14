"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the content component with SSR disabled
const IntakeDocContent = dynamic(() => import('./content'), {
  ssr: false,
  loading: () => null
});

export default function IntakeDocWrapper({ children = null }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <IntakeDocContent />
      </Suspense>
    </>
  );
}
