/** @type {import('tailwindcss').Config} */
// defaultTheme @'tailwindcss/defaultTheme'
module.exports = {
  content: [
    "../components/**/*.{vue,js,ts}",
    "../pages/**/*.{vue,js,ts}",
    "../layouts/**/*.{vue,js,ts}",
    "../plugins/**/*.{js,ts}",
    "../composables/**/*.{js,ts}",
    "../app.{js,ts,vue}",
    "../App.{js,ts,vue}",
    "../error.{js,ts,vue}",
    "../Error.{js,ts,vue}",
    "../static/**/*.html",
    "../content/**/*.md",
    "../docs/**/*.html",
    "../nuxt.config.{js,ts}",
    "../app.config.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // colors: {
      //   primary: "#4682b3"
      // },
      // fontFamily: {
      //   sans: ["Poppins", "sans-serif"],
      // },
      screens: {
        // 'sm': '640px',
        // 'md': '768px',
        // lg: "968px",
        // 'xl': '1280px',
        // '2xl': '1536px',
        tall: { raw: "(min-height: 792px)" },
      },
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
