/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          ink: '#0B1F2A',
          deep: '#081620',
          teal: '#22D3EE',
          cyan: '#0EA5E9',
          green: '#34D399',
          mint: '#A7F3D0',
          cloud: '#E6FFFB',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 211, 238, 0.25)',
        lift: '0 18px 45px rgba(15, 23, 42, 0.18)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s ease-out both',
      },
    },
  },
  plugins: [],
}
