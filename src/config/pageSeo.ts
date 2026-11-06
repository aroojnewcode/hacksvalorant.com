/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
  /** Optional on-page H1 override (SEO-only routes). */
  h1?: string;
  /** Optional second H1 line (homepage hero accent). */
  h1Accent?: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Valorant Hacks for Windows PC | hacksvalorant.com',
    description:
      'Compare undetected Valorant cheats for Windows PC. Review Lite, Pro, and Elite, then check out for loader access when the status banner is online.',
    h1: 'Valorant Hacks for Windows PC',
  },
  '/products/valorant-cheats/': {
    title: 'Valorant Cheat Products for Sale | Lite, Pro, Elite',
    description:
      'Shop Valorant cheat products for Windows PC. Open a Lite, Pro, Elite, or utility page and compare the feature list before you check out.',
    h1: 'Valorant Cheat Products',
  },
  '/products/valorant-cheats/lite/': {
    title: 'Valorant Lite Cheats for Sale | ESP and Radar',
    description:
      'Valorant Lite cheats for sale cover player ESP, radar, and FOV on Windows PC. This tier leaves aimbot off. Compare the monthly and lifetime plans here.',
    h1: 'Valorant Lite Cheats',
  },
  '/products/valorant-cheats/pro/': {
    title: 'Valorant Pro Cheats for Sale | Aimbot and ESP',
    description:
      'Valorant Pro cheats for sale add aimbot, ESP, and recoil control on Windows PC. Read the feature list, then pick a monthly or lifetime plan on this page.',
    h1: 'Valorant Pro Cheats',
  },
  '/products/valorant-cheats/elite/': {
    title: 'Valorant Elite Cheats for Sale | Full Feature Set',
    description:
      'Valorant Elite cheats for sale include the full ESP, aimbot, and utility set on Windows PC. Compare what Elite adds before you open checkout.',
    h1: 'Valorant Elite Cheats',
  },
  '/products/valorant-cheats/hwid-spoofer/': {
    title: 'Valorant HWID Spoofer for Sale | After a Hardware Ban',
    description:
      'The Valorant HWID spoofer is for a hardware ban, not an account-only restriction. Read the reset steps on this page before you buy.',
    h1: 'Valorant HWID Spoofer',
  },
  '/products/valorant-cheats/ugc/': {
    title: 'Valorant UGC Recovery for Sale | Account Appeals',
    description:
      'Valorant UGC recovery is an appeal workspace for Riot and Vanguard restrictions. It is not a cheat tier, and it does not guarantee an unban.',
    h1: 'Valorant UGC Recovery',
  },
  '/products/valorant-cheats/unlock-all/': {
    title: 'Valorant Skin Changer for Sale | Local Previews',
    description:
      'The Valorant skin changer previews cosmetics on your own client. It does not change the skins other players see during a live match.',
    h1: 'Valorant Skin Changer',
  },
  '/products/valorant-cheats/utilities/': {
    title: 'Compare Valorant Utility Tools | HWID, UGC, Skins',
    description:
      'Compare the Valorant HWID spoofer, UGC recovery tool, and skin changer. Open the product page that matches the problem you need to solve.',
    h1: 'Compare Valorant Utility Tools',
  },
  '/blog/': {
    title: 'Valorant Cheat Guides | ESP, Aimbot, and Tiers',
    description:
      'Valorant cheat guides for ESP, aimbot, radar, and tier choice. Use these how-tos before you pick Lite, Pro, or Elite on the product pages.',
    h1: 'Valorant Cheat Guides',
  },
  '/forum/': {
    title: 'Valorant Buyer Forum | Loader and Tier Questions',
    description:
      'Valorant buyer forum for loader setup, tier choice, and guide questions. Each topic links to the full how-to instead of repeating it.',
    h1: 'Valorant Buyer Forum',
  },
  '/faq/': {
    title: 'Valorant Hacks FAQ | Tiers, Vanguard, Checkout',
    description:
      'Answers about Valorant cheat tiers, Vanguard, the loader, and checkout. Read the questions on this page before you open a support ticket.',
    h1: 'Valorant Hacks FAQ',
  },
  '/terms/': {
    title: 'Valorant Hacks Terms of Service | License and Sales',
    description:
      'Terms for buying Valorant cheat access, including license use, delivery, refunds, and the risk of third-party software on a Riot account.',
    h1: 'Valorant Hacks Terms of Service',
  },
  '/privacy/': {
    title: 'Valorant Hacks Privacy Policy | Data and Cookies',
    description:
      'How this site handles analytics, cookies, and the details you send with a support question or a checkout. Read the policy before you buy.',
    h1: 'Valorant Hacks Privacy Policy',
  },
  '/about/': {
    title: 'About Valorant Hacks | Tiers, Guides, and Support',
    description:
      'About this Valorant cheats store: Windows PC tiers, loader delivery, patch-day updates, and Discord support before you buy a product.',
    h1: 'About Valorant Hacks',
  },
  '/support/': {
    title: 'Valorant Hacks Support | Loader, HWID, Checkout',
    description:
      'Get help with the Valorant loader, HWID spoofer setup, and checkout receipts. Open a Discord ticket from this page with your order details.',
    h1: 'Valorant Hacks Support',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

/** Blog post `<title>` / meta description overrides (natural phrasing, one topic term each). */
export const BLOG_POST_SEO: Record<string, Partial<PageSeoEntry>> = {
  'valorant-minimap-radar': {
    title: 'How to Set Up Valorant Radar and Minimap Overlays',
    description:
      'How to set up a Valorant radar and minimap overlay, including distance caps and a first practice-range check before you queue.',
  },
  'valorant-range-practice': {
    title: 'How to Practice Valorant Aim Drills Before Ranked',
    description:
      'How to use the Valorant range and custom games to tune aim and ESP before a competitive queue. This is a practice guide, not a product page.',
  },
  'valorant-stream-proof': {
    title: 'How to Test a Stream-Proof Valorant ESP Overlay',
    description:
      'How to test whether OBS, Game Bar, or a capture card shows your Valorant overlay. Record a short clip and watch it before you go live.',
  },
  'valorant-aimbot-ranked': {
    title: 'How Valorant Ranked Aimbot and Bone Select Work',
    description:
      'How Valorant ranked aimbot settings work, including bone select, smoothing, and a conservative first preset. Read this before you buy Pro or Elite.',
  },
  'vanguard-verify-fix': {
    title: 'What to Do When Valorant Vanguard Fails to Start',
    description:
      'What to do when Valorant or Vanguard fails to start: repair the install, reboot, and check loader order before you assume the account is restricted.',
  },
  'buy-valorant-hacks': {
    title: 'How to Choose and Buy a Valorant Cheat Tier Today',
    description:
      'How to choose Lite, Pro, or Elite, finish checkout, and open the loader. Use this walkthrough, then buy from the matching product page.',
  },
  'vanguard-patch-checklist': {
    title: 'Valorant Patch Day Checklist for the Loader Build',
    description:
      'What to check on a Valorant patch day: status, a fresh loader download, and a custom-game test before you queue with a new build.',
  },
  'valorant-training-tips': {
    title: 'How to Drill Valorant ESP and Aim Before Ranked',
    description:
      'How to drill Valorant ESP range and aim smoothing in the range before ranked. Keep the overlay small until the read feels comfortable.',
  },
  'valorant-hack-setup': {
    title: 'How to Practice Valorant Hacks Before You Queue',
    description:
      'How to practice Valorant cheats in the range before a live queue, including presets, status checks, and the difference between Lite and Pro.',
  },
  'valorant-hack-features': {
    title: 'Valorant Cheat Features by Tier | ESP and Aim',
    description:
      'Valorant cheat features by tier: what Lite, Pro, and Elite include for ESP, aim, and radar. Use this to compare, then open the product page to buy.',
  },
  'valorant-practice-vs-ranked': {
    title: 'How Practice Modes Differ From Live Valorant Hacks',
    description:
      'How Valorant practice modes differ from a live-queue loader. Range commands do not carry into ranked. This guide explains the difference.',
  },
  'valorant-lite-vs-pro': {
    title: 'How the Valorant Lite and Pro Cheat Tiers Differ',
    description:
      'How Valorant Lite and Pro differ: Lite is ESP and radar, Pro adds aimbot. Read the comparison, then open the product page for the tier you want.',
  },
  'valorant-elite-tier': {
    title: 'When to Upgrade to the Valorant Elite Cheat Tier',
    description:
      'When to upgrade to Valorant Elite: extra modules, the fuller ESP set, and priority updates. Compare it with Lite and Pro before you switch.',
  },
  'valorant-esp-setup': {
    title: 'How to Set Up Valorant Wall ESP, Boxes, and Radar',
    description:
      'How to set up Valorant wall ESP and radar, including boxes, ability markers, and a distance cap you can read during a round.',
  },
  'valorant-skin-preview': {
    title: 'How the Valorant Skin Changer Local Preview Works',
    description:
      'How the Valorant skin changer preview works on your client. It is a local cosmetic tool and it is separate from the Lite, Pro, and Elite combat tiers.',
  },
  'valorant-hwid-ban': {
    title: 'How to Tell a Valorant Hardware Ban From an Account Ban',
    description:
      'How to tell a Valorant hardware ban from an account-only restriction, and when the HWID spoofer page is the right next step.',
  },
  'valorant-aimbot-weapons': {
    title: 'How Valorant Bone Select and Weapon Profiles Work',
    description:
      'How Valorant bone select and per-weapon aim profiles work for rifles, SMGs, and shotguns. Tune one weapon at a time in the range.',
  },
  'valorant-external-loader': {
    title: 'How External Valorant Cheat Loaders Work on PC',
    description:
      'How an external Valorant loader runs outside the game client, how overlays are drawn, and how patch updates reach the portal.',
  },
};

/** Optional on-page H1 overrides (blog posts). */
export const BLOG_POST_PAGE_H1: Record<string, string> = {
  'vanguard-verify-fix': 'What to Do When Valorant Vanguard Fails to Start',
  'valorant-stream-proof': 'How to Test a Stream-Proof Valorant ESP Overlay',
  'valorant-range-practice': 'How to Practice Valorant Aim Drills Before Ranked',
  'valorant-minimap-radar': 'How to Set Up Valorant Radar and Minimap Overlays',
  'valorant-hack-features': 'Valorant Cheat Features by Tier',
  'valorant-lite-vs-pro': 'How the Valorant Lite and Pro Cheat Tiers Differ',
  'valorant-elite-tier': 'When to Upgrade to the Valorant Elite Cheat Tier',
  'valorant-esp-setup': 'How to Set Up Valorant Wall ESP, Boxes, and Radar',
  'valorant-aimbot-ranked': 'How Valorant Ranked Aimbot and Bone Select Work',
  'valorant-aimbot-weapons': 'How Valorant Bone Select and Weapon Profiles Work',
  'valorant-external-loader': 'How External Valorant Cheat Loaders Work on PC',
  'valorant-hwid-ban': 'How to Tell a Valorant Hardware Ban From an Account Ban',
  'valorant-skin-preview': 'How the Valorant Skin Changer Local Preview Works',
  'valorant-hack-setup': 'How to Practice Valorant Hacks Before You Queue',
  'valorant-training-tips': 'How to Drill Valorant ESP and Aim Before Ranked',
  'valorant-practice-vs-ranked': 'How Practice Modes Differ From Live Valorant Hacks',
  'buy-valorant-hacks': 'How to Choose and Buy a Valorant Cheat Tier Today',
  'vanguard-patch-checklist': 'Valorant Patch Day Checklist for the Loader Build',
};

export function getBlogPostSeo(slug: string, fallback: PageSeoEntry): PageSeoEntry {
  const override = BLOG_POST_SEO[slug];
  if (!override) return fallback;
  return {
    title: override.title ?? fallback.title,
    description: override.description ?? fallback.description,
  };
}

export function blogPostPageH1(slug: string, postTitle: string): string {
  return BLOG_POST_PAGE_H1[slug] ?? postTitle;
}

/** Product page H1 aligned with PAGE_SEO when set. */
export function productPageH1(pagePath: string, fallback: string): string {
  return getPageSeoEntry(pagePath)?.h1 ?? fallback;
}

/** Layout `<title>` for blog posts; ranked override is used verbatim when under 60 chars. */
export function blogPostLayoutTitle(slug: string, postTitle: string, brand = 'Valorant Hacks'): string {
  const override = BLOG_POST_SEO[slug]?.title;
  if (override && override.length <= 60) return override;
  if (override) return `${override.slice(0, 57).trim()}…`;
  const suffix = ` | ${brand}`;
  const max = 60;
  if (`${postTitle}${suffix}`.length <= max) return `${postTitle}${suffix}`;
  const trimmed = postTitle.slice(0, Math.max(20, max - suffix.length - 1)).trim();
  return `${trimmed}${suffix}`;
}
