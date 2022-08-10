const colors = require('tailwindcss/colors');

module.exports = {
  content:["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    colors: { ...colors, gmct: {
      darkBlue: '#2B2F42',
      lightBlue: '#38B6FF',
      blue: '#353A50',
      pink: '#FF85CB',
      green: '#7ED957',
      sideMenuSelected: '#454B65'
    }  }
  },
  plugins: [],
}