import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpine from '@astrojs/alpinejs';
// import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://misspitimini.com',
  image: {
    domains: ['misspitimini.com'],
  },
  integrations: [
    tailwind(),
    alpine(),
    // sitemap(),
    icon()
  ],
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/layouts': path.resolve(__dirname, './src/layouts'),
        '@/assets': path.resolve(__dirname, './src/assets'),
      }
    },
    prefetch: true, // Habilita la precarga automática de enlaces
  }
});