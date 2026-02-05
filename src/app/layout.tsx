// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Limitless Life | The Lifestyle Health Programme",
  description:
    "The 12-week system that has helped hundreds of high-performing men break free from burnout and build unstoppable energy without sacrificing success",
  themeColor: "#000000",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#000000",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const themeColor = "#000000";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicons.ico" />
        <link rel="apple-touch-icon" href="/favicons.ico" />
        {/* Preload critical image directories */}
        <link rel="dns-prefetch" href="//localhost:3000" />
        <link rel="preconnect" href="//localhost:3000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
