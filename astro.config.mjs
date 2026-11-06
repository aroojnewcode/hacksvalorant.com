import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { SLUG_REDIRECTS } from './src/config/slug-redirects.mjs';

export default defineConfig({
  site: 'https://hacksvalorant.com',
  trailingSlash: 'always',
  server: {
    host: true,
    port: 4322,
  },
  redirects: {
    '/products/r6/': '/products/valorant-cheats/',
    '/products/r6/lite/': '/products/valorant-cheats/lite/',
    '/products/r6/pro/': '/products/valorant-cheats/pro/',
    '/products/r6/elite/': '/products/valorant-cheats/elite/',
    '/products/r6/hwid-spoofer/': '/products/valorant-cheats/hwid-spoofer/',
    '/products/r6/ugc/': '/products/valorant-cheats/ugc/',
    '/products/r6/unlock-all/': '/products/valorant-cheats/skin-changer/',
    '/products/r6/utilities/': '/products/valorant-cheats/utilities/',
    '/r6-hacks/': '/',
    '/valorant-hacks/': '/',
    '/go/r6/': '/go/valorant/',
    '/products/borderlands-cheats/': '/products/valorant-cheats/',
    '/products/borderlands-cheats/elite/': '/products/valorant-cheats/elite/',
    '/products/borderlands-cheats/utilities/': '/products/valorant-cheats/utilities/',
    '/products/borderlands-hacks/': '/products/valorant-cheats/',
    '/products/borderlands-hacks/elite/': '/products/valorant-cheats/elite/',
    '/products/borderlands-hacks/utilities/': '/products/valorant-cheats/utilities/',
    '/borderlands-cheats/': '/',
    '/borderlands-hacks/': '/',
    '/products/mw4-cheats/': '/products/valorant-cheats/',
    '/products/mw4-cheats/elite/': '/products/valorant-cheats/elite/',
    '/products/mw4-cheats/utilities/': '/products/valorant-cheats/utilities/',
    '/products/mw4-hacks/': '/products/valorant-cheats/',
    '/products/mw4-hacks/elite/': '/products/valorant-cheats/elite/',
    '/products/mw4-hacks/utilities/': '/products/valorant-cheats/utilities/',
    '/mw4-cheats/': '/',
    '/mw4-hacks/': '/',
    '/go/mw4/': '/go/valorant/',
    '/go/borderlands/': '/go/valorant/',
    '/go/bodycam/': '/go/valorant/',
    '/go/fortnite/': '/go/valorant/',
    '/cheats/': '/products/valorant-cheats/',
    '/cheats/lite/': '/products/valorant-cheats/lite/',
    '/cheats/pro/': '/products/valorant-cheats/pro/',
    '/cheats/elite/': '/products/valorant-cheats/elite/',
    '/cheats/compare/': '/blog/valorant-lite-vs-pro/',
    '/hacks/': '/products/valorant-cheats/',
    '/hacks/lite/': '/products/valorant-cheats/lite/',
    '/hacks/pro/': '/products/valorant-cheats/pro/',
    '/hacks/elite/': '/products/valorant-cheats/elite/',
    '/hacks/compare/': '/blog/valorant-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/valorant-cheats/',
    '/products/dota-2-cheats/elite/': '/products/valorant-cheats/elite/',
    '/products/dota-2-cheats/utilities/': '/products/valorant-cheats/utilities/',
    '/products/dota-2-hacks/': '/products/valorant-cheats/',
    '/products/dota-2-hacks/elite/': '/products/valorant-cheats/elite/',
    '/products/dota-2-hacks/utilities/': '/products/valorant-cheats/utilities/',
    '/products/fortnite-cheats/': '/products/valorant-cheats/',
    '/products/fortnite-cheats/elite/': '/products/valorant-cheats/elite/',
    '/products/fortnite-cheats/utilities/': '/products/valorant-cheats/utilities/',
    '/products/fortnite-hacks/': '/products/valorant-cheats/',
    '/products/fortnite-hacks/elite/': '/products/valorant-cheats/elite/',
    '/products/fortnite-hacks/utilities/': '/products/valorant-cheats/utilities/',
    '/contact/': '/support/',
    ...SLUG_REDIRECTS,
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        if (page.includes('/404') || page.includes('/go/')) return false;
        try {
          const path = new URL(page).pathname;
          if (path.startsWith('/forum/') && path !== '/forum/') return false;
        } catch {
          return true;
        }
        return true;
      },
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
