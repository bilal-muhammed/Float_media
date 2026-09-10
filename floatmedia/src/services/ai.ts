import Anthropic from '@anthropic-ai/sdk';
import { BrandVoice, DetailLevel, PlatformType } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface GenerateContentParams {
  topic: string;
  platform: PlatformType;
  brandVoice: BrandVoice;
  detailLevel: DetailLevel;
  personaName?: string;
  personaRole?: string;
  customInstructions?: string;
}

export async function generateContent({
  topic,
  platform,
  brandVoice,
  detailLevel,
  personaName,
  personaRole,
  customInstructions,
}: GenerateContentParams): Promise<{ content: string; hashtags: string[] }> {
  const voiceDescriptions: Record<BrandVoice, string> = {
    friendly: 'warm, approachable, and conversational. Use a tone that feels like talking to a friend.',
    professional: 'polished, authoritative, and business-focused. Maintain credibility and expertise.',
    inspirational: 'motivating, uplifting, and empowering. Inspire action and positive change.',
    technical: 'detailed, data-driven, and expert-level. Include specific insights and analysis.',
    witty: 'clever, humorous, and engaging. Use wordplay and humor appropriately.',
  };

  const detailDescriptions: Record<DetailLevel, string> = {
    concise: 'Keep it short, punchy, and to the point. Maximum impact with minimum words.',
    detailed: 'Provide balanced depth with good readability. Include key details without overwhelming.',
    'ultra-detailed': 'Be comprehensive and in-depth. Cover all aspects thoroughly.',
  };

  const platformGuides: Record<PlatformType, string> = {
    X: 'Maximum 280 characters. Use short, punchy sentences. Hashtags work well. Thread potential.',
    LINKEDIN: 'Professional tone. Up to 3000 characters. Use line breaks for readability. Thought leadership.',
    INSTAGRAM: 'Visual-first platform. Up to 2200 characters. Hashtags are crucial (up to 30). Emojis welcome.',
    FACEBOOK: 'Conversational. Up to 63206 characters. Engage with questions. Share stories.',
    TIKTOK: 'Short-form video focused. Up to 2200 characters. Trendy, energetic, hook-first.',
  };

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a social media content creator. Generate a ${platform} post about: "${topic}"

Voice: ${voiceDescriptions[brandVoice]}
Detail Level: ${detailDescriptions[detailLevel]}
Platform Guide: ${platformGuides[platform]}
${personaName ? `Persona: ${personaName}${personaRole ? ` (${personaRole})` : ''}` : ''}
${customInstructions ? `Additional instructions: ${customInstructions}` : ''}

Return your response in this exact JSON format:
{
  "content": "The post content here",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3"]
}

Only return the JSON, no additional text.`,
      },
    ],
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  
  try {
    const parsed = JSON.parse(responseText);
    return {
      content: parsed.content || '',
      hashtags: parsed.hashtags || [],
    };
  } catch {
    return {
      content: responseText,
      hashtags: [],
    };
  }
}

export async function generateContentSuggestions(
  personaName: string,
  personaRole: string,
  brandVoice: BrandVoice,
  count: number = 3
): Promise<Array<{ topic: string; hook: string }>> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Generate ${count} social media content ideas for a CEO with these details:
Name: ${personaName}
Role: ${personaRole}
Voice: ${brandVoice}

Return as JSON array:
[
  {"topic": "topic", "hook": "engaging hook for the post"}
]

Only return the JSON.`,
      },
    ],
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  
  try {
    return JSON.parse(responseText);
  } catch {
    return [];
  }
}
