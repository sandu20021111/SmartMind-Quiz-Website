/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smartmind: {
          dark: '#4b648d',
          medium: '#5987a8',
          light: '#b9e4f4',
          'very-light': '#e7fbf9',
        },
      },
      keyframes: {
        // --- General Animations (Keep these for overall site consistency) ---
        pageReveal: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '0.9', transform: 'scale(1.1)' },
          '80%': { opacity: '0.95', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseFade: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        bounceScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },

        // --- Home Page Specific Animations ---
        // New: Horizontal slide for wave elements
        slideX: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-100%)' }, // Moves to the left
        },
        // Additional slide for another wave layer
        slideXReverse: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(0)' }, // Moves to the right
        },
        slideInTopSmooth: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInSlow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeftSmooth: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleInDelay: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '70%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        // --- General Animations ---
        'page-reveal': 'pageReveal 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.7s ease-out forwards',
        'bounce-in': 'bounceIn 0.8s ease-out forwards',
        'pulse-fade': 'pulseFade 1.5s infinite ease-in-out',
        'bounce-scale': 'bounceScale 1s infinite',
        'slide-in-up': 'slideInUp 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',

        // --- Home Page Specific Animations ---
        'wave-slide-1': 'slideX 25s linear infinite', // First wave layer
        'wave-slide-2': 'slideXReverse 30s linear infinite', // Second wave layer, slower, different direction
        'slide-in-top-smooth': 'slideInTopSmooth 1s ease-out forwards',
        'fade-in-slow': 'fadeInSlow 1.2s ease-out forwards',
        'slide-in-left-smooth': 'slideInLeftSmooth 1s ease-out forwards',
        'pop-in': 'popIn 0.6s ease-out forwards',
        'scale-in-delay': 'scaleInDelay 0.9s ease-out forwards',
      },
    },
  },
  plugins: [],
}