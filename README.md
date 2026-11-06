# hacksvalorant.com

Astro storefront and content site for **Valorant Hacks** at hacksvalorant.com, based on the [levoredirect](https://github.com/Stellarhamza/levoredirect) Astro template.

## Quick start

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4322](http://127.0.0.1:4322).

## Build & deploy

```bash
npm run build
npm run preview   # local preview of dist/
npm run deploy    # Cloudflare Workers (wrangler.toml)
```

## Site config

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Domain, product base path, Discord, support email |
| `src/config/checkout-redirects.mjs` | External checkout URLs for `/go/*/` redirects |
| `src/config/pageSeo.ts` | Per-route titles and meta descriptions |
| `src/i18n/en.ts` | Homepage copy, nav, product UI strings |

Product pages live under `src/pages/products/valorant-cheats/`.
