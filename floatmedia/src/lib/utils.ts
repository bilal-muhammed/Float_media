import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PLATFORM_LIMITS, type PlatformType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCharacterLimit(platform: PlatformType): number {
  const limit = PLATFORM_LIMITS.find(l => l.platform === platform);
  return limit?.maxCharacters ?? 280;
}

export function getCharacterStatus(count: number, limit: number): 'over' | 'near' | 'safe' {
  const ratio = count / limit;
  if (ratio > 1) return 'over';
  if (ratio > 0.9) return 'near';
  return 'safe';
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function generateHashtags(content: string, count: number = 5): string[] {
  const words = content.toLowerCase().split(/\s+/);
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'don', 'now']);
  
  const keywords = words
    .filter(w => w.length > 3 && !stopWords.has(w))
    .filter((w, i, arr) => arr.indexOf(w) === i)
    .slice(0, count);
  
  return keywords.map(k => k.replace(/[^a-z0-9]/g, '')).filter(Boolean);
}
