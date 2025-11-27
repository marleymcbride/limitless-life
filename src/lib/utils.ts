import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Background class utilities for consistent styling
export const bgClasses = {
  // Main black with red accent gradient for marketing sections
  blackRedGradient: "bg-black relative overflow-hidden",

  // Hero-style gradient for "dark red" sections
  darkRedGradient: "bg-black relative overflow-hidden",

  // White background for testimonials and longer content
  white: "bg-white text-black relative",

  // Black background for strong contrast sections
  black: "bg-black text-white relative overflow-hidden",
};

// Hero spotlight component - recreated from CSS for proper layering
export const heroSpotlight = React.createElement("div", {
  className: "absolute z-5",
  style: {
    top: "-42%",
    right: "-36%",
    width: "1050px",
    height: "1050px",
    background: "radial-gradient(circle at center, rgba(148, 9, 9, 0.76) 0%, rgba(148, 9, 9, 0.27) 32%, transparent 65%)",
    filter: "blur(50px)",
    pointerEvents: "none",
    borderRadius: "50%",
  },
});

// Desktop background with top-right spotlight
export const unifiedGradientWithSpotlightDesktop = React.createElement("div", {
  className: "absolute inset-0 z-10",
  style: {
    background: `
      radial-gradient(circle at 99% 4%,
        rgba(148, 9, 9, 0.63) 0%,
        rgba(148, 9, 9, 0.567) 2%,
        rgba(148, 9, 9, 0.504) 3%,
        rgba(148, 9, 9, 0.45675) 4%,
        rgba(148, 9, 9, 0.42525) 5%,
        rgba(148, 9, 9, 0.39375) 6%,
        rgba(148, 9, 9, 0.36225) 7%,
        rgba(148, 9, 9, 0.33075) 8%,
        rgba(148, 9, 9, 0.315) 9%,
        rgba(148, 9, 9, 0.29925) 10%,
        rgba(148, 9, 9, 0.2835) 11%,
        rgba(148, 9, 9, 0.26775) 12%,
        rgba(148, 9, 9, 0.252) 13%,
        rgba(148, 9, 9, 0.23625) 14%,
        rgba(148, 9, 9, 0.2205) 15%,
        rgba(148, 9, 9, 0.20475) 16%,
        rgba(148, 9, 9, 0.189) 17%,
        rgba(148, 9, 9, 0.17325) 18%,
        rgba(148, 9, 9, 0.1575) 19%,
        rgba(148, 9, 9, 0.149625) 20%,
        rgba(148, 9, 9, 0.14175) 21%,
        rgba(148, 9, 9, 0.133875) 22%,
        rgba(148, 9, 9, 0.126) 23%,
        rgba(148, 9, 9, 0.118125) 24%,
        rgba(148, 9, 9, 0.11025) 25%,
        rgba(148, 9, 9, 0.102375) 26%,
        rgba(148, 9, 9, 0.0945) 27%,
        rgba(148, 9, 9, 0.086625) 28%,
        rgba(148, 9, 9, 0.07875) 29%,
        rgba(148, 9, 9, 0.070875) 30%,
        rgba(148, 9, 9, 0.063) 31%,
        rgba(148, 9, 9, 0.055125) 32%,
        rgba(148, 9, 9, 0.04725) 33%,
        rgba(148, 9, 9, 0.039375) 34%,
        rgba(148, 9, 9, 0.0315) 35%,
        rgba(148, 9, 9, 0.02835) 36%,
        rgba(148, 9, 9, 0.0252) 37%,
        rgba(148, 9, 9, 0.02205) 38%,
        rgba(148, 9, 9, 0.0189) 39%,
        rgba(148, 9, 9, 0.01575) 40%,
        rgba(148, 9, 9, 0.0126) 41%,
        rgba(148, 9, 9, 0.00945) 42%,
        rgba(148, 9, 9, 0.0063) 43%,
        rgba(148, 9, 9, 0.00315) 44%,
        rgba(148, 9, 9, 0.001575) 45%,
        rgba(148, 9, 9, 0.00126) 46%,
        rgba(148, 9, 9, 0.000945) 47%,
        rgba(148, 9, 9, 0.00063) 48%,
        rgba(148, 9, 9, 0.000315) 49%,
        rgba(148, 9, 9, 0.0001575) 50%,
        rgba(148, 9, 9, 0.00007875) 51%,
        rgba(148, 9, 9, 0.0000315) 52%,
        rgba(148, 9, 9, 0.00001575) 53%,
        transparent 55%),
      linear-gradient(to bottom, transparent 0%, transparent 30%, rgb(0, 0, 0) 30%, rgb(28, 28, 28) 72%, rgba(148, 9, 9, 0.5) 85%, rgba(148, 9, 9, 0.864) 100%)
    `,
  },
});

// Mobile background with concentrated top-right spotlight
export const unifiedGradientWithSpotlightMobile = React.createElement("div", {
  className: "absolute inset-0 z-10",
  style: {
    background: `
      radial-gradient(circle at 99% 2%,
        rgba(148, 9, 9, 0.756) 0%,
        rgba(148, 9, 9, 0.66) 2%,
        rgba(148, 9, 9, 0.564) 4%,
        rgba(148, 9, 9, 0.468) 6%,
        rgba(148, 9, 9, 0.384) 8%,
        rgba(148, 9, 9, 0.336) 10%,
        rgba(148, 9, 9, 0.288) 12%,
        rgba(148, 9, 9, 0.24) 14%,
        rgba(148, 9, 9, 0.192) 16%,
        rgba(148, 9, 9, 0.156) 18%,
        rgba(148, 9, 9, 0.12) 20%,
        rgba(148, 9, 9, 0.096) 22%,
        rgba(148, 9, 9, 0.072) 24%,
        rgba(148, 9, 9, 0.054) 26%,
        rgba(148, 9, 9, 0.036) 28%,
        rgba(148, 9, 9, 0.024) 30%,
        rgba(148, 9, 9, 0.018) 32%,
        rgba(148, 9, 9, 0.012) 34%,
        rgba(148, 9, 9, 0.0096) 36%,
        rgba(148, 9, 9, 0.0072) 38%,
        rgba(148, 9, 9, 0.0048) 40%,
        rgba(148, 9, 9, 0.0024) 42%,
        rgba(148, 9, 9, 0.0012) 44%,
        rgba(148, 9, 9, 0.0006) 46%,
        transparent 50%),
      linear-gradient(to bottom, transparent 0%, transparent 30%, rgb(0, 0, 0) 30%, rgb(28, 28, 28) 63%, rgba(148, 9, 9, 0.864) 91%)
    `,
  },
});

// Legacy unified gradient (kept for backward compatibility)
export const unifiedGradientWithSpotlight = unifiedGradientWithSpotlightDesktop;


// Unified hero gradient: starts at 30% to work in parallel with original overlay (BACKUP)
export const unifiedHeroGradient = React.createElement("div", {
  className: "absolute inset-0 z-10",
  style: {
    background: "linear-gradient(to bottom, transparent 0%, transparent 30%, rgb(0, 0, 0) 30%, rgb(8, 8, 8) 65%, #0F0F0F 80%, rgba(148, 9, 9, 0.30) 100%)",
  },
});


// Inverted hero gradient (mostly black with red accents) for program sections
export const invertedGradientOverlay = React.createElement("div", {
  className: "absolute inset-0",
  style: {
    background:
      "linear-gradient(to bottom, rgba(100, 0, 0, 0.05) 0%, rgba(60, 0, 0, 0.03) 20%, rgba(0, 0, 0, 0.9) 40%, rgb(0, 0, 0) 70%)",
  },
});

// Hero red accent for bottom of hero section (10% red tint)
export const redAccentBottom = React.createElement("div", {
  className:
    "absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#940909]/10 to-transparent opacity-60",
});

// Stronger red accent for black background sections
export const strongRedAccent = React.createElement("div", {
  className:
    "absolute bottom-0 left-0 w-full h-[70vh] bg-gradient-to-t from-[#940909] via-[#940909]/30 to-transparent opacity-70",
});

export const vignetteEffect = React.createElement("div", {
  className: "absolute inset-0 pointer-events-none",
  style: {
    background:
      "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.3) 100%)",
    mixBlendMode: "multiply",
  },
});

// Masculine pattern overlay for visual interest
export const masculinePattern = React.createElement("div", {
  className: "absolute inset-0 opacity-10",
  style: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: "60px 60px",
  },
});

// Subtle black gradient background layer for hero section depth
export const subtleBlackBackground = React.createElement("div", {
  className: "absolute inset-0 z-10",
  style: {
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(8, 8, 8, 1) 60%, rgba(15, 15, 15, 0.7) 80%, rgba(15, 15, 15, 0.3) 100%)",
  },
});

// Power divider component for section transitions
export const PowerDivider = () => {
  return React.createElement(
    "div",
    {
      className: "relative h-16 w-full overflow-hidden my-6",
    },
    [
      React.createElement("div", {
        className:
          "absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#940909] to-transparent top-1/2 transform -translate-y-1/2",
        key: "line",
      }),
      React.createElement(
        "div",
        {
          className:
            "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#940909] p-1 rounded-full",
          key: "outer-circle",
        },
        [
          React.createElement("div", {
            className:
              "h-4 w-4 bg-[#940909] rounded-full border-2 border-white",
            key: "inner-circle",
          }),
        ]
      ),
    ]
  );
};

// Missing exports that are causing compilation errors
export const colorStrategy = {
  getPrimaryColor: () => '#940909',
  getSecondaryColor: () => '#000000',
  getAccentColor: () => '#ffffff',
  // Additional properties expected by components
  redCTA: '#940909',
  whiteSections: '#ffffff',
  blackSections: '#000000',
  whiteAccent: '#ffffff',
  neanderthal: '#333333',
  nerd: '#666666',
};

export const buyerTypeUtils = {
  isHighTicket: (price: number) => price >= 1000,
  isMidTicket: (price: number) => price >= 500 && price < 1000,
  isLowTicket: (price: number) => price < 500,
  // Additional properties expected by components
  redCTA: '#940909',
  whiteSections: '#ffffff',
  blackSections: '#000000',
  whiteAccent: '#ffffff',
  neanderthal: '#333333',
  nerd: '#666666',
};

export const blackRedGradientOverlay = React.createElement("div", {
  className: "absolute inset-0 z-10",
  style: {
    background: "linear-gradient(135deg, rgba(148, 9, 9, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)",
  },
});
