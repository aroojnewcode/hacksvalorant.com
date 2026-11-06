import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * External checkout URLs — server-side redirect targets only (never use as visible href).
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  valorant: 'valorant',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** All Buy now / checkout CTAs use the same Zadeyo go link. */
export function checkoutPath(_product: CheckoutProduct = 'valorant'): string {
  return CHECKOUT.valorant;
}

/** Default product checkout redirect (replaces legacy Discord CTAs). */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('valorant');

/** Map internal product slugs to checkout (single Zadeyo destination). */
export function checkoutForSlug(_slug: string): string {
  return CHECKOUT.valorant;
}

/** Resolve blog CTA or legacy href values to internal checkout paths. */
const GO_CHECKOUT_PATH = /^\/go\/[\w-]+\/?$/i;

export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    const normalized = href.startsWith('/') ? href : `/${href}`;
    if (GO_CHECKOUT_PATH.test(normalized)) {
      return CHECKOUT.valorant;
    }
    return normalized;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  // Legacy / encoded product paths → internal checkout
  if (href.includes('%2Fproducts%2Fcloud-dma') || href.includes('/products/cloud-dma')) {
    return checkoutPath('valorant');
  }
  if (href.includes('%2Fproducts%2Fskin-changer') || href.includes('/products/skin-changer')) {
    return checkoutPath('skinChanger');
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return checkoutPath('ugc');
  }
  if (
    href.includes('zadeyo.com/go/') ||
    href.includes('%2Fvalorant-hacks') ||
    href.includes('/valorant-hacks') ||
    href.includes('%2Fproducts%2Frainbow-six-siege') ||
    href.includes('%2Fproducts%2Frainbow-six-siege-hacks') ||
    href.includes('/products/rainbow-six-siege') ||
    href.includes('/products/mw4')
  ) {
    return checkoutPath('valorant');
  }

  return href;
}
