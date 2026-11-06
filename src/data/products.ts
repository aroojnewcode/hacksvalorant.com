import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import { PRODUCT_BASE } from '../config/site';
import { PRODUCT_GALLERY_IMAGES, SITE_CHEAT_IMAGES } from '../config/siteImages';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['valorant-esp-setup', 'valorant-lite-vs-pro', 'valorant-minimap-radar', 'vanguard-patch-checklist'],
  pro: [
    'valorant-aimbot-ranked',
    'valorant-aimbot-weapons',
    'valorant-lite-vs-pro',
    'valorant-stream-proof',
  ],
  elite: [
    'valorant-elite-tier',
    'valorant-hack-features',
    'valorant-esp-setup',
    'vanguard-patch-checklist',
    'buy-valorant-hacks',
  ],
  'hwid-spoofer': [
    'valorant-hwid-ban',
    'vanguard-verify-fix',
    'vanguard-patch-checklist',
    'valorant-external-loader',
  ],
  ugc: [
    'vanguard-verify-fix',
    'valorant-hwid-ban',
    'buy-valorant-hacks',
  ],
  'unlock-all': [
    'valorant-skin-preview',
    'valorant-hack-features',
    'valorant-stream-proof',
  ],
};

/** Must match `PRODUCT_BASE` in config/site.ts so tier/utility slugs resolve to `productContent`. */
const productBase = PRODUCT_BASE;

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on hacksvalorant.com and Discord #status before purchase—especially after a Valorant or Vanguard update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite Valorant hacks or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, PC platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the customer portal, patch loader, and setup guide. Test in a custom game, load presets, then queue competitive or unrated.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Valorant and Vanguard receive frequent updates. Confirm module availability on the live status panel at hacksvalorant.com before you purchase or launch. Overlay behavior may differ in range, replay and observer views after patches.';

const sharedLimitations =
  'Third-party software in Valorant can violate Riot’s terms of service and lead to account action. You use this software at your own risk. Compatibility and availability can change after game, anti-cheat, or Windows updates without notice.';

const valorantSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or Windows 11 (64-bit) with HVCI, Core Isolation, TPM and Secure Boot enabled.' },
  { icon: 'reqEpic', text: 'Current PC Valorant build from the Riot Client with the latest patches applied.' },
  { icon: 'reqSettings', text: 'Cloud DMA access for full functionality on supported builds (per product listing).' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and loader updates.' },
  { icon: 'reqCpu', text: 'Intel or AMD system that meets Valorant’s official PC requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const galleryRaw = {
  gpAimbotEsp: {
    src: SITE_CHEAT_IMAGES[0].src,
    alt: SITE_CHEAT_IMAGES[0].alt,
    caption: 'Soft aim & ESP',
    captionDesc: 'Valorant-style overlays tuned for PC gunfights.',
  },
  gpEspWallhack: {
    src: SITE_CHEAT_IMAGES[1].src,
    alt: SITE_CHEAT_IMAGES[1].alt,
    caption: 'Enemy ESP',
    captionDesc: 'Player ESP with health and distance in Valorant matches.',
  },
  gpGameplay: {
    src: SITE_CHEAT_IMAGES[2].src,
    alt: SITE_CHEAT_IMAGES[2].alt,
    caption: 'Valorant competitive round',
    captionDesc: 'Tactical FPS action on PC with overlay-friendly trainer modules.',
  },
  gpEspIndoor: {
    src: SITE_CHEAT_IMAGES[3].src,
    alt: SITE_CHEAT_IMAGES[3].alt,
    caption: 'Settlement fight',
    captionDesc: 'Valorant-style map fight with clear ESP-style highlights.',
  },
  gpCourtyard: {
    src: SITE_CHEAT_IMAGES[4]!.src,
    alt: SITE_CHEAT_IMAGES[4]!.alt,
    caption: 'Courtyard battle',
    captionDesc: 'Courtyard firefight with ability callouts on screen.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

const productDetailGalleryCaptions = [
  { caption: 'Updates & anti-cheat', captionDesc: 'Stay aligned with Valorant patch and Vanguard news.' },
  { caption: 'Competitive gameplay', captionDesc: 'In-round view with compact map and full HUD.' },
  { caption: 'Unrated perspective', captionDesc: 'First-person combat with kill feed and minimap.' },
] as const;

function productDetailGallery(): ProductSlide[] {
  return PRODUCT_GALLERY_IMAGES.map((img, i) => {
    const meta = productDetailGalleryCaptions[i] ?? productDetailGalleryCaptions[0]!;
    return {
      src: img.src,
      alt: img.alt,
      caption: meta.caption,
      captionDesc: meta.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'lite';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Lite is built for players who want map awareness first. In ranked, knowing enemy positions, ability usage and rotate timings wins more fights than raw aim—Lite gives you that edge without aimbot automation.',
    },
    { type: 'h2', text: 'Ranked-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Aimbot and bot modules entirely. Your gameplay looks natural while ESP, radar hack and loot timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Pro is the sweet spot for ranked grinders. Aim assist, Smooth Aim and Sticky Aim help you win aim duels without obvious bot patterns—when you tune smoothness using our portal presets.',
    },
    { type: 'h2', text: 'Aimbot + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds Aimbot, Bone Priority, Hotkey macros and FOV and smoothness drawing. You see the fight before it starts and win it with aimbot that stay human at default settings.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'Elite is the private build for players who want everything—loot-style assists, trigger-style modules, recoil help, skin preview tools, full wall ESP and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first ranked queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player ESP with distance and name tags, ability and spike markers, rotate timers, radar-style overlay, and stream-safe overlay hiding. Config presets for unrated and competitive ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Aimbot and automation' },
    {
      type: 'p',
      text: 'Aimbot, Smooth Aim, Sticky Aim with Prediction, Bone Priority and hotkey macros for heals and mobility. Smoothness sliders tunes cast timing so aimbot stay natural in ranked. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at hacksvalorant.com—enough firepower for high-rank lobbies without Elite slot limits. Pair with our aimbot guide in the blog before your first ranked session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Loot-style assists, rotation helpers, trigger-style modules, recoil help, skin preview tools and full wall ESP with smoke-style alerts. Use custom-game testing before ranked—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: `Use when fresh Riot accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only restriction cases; see [UGC](${productBase}ugc/) instead.`,
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative hack profile before ranked. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for Riot account restrictions, Vanguard flags, trade holds and security notices. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: `Some Vanguard bans cannot be reversed. UGC organizes evidence and follow-ups for Riot review. Pair with [HWID Spoofer](${productBase}hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.`,
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players in your lobby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Skin preview tools ship inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: productDetailGallery(),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: valorantSystemRequirements,
    fullFeatures: [
      'Player ESP & player boxes',
      'Gadget & objective locator',
      'POI awareness',
      'Health & shield tracking',
      'Mini-radar overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Roam timers',
      'Radar hack',
      'Unrated preset config',
      'Ranked preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Lite: ESP and radar',
      paragraphs: [
        'Lite is for player ESP, gadget markers, roam timers and radar. No aimbot. Set distance, colors and stream-proof in the portal before you queue.',
        'Best if you want awareness in unrated and competitive without combat automation. Overlays are updated after Valorant patches.',
      ],
    },
  },
  pro: {
    images: productDetailGallery(),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: valorantSystemRequirements,
    fullFeatures: [
      'All Lite ESP & wall ESP modules',
      'Aimbot',
      'Smooth Aim',
      'Sticky Aim & Prediction',
      'Bone Priority',
      'Hotkey macros (heals/shields)',
      'Auto Heal',
      'FOV & smoothness tuning',
      'Per-weapon aimbot profiles',
      'Third-party alert integration',
      'Ranked-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord product support',
    ],
    overview: {
      title: 'Pro: aim assist plus ESP',
      paragraphs: [
        'Pro includes everything in Lite, plus Aimbot, Smooth Aim, Sticky Aim and hotkey macros. Aim settings live in one tab. Start with a portal preset, not max sliders.',
        'Most people pick Pro for unrated and competitive. Bone priority and macros help in aim duels while defaults stay smooth.',
      ],
    },
  },
  elite: {
    images: productDetailGallery(),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: valorantSystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Loot Assist',
      'Rotation Assist AI',
      'Chest respawn timer',
      'Auto loadout manager',
      'Triggerbot',
      'Recoil control',
      'Full wall ESP suite',
      'Third-party alert system',
      'Visibility detector',
      'Skin preview tools (Loadout Pack)',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'Elite: full hack + extras',
      paragraphs: [
        'Elite includes Lite and Pro modules, plus loot-style assists, trigger-style modules, recoil help, skin preview tools, full wall ESP and faster patch priority.',
        'Elite slots are limited. Discord support helps you set safer profiles before ranked matchmaking. Check the status banner on hacksvalorant.com before you buy Elite access.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpEspIndoor', 'gpEspWallhack', 'gpGameplay'),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching Valorant.',
    limitations:
      'Spoofing does not help account-only restriction cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Valorant after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'HWID Spoofer for Valorant PC hardware flags',
      paragraphs: [
        'Use the HWID Spoofer when Vanguard flags your PC hardware but the Riot account is still fine. Includes disk and MAC tools, a restore-point checklist, a compatibility scan and post-spoof checks.',
        'Use it when new accounts die on one PC but work on another. It does not fix account-only bans. After spoofing, use a safer profile before competitive queues.',
      ],
    },
  },
  ugc: {
    images: slide('gpEspWallhack', 'gpAimbotEsp', 'gpEspIndoor').map((img, index) =>
      index === 0 ? { ...img, alt: `Ugc – ${img.alt}` } : img,
    ),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent Vanguard bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on hacksvalorant.com or at checkout on hacksvalorant.com.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'UGC account appeal tools',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you organize appeals for Riot account restrictions and Vanguard enforcement. UGC does not guarantee an unban.',
        'Use UGC when you have documentation, order email and platform notices ready. Pair with HWID tools only when hardware flags—not account-only bans—are involved.',
      ],
    },
  },
  'unlock-all': {
    images: slide('gpGameplay', 'gpEspWallhack', 'gpAimbotEsp'),
    goodToKnow:
      'Loadout Pack previews cosmetics locally on your client. Other players in your lobby see your real inventory—not preview skins. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify in-game inventory or store state. Other players cannot see previewed skins or sets.',
    systemRequirements: valorantSystemRequirements,
    fullFeatures: [
      'Outfit skin swap',
      'Skin & wrap preview',
      'Pickaxe & wrap customizer',
      'Loading screen editor',
      'Cursor & HUD theme',
      'Chest & loot replacer',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Skin preview tools / Loadout Pack',
      paragraphs: [
        'Skin preview tools let you preview weapon skins and cosmetics on your local Valorant client. They do not change your in-game inventory or store purchases.',
        'Only you see the preview skins. Other players see your real inventory. Included with Elite, or buy skin preview tools alone without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.hacks.items.map((hack) => {
    const slug = slugFromHref(hack.href);
    const content = productContent[slug];
    const displayName = hack.name === 'Lite' ? 'Lite' : hack.name === 'Pro' ? 'Pro' : 'Elite';
    return {
      slug,
      kind: 'tier',
      badge: hack.badge,
      tier: hack.tier,
      name: hack.name,
      title: hack.title,
      subtitle: hack.desc,
      desc: hack.desc,
      features: hack.features,
      more: hack.more,
      variant: hack.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpAimbotEsp', 'gpEspWallhack', 'gpGameplay');

export const heroSlides = slide('gpAimbotEsp', 'gpEspWallhack', 'gpGameplay', 'gpEspIndoor', 'gpCourtyard');

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Valorant hacks with aim assist and ESP, plus HWID spoofer, UGC appeals and skin preview tools for PC.',
  buyUrl: checkoutPath('valorant'),
};
