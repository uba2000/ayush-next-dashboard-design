const colors = require('tailwindcss/colors')


module.exports = {
  important: true,
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  content: [
    './src/public/**/*.html',
    './src/pages/**/*.{js,jsx,ts,tsx,vue}',
    './src/components/**/*.{js,jsx,ts,tsx,vue}',
    './src/page-components/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: '15px',
    },
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
        poppins: ['Poppins', 'sans-serif',],
        inter: ['Inter',],
        helvetica: ['Helvetica',],
        roboto: ['Roboto', 'sans-serif',],
      },
      colors: {
        'buttonGreen': '#00A141',
        'primary-100': 'rgba(0, 161, 65, 0.1)',
        'primary-300': 'rgba(0, 161, 65, 0.3)',
        'primary-700': 'rgba(0, 161, 65, 0.7)',
        'primary': '#00A141',
        'primary-light': '#F8FFFB',
        'green': 'rgb(64, 237, 195)',
        'green-500': 'rgb(127, 251, 169)',
        'yellow': 'rgb(211, 248, 154)',
        'ash': '#757575',
        'gray-500': '#44444F',
        'gray-800': '#dcd8e7',
        'gray-900': '#E2E2EA',
        'gray-1000': '#f7f9fa',
        'darkMode-subText': '#888888',
        'darkMode-border': '#414141',
        'darkMode-black': '#000000',
        'darkMode-bg': '#111111',
        'purple': colors.violet,
        'red': '#FF3749',
      },
      fontSize: {
        'title': ['33.7069px', {
          lineHeight: '50px'
        }],
        'subtitle': ['12.0865px', {
          lineHeight: '14px'
        }],
        'brand': ['35px', {
          lineHeight: '52px'
        }],
        'landing': ['50px', {
          lineHeight: '47px'
        }],
        'subLanding': ['18px', {
          lineHeight: '27px'
        }],
        'wild': ['19.1978px', {
          lineHeight: '135%'
        }]
      }
    }
  },
}
