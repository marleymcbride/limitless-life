// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Limitless Life',
  description: 'Build the body, energy, and life you want',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full min-h-screen">
        {children}
      </body>
    </html>
  );
}