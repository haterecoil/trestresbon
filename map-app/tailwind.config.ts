import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          light: '#3B82F6',
          dark: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#D97706',
          light: '#F59E0B',
        },
        metro: {
          1: '#FFCE00',
          2: '#0055C8',
          3: '#6E6E00',
          4: '#A0006E',
          5: '#FF7E2E',
          6: '#6EC4E8',
          7: '#6ECA97',
          8: '#6E491E',
          9: '#6EC4E8',
          10: '#C9910D',
          11: '#6E491E',
          12: '#003A6E',
          13: '#6EC4E8',
          14: '#6E0055',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      height: {
        'sheet-collapsed': '80px',
        'sheet-half': '50vh',
        'sheet-full': '90vh',
      },
    },
  },
  plugins: [],
}

export default config
