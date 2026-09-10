import { PlatformType, BrandVoice, DetailLevel, Post } from '@/types';
import { generateContent } from './ai';
import { canGenerate } from './subscription';

interface GeneratePostParams {
  topic: string;
  platform: PlatformType;
  brandVoice: BrandVoice;
  detailLevel: DetailLevel;
  personaName?: string;
  personaRole?: string;
  customInstructions?: string;
  userId: string;
  subscription: {
    plan: string;
    generationsUsed: number;
    generationsLimit: number;
  } | null;
}

interface GeneratePostResult {
  success: boolean;
  post?: Post;
  error?: string;
  generationsRemaining?: number;
}

export async function generatePost(params: GeneratePostParams): Promise<GeneratePostResult> {
  const { subscription } = params;

  if (!canGenerate(subscription)) {
    return {
      success: false,
      error: 'You have reached your monthly generation limit. Upgrade to Pro for unlimited generations.',
    };
  }

  try {
    const result = await generateContent({
      topic: params.topic,
      platform: params.platform,
      brandVoice: params.brandVoice,
      detailLevel: params.detailLevel,
      personaName: params.personaName,
      personaRole: params.personaRole,
      customInstructions: params.customInstructions,
    });

    const post: Post = {
      id: crypto.randomUUID(),
      userId: params.userId,
      content: result.content,
      hashtags: result.hashtags,
      status: 'DRAFT',
      createdAt: new Date(),
    };

    const newGenerationsUsed = (subscription?.generationsUsed ?? 0) + 1;
    const remaining = subscription?.plan === 'FREE'
      ? Math.max(0, (subscription?.generationsLimit ?? 3) - newGenerationsUsed)
      : undefined;

    return {
      success: true,
      post,
      generationsRemaining: remaining,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate content. Please try again.',
    };
  }
}
