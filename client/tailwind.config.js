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
      'hoverButton': '#2D682A',
      'table': '#60805C',
      'green': '#28A019',
      'red': '#D03323',
      'blue': '#143459',
      'blueOscuro':'#223648',
      'bluemasoscuro':'#05101a',
      'red': '#A81807',
      'blue': '#143459',
      'contTable': '#999999'

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