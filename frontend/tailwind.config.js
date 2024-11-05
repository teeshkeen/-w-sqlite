/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      screens: {
          '440': '440px',
          '768': '768px',
          '960': '960px',
          '1024': '1024px',
          '1230': '1230px',
          '1280': '1280px',
          '1440': '1440px',
          '1920': '1920px',
      },
      extend: {
        colors: {
          'button-hover': 'rgba(37, 68, 65, 1)',
        },
        spacing: {
          '600px': '37.5rem',
        },
        maxWidth: {
          'catalog-card': '22.125rem',
          'get-in-touch': '45.5rem',
          'little-qualities-card': '20rem',
          'qualities-card': '21.25rem',
        },
        minHeight: {
          'phone-slide': '13.125rem',
          'normal-slide': '15rem'
        },
        backgroundImage: {
          'lead': "url('./assets/bg.png')",
        },
        fontFamily: {
          gilroyBold: ["Gilroy-Bold", "sans-serif"],
          gilroyMedium: ["Gilroy-Medium", "sans-serif"],
          gilroyLight: ["Gilroy-Light", "sans-serif"],
        },
      },
    },
    plugins: [],
  }
  