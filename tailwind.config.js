/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#050608',
          900: '#08090C',
          850: '#0D0F13',
          800: '#14171E',
          700: '#1E232D',
        },
        gold: {
          light: '#38BDF8',
          DEFAULT: '#00A8E8',
          dark: '#0052D4',
          amber: '#0077FF',
          glow: 'rgba(0, 168, 232, 0.45)',
        },
        brand: {
          cyan: '#00A8E8',
          blue: '#0077FF',
          deep: '#0052D4',
          sky: '#38BDF8',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Helvetica Neue', 'sans-serif'],
      },
      backgroundImage: {
        'radial-spot': 'radial-gradient(circle at 50% 45%, #0B1426 0%, #060912 65%, #04060A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #0052D4 0%, #0077FF 50%, #00B4DB 100%)',
        'gold-pill': 'linear-gradient(135deg, #0052D4 0%, #0077FF 50%, #00B4DB 100%)',
        'accent-pill': 'linear-gradient(135deg, #0052D4 0%, #0077FF 50%, #00B4DB 100%)',
      }
    },
  },
  plugins: [],
}

