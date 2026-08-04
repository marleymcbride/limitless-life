"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const IntakeDocContent = dynamic(() => import('./content'), {
  ssr: false,
  loading: () => null
});

export default function IntakeDocWrapper({ children = null, name = '', email = '', live = true }: { children?: React.ReactNode; name?: string; email?: string; live?: boolean }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <IntakeDocContent name={name} email={email} live={live} />
      </Suspense>
    </>
  );
}
