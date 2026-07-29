// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Update `site` to the production domain before deploying (used for sitemap + canonical URLs).
export default defineConfig({
  site: 'https://quietseven.com',
  integrations: [tailwind(), sitemap()],
  build: {
    // Inline small stylesheets into the HTML so first paint doesn't wait on a
    // separate CSS round trip. Larger sheets still ship as cacheable files.
    inlineStylesheets: 'auto',
  },
});
