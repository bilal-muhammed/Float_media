'use server';

import { Subscription, Plan } from '@/types';

export async function getSubscription(userId: string): Promise<Subscription | null> {
  return {
    id: '1',
    userId,
    plan: 'FREE',
    generationsUsed: 0,
    generationsLimit: 3,
    currentPeriodStart: new Date(),
  };
}

export async function updateSubscription(
  userId: string,
  plan: Plan
): Promise<Subscription> {
  return {
    id: '1',
    userId,
    plan,
    generationsUsed: 0,
    generationsLimit: plan === 'FREE' ? 3 : Infinity,
    currentPeriodStart: new Date(),
  };
}

export async function incrementGenerations(userId: string): Promise<Subscription> {
  const sub = await getSubscription(userId);
  if (!sub) throw new Error('No subscription found');

  return {
    ...sub,
    generationsUsed: sub.generationsUsed + 1,
  };
}
