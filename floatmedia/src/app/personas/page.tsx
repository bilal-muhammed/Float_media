'use client';

import { useState } from 'react';
import { Users, Plus, Edit, Trash2, X, Mic, Sliders, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import BrandVoiceSelector from '@/components/brand-voice/BrandVoiceSelector';
import PlatformSelector from '@/components/persona/PlatformSelector';
import { Persona, BrandVoice, DetailLevel, PlatformType, BRAND_VOICES, DETAIL_LEVELS } from '@/types';
import { useScrollAnimation } from '@/lib/hooks';
import { cn } from '@/lib/utils';

function Section({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useScrollAnimation<HTMLDivElement>();
  return (
    <div ref={ref} style={{ transitionDelay: delay ? `${delay}ms` : undefined }} className={cn('transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6', className)}>
      {children}
    </div>
  );
}

const mockPersonas: Persona[] = [
  {
    id: '1',
    userId: 'u1',
    name: 'Thought Leader',
    role: 'Industry Expert',
    description: 'Shares deep insights on technology trends and industry analysis.',
    brandVoice: 'professional',
    detailLevel: 'detailed',
    platforms: [
      { id: 'p1', personaId: '1', type: 'LINKEDIN', isActive: true },
      { id: 'p2', personaId: '1', type: 'X', isActive: true },
    ],
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: 'u1',
    name: 'Brand Advocate',
    role: 'Marketing Specialist',
    description: 'Promotes company culture and brand initiatives across social channels.',
    brandVoice: 'friendly',
    detailLevel: 'concise',
    platforms: [
      { id: 'p3', personaId: '2', type: 'INSTAGRAM', isActive: true },
      { id: 'p4', personaId: '2', type: 'FACEBOOK', isActive: true },
      { id: 'p5', personaId: '2', type: 'LINKEDIN', isActive: true },
    ],
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    userId: 'u1',
    name: 'Tech Influencer',
    role: 'Developer Advocate',
    description: 'Creates technical tutorials and shares developer-focused content.',
    brandVoice: 'technical',
    detailLevel: 'ultra-detailed',
    platforms: [
      { id: 'p6', personaId: '3', type: 'X', isActive: true },
      { id: 'p7', personaId: '3', type: 'TIKTOK', isActive: true },
    ],
    createdAt: new Date('2024-03-10'),
  },
];

const brandVoiceBadgeVariant: Record<BrandVoice, 'default' | 'info' | 'success' | 'warning' | 'danger'> = {
  friendly: 'success',
  professional: 'info',
  inspirational: 'warning',
  technical: 'default',
  witty: 'danger',
};

const detailLevelBadgeVariant: Record<DetailLevel, 'default' | 'info' | 'success' | 'warning' | 'danger'> = {
  concise: 'success',
  detailed: 'info',
  'ultra-detailed': 'warning',
};

const brandVoiceLabel: Record<BrandVoice, string> = {
  friendly: 'Friendly',
  professional: 'Professional',
  inspirational: 'Inspirational',
  technical: 'Technical',
  witty: 'Witty',
};

const detailLevelLabel: Record<DetailLevel, string> = {
  concise: 'Concise',
  detailed: 'Detailed',
  'ultra-detailed': 'Ultra-Detailed',
};

interface PersonaFormData {
  name: string;
  role: string;
  description: string;
  brandVoice: BrandVoice;
  detailLevel: DetailLevel;
  platforms: PlatformType[];
}

const emptyForm: PersonaFormData = {
  name: '',
  role: '',
  description: '',
  brandVoice: 'professional',
  detailLevel: 'detailed',
  platforms: [],
};

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>(mockPersonas);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PersonaFormData>(emptyForm);

  const handleCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleEdit = (persona: Persona) => {
    setEditingId(persona.id);
    setForm({
      name: persona.name,
      role: persona.role || '',
      description: persona.description || '',
      brandVoice: persona.brandVoice,
      detailLevel: persona.detailLevel,
      platforms: persona.platforms.map((p) => p.type),
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (editingId) {
      setPersonas((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: form.name,
                role: form.role,
                description: form.description,
                brandVoice: form.brandVoice,
                detailLevel: form.detailLevel,
                platforms: form.platforms.map((type, i) => ({
                  id: `p${Date.now()}-${i}`,
                  personaId: editingId,
                  type,
                  isActive: true,
                })),
              }
            : p
        )
      );
    } else {
      const newPersona: Persona = {
        id: String(Date.now()),
        userId: 'u1',
        name: form.name,
        role: form.role,
        description: form.description,
        brandVoice: form.brandVoice,
        detailLevel: form.detailLevel,
        platforms: form.platforms.map((type, i) => ({
          id: `p${Date.now()}-${i}`,
          personaId: String(Date.now()),
          type,
          isActive: true,
        })),
        createdAt: new Date(),
      };
      setPersonas((prev) => [...prev, newPersona]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="min-h-screen bg-[#08080f] px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <Section delay={0}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Brand Personas</h1>
              <p className="mt-1 text-[#6e6e85]">
                Create and manage your content personas.
              </p>
            </div>
            {!showForm && (
              <Button onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Create Persona
              </Button>
            )}
          </div>
        </Section>

        {showForm && (
          <div className="relative">
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={handleCancel}
            />
            <div className="relative z-50 mx-auto max-w-2xl">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7c6aef]/10">
                      <Sparkles className="h-5 w-5 text-[#7c6aef]" />
                    </div>
                    <CardTitle>{editingId ? 'Edit Persona' : 'New Persona'}</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                          Name
                        </label>
                        <input
                          className="input-field"
                          placeholder="e.g. Thought Leader"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                          Role
                        </label>
                        <input
                          className="input-field"
                          placeholder="e.g. Industry Expert"
                          value={form.role}
                          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                        Description
                      </label>
                      <textarea
                        className="input-field"
                        rows={3}
                        placeholder="Describe what this persona focuses on..."
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mic className="h-4 w-4 text-[#7c6aef]" />
                        <span className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                          Brand Voice & Detail
                        </span>
                      </div>
                      <BrandVoiceSelector
                        brandVoice={form.brandVoice}
                        detailLevel={form.detailLevel}
                        onBrandVoiceChange={(v) => setForm((f) => ({ ...f, brandVoice: v }))}
                        onDetailLevelChange={(l) => setForm((f) => ({ ...f, detailLevel: l }))}
                      />
                    </div>

                    <PlatformSelector
                      selected={form.platforms}
                      onChange={(p) => setForm((f) => ({ ...f, platforms: p }))}
                      max={5}
                    />

                    <div className="flex items-center gap-3 pt-2">
                      <Button onClick={handleSave}>
                        {editingId ? 'Update' : 'Create Persona'}
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {personas.length === 0 && !showForm && (
          <Section delay={100}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a30]">
                  <Users className="h-8 w-8 text-[#4a4a60]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">No personas yet</h3>
                <p className="mt-1 text-sm text-[#6e6e85]">
                  Create your first persona to start generating tailored content.
                </p>
                <Button className="mt-6" onClick={handleCreate}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Persona
                </Button>
              </CardContent>
            </Card>
          </Section>
        )}

        {personas.length > 0 && !showForm && (
          <>
            <Section delay={100}>
              <p className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                Your Personas
              </p>
            </Section>
            <Section delay={200}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {personas.map((persona) => (
                  <Card key={persona.id} hover className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7c6aef]/10">
                            <Users className="h-5 w-5 text-[#7c6aef]" />
                          </div>
                          <div>
                            <CardTitle>{persona.name}</CardTitle>
                            {persona.role && (
                              <p className="text-sm text-[#6e6e85]">{persona.role}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(persona)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(persona.id)}>
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      {persona.description && (
                        <p className="mb-4 text-sm text-[#6e6e85] line-clamp-2">
                          {persona.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={brandVoiceBadgeVariant[persona.brandVoice]}>
                          {brandVoiceLabel[persona.brandVoice]}
                        </Badge>
                        <Badge variant={detailLevelBadgeVariant[persona.detailLevel]}>
                          {detailLevelLabel[persona.detailLevel]}
                        </Badge>
                      </div>
                      {persona.platforms.length > 0 && (
                        <div className="mt-4">
                          <p className="mb-2 text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                            Platforms
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {persona.platforms.map((platform) => (
                              <Badge key={platform.id} variant="default">
                                {platform.type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
