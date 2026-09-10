'use server';

import { generatePost } from '@/services/generation';
import { PlatformType, BrandVoice, DetailLevel, Post } from '@/types';

interface GenerateContentParams {
  topic: string;
  platform: PlatformType;
  brandVoice: BrandVoice;
  detailLevel: DetailLevel;
  personaName?: string;
  personaRole?: string;
  customInstructions?: string;
  userId: string;
}

export async function generateContentAction(params: GenerateContentParams) {
  const subscription = null;

  const result = await generatePost({
    ...params,
    subscription,
  });

  return result;
}

export async function savePost(post: Post): Promise<Post> {
  return post;
}

export async function getPosts(userId: string): Promise<Post[]> {
  return [];
}

export async function deletePost(postId: string): Promise<boolean> {
  return true;
}
