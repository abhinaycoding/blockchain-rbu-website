/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. COLORS
      colors: {
        dark: "#050505",
        neon: {
          purple: "#b026ff",
          cyan: "#00f3ff",
          green: "#00ff9d"
        }
      },
      
      // 2. FONTS
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Syncopate', 'sans-serif'],
      },

      // 3. ANIMATIONS (Merged)
      animation: {
        'noise': 'noise 0.5s steps(10) infinite',
        'marquee': 'marquee 20s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      // 4. KEYFRAMES (Merged)
      keyframes: {
        noise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '20%': { transform: 'translate(-10%, 5%)' },
          '30%': { transform: 'translate(5%, -10%)' },
          '40%': { transform: 'translate(-5%, 15%)' },
          '50%': { transform: 'translate(-10%, 5%)' },
          '60%': { transform: 'translate(15%, 0)' },
          '70%': { transform: 'translate(0, 10%)' },
          '80%': { transform: 'translate(-15%, 0)' },
          '90%': { transform: 'translate(10%, 5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(200%)' },
        },
      },
    },
  },
  plugins: [],
}