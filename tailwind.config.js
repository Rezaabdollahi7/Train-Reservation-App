/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {},
    colors: {
      // State Colors
      info: '#2f80ed',
      success: '#27ae60',
      warning: '#e2b93b',
      error: '#eb5757',

      // Gray Colors
      brightGray: '#332c5c',
      purpleHaze: '#494369',
      midGray: '#5e587a',

      // Secondary Colors
      daySkyBlue: '#6dcbff',
      easterPurple: '#c06ef3',
      softBlue: '#7188ff',
      selectiveYellow: '#fdba09',
      lightTurquoise: '#6dedc3',

      // Primary Colors
      fuelYellow: '#fca61f',
      crocusPurple: '#8976fd',

      blue: colors.blue,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      slate: colors.slate,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      lime: colors.lime,
      green: colors.green,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
  },
  plugins: [],
}
