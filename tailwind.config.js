/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          dark: '#3F000B',
          DEFAULT: '#680516',
          light: '#8E0A20',
        },
        gold: {
          deep: '#9E7D23',
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          shimmer: '#FFF2B2',
        },
        emerald: {
          deep: '#062315',
          DEFAULT: '#0B3B24',
          light: '#16653F',
          accent: '#25D366',
        },
        cream: {
          bg: '#FAF6F0',
          card: '#FFFFFF',
          alt: '#F3EBDD',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 8px 25px rgba(212, 175, 55, 0.28)',
        'gold-hover': '0 12px 30px rgba(212, 175, 55, 0.40)',
      }
    },
  },
  plugins: [],
};
