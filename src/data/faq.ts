import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

function expandFaqAnswer(answer: string, faqId: string): string {
  if (!answer.includes('{{')) return answer;
  const slots: Record<string, string> = {
    ELITE: link(`Elite tier checkout (${faqId})`, productPath('elite')),
    LITE: link(`Lite ESP tier (${faqId})`, productPath('lite')),
    PRO: link(`Pro aimbot tier (${faqId})`, productPath('pro')),
    PRODUCTS_HUB: link(`Full Valorant catalog (${faqId})`, ROUTES.products),
    HWID: link(`HWID spoofer utility — ${faqId}`, productPath('hwid-spoofer')),
    UGC: link(`UGC appeal tools — ${faqId}`, productPath('ugc')),
    SKIN: link(`Skin preview tools pack — ${faqId}`, productPath('skin-changer')),
    FAQ_PAGE: link(`Full FAQ index — ${faqId}`, ROUTES.faq),
    BLOG: link(`Valorant blog guides — ${faqId}`, ROUTES.blog),
  };
  return Object.entries(slots).reduce(
    (text, [key, html]) => text.replaceAll(`{{${key}}}`, html),
    answer,
  );
}

function withExpandedAnswers(items: SiteFaqItem[]): SiteFaqItem[] {
  return items.map((item) => ({ ...item, a: expandFaqAnswer(item.a, item.id) }));
}

const rawSiteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if Valorant hacks are online?',
    a: a('The live status banner is on hacksvalorant.com and in the Discord #status channel. Always check after a Valorant or Vanguard update.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('Your portal unlocks the loader, setup guide and config library via our secure checkout. Follow the guide before launching Valorant.'),
  },
  {
    id: 'pricing',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'How much do Valorant hacks cost?',
    a: a('Checkout plans are Monthly for $35 (31 days of access) and Lifetime for $150 (unlimited access). Both include the same Valorant trainer modules at Zadeyo checkout.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party Valorant hacks?',
    a: a('Yes—any modification carries risk. Vanguard and report systems evolve. Read current status and accept the risk before use.'),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('Valorant via the Riot Client on Windows 10/11 64-bit only. macOS and Linux are not supported.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Yes—use the HWID reset in your portal or open a Discord ticket. Limits depend on your tier.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are products and utilities listed?',
    a: `{{PRODUCTS_HUB}} lists hack tiers, {{HWID}}, {{UGC}}, and {{SKIN}} with feature lists and checkout via our partner.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is Valorant wall ESP / ESP?',
    a: `Wall ESP and player ESP show enemy positions, economy cues and map context. {{LITE}} covers awareness overlays. {{PRO}} and {{ELITE}} add aim-assist modules on top.`,
    scopes: ['lite', 'pro', 'elite'],
  },
  {
    id: 'esp-vs-scripts',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What is the difference between wall ESP and aimbot?',
    a: `Wall ESP and ESP are information overlays—they do not cast agent abilities for you. Aimbot, Smooth Aim and Sticky Aim are aim-assist on {{PRO}} and {{ELITE}}. You can run awareness-only on {{LITE}}.`,
  },
  {
    id: 'which-tier-esp',
    topic: 'plans',
    icon: 'faqWhichTierEsp',
    q: 'Which tier do I need for wall ESP only?',
    a: `{{LITE}} is awareness only: player ESP, economy cues, timers and radar-style overlay. {{PRO}} adds aimbot. {{ELITE}} adds advanced assists and skin preview tools.`,
    scopes: ['lite'],
  },
  {
    id: 'which-tier-scripts',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'Which tier includes Aimbot?',
    a: `{{PRO}} ships aim assist and bone select. {{ELITE}} adds ability markers and spike readouts on top of that. {{LITE}} has no aim assist.`,
    scopes: ['pro'],
  },
  {
    id: 'rank-lite-vs-pro',
    topic: 'plans',
    icon: 'faqRankTiers',
    q: 'How do you rank Lite vs Pro vs Elite?',
    a: `Map awareness only → {{LITE}}. Aim assist and bone select → {{PRO}}. Ability markers and spike readouts → {{ELITE}}. Compare on each hack page or the {{FAQ_PAGE}}.`,
  },
  {
    id: 'elite-slots',
    topic: 'plans',
    icon: 'faqEliteSlots',
    q: 'Why is Elite limited slots?',
    a: `Elite is a private build with direct dev support and priority patch delivery. Slot caps keep patch cycles fast. Check the status banner before checkout.`,
    scopes: ['elite'],
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Can OBS capture my overlay?',
    a: `Stream-proof mode on {{LITE}}, {{PRO}} and {{ELITE}} hides overlays from OBS and Discord share. Test a local recording before going live.`,
  },
  {
    id: 'undetected',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Are undetected Valorant hacks guaranteed?',
    a: a('No. Undetected is current status on the product page—not a permanent guarantee. Stop if the build shows updating, testing, or detected.'),
  },
  {
    id: 'esp-safer',
    topic: 'safety',
    icon: 'faqEspSafer',
    q: 'Is wall ESP safer than aimbot?',
    a: a('ESP is quieter in replay than obvious bot patterns, but it is still a hack. Vanguard does not ignore overlays because you left aimbot off.'),
  },
  {
    id: 'hwid-when',
    topic: 'products',
    icon: 'faqHwidWhen',
    q: 'When do I need the HWID Spoofer?',
    a: `Use {{HWID}} when fresh Riot accounts fail instantly on one PC but work elsewhere—hardware enforcement. Not for account-only restriction cases; see {{UGC}} instead.`,
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'ugc-what',
    topic: 'products',
    icon: 'faqUgcWhat',
    q: 'What is UGC?',
    a: `{{UGC}} (Unban & Governance Control) is an appeal workspace for Riot account restrictions and Vanguard enforcement—custom workflows and case tracking, not a guaranteed unban service.`,
    scopes: ['ugc'],
  },
  {
    id: 'skin-changer',
    topic: 'products',
    icon: 'faqSkinChanger',
    q: 'Do skin preview tools modify my in-game inventory?',
    a: `{{SKIN}} previews cosmetics locally on your client. Other players see your real inventory. Included with {{ELITE}}; available standalone for cosmetic preview only.`,
    scopes: ['skin-changer'],
  },
  {
    id: 'external-loader',
    topic: 'products',
    icon: 'faqExternalLoader',
    q: 'Is the loader injected into the game folder?',
    a: `Valorant Hacks runs external with cloud config sync—no files injected into the Valorant game folder. Vanguard risk still applies. See {{PRODUCTS_HUB}}.`,
  },
  {
    id: 'blog-vs-hacks',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are blog hack codes the same as ranked hacks?',
    a: `No. Blog tips about practice-range or custom modes are not the same as ranked modules. Ranked Valorant hacks are separate products—see {{LITE}}, {{PRO}} and {{ELITE}}.`,
  },
  {
    id: 'blog-setup',
    topic: 'blog',
    icon: 'faqBlogSetup',
    q: 'Where do blog setup guides point for purchase?',
    a: `Guides link to tier pages and {{PRODUCTS_HUB}}. Checkout runs through our secure partner—never paste loader files from random Discord DMs.`,
  },
  {
    id: 'compare-plans',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Where do I compare plans side by side?',
    a: `Each hack tier page includes a compare table. The {{FAQ_PAGE}} collects product, hack and blog answers in one place.`,
  },
  {
    id: 'who-lite',
    topic: 'plans',
    icon: 'faqWhoLite',
    q: 'Who should stay on Lite?',
    a: `Players who only want map awareness—ESP, ability markers, and radar—and will not touch aimbot automation. If you keep enabling combo aimbot, buy {{PRO}} instead.`,
    scopes: ['lite'],
  },
  {
    id: 'who-pro',
    topic: 'plans',
    icon: 'faqWhoPro',
    q: 'Who should buy Pro?',
    a: `Ranked players who want aim assist and bone select with wall ESP included. Pro is the tier for that set on hacksvalorant.com.`,
    scopes: ['pro'],
  },
  {
    id: 'who-elite',
    topic: 'plans',
    icon: 'faqWhoElite',
    q: 'Who should buy Elite?',
    a: `Players who want utility markers, Triggerbot, skin preview tools and priority patch delivery when slots are open.`,
    scopes: ['elite'],
  },
  {
    id: 'eac-update',
    topic: 'safety',
    icon: 'faqEacUpdate',
    q: 'What should I do after a Vanguard update?',
    a: a('Check hacksvalorant.com status and Discord #status. Do not launch until the banner shows online. Load conservative presets after any patch.'),
  },
  {
    id: 'discord-help',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get install help?',
    a: a('Open Discord after purchase with your order email, Windows version and Valorant client build. Staff walk through loader setup live.'),
  },
  {
    id: 'zero-build-ranked',
    topic: 'plans',
    icon: 'faqZoomRanked',
    q: 'Do tiers work in Deathmatch and ranked?',
    a: `Yes—{{LITE}}, {{PRO}} and {{ELITE}} include Deathmatch and ranked presets in the portal. Tune distance caps and input delay before your first queue.`,
  },
  {
    id: 'zoom-hack',
    topic: 'esp',
    icon: 'faqZoomHack',
    q: 'Which tier includes radar hack?',
    a: `Radar ships on {{LITE}} and carries through {{PRO}} and {{ELITE}}. Mini-radar helps zone awareness without guessing rotates.`,
    scopes: ['lite'],
  },
  {
    id: 'auto-farm',
    topic: 'scripts',
    icon: 'faqAutoFarm',
    q: 'Which tier includes utility markers and spike readouts?',
    a: `Utility markers, rotate callouts, and the spike timer readout are {{ELITE}} only. {{PRO}} covers combat aimbot without those extras.`,
    scopes: ['elite'],
  },
  {
    id: 'private-hacks',
    topic: 'safety',
    icon: 'faqPrivateCheats',
    q: 'What are private Valorant hacks?',
    a: a('Private means per-user keys and maintained builds—not public zip packs. Valorant Hacks ships portal delivery for ESP, aimbot and wall ESP tiers.'),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `This site includes landing FAQs and per-page sections. See the {{FAQ_PAGE}} for all product, hack and blog answers—or read {{BLOG}} for deep guides.`,
  },
];

export const siteFaqs: SiteFaqItem[] = withExpandedAnswers(rawSiteFaqs);

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'ban-risk', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

/** Shared FAQ block copy + filters (home, /faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Valorant hacks FAQ',
  subtitle: 'Filter by hack plans, wall ESP, aimbot, products, setup and guides.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'safety',
  'products',
  'blog',
  'setup',
];

/** Section copy when FAQ list is scoped to the current page (not /faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'Hack FAQ',
  title: 'Valorant hacks questions',
  subtitle: 'Straight answers on aimbot, ESP, bans and setup — see the full FAQ for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter(
    (f) =>
      !f.scopes &&
      ['setup', 'safety', 'plans', 'esp', 'scripts'].includes(f.topic),
  );
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const tierCompare = siteFaqs.filter((f) =>
    ['rank-lite-vs-pro', 'compare-plans', 'undetected', 'eac-update'].includes(f.id),
  );

  const combined =
    kind === 'tier'
      ? [...scoped, ...tierCompare, ...general.slice(0, 8)]
      : [...scoped, ...general.slice(0, 6)];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-guide-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Should I use console hack codes in ranked?',
      a: a('No. Custom-game-only tricks do not apply in ranked. Ranked requires separate Valorant hacks from hacksvalorant.com tiers.'),
    },
    {
      id: 'blog-guide-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which tier matches this guide?',
      a: `Awareness guides → {{LITE}}. Script and combo guides → {{PRO}}. Bot and kill-steal topics → {{ELITE}}.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: a('Check the article date and the live status banner. Patch-day articles note when modules change—Discord #status has the latest build notes.'),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout—not from third-party links in comments or DMs.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test in a lobby first?',
      a: a('Yes. Load conservative presets in a custom game or Deathmatch before ranked. Tune input delay and ESP distance caps over several sessions.'),
    },
  ],
  Security: [
    {
      id: 'blog-sec-eac',
      topic: 'blog',
      icon: 'faqBlogSecEac',
      q: 'Does this article guarantee undetected status?',
      a: a('No article replaces the live status banner. Undetected is a point-in-time label—stop if status shows updating or detected.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to {{LITE}}, {{PRO}}, {{ELITE}} and {{PRODUCTS_HUB}}. Feature lists on product pages are authoritative for checkout.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: a('Open Discord with your order email and the article slug. Staff reference the same portal presets mentioned in guides.'),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: a('Re-check status after every Valorant update. Portal presets update with patch notes—reload configs instead of copying old sliders.'),
  },
];

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('map-hack') || slug.includes('esp') || slug.includes('ward')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which tier covers wall ESP from this article?',
      a: `{{LITE}} includes player ESP, ability markers, and radar. {{PRO}} adds combat aimbot on the same overlay stack.`,
    });
  }
  if (slug.includes('script') || slug.includes('combo') || slug.includes('auto-combo')) {
    slugHints.push({
      id: 'blog-slug-scripts',
      topic: 'scripts',
      icon: 'faqBlogSlugScripts',
      q: 'Which tier includes the aimbot in this article?',
      a: `{{PRO}} and {{ELITE}} ship Aimbot and related modules. {{LITE}} is wall ESP only.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('ban') || slug.includes('eac')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does this article replace HWID or UGC products?',
      a: `Recovery guides complement {{HWID}} and {{UGC}}—read product pages for workflow scope and realistic outcomes.`,
    });
  }

  return withExpandedAnswers([...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8));
}

export const compareRows = [
  { feature: 'Player ESP & player boxes', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Ability and spike markers', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Rotate callouts', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Radar', icon: 'compareZoomHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Streamproof overlay', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'Mini wall ESP overlay', icon: 'compareRadarHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Aimbot', icon: 'compareAutoCombo' as const, lite: false, pro: true, elite: true },
  { feature: 'Smooth Aim & Sticky Aim', icon: 'compareSmoothAim' as const, lite: false, pro: true, elite: true },
  { feature: 'Bone select', icon: 'compareTargetSelector' as const, lite: false, pro: true, elite: true },
  { feature: 'Aim assist', icon: 'compareHotkeyMacros' as const, lite: false, pro: true, elite: true },
  { feature: 'FOV radius drawing', icon: 'compareAbilityRadius' as const, lite: false, pro: true, elite: true },
  { feature: 'Smoke alert integration', icon: 'compareSmokeAlert' as const, lite: false, pro: true, elite: true },
  { feature: 'Spike timer readout', icon: 'compareAutoFarm' as const, lite: false, pro: false, elite: true },
  { feature: 'Triggerbot', icon: 'compareAutoKillSteal' as const, lite: false, pro: false, elite: true },
  { feature: 'Recoil control', icon: 'compareAutoShieldBreak' as const, lite: false, pro: false, elite: true },
  { feature: 'Full wall ESP suite', icon: 'compareFullMapHack' as const, lite: false, pro: false, elite: true },
  { feature: 'Skin preview tools (Loadout Pack)', icon: 'compareSkinChanger' as const, lite: false, pro: false, elite: true },
  { feature: 'Priority patch queue', icon: 'comparePriorityPatch' as const, lite: false, pro: false, elite: true },
  { feature: 'Direct dev Discord support', icon: 'compareDevSupport' as const, lite: false, pro: false, elite: true },
  { feature: 'Cloud config backup', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
];
