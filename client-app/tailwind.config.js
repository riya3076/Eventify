module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "410px",
      },
      backgroundImage: {
        homefrontbg: "url(./assets/home/front_world.jpg)",
        "quiz-bg": "url(./assets/home/quiz_bg.png)",
      },
      colors: {
        "title-color": "#2C6D99",
        "button-primary": "#1b5785",
        "button-primary-hover": "#2C6D99",
      },
    },
  },
  plugins: [],
};