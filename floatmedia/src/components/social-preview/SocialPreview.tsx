'use client';

import { PlatformType } from '@/types';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';

interface SocialPreviewProps {
  platform: PlatformType;
  content: string;
  hashtags: string[];
  personaName?: string;
}

export default function SocialPreview({ platform, content, hashtags, personaName = 'Your Name' }: SocialPreviewProps) {
  const hashtagString = hashtags.map(h => `#${h}`).join(' ');

  if (platform === 'LINKEDIN') {
    return (
      <div className="overflow-hidden rounded-xl border border-[#1e1e35] bg-[#12121e]">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-[#8b7cf7]/20" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{personaName}</span>
                <span className="text-xs text-[#555570]">• 1st</span>
              </div>
              <div className="text-xs text-[#555570]">Creator • 2h</div>
            </div>
            <MoreHorizontal className="h-5 w-5 text-[#555570]" />
          </div>
          <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#c8c8d8]">{content}</div>
          {hashtagString && <div className="mt-2 text-sm text-[#8b7cf7]">{hashtagString}</div>}
        </div>
        <div className="border-t border-[#1e1e35] px-4 py-2">
          <div className="flex items-center justify-between">
            {[
              { icon: Heart, label: 'Like' },
              { icon: MessageCircle, label: 'Comment' },
              { icon: Repeat2, label: 'Repost' },
              { icon: Share, label: 'Send' },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="flex items-center gap-1.5 text-[#555570] hover:text-[#8888a0] transition-colors">
                <Icon className="h-4 w-4" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (platform === 'X') {
    return (
      <div className="overflow-hidden rounded-xl border border-[#1e1e35] bg-[#12121e]">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#1e1e35]" />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-white">{personaName}</span>
                <svg className="h-4 w-4 text-[#8b7cf7]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                </svg>
              </div>
              <div className="text-xs text-[#555570]">@handle • 2h</div>
            </div>
            <MoreHorizontal className="h-5 w-5 text-[#555570]" />
          </div>
          <div className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-[#c8c8d8]">{content}</div>
          {hashtagString && <div className="mt-1 text-[15px] text-[#8b7cf7]">{hashtagString}</div>}
        </div>
        <div className="border-t border-[#1e1e35] px-4 py-3">
          <div className="flex items-center justify-between text-[#555570]">
            <button className="flex items-center gap-1.5 hover:text-[#8b7cf7] transition-colors">
              <MessageCircle className="h-4 w-4" /><span className="text-xs">12</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-[#22c55e] transition-colors">
              <Repeat2 className="h-4 w-4" /><span className="text-xs">5</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-[#ef4444] transition-colors">
              <Heart className="h-4 w-4" /><span className="text-xs">48</span>
            </button>
            <button className="hover:text-[#8b7cf7] transition-colors"><Share className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#1e1e35] bg-[#12121e] p-4">
      <div className="text-sm text-[#555570]">Preview not available for {platform}</div>
    </div>
  );
}
