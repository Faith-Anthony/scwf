/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#DAA84A',
        'gold-gradient': 'linear-gradient(90deg, #DAA84A 0%, #FFFFFF 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'typewriter': 'typewriter 3s steps(40, end)',
        'float': 'float 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        float: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0.5' },
          '10%': { opacity: '0.8' },
          '50%': { opacity: '0.4' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
