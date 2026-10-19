/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cdg: {
          navy: '#153F60',
          deepNavy: '#103957',
          darkNavy: '#0D2B45',
          navyMuted: '#244866',
          teal: '#1286A0',
          tealDark: '#0E6D82',
          tealLight: '#26A0BA',
          lightBlue: '#D7EDF4',
          paleBlue: '#F3F9FC',
          iceBlue: '#EAF4F8',
          borderBlue: '#C5E2EC',
          green: '#22C55E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
