import { Plan, Subscription } from '@/types';

const FREE_LIMIT = 3;
const PRO_MONTHLY = 4.99;
const ENTERPRISE_MONTHLY = 19.99;

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    period: 'month',
    features: [
      '3 content generations/month',
      '2 brand personas',
      'Basic analytics',
      'X & LinkedIn support',
    ],
    generationsLimit: FREE_LIMIT,
  },
  PRO: {
    name: 'Pro',
    price: PRO_MONTHLY,
    period: 'month',
    features: [
      'Unlimited generations',
      '10 brand personas',
      'Advanced analytics',
      'All platforms',
      'Priority support',
      'Custom brand voices',
    ],
    generationsLimit: Infinity,
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: ENTERPRISE_MONTHLY,
    period: 'month',
    features: [
      'Everything in Pro',
      'Unlimited personas',
      'API key integration',
      'Custom AI models',
      'Dedicated support',
      'Team collaboration',
      'White-label options',
    ],
    generationsLimit: Infinity,
  },
} as const;

export function canGenerate(subscription: Subscription | null): boolean {
  if (!subscription) return true; // Allow first-time users
  if (subscription.plan === 'PRO' || subscription.plan === 'ENTERPRISE') return true;
  return subscription.generationsUsed < subscription.generationsLimit;
}

export function getGenerationsRemaining(subscription: Subscription | null): number {
  if (!subscription) return FREE_LIMIT;
  if (subscription.plan === 'PRO' || subscription.plan === 'ENTERPRISE') return Infinity;
  return Math.max(0, subscription.generationsLimit - subscription.generationsUsed);
}

export function getPlanPrice(plan: Plan): number {
  return PLANS[plan].price;
}

export function getPlanFeatures(plan: Plan): string[] {
  return [...PLANS[plan].features];
}

export function getNextPlan(currentPlan: Plan): Plan | null {
  switch (currentPlan) {
    case 'FREE': return 'PRO';
    case 'PRO': return 'ENTERPRISE';
    case 'ENTERPRISE': return null;
  }
}
