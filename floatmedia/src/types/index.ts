export type Plan = 'FREE' | 'PRO' | 'ENTERPRISE';

export type BrandVoice = 'friendly' | 'professional' | 'inspirational' | 'technical' | 'witty';
export type DetailLevel = 'concise' | 'detailed' | 'ultra-detailed';

export type PlatformType = 'X' | 'LINKEDIN' | 'INSTAGRAM' | 'FACEBOOK' | 'TIKTOK';

export type PostStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  subscription?: Subscription;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: Plan;
  generationsUsed: number;
  generationsLimit: number;
  currentPeriodStart: Date;
  currentPeriodEnd?: Date;
}

export interface Persona {
  id: string;
  userId: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  description?: string;
  brandVoice: BrandVoice;
  detailLevel: DetailLevel;
  platforms: Platform[];
  posts?: Post[];
  createdAt: Date;
}

export interface Platform {
  id: string;
  personaId: string;
  type: PlatformType;
  handle?: string;
  accountId?: string;
  isActive: boolean;
}

export interface Post {
  id: string;
  userId: string;
  personaId?: string;
  platformId?: string;
  content: string;
  hashtags: string[];
  scheduledAt?: Date;
  publishedAt?: Date;
  status: PostStatus;
  engagement?: Record<string, unknown>;
  createdAt: Date;
}

export interface ApiKey {
  id: string;
  userId: string;
  platform: PlatformType;
  apiKey: string;
  apiSecret?: string;
  isActive: boolean;
}

export interface SocialAccount {
  id: string;
  userId: string;
  platform: PlatformType;
  accountId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  isActive: boolean;
}

export interface ContentGeneration {
  content: string;
  hashtags: string[];
  platform: PlatformType;
  characterCount: number;
  withinLimit: boolean;
}

export interface PlatformLimits {
  platform: PlatformType;
  maxCharacters: number;
  maxHashtags: number;
  name: string;
}

export const PLATFORM_LIMITS: PlatformLimits[] = [
  { platform: 'X', maxCharacters: 280, maxHashtags: 5, name: 'X (Twitter)' },
  { platform: 'LINKEDIN', maxCharacters: 3000, maxHashtags: 5, name: 'LinkedIn' },
  { platform: 'INSTAGRAM', maxCharacters: 2200, maxHashtags: 30, name: 'Instagram' },
  { platform: 'FACEBOOK', maxCharacters: 63206, maxHashtags: 10, name: 'Facebook' },
  { platform: 'TIKTOK', maxCharacters: 2200, maxHashtags: 10, name: 'TikTok' },
];

export const BRAND_VOICES: { value: BrandVoice; label: string; description: string }[] = [
  { value: 'friendly', label: 'Friendly', description: 'Warm, approachable, and conversational' },
  { value: 'professional', label: 'Professional', description: 'Polished, authoritative, and business-focused' },
  { value: 'inspirational', label: 'Inspirational', description: 'Motivating, uplifting, and empowering' },
  { value: 'technical', label: 'Technical', description: 'Detailed, data-driven, and expert-level' },
  { value: 'witty', label: 'Witty', description: 'Clever, humorous, and engaging' },
];

export const DETAIL_LEVELS: { value: DetailLevel; label: string; description: string }[] = [
  { value: 'concise', label: 'Concise', description: 'Short, punchy, and to the point' },
  { value: 'detailed', label: 'Detailed', description: 'Balanced depth with readability' },
  { value: 'ultra-detailed', label: 'Ultra-Detailed', description: 'Comprehensive and in-depth' },
];
