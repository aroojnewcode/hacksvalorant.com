/** Approved Valorant media — only these assets are used site-wide (Supabase CDN). */
export interface SiteCheatImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const BASE =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/valorant';

export const SITE_CHEAT_IMAGES: SiteCheatImage[] = [
  {
    src: `${BASE}/bb902cc3-6729-4ed5-953e-cf39fa2fe40e/1793948113162-cuwkmp-futuristic-fps-corridor-with-aim-assist-overlay.webp`,
    alt: 'Futuristic FPS corridor with aim-assist style overlay — Valorant-style PC gameplay visualization',
    width: 1672,
    height: 941,
  },
  {
    src: `${BASE}/02ab714e-de37-423b-81f2-afd7f7fd8d28/1793455134160-cu8lx0-whsatano-valorant-s2-e756aae18c6c.webp`,
    alt: 'Valorant competitive scene with tactical HUD elements on PC',
    width: 800,
    height: 450,
  },
  {
    src: `${BASE}/02ab714e-de37-423b-81f2-afd7f7fd8d28/1793455063253-xwjslf-1-2-webp-309350f53434ceeb48bfb1837f8647ba.webp`,
    alt: 'Valorant map engagement with ability and combat UI on screen',
    width: 1919,
    height: 1079,
  },
  {
    src: `${BASE}/02ab714e-de37-423b-81f2-afd7f7fd8d28/1793455014013-in14n8-2-webp-7f1f09ea0214f5ec9ccb296f8cf86329.webp`,
    alt: 'Valorant round with operator ability callouts and overlay readouts',
    width: 1920,
    height: 1080,
  },
  {
    src: `${BASE}/02ab714e-de37-423b-81f2-afd7f7fd8d28/1793449666887-9n7cly-valorant-esp-archway-showdown.webp`,
    alt: 'Valorant archway firefight with awareness-style overlay on PC',
    width: 1672,
    height: 941,
  },
  {
    src: `${BASE}/02ab714e-de37-423b-81f2-afd7f7fd8d28/1793449561475-pz9603-snowy-industrial-alley-with-esp-overlays.webp`,
    alt: 'Industrial alley map with ESP-style highlights in a Valorant match',
    width: 1855,
    height: 848,
  },
  {
    src: `${BASE}/02ab714e-de37-423b-81f2-afd7f7fd8d28/1793449284668-okxp6u-futuristic-valorant-corridor-battle-hud.webp`,
    alt: 'Futuristic corridor duel with battle HUD — Valorant PC',
    width: 1672,
    height: 941,
  },
  {
    src: `${BASE}/02ab714e-de37-423b-81f2-afd7f7fd8d28/1793449228156-inb3kd-valorant-sci-fi-showdown-hud.webp`,
    alt: 'Sci-fi showdown moment with Valorant-style HUD on PC',
    width: 1672,
    height: 941,
  },
  {
    src: `${BASE}/02ab714e-de37-423b-81f2-afd7f7fd8d28/1793447216384-wls48q-valorant-jett-knives-at-a-belt-1.webp`,
    alt: 'Valorant agent ability showcase — duelist-style knives at the belt',
    width: 1672,
    height: 941,
  },
];

/** Product detail screenshot carousel (three slides). */
export const PRODUCT_GALLERY_IMAGES: SiteCheatImage[] = [
  SITE_CHEAT_IMAGES[4]!,
  SITE_CHEAT_IMAGES[5]!,
  SITE_CHEAT_IMAGES[6]!,
];

export const PRIMARY_CHEAT_IMAGE = SITE_CHEAT_IMAGES[0].src;

export function cheatImageForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % SITE_CHEAT_IMAGES.length;
  }
  return SITE_CHEAT_IMAGES[hash]!.src;
}

export function cheatImageAltForSrc(src: string): string {
  return SITE_CHEAT_IMAGES.find((img) => img.src === src)?.alt ?? SITE_CHEAT_IMAGES[0]!.alt;
}

export function imageSizeForSrc(src: string): { width: number; height: number } {
  const image = SITE_CHEAT_IMAGES.find((item) => item.src === src) ?? SITE_CHEAT_IMAGES[0]!;
  return { width: image.width, height: image.height };
}
