export type ProductPlanId = 'monthly' | 'lifetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  duration: string;
  priceUsd: number;
  priceNote: string;
  popular?: boolean;
}

/** Matches Zadeyo Valorant offers (Monthly $35 / 31 days, Lifetime $150). */
const standardPlans: ProductPlan[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    duration: '31 days of access',
    priceUsd: 35,
    priceNote: '31 days',
    popular: true,
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    duration: 'Unlimited access',
    priceUsd: 150,
    priceNote: 'Lifetime',
  },
];

export function getProductPlans(_productSlug?: string): ProductPlan[] {
  return standardPlans;
}

export function getDefaultPlan(productSlug?: string): ProductPlan {
  const plans = getProductPlans(productSlug);
  return plans.find((plan) => plan.popular) ?? plans[0]!;
}

export function formatPlanPrice(usd: number): string {
  return Number.isInteger(usd) ? `$${usd}` : `$${usd.toFixed(2)}`;
}

/** Checkout uses a single Zadeyo URL; plan selection updates UI only. */
export function checkoutUrlWithPlan(baseUrl: string, _planId: ProductPlanId): string {
  return baseUrl;
}
