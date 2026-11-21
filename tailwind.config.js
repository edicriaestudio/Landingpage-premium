/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        brandBlue: '#0ea5e9',
        brandGreen: '#00FF66', // Fluorescent neon green
        brandDark: '#0B1528', // Dark Navy from logo
        brandGold: '#00FF66', // Mudado de amarelo para verde fluorescente conforme solicitado
        brandLight: '#ffffff',
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-in-out infinite alternate',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
