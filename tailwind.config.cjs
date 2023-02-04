/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {   
      colors: {
        'primary' : '#0D5CB6',
        'black' :{
          'primary' : '#242424',
          'secondary' : '#38383D',
        },
        'gray' : {
          'primary' : '#808089',
        }
      }
    },
  },
  plugins: [],
}