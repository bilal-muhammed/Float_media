'use client';

import { Plan } from '@/types';
import { PLANS } from '@/services/subscription';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpgradeCTAProps {
  currentPlan: Plan;
  onUpgrade?: (plan: Plan) => void;
}

const planIcons: Record<Plan, typeof Sparkles> = { FREE: Sparkles, PRO: Zap, ENTERPRISE: Building2 };

export default function UpgradeCTA({ currentPlan, onUpgrade }: UpgradeCTAProps) {
  return (
    <div className="space-y-8">
      <div>
        <p className="section-label">Pricing</p>
        <h2 className="section-title">Upgrade Your Plan</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {(Object.keys(PLANS) as Plan[]).map((planKey) => {
          const plan = PLANS[planKey];
          const Icon = planIcons[planKey];
          const isCurrent = planKey === currentPlan;
          const isUpgrade = !isCurrent && planKey !== 'FREE';
          return (
            <Card key={planKey} className={cn('flex flex-col', planKey === 'PRO' && 'border-[#8b7cf7]/30')}>
              {planKey === 'PRO' && <div className="mb-4 text-xs font-semibold tracking-widest text-[#8b7cf7] uppercase">Most Popular</div>}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8b7cf7]/10">
                <Icon className="h-5 w-5 text-[#8b7cf7]" />
              </div>
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-white">${plan.price}</span>
                <span className="text-[#555570]">/{plan.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#8b7cf7]" />
                    <span className="text-sm text-[#8888a0]">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {isCurrent ? (
                  <Button variant="secondary" className="w-full" disabled>Current Plan</Button>
                ) : isUpgrade ? (
                  <Button className="w-full" onClick={() => onUpgrade?.(planKey)}>Upgrade to {plan.name}</Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>Downgrade</Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
