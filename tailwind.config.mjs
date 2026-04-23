/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
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
          'cormorant': ['Cormorant Garamond', 'serif'],
          'montserrat': ['Montserrat', 'sans-serif'],
          'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],
          'crimson': ['Crimson Pro', 'serif'],
      }
  }
  },
  plugins: [],
}