import { normalizeSeoPath } from './pageSeo';

/** Footer logo alt text — short, descriptive (not keyword-stuffed). */
const LOGO_ALT_BY_PATH: Record<string, string> = {
  '/products/valorant-cheats/': 'Valorant – hacks shop logo',
  '/about/': 'Valorant Hacks logo',
  '/blog/': 'Valorant hack guides – logo',
  '/faq/': 'Faq – logo',
  '/forum/': 'Forum – logo',
  '/privacy/': 'Privacy – logo',
  '/support/': 'Support – logo',
  '/terms/': 'Terms – logo',
  '/products/valorant-cheats/utilities/': 'Utilities – Valorant Hacks logo',
  '/valorant-hacks/': 'Valorant Hacks logo',
};

export function footerLogoAltForPath(pathname: string): string {
  const path = normalizeSeoPath(pathname);
  return LOGO_ALT_BY_PATH[path] ?? 'Valorant Hacks logo';
}
