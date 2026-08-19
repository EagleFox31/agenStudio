import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

const SITE_URL = process.env.SITE_URL || 'https://agenstudio.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
      filter: (page) =>
        !page.includes('/confidentialite') &&
        !page.includes('/privacy') &&
        !page.includes('/mentions-legales') &&
        !page.includes('/legal') &&
        !page.includes('/404'),
    }),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  redirects: {
    '/': '/fr',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    ssr: {
      external: ['resend'],
    },
  },
});
