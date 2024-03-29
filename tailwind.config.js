/** @type {import('tailwindcss').Config} */
module.exports = {
  purge:{
    content: [
      './src/**/*.{html,ts}'
    ]
  },
  content: [],
  theme: {
    extend: {},
  },
  variants:{
    extend:{
      opacity: ['disabled'],
      backgroundColor: ['disabled']
    }
  },
  plugins: [
    require("@tailwindcss/aspect-ratio")
  ],
}
