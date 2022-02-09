const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './pages/**/*.{js,jsx,ts,tsx,vue}',
    './components/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      minWidth: (theme) => ({
        ...theme('spacing'),
      }),
      minWidth: {
        'screen': '100vw',
        'card-lg': '16rem',
        'card': '14rem',
      },
      maxWidth: {
        '8xl': '1600px',
        '1/3': '33.333333%'
      },
      fontFamily: {
        poppins: ['Poppins',],
        inter: ['Inter',],
      },
      colors: {
        'buttonGreen': '#00A141',
        green: 'rgb(64, 237, 195)',
        'green-500': 'rgb(127, 251, 169)',
        yellow: 'rgb(211, 248, 154)',
        purple: colors.violet,
      },
      fontSize: {
        'title': ['33.7069px', {
          lineHeight: '50px'
        }],
        'subtitle': ['12.0865px', {
          lineHeight: '14px'
        }]
      }
    }
  },
  plugins: [],
}
