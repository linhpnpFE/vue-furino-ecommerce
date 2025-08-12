/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        xl: '80px',
      },
    },
    extend: {
      fontFamily: {
        Poppin: ["Poppins", 'sans-serif']
      },
      colors: {
        'FFF3E3': '#FFF3E3',
        'FAF3EA': '#FAF3EA',
        'F4F5F7': '#F4F5F7',
        '9F9F9F': '#9F9F9F',
        '747474': '#747474',
        '2EC1AC': '#2EC1AC',
        'E97171': '#E97171',
        'B88E2F': '#B88E2F',
        'F9F1E7': '#F9F1E7',
        'FCF8F3': '#FCF8F3',
        '333333': '#333333',
        '3A3A3A': '#3A3A3A',
        '666666': '#666666',
        '616161': '#616161',
        '898989': '#898989',
        'B0B0B0': '#B0B0B0',
        'D8D8D8': '#D8D8D8',
      },
    },
  },
  plugins: [],
}
