// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Limitless Life | The Lifestyle Health Programme",
  description:
    "The 12-week system that has helped hundreds of high-performing men break free from burnout and build unstoppable energy without sacrificing success",
  openGraph: {
    title: "Limitless Life | The Lifestyle Health Programme",
    description:
      "The 12-week system that has helped hundreds of high-performing men break free from burnout and build unstoppable energy without sacrificing success",
    url: "https://limitless-life.co",
    siteName: "Limitless Life",
    images: [
      {
        url: "https://limitless-life.co/images/THE LIFESTYLE ATHLETE PREVIEW CARD-hd.png",
        width: 1200,
        height: 630,
        alt: "Limitless Life - The Lifestyle Athlete",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitless Life | The Lifestyle Health Programme",
    description:
      "The 12-week system that has helped hundreds of high-performing men break free from burnout and build unstoppable energy without sacrificing success",
    images: ["https://limitless-life.co/images/THE LIFESTYLE ATHLETE PREVIEW CARD-hd.png"],
  },
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
  viewportFit: "cover",
};

export const themeColor = "#000000";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: '#0B151B' }}>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicons.ico" />
        <link rel="apple-touch-icon" href="/favicons.ico" />
      </head>
      <body style={{ backgroundColor: '#0B151B', margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
