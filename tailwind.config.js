/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aws: {
          blue: '#1f90ff',
          orange: '#ff9900',
          navy: '#0b1220',
          slate: '#101827',
          mist: '#dfe8f7',
          panel: '#111c2d'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,153,0,0.3), 0 24px 80px rgba(31,144,255,0.18)',
        card: '0 18px 52px rgba(2, 6, 23, 0.45)'
      },
      letterSpacing: {
        tightest: '-0.06em'
      }
    }
  },
  plugins: []
}

