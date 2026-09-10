import { Subscription } from '@/types';

const FREE_LIMIT = 3;

type SubscriptionInput = { plan: string; generationsUsed: number; generationsLimit: number } | null;

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
    price: 4.99,
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
    price: 19.99,
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

export function canGenerate(subscription: SubscriptionInput): boolean {
  if (!subscription) return true;
  if (subscription.plan === 'PRO' || subscription.plan === 'ENTERPRISE') return true;
  return subscription.generationsUsed < subscription.generationsLimit;
}
