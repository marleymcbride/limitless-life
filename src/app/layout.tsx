// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '../components/theme-provider';

export const metadata = {
  title: 'Limitless Life | Transform Your Energy, Body & Mind',
  description: 'The 12-week system that has helped hundreds of high-performing men break free from burnout and build unstoppable energy without sacrificing success',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}