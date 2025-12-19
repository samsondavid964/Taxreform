/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#020a07', // Deepest background
          900: '#0a1f18', // Main background
          800: '#113026', // Lighter panels
        },
        gold: {
          400: '#fbbf24', // Primary accent
          500: '#f59e0b', // Hover state
        },
        surface: {
          glass: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'], // Good for numbers
      },
    },
  },
  plugins: [],
}