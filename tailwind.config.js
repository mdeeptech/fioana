/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fiona: {
          burgundy: '#2A0718',
          wine: '#3A0B20',
          plum: '#170812',
          black: '#0D070A',
          champagne: '#D4AF62',
          gold: '#E7C77A',
          'soft-gold': '#C9A45C',
          ivory: '#F8F3EA',
          cream: '#EEE5D8',
          taupe: '#A79B91',
          'soft-burgundy': '#7B3A50'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #9E742B, #F5D889, #C49A42, #FFE8A6, #A9792C)',
      },
      animation: {
        'marquee': 'marquee 45s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        }
      }
    },
  },
  plugins: [],
}
