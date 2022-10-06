/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'NavBar': '#223648',
      'white': '#ffffff',
      'bgHome': '#71717a',
      'button': '#047857',
      'bgSearch': '#6F6666',
      'hoverMenu': '#ca8a04',
      'black': '#000000',
      'bgItems': '#a3a3a3',
      'hoverButton': '#2D682A'
    },
    extend: {
      height: {
        '128': '32rem',
        '192': '48rem',
        '256': '64rem'
      }
    },
  },
  plugins: [],
}