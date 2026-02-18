import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpine from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://misspitimini.com',
  integrations: [tailwind(), alpine(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
      }
    }
  }
});