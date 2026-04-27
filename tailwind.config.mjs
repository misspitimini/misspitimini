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
          'display': ['Cormorant Garamond', 'serif'],
          'body': ['Montserrat', 'sans-serif'],
          'sans': ['Plus Jakarta Sans', 'sans-serif'],
          'serif': ['Crimson Pro', 'serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      }
  }
  },
  plugins: [],
}