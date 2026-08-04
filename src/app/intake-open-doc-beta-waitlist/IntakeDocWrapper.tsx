"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the content component with SSR disabled
const IntakeDocContent = dynamic(() => import('./content'), {
  ssr: false,
  loading: () => null
});

export default function IntakeDocWrapper({ children = null, live = true }: { children?: React.ReactNode; live?: boolean }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <IntakeDocContent live={live} />
      </Suspense>
    </>
  );
}
