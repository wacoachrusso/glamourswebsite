/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'glamour': {
          pink: '#ffd1dc',
          gold: '#d4af37',
          light: '#fff5f7',
          dark: '#4a1c40'
        }
      },
      backgroundImage: {
        'gradient-glamour': 'linear-gradient(135deg, #ffd1dc 0%, #fff5f7 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)',
      },
      boxShadow: {
        'glamour': '0 4px 14px 0 rgba(212, 175, 55, 0.15)',
        'glamour-lg': '0 10px 25px -3px rgba(212, 175, 55, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
};