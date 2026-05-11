import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ByteByteGo brand orange
        brand: {
          50:  '#fff5ed',
          100: '#ffe6d0',
          200: '#ffc89d',
          400: '#ff8c4a',
          500: '#ff6b2b',   // ← primary accent
          600: '#e5531a',
          700: '#c23e10',
        },
        sidebar: '#ffffff',
        content: '#f4f4f5',   // zinc-100 background
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'ui-monospace', 'monospace'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};

export default config;