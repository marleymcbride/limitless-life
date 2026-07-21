"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const IntakeDocContent = dynamic(() => import('./content'), {
  ssr: false,
  loading: () => null
});

export default function IntakeDocWrapper({ children = null, name = '', email = '' }: { children?: React.ReactNode; name?: string; email?: string }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <IntakeDocContent name={name} email={email} />
      </Suspense>
    </>
  );
}
