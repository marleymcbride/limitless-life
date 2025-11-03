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
        rgba(148, 9, 9, 0.28) 0%,
        rgba(148, 9, 9, 0.252) 2%,
        rgba(148, 9, 9, 0.224) 3%,
        rgba(148, 9, 9, 0.203) 4%,
        rgba(148, 9, 9, 0.189) 5%,
        rgba(148, 9, 9, 0.175) 6%,
        rgba(148, 9, 9, 0.161) 7%,
        rgba(148, 9, 9, 0.147) 8%,
        rgba(148, 9, 9, 0.14) 9%,
        rgba(148, 9, 9, 0.133) 10%,
        rgba(148, 9, 9, 0.126) 11%,
        rgba(148, 9, 9, 0.119) 12%,
        rgba(148, 9, 9, 0.112) 13%,
        rgba(148, 9, 9, 0.105) 14%,
        rgba(148, 9, 9, 0.098) 15%,
        rgba(148, 9, 9, 0.091) 16%,
        rgba(148, 9, 9, 0.084) 17%,
        rgba(148, 9, 9, 0.077) 18%,
        rgba(148, 9, 9, 0.07) 19%,
        rgba(148, 9, 9, 0.0665) 20%,
        rgba(148, 9, 9, 0.063) 21%,
        rgba(148, 9, 9, 0.0595) 22%,
        rgba(148, 9, 9, 0.056) 23%,
        rgba(148, 9, 9, 0.0525) 24%,
        rgba(148, 9, 9, 0.049) 25%,
        rgba(148, 9, 9, 0.0455) 26%,
        rgba(148, 9, 9, 0.042) 27%,
        rgba(148, 9, 9, 0.0385) 28%,
        rgba(148, 9, 9, 0.035) 29%,
        rgba(148, 9, 9, 0.0315) 30%,
        rgba(148, 9, 9, 0.028) 31%,
        rgba(148, 9, 9, 0.0245) 32%,
        rgba(148, 9, 9, 0.021) 33%,
        rgba(148, 9, 9, 0.0175) 34%,
        rgba(148, 9, 9, 0.014) 35%,
        rgba(148, 9, 9, 0.0126) 36%,
        rgba(148, 9, 9, 0.0112) 37%,
        rgba(148, 9, 9, 0.0098) 38%,
        rgba(148, 9, 9, 0.0084) 39%,
        rgba(148, 9, 9, 0.007) 40%,
        rgba(148, 9, 9, 0.0056) 41%,
        rgba(148, 9, 9, 0.0042) 42%,
        rgba(148, 9, 9, 0.0028) 43%,
        rgba(148, 9, 9, 0.0014) 44%,
        rgba(148, 9, 9, 0.0007) 45%,
        rgba(148, 9, 9, 0.00056) 46%,
        rgba(148, 9, 9, 0.00042) 47%,
        rgba(148, 9, 9, 0.00028) 48%,
        rgba(148, 9, 9, 0.00014) 49%,
        rgba(148, 9, 9, 0.00007) 50%,
        rgba(148, 9, 9, 0.000035) 51%,
        rgba(148, 9, 9, 0.000014) 52%,
        rgba(148, 9, 9, 0.000007) 53%,
        transparent 55%),
      linear-gradient(to bottom, transparent 0%, transparent 30%, rgb(0, 0, 0) 30%, rgb(4, 4, 4) 65%, #080808 70%, rgba(148, 9, 9, 0.60) 100%)
    `,
  },
});

// Mobile background without spotlight (just gradient)
export const unifiedGradientWithSpotlightMobile = React.createElement("div", {
  className: "absolute inset-0 z-10",
  style: {
    background: "linear-gradient(to bottom, transparent 0%, transparent 30%, rgb(0, 0, 0) 30%, rgb(4, 4, 4) 65%, #080808 70%, rgba(148, 9, 9, 0.40) 100%)",
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
