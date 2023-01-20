/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  fontFamily: {
    Poppins: ['Poppins', 'sans-serif'],
    Montserrat: ['Montserrat', 'sans-serif'],
    Raleway: ['Raleway', 'sans-serif'],
  },
  daisyui: {
    themes: [
      {
        doctorstheme: {
          "primary": '#007ee5',
          "secondary": "#00a1f1",
          "base-100": "#FAF9FA",
          "accent": "#3A4256",
          "neutral": "#161221",
          "info": "#2D65F0",
          "warning": "#F6CF09",
          "error": "#E12D3F",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
