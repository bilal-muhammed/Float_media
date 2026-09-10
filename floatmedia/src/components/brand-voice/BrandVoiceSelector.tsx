'use client';

import { BrandVoice, DetailLevel, BRAND_VOICES, DETAIL_LEVELS } from '@/types';
import { cn } from '@/lib/utils';

interface BrandVoiceSelectorProps {
  brandVoice: BrandVoice;
  detailLevel: DetailLevel;
  onBrandVoiceChange: (voice: BrandVoice) => void;
  onDetailLevelChange: (level: DetailLevel) => void;
}

export default function BrandVoiceSelector({
  brandVoice,
  detailLevel,
  onBrandVoiceChange,
  onDetailLevelChange,
}: BrandVoiceSelectorProps) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-[#555570] uppercase">Brand Voice</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {BRAND_VOICES.map((voice) => (
            <button
              key={voice.value}
              onClick={() => onBrandVoiceChange(voice.value)}
              className={cn(
                'rounded-lg border p-3 text-left transition-all duration-200',
                brandVoice === voice.value
                  ? 'border-[#8b7cf7]/50 bg-[#8b7cf7]/10'
                  : 'border-[#1e1e35] bg-[#12121e] hover:border-[#555570]'
              )}
            >
              <div className="text-sm font-medium text-white">{voice.label}</div>
              <div className="mt-1 text-xs text-[#555570] line-clamp-2">{voice.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-[#555570] uppercase">Detail Level</p>
        <div className="grid grid-cols-3 gap-2">
          {DETAIL_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => onDetailLevelChange(level.value)}
              className={cn(
                'rounded-lg border p-3 text-left transition-all duration-200',
                detailLevel === level.value
                  ? 'border-[#8b7cf7]/50 bg-[#8b7cf7]/10'
                  : 'border-[#1e1e35] bg-[#12121e] hover:border-[#555570]'
              )}
            >
              <div className="text-sm font-medium text-white">{level.label}</div>
              <div className="mt-1 text-xs text-[#555570]">{level.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
