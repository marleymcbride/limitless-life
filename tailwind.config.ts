import { type Config, type PluginUtils } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom brand colors
        'dark-red': '#940909',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Clean serif typography for conversion focus
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Enhanced line-height options for better typography control
      lineHeight: {
        'tightest': '0.9',
        'tighter': '1.0',
        'tight': '1.1',
        'snug': '1.25',
        'normal': '1.5',
        'relaxed': '1.75',
        'loose': '2.0',
        // Extra granular options for precise control
        '1.05': '1.05',
        '1.15': '1.15',
        '1.25': '1.25',
        '1.35': '1.35',
        '1.45': '1.45',
        '1.55': '1.55',
        '1.65': '1.65',
        '1.75': '1.75',
        '1.8': '1.8',
        '1.9': '1.9',
        // Global H1 line-height
        'h1': '1.4', // Global default for all H1 elements
      },
      // All animations removed for clean, conversion-focused design
      animation: {},
      keyframes: {},
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: PluginUtils['addUtilities'] }) {
      const newUtilities = {
        'h1': {
          lineHeight: '1.4 !important',
        },
        '.h1-override': {
          lineHeight: '1.4 !important',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};

export default config;
