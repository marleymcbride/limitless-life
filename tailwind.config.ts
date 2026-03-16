import { type Config } from "tailwindcss";

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
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
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
        'h1': '1.2', // Global default for all H1 elements
      },
      // Halfway sizes between Tailwind's default scale
      fontSize: {
        '0.5xs': ['0.6875rem', { lineHeight: '1.4' }],     // Between xs (0.75) and nothing below
        '1.5xs': ['0.8125rem', { lineHeight: '1.4' }],     // Between xs (0.75) and sm (0.875)
        '1.5sm': ['0.9375rem', { lineHeight: '1.5' }],    // Between sm (0.875) and base (1)
        '1.5base': ['1.0625rem', { lineHeight: '1.5' }],  // Between base (1) and lg (1.125)
        '1.5lg': ['1.1875rem', { lineHeight: '1.5' }],    // Between lg (1.125) and xl (1.25)
        '1.5xl': ['1.375rem', { lineHeight: '1.5' }],     // Between xl (1.25) and 2xl (1.5)
        '2.5xl': ['1.6875rem', { lineHeight: '1.4' }],    // Between 2xl (1.5) and 3xl (1.875)
        '3.5xl': ['2.0625rem', { lineHeight: '1.3' }],    // Between 3xl (1.875) and 4xl (2.25)
        '4.5xl': ['2.625rem', { lineHeight: '1.2' }],     // Between 4xl (2.25) and 5xl (3)
        '5.5xl': ['3.375rem', { lineHeight: '1.2' }],     // Between 5xl (3) and 6xl (3.75)
        '6.5xl': ['4.125rem', { lineHeight: '1.1' }],     // Between 6xl (3.75) and 7xl (4.5)
        '7.5xl': ['5.25rem', { lineHeight: '1.1' }],      // Between 7xl (4.5) and 8xl (6)
        '8.5xl': ['7rem', { lineHeight: '1' }],           // Between 8xl (6) and 9xl (8)
      },
      // All animations removed for clean, conversion-focused design
      animation: {},
      keyframes: {},
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        'h1': {
          lineHeight: '1.3 !important',
        },
        '.h1-override': {
          lineHeight: '1.3 !important',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};

export default config;
