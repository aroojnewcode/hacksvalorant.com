export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: 14,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments: [{ author: 'guide_team', age: 'From the guide', score: 0, body: tip }],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'valorant-map-awareness',
    title: 'What does map awareness include in the guide?',
    upvotes: 73,
    excerpt: 'A quick breakdown of player, ability, rotate, and smoke information covered by the map awareness guide.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Valorant wall ESP setup guide',
    sourcePath: '/blog/valorant-esp-setup/',
    answer:
      'The guide covers player ESP, ability and spike markers, rotate timing, smoke alerts, and last-seen positions. The exact options depend on the selected product tier.',
    detail:
      'It recommends starting with a restrained layout and enabling only the information you can read comfortably during a round.',
    tip: 'Keep the overlay uncluttered: begin with the core indicators, then adjust the range and visibility settings one at a time.',
  }),
  guideDiscussion({
    slug: 'map-overlay-setup',
    title: 'How should I set up the map overlay for the first time?',
    upvotes: 58,
    excerpt: 'Start with the basic display options, confirm the overlay in a practice session, then adjust one setting at a time.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Wall ESP overlay setup walkthrough (ESP guide)',
    sourcePath: '/blog/valorant-esp-setup/',
    answer:
      'Use the setup guide to enable the overlay, choose readable colors, and check that the indicators do not cover important parts of the game interface.',
    detail:
      'Test your layout in a Deathmatch or range session before relying on it in a live match. A simple configuration is easier to understand than turning on every option immediately.',
    tip: 'If the screen feels crowded, reduce the number of indicators before changing their size or position.',
  }),
  guideDiscussion({
    slug: 'camera-zoom',
    title: 'What minimap and radar settings are comfortable to play with?',
    upvotes: 44,
    excerpt: 'The radar guide focuses on finding a view that improves map context without cluttering your screen.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Valorant minimap radar guide',
    sourcePath: '/blog/valorant-minimap-radar/',
    answer:
      'There is no single ideal setting for every player. The guide recommends adjusting gradually and checking that you can still track fights and callouts.',
    detail: 'Keep a quick reset to the default view available so you can compare the wider view and return to familiar framing.',
    tip: 'Change one step at a time and play a short practice session before settling on a new radar layout.',
  }),
  guideDiscussion({
    slug: 'aimbot-delay',
    title: 'How do delay and smoothness settings affect aimbot?',
    upvotes: 32,
    excerpt: 'A practical question about timing, crosshair readability, and why the aimbot guide recommends conservative tuning.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Valorant aimbot for ranked play',
    sourcePath: '/blog/valorant-aimbot-ranked/',
    answer:
      'Delay and smoothness control how fast the aimbot aligns with targets. The guide recommends starting with higher smoothness and testing in the range before changing values.',
    detail: 'A consistent configuration is easier to review and tune than changing several values at once.',
    tip: 'Keep a note of each configuration you try so you can return to the last setup that behaved as expected.',
  }),
  guideDiscussion({
    slug: 'aimbot-practice',
    title: 'What is a good way to practice aimbot settings?',
    upvotes: 29,
    excerpt: 'Use a repeatable agent and weapon setup, learn the sequence, and check timing in a controlled lobby.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Valorant aimbot and weapon tuning',
    sourcePath: '/blog/valorant-aimbot-weapons/',
    answer:
      'Choose one agent and one weapon class to practice at a time. The guide walks through example drills and explains how FOV and bone priority fit together.',
    detail: 'The range or a custom game lets you repeat sequences without the pressure of a full competitive match.',
    tip: 'Learn manual aim patterns first; that makes it much easier to spot when automation feels off.',
  }),
  guideDiscussion({
    slug: 'elite-tier-tools',
    title: 'What additional tools are included in the Elite tier?',
    upvotes: 67,
    excerpt: 'The Elite guide explains how its extra utility modules compare with the Lite and Pro feature sets.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'Valorant Elite tier guide',
    sourcePath: '/blog/valorant-elite-tier/',
    answer:
      'The guide describes Elite as including the Lite and Pro feature sets plus additional utilities such as utility markers, triggerbot, recoil helpers, and skin preview tools.',
    detail: 'It also covers who may benefit from the extra modules and why it makes sense to understand the simpler feature set first.',
    tip: 'Compare the included features against your needs before choosing a tier; the full comparison is linked in the guide.',
  }),
  guideDiscussion({
    slug: 'lite-pro-diff',
    title: 'How do Lite and Pro differ in practice?',
    upvotes: 53,
    excerpt: 'Lite centers on awareness features, while Pro adds aim automation; here is the short version.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'Valorant Lite vs Pro: which tier fits you',
    sourcePath: '/blog/valorant-lite-vs-pro/',
    answer:
      'The comparison guide describes Lite as focused on awareness tools such as ESP, ability markers, and minimap aids. Pro adds aimbot-style modules on top of that foundation.',
    detail: 'The right choice depends on whether you need map information alone or also want the additional aim modules described in the comparison.',
    tip: 'Use the full side-by-side comparison to check specific modules before making a decision.',
  }),
  guideDiscussion({
    slug: 'loadout-tools',
    title: 'What should I know about skin preview / loadout utilities?',
    upvotes: 38,
    excerpt: 'The product guide explains how cosmetic previews work and what to expect from the utility.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'Valorant skin preview and loadout tools guide',
    sourcePath: '/blog/valorant-skin-preview/',
    answer:
      'The guide describes loadout utilities as local cosmetic preview tools. It explains setup, supported options, and how to restore the default appearance.',
    detail: 'Review the compatibility notes and follow the current setup instructions before using the utility.',
    tip: 'Cosmetic changes are local previews; check the guide for current limitations and setup steps.',
  }),
  guideDiscussion({
    slug: 'vanguard-verify',
    title: 'What should I do if Vanguard cannot verify my Valorant install?',
    upvotes: 24,
    excerpt: 'Start with a repair through the Riot client and a clean restart before assuming the issue is an account restriction.',
    category: 'Patch Talk',
    categoryTone: 'orange',
    sourceTitle: 'Vanguard unable to verify Valorant',
    sourcePath: '/blog/vanguard-verify-fix/',
    answer:
      'The troubleshooting guide says the message can result from game-file problems or software conflicts and does not always mean an account ban. First repair Valorant files through the Riot client.',
    detail: 'It also recommends fully exiting the client, restarting the PC, and checking for conflicting overlays before trying more disruptive steps.',
    tip: 'Test a normal Riot client launch before starting other software so you can narrow down the cause.',
  }),
  guideDiscussion({
    slug: 'external-loader',
    title: 'What does “external loader” mean?',
    upvotes: 46,
    excerpt: 'The external software guide explains the term and outlines the general setup described on the site.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'Valorant external loader guide',
    sourcePath: '/blog/valorant-external-loader/',
    answer:
      'The article uses “external” to describe software that runs separately from the Valorant process and presents its interface as an overlay.',
    detail:
      'It discusses the architecture at a high level and explains setup, patch updates, and differences described between external and internal-style tools.',
    tip: 'Check compatibility and current status information whenever Valorant or Vanguard receives an update.',
  }),
  guideDiscussion({
    slug: 'stream-proof-obs',
    title: 'How can I check whether OBS captures an overlay?',
    upvotes: 21,
    excerpt: 'The stream-proof setup guide recommends recording a short test and checking the playback before streaming.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Stream-proof overlay setup for Valorant',
    sourcePath: '/blog/valorant-stream-proof/',
    answer:
      'Record a short local test with the exact OBS scene and capture mode you plan to use, then review the playback for any overlay elements.',
    detail:
      'The guide recommends testing game capture and display capture separately, since capture methods and multi-monitor setups can behave differently.',
    tip: 'Do not rely on the preview alone; review a saved recording from the same scene you intend to stream.',
  }),
  guideDiscussion({
    slug: 'after-hwid-change',
    title: 'What should I check after changing PCs or hardware?',
    upvotes: 33,
    excerpt: 'The HWID guide covers common setup checks and when to contact support for an account or device reset.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'Valorant HWID spoofer after ban',
    sourcePath: '/blog/valorant-hwid-ban/',
    answer:
      'Start by checking the account and device instructions for your product. The guide explains common HWID questions and when a reset request may be needed.',
    detail: 'Avoid changing several system settings at once. If the product does not recognize your device, contact support with the relevant error details.',
    tip: 'Use the official support path for device resets instead of relying on unrelated third-party tools.',
  }),
  guideDiscussion({
    slug: 'before-install',
    title: 'What should I review before installing a new tool?',
    upvotes: 18,
    excerpt: 'Check the official setup steps, current compatibility notes, and support information before proceeding.',
    category: 'Community',
    categoryTone: 'green',
    sourceTitle: 'Valorant hack features guide',
    sourcePath: '/blog/valorant-hack-features/',
    answer: 'Read the feature and setup information first, confirm that it matches your system, and check the current update/status notes.',
    detail: 'The site guide describes the available feature groups and links to more specific setup articles for individual modules.',
    tip: 'Use the linked product and support pages as the source of truth for current availability and compatibility.',
  }),
  guideDiscussion({
    slug: 'choose-tier',
    title: 'How do I choose the right Valorant product tier?',
    upvotes: 48,
    excerpt: 'Compare the feature sets first, then follow the official checkout and setup instructions for your selection.',
    category: 'Community',
    categoryTone: 'green',
    sourceTitle: 'How to buy Valorant hacks in 2026',
    sourcePath: '/blog/buy-valorant-hacks/',
    answer:
      'The buying guide recommends comparing included features and choosing the tier that fits your needs before continuing through the official checkout.',
    detail: 'It covers the purchase flow, account access, downloading the current build, and checking setup instructions before launching.',
    tip: 'If you have a payment or account question, use the site support page and avoid sharing purchase details publicly.',
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'lobby-codes-ranked',
    category: 'General',
    categoryTone: 'purple',
    title: 'Can I use practice settings in ranked matchmaking?',
    excerpt: 'Quick answer from the practice guide: Shooting Range and custom drills do not carry into ranked playlists.',
    author: 'guide_team',
    age: '2 hours ago',
    commentsCount: 3,
    upvotes: 128,
    flair: 'Guide Q&A',
    sourceTitle: 'Valorant range practice: drills before ranked',
    sourcePath: '/blog/valorant-range-practice/',
    body: [
      'No. The Shooting Range and bot-style lobbies are for practice only. They do not apply third-party modules to ranked queues on the Riot client.',
      'Use the range to learn aimbot smoothness, ESP ranges, and loadouts. The guide explains the difference between practice drills and private Valorant hacks at checkout.',
    ],
    comments: [
      {
        author: 'mid_or_feed',
        age: '1 hour ago',
        score: 24,
        body: 'Correct: run range or Deathmatch drills before touching competitive presets.',
      },
      {
        author: 'ancient_archivist',
        age: '48 min. ago',
        score: 11,
        body: 'The guide covers rifle, SMG, and shotgun drills. Keep ranked presets conservative after practice.',
      },
      {
        author: 'push_first',
        age: '35 min. ago',
        score: 8,
        body: 'Useful distinction. Practice tools are not the same as live match features.',
      },
    ],
  },
  {
    slug: 'valorant-dev-console',
    category: 'General',
    categoryTone: 'purple',
    title: 'How do I open developer-style options for practice?',
    excerpt: 'Use in-client practice modes and custom game settings—see the hack setup walkthrough for the full path.',
    author: 'guide_team',
    age: '4 hours ago',
    commentsCount: 2,
    upvotes: 86,
    flair: 'Guide Q&A',
    sourceTitle: 'Valorant hack setup and practice workflow',
    sourcePath: '/blog/valorant-range-practice/',
    body: [
      'Valorant does not expose a public developer console like some older titles. For practice, use the in-client range, custom games, and the steps in the setup guide for your product.',
      'If a command or bind does nothing, confirm you are in a supported practice context and that your loader build matches the current patch notes.',
    ],
    comments: [
      {
        author: 'pos4_roamer',
        age: '3 hours ago',
        score: 17,
        body: 'Rebind keys in Riot settings if defaults conflict with your keyboard layout.',
      },
      {
        author: 'carry_curious',
        age: '2 hours ago',
        score: 9,
        body: 'Custom game permissions matter—some options only apply when the host allows them.',
      },
    ],
  },
  {
    slug: 'valorant-high-ground',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'What is the safest way to practice off-angles and elevation?',
    excerpt: 'Use the range or a custom game with ESP briefly to study sight lines, then fight without staring at overlays.',
    author: 'guide_team',
    age: '6 hours ago',
    commentsCount: 2,
    upvotes: 64,
    flair: 'Guide Q&A',
    sourceTitle: 'Valorant training tips for aimbot and ESP',
    sourcePath: '/blog/valorant-range-practice/',
    body: [
      'Practice in the Shooting Range or a custom lobby. Enable ESP boxes briefly to inspect angles and spike lines, then fight with overlays minimized.',
      'Repeat the same route a few times so sight lines stick without waiting for a full competitive match.',
    ],
    comments: [
      {
        author: 'stack_and_pull',
        age: '5 hours ago',
        score: 13,
        body: 'I peek with ESP on, then disable boxes and re-check the same angle. Helps for elevated holds.',
      },
      {
        author: 'map_reader',
        age: '4 hours ago',
        score: 6,
        body: 'Replaying the same position in practice beats learning only in ranked.',
      },
    ],
  },
  {
    slug: 'after-valorant-patch',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'What should I check before playing after a Valorant patch?',
    excerpt: 'The patch-day checklist recommends checking build status, updating the loader, and testing in a low-stakes mode first.',
    author: 'guide_team',
    age: '9 hours ago',
    commentsCount: 2,
    upvotes: 42,
    flair: 'Guide Q&A',
    sourceTitle: 'Vanguard patch day checklist',
    sourcePath: '/blog/vanguard-patch-checklist/',
    body: [
      'Check the current build/status notice first. After a game update, wait for a compatible build, update the loader, then verify setup in Deathmatch or the range before returning to ranked.',
      'If anything behaves unexpectedly, stop and review the status notes rather than assuming the old setup still applies.',
    ],
    comments: [
      {
        author: 'farm_pattern',
        age: '8 hours ago',
        score: 12,
        body: 'Testing after the update before ranked is the part I used to skip. Now I read the build note and run a quick Deathmatch.',
      },
      {
        author: 'support_main_5',
        age: '7 hours ago',
        score: 7,
        body: 'Agree. If the build has not caught up, wait—following the checklist beats guessing.',
      },
    ],
  },
  {
    slug: 'lite-vs-pro',
    category: 'Community',
    categoryTone: 'green',
    title: 'Lite or Pro: which tier includes player aimbot?',
    excerpt: 'Our comparison guide breaks down the difference: Lite focuses on vision tools; Pro adds aim modules.',
    author: 'guide_team',
    age: '12 hours ago',
    commentsCount: 1,
    upvotes: 31,
    flair: 'Guide Q&A',
    sourceTitle: 'Valorant Lite vs Pro: feature comparison',
    sourcePath: '/blog/valorant-lite-vs-pro/',
    body: [
      'According to the comparison guide, Lite centers on map awareness features such as player ESP, ability markers, and minimap aids. Pro includes those features and adds aim automation such as smooth aim, sticky aim, bone priority, and hotkey profiles.',
      'The best fit depends on which features you need. Read the full comparison before choosing.',
    ],
    comments: [
      {
        author: 'one_more_game',
        age: '10 hours ago',
        score: 10,
        body: 'The comparison page shows which modules are in each tier instead of only listing headlines.',
      },
    ],
  },
  {
    slug: 'valorant-aim-practice',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'How can I practice weapon aim without waiting for a real match?',
    excerpt: 'Use the range or a custom game and drill rifle, SMG, and pistol profiles with repeatable resets.',
    author: 'guide_team',
    age: '1 day ago',
    commentsCount: 2,
    upvotes: 27,
    flair: 'Guide Q&A',
    sourceTitle: 'Valorant range practice: aim drills before ranked',
    sourcePath: '/blog/valorant-range-practice/',
    body: [
      'Use the Shooting Range or a custom lobby. Practice one weapon profile at a time—rifle, SMG, then pistol—and reset between attempts.',
      'For realistic timing, use your competitive smoothness values in practice before enabling automation in live games.',
    ],
    comments: [
      {
        author: 'mid_or_feed',
        age: '20 hours ago',
        score: 10,
        body: 'Start with a still target and repeat the same spray until tracking feels automatic.',
      },
      {
        author: 'ancient_archivist',
        age: '18 hours ago',
        score: 5,
        body: 'Keep competitive presets conservative—the range can hide how snappy aim looks in replays.',
      },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
