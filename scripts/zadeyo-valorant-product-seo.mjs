/**
 * Copy into Zadeyo /products/valorant (Next.js product route) when mirroring SEO fields.
 * hacksvalorant.com mirrors checkout context on /go/valorant/ after deploy; zadeyo.com is updated separately.
 */
import {
  ZADEYO_VALORANT_PRODUCT_SEO,
  ZADEYO_VALORANT_CHECKOUT_URL,
} from '../src/config/zadeyoValorantProductSeo.ts';

export const ZADEYO_VALORANT_PRODUCT_EXPORT = {
  ...ZADEYO_VALORANT_PRODUCT_SEO,
  checkoutUrl: ZADEYO_VALORANT_CHECKOUT_URL,
  /** Zadeyo CMS: use one <h1>; demote duplicate product hero headings to <h2>. */
  headingOutline: [
    { level: 'h1', text: ZADEYO_VALORANT_PRODUCT_SEO.h1 },
    { level: 'h2', text: 'Product details' },
    { level: 'h2', text: 'Gameplay screenshots' },
    { level: 'h2', text: 'Features' },
    { level: 'h2', text: 'System requirements' },
    { level: 'h2', text: 'Frequently asked questions' },
  ],
  keywordCap: {
    phrase: 'valorant cheats',
    maxUses: 8,
    note: 'Keep phrase in title + meta only; use Valorant / the listing elsewhere.',
  },
};

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  console.log(JSON.stringify(ZADEYO_VALORANT_PRODUCT_EXPORT, null, 2));
}
