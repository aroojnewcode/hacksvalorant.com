/** Primary Zadeyo affiliate checkout (go link + product path). */
export const VALORANT_CHECKOUT_URL =
  'https://zadeyo.com/go/UROOJ?to=%2Fproducts%2Fvalorant';

export const CHECKOUT_URLS = {
  valorant: VALORANT_CHECKOUT_URL,
  skinChanger: VALORANT_CHECKOUT_URL,
  hwidSpoofer: VALORANT_CHECKOUT_URL,
  ugc: VALORANT_CHECKOUT_URL,
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
/** /go/valorant/ is the SSR checkout bridge (no 302). Other /go/* paths redirect out. */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
