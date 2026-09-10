'use client';

import { PlatformType, PLATFORM_LIMITS } from '@/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PlatformSelectorProps {
  selected: PlatformType[];
  onChange: (platforms: PlatformType[]) => void;
  max?: number;
}

export default function PlatformSelector({ selected, onChange, max = 5 }: PlatformSelectorProps) {
  const toggle = (platform: PlatformType) => {
    if (selected.includes(platform)) {
      onChange(selected.filter(p => p !== platform));
    } else if (selected.length < max) {
      onChange([...selected, platform]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-widest text-[#555570] uppercase">Platforms</p>
        <span className="text-xs font-mono text-[#555570]">{selected.length}/{max}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {PLATFORM_LIMITS.map((limit) => {
          const isSelected = selected.includes(limit.platform);
          return (
            <button
              key={limit.platform}
              onClick={() => toggle(limit.platform)}
              disabled={!isSelected && selected.length >= max}
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-200',
                isSelected
                  ? 'border-[#8b7cf7]/50 bg-[#8b7cf7]/10'
                  : 'border-[#1e1e35] bg-[#12121e] hover:border-[#555570]',
                !isSelected && selected.length >= max && 'opacity-40 cursor-not-allowed'
              )}
            >
              {isSelected && (
                <div className="absolute right-1.5 top-1.5 rounded-full bg-[#8b7cf7] p-0.5">
                  <Check className="h-2.5 w-2.5 text-white" />
                </div>
              )}
              <div className="text-sm font-bold text-white">{limit.platform}</div>
              <div className="text-[10px] text-[#555570]">{limit.name}</div>
              <div className="text-[10px] font-mono text-[#555570]">{limit.maxCharacters.toLocaleString()}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
