/**
 * SSR copy for /go/valorant/ — mirrors Zadeyo Valorant product SEO fields when useful.
 * Apply the same fields in Zadeyo admin (this repo does not deploy zadeyo.com).
 */
export const ZADEYO_VALORANT_CHECKOUT_URL =
  'https://zadeyo.com/go/UROOJ?to=%2Fproducts%2Fvalorant';

export const ZADEYO_VALORANT_PRODUCT_SEO = {
  title: 'Valorant cheats – monthly and lifetime access',
  description:
    'Undetected Valorant PC tools with player ESP, aimbot, and recoil help. Monthly and long-term access. Updated for current patches.',
  h1: 'Valorant cheats — ESP, aimbot, wallhack & ranked presets',
  h2ProductDetails: 'Product details',
  h2Features: 'Features',
  h2SystemRequirements: 'System requirements',
  h2Checkout: 'Checkout and delivery',
  h2Plans: 'Monthly vs long-term plans',
  h2Loader: 'Loader, configs, and updates',
  h2Safety: 'Status checks before you queue',
  logoAlt: 'Valorant cheats — ZADEYO checkout logo',
  intro:
    'Undetected PC tools with player ESP, precision aimbot, and recoil control. Compare tiers on hacksvalorant.com, then continue to ZADEYO when the status banner shows online.',
  sections: [
    {
      heading: 'Aim and combat modules',
      level: 'h3' as const,
      paragraphs: [
        'Smooth aim inside a configurable FOV circle with visibility checks, trigger options, and recoil settle tuned for rifle and pistol rounds.',
      ],
    },
    {
      heading: 'ESP and ability awareness',
      level: 'h3' as const,
      paragraphs: [
        'Player ESP, skeleton and box overlays, snaplines, and ability / utility callouts with save and load config profiles.',
      ],
    },
  ],
  bodySections: [
    {
      id: 'checkout',
      headingKey: 'h2Checkout' as const,
      paragraphs: [
        'Payment and license delivery run on ZADEYO after you choose a plan. You receive digital loader access and setup guidance—no physical shipment.',
        'Use hacksvalorant.com for tier tables, Vanguard patch notes, and the pre-purchase FAQ before you launch Valorant on PC.',
      ],
    },
    {
      id: 'plans',
      headingKey: 'h2Plans' as const,
      paragraphs: [
        'Monthly billing follows a 31-day cycle with the same module list as the long-term option. It fits shorter trials while you tune aimbot smoothness and ESP range in unrated playlists.',
        'The long-term option keeps one portal license without monthly renewals. Confirm live pricing and module lists on the ZADEYO checkout screen before you pay.',
      ],
    },
    {
      id: 'loader',
      headingKey: 'h2Loader' as const,
      paragraphs: [
        'The operator portal hosts the current Windows loader, default configs, and save/load profiles for competitive and unrated modes.',
        'After a Valorant or Vanguard update, reload the loader from the portal and read the homepage status banner before ranked queue.',
      ],
    },
    {
      id: 'safety',
      headingKey: 'h2Safety' as const,
      paragraphs: [
        'Third-party tools carry ban risk. Start with conservative FOV, smooth aim, and limited ESP distance until sessions feel stable.',
        'Check Discord #status and the hacksvalorant.com banner on patch days. Do not queue ranked while modules show offline or misaligned.',
      ],
    },
  ],
  screenshotAlts: [
    'Valorant ESP overlay screenshot 1',
    'Valorant aimbot FOV screenshot 2',
    'Valorant ability ESP screenshot 3',
  ],
} as const;
