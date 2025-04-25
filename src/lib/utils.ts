import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
}

// Visual elements for black/red gradient sections (Hero style for hero and marketing sections)
export const blackRedGradientOverlay = React.createElement("div", {
  className: "absolute inset-0",
  style: {
    background: 'linear-gradient(to top, rgba(100, 0, 0, 0.5) 0%, rgba(60, 0, 0, 0.3) 25%, rgba(30, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.9) 75%, rgb(0, 0, 0) 100%)'
  }
})

// Inverted hero gradient (mostly black with red accents) for program sections
export const invertedGradientOverlay = React.createElement("div", {
  className: "absolute inset-0",
  style: {
    background: 'linear-gradient(to bottom, rgba(100, 0, 0, 0.3) 0%, rgba(60, 0, 0, 0.2) 20%, rgba(0, 0, 0, 0.9) 40%, rgb(0, 0, 0) 70%)'
  }
})

// Hero red accent for bottom of gradient sections
export const redAccentBottom = React.createElement("div", {
  className: "absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#940909] via-[#940909]/20 to-transparent opacity-60"
})

// Stronger red accent for black background sections
export const strongRedAccent = React.createElement("div", {
  className: "absolute bottom-0 left-0 w-full h-[70vh] bg-gradient-to-t from-[#940909] via-[#940909]/30 to-transparent opacity-70"
})

export const vignetteEffect = React.createElement("div", {
  className: "absolute inset-0 pointer-events-none",
  style: {
    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)',
    mixBlendMode: 'multiply'
  }
})

// Masculine pattern overlay for visual interest
export const masculinePattern = React.createElement("div", {
  className: "absolute inset-0 opacity-10",
  style: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: "60px 60px"
  }
})

// Power divider component for section transitions
export const PowerDivider = () => {
  return React.createElement("div", {
    className: "relative h-16 w-full overflow-hidden my-6"
  }, [
    React.createElement("div", {
      className: "absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#940909] to-transparent top-1/2 transform -translate-y-1/2",
      key: "line"
    }),
    React.createElement("div", {
      className: "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#940909] p-1 rounded-full",
      key: "outer-circle"
    }, [
      React.createElement("div", {
        className: "h-4 w-4 bg-[#940909] rounded-full border-2 border-white",
        key: "inner-circle"
      })
    ])
  ])
}
