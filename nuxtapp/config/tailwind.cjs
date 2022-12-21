/** @type {import('tailwindcss').Config} */
// defaultTheme @'tailwindcss/defaultTheme'
module.exports = {
  content: [
    "../pages/**/*.{vue,js,ts}",
    "../components/**/*.{vue,js,ts}",
    "../layouts/**/*.{vue,js,ts}",
    "../composables/**/*.{js,ts}",
    "../static/**/*.html",
    "../docs/**/*.html",
    "../plugins/**/*.{js,ts}",
    "../App.{js,ts,vue}",
    "../app.{js,ts,vue}",
    "../Error.{js,ts,vue}",
    "../error.{js,ts,vue}",
    "../content/**/*.md"
  ],
  darkMode: "class",
  theme: {
    extend: {
      // colors: {
      //   primary: "#4682b3"
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
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};