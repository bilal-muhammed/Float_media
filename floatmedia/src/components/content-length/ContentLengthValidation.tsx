'use client';

import { PlatformType, PLATFORM_LIMITS } from '@/types';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ContentLengthValidationProps {
  content: string;
  platform: PlatformType;
}

export default function ContentLengthValidation({ content, platform }: ContentLengthValidationProps) {
  const limit = PLATFORM_LIMITS.find(l => l.platform === platform);
  if (!limit) return null;

  const count = content.length;
  const ratio = count / limit.maxCharacters;
  const status = ratio > 1 ? 'over' : ratio > 0.9 ? 'near' : 'safe';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#555570]">{limit.name}</span>
        <div className="flex items-center gap-1.5">
          {status === 'over' && <AlertCircle className="h-3.5 w-3.5 text-[#ef4444]" />}
          {status === 'safe' && count > 0 && <CheckCircle className="h-3.5 w-3.5 text-[#22c55e]" />}
          <span className={cn(
            'font-mono text-xs',
            status === 'over' && 'text-[#ef4444]',
            status === 'near' && 'text-[#eab308]',
            status === 'safe' && 'text-[#22c55e]'
          )}>
            {count.toLocaleString()} / {limit.maxCharacters.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-[#1e1e35]">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            status === 'over' && 'bg-[#ef4444]',
            status === 'near' && 'bg-[#eab308]',
            status === 'safe' && 'bg-[#8b7cf7]'
          )}
          style={{ width: `${Math.min(ratio * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
