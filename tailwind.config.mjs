/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brandCyan: '#000000',
      },
      boxShadow: {
        'soft-elevation': '0 30px 60px -12px rgba(0, 0, 0, 0.1), 0 0 36px 0px rgba(0.10, 0.10, 0.10, 0.10)',
      },
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}