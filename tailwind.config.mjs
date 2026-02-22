/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
          "primary": "#8B5E3C",
          "primary-grey": "#b5b1ae",
          "floral-beige": "#FAF9F6",
          "floral-dark": "#1C1C1C",
          "accent-sage": "#7A8471"
      },
      fontFamily: {
          'display': ['"Cormorant Garamond"', 'serif'],
          'body': ['Montserrat', 'sans-serif'],
          "sans": ["Plus Jakarta Sans", "sans-serif"],
          "serif": ["Crimson Pro", "serif"]
      }
  }
  },
  plugins: [],
}