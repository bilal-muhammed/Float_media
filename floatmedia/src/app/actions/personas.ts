'use server';

import { Persona, BrandVoice, DetailLevel, PlatformType } from '@/types';

const personas: Persona[] = [];

export async function getPersonas(userId: string): Promise<Persona[]> {
  return personas.filter(p => p.userId === userId);
}

export async function createPersona(
  userId: string,
  data: {
    name: string;
    role?: string;
    description?: string;
    brandVoice: BrandVoice;
    detailLevel: DetailLevel;
    platforms: PlatformType[];
  }
): Promise<Persona> {
  const persona: Persona = {
    id: crypto.randomUUID(),
    userId,
    name: data.name,
    role: data.role,
    description: data.description,
    brandVoice: data.brandVoice,
    detailLevel: data.detailLevel,
    platforms: data.platforms.map(type => ({
      id: crypto.randomUUID(),
      personaId: '',
      type,
      isActive: true,
    })),
    createdAt: new Date(),
  };

  persona.platforms.forEach(p => { p.personaId = persona.id; });
  personas.push(persona);
  return persona;
}

export async function updatePersona(
  personaId: string,
  data: Partial<{
    name: string;
    role: string;
    description: string;
    brandVoice: BrandVoice;
    detailLevel: DetailLevel;
    platforms: PlatformType[];
  }>
): Promise<Persona | null> {
  const index = personas.findIndex(p => p.id === personaId);
  if (index === -1) return null;

  const existing = personas[index];
  personas[index] = {
    ...existing,
    ...data,
    platforms: data.platforms
      ? data.platforms.map(type => ({
          id: crypto.randomUUID(),
          personaId,
          type,
          isActive: true,
        }))
      : existing.platforms,
  };

  return personas[index];
}

export async function deletePersona(personaId: string): Promise<boolean> {
  const index = personas.findIndex(p => p.id === personaId);
  if (index === -1) return false;
  personas.splice(index, 1);
  return true;
}
