'use client';

import { useState } from 'react';
import { PlatformType, BrandVoice, DetailLevel } from '@/types';
import BrandVoiceSelector from '@/components/brand-voice/BrandVoiceSelector';
import PlatformSelector from '@/components/persona/PlatformSelector';
import ContentLengthValidation from '@/components/content-length/ContentLengthValidation';
import SocialPreview from '@/components/social-preview/SocialPreview';
import { Wand2, Copy, Save, Check, Loader2, AlertCircle } from 'lucide-react';
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

interface GeneratedContent {
  content: string;
  hashtags: string[];
  platform: PlatformType;
}

const MOCK_CONTENT: Record<PlatformType, string> = {
  X: "Building great products starts with listening to your users. Every feature we ship is shaped by real feedback and real needs. That's the difference between building something that works and building something that matters.",
  LINKEDIN: "The most underrated skill in product development isn't coding or design — it's empathy.\n\nWhen we truly understand our users' challenges, we stop building features and start building solutions.\n\nHere's what I've learned after years of building products:\n\n→ Talk to users before writing a single line of code\n→ Measure success by outcomes, not outputs\n→ Iterate fast, but never at the expense of quality\n→ The best features are the ones users didn't know they needed\n\nWhat's the biggest lesson you've learned about building products?",
  INSTAGRAM: "From idea to impact 🚀\n\nThe journey of building something meaningful isn't always linear. There are pivots, setbacks, and breakthrough moments that shape everything.\n\nWhat keeps us going? The belief that great products can change how people work, connect, and create.\n\n#ProductDesign #Innovation #BuildInPublic #StartupLife #TechCommunity",
  FACEBOOK: "Excited to share our latest update! We've been working behind the scenes to bring you features that actually matter. Our team has been obsessing over every detail to make your experience smoother and more intuitive. Can't wait for you to try it out!",
  TIKTOK: "POV: You're building a product that people actually love 💡\n\nStep 1: Listen to your users\nStep 2: Ship fast\nStep 3: Iterate based on feedback\nStep 4: Repeat forever\n\nThe secret? There is no secret. Just consistency and genuine care.",
};

const MOCK_HASHTAGS: Record<PlatformType, string[]> = {
  X: ['building', 'products', 'tech'],
  LINKEDIN: ['ProductManagement', 'Innovation', 'Leadership'],
  INSTAGRAM: ['ProductDesign', 'Innovation', 'BuildInPublic'],
  FACEBOOK: ['Launch', 'Update', 'Exciting'],
  TIKTOK: ['TechTok', 'StartupLife', 'BuildInPublic'],
};

export default function GeneratePage() {
  const [topic, setTopic] = useState('');
  const [brandVoice, setBrandVoice] = useState<BrandVoice>('professional');
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('detailed');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([]);
  const [customInstructions, setCustomInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationsRemaining] = useState(7);
  const totalGenerations = 10;

  const handleGenerate = async () => {
    if (!topic.trim() || selectedPlatforms.length === 0) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedContent(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const platform = selectedPlatforms[0];
      setGeneratedContent({
        content: MOCK_CONTENT[platform],
        hashtags: MOCK_HASHTAGS[platform],
        platform,
      });
    } catch {
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedContent) return;
    await navigator.clipboard.writeText(generatedContent.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!generatedContent) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const canGenerate = topic.trim() && selectedPlatforms.length > 0 && generationsRemaining > 0;

  return (
    <div className="min-h-screen bg-[#08080f]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Section delay={0}>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-xl bg-gradient-to-br from-[#7c6aef] to-[#a78bfa] p-2.5 shadow-lg shadow-[#7c6aef]/25">
                <Wand2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Generate Content</h1>
            </div>
            <p className="text-[#6e6e85] ml-[52px]">
              Create engaging social media posts powered by AI
            </p>
          </div>
        </Section>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column — Inputs */}
          <div className="space-y-6">
            <Section delay={100}>
              <div className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-6">
                <div className="mb-4">
                  <label className="text-sm font-medium text-white">Topic</label>
                  <p className="text-xs text-[#4a4a60] mt-1">Describe what you want to create content about</p>
                </div>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What do you want to create content about?"
                  rows={4}
                  className="input-field resize-none"
                />
              </div>
            </Section>

            <Section delay={200}>
              <div className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-6">
                <BrandVoiceSelector
                  brandVoice={brandVoice}
                  detailLevel={detailLevel}
                  onBrandVoiceChange={setBrandVoice}
                  onDetailLevelChange={setDetailLevel}
                />
              </div>
            </Section>

            <Section delay={300}>
              <div className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-6">
                <PlatformSelector
                  selected={selectedPlatforms}
                  onChange={setSelectedPlatforms}
                  max={5}
                />
              </div>
            </Section>

            <Section delay={400}>
              <div className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-6">
                <div className="mb-4">
                  <label className="text-sm font-medium text-white">Custom Instructions</label>
                  <p className="text-xs text-[#4a4a60] mt-1">Optional — add specific guidelines for the AI</p>
                </div>
                <textarea
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="e.g. Include a call-to-action, use emojis, mention our brand name..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </Section>

            <Section delay={500}>
              <button
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#7c6aef] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#7a6be6] focus:outline-none focus:ring-2 focus:ring-[#7c6aef] focus:ring-offset-2 focus:ring-offset-[#08080f] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </button>
            </Section>

            {error && (
              <Section delay={0}>
                <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </Section>
            )}
          </div>

          {/* Right Column — Preview */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <Section delay={200}>
              <div className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Free Plan</span>
                  <span className="text-xs font-mono text-[#4a4a60]">
                    {generationsRemaining} / {totalGenerations} left
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#1a1a30]">
                  <div
                    className="h-full rounded-full bg-[#7c6aef] transition-all"
                    style={{ width: `${(generationsRemaining / totalGenerations) * 100}%` }}
                  />
                </div>
                {generationsRemaining <= 2 && (
                  <p className="mt-3 text-xs text-amber-400">
                    {generationsRemaining === 0
                      ? 'Limit reached. Upgrade for unlimited generations.'
                      : `Only ${generationsRemaining} generation${generationsRemaining === 1 ? '' : 's'} left this month.`}
                  </p>
                )}
              </div>
            </Section>

            {generatedContent ? (
              <Section delay={300}>
                <div className="space-y-5">
                  <div className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-sm font-semibold text-white">Generated Content</h2>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopy}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a1a30] bg-[#08080f] px-3 py-1.5 text-xs font-medium text-[#6e6e85] transition-colors hover:bg-[#16162a] hover:text-white"
                        >
                          {copied ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                        <button
                          onClick={handleSave}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a1a30] bg-[#08080f] px-3 py-1.5 text-xs font-medium text-[#6e6e85] transition-colors hover:bg-[#16162a] hover:text-white"
                        >
                          {saved ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Save className="h-3.5 w-3.5" />
                          )}
                          {saved ? 'Saved' : 'Save'}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-lg border border-[#1a1a30] bg-[#08080f] p-4">
                      <p className="whitespace-pre-wrap text-sm text-[#6e6e85] leading-relaxed">
                        {generatedContent.content}
                      </p>
                      {generatedContent.hashtags.length > 0 && (
                        <div className="mt-3 text-sm text-[#7c6aef]">
                          {generatedContent.hashtags.map((h) => `#${h}`).join(' ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedPlatforms.map((platform) => (
                    <div key={platform} className="space-y-3">
                      <ContentLengthValidation
                        content={generatedContent.content}
                        platform={platform}
                      />
                      <SocialPreview
                        platform={platform}
                        content={generatedContent.content}
                        hashtags={generatedContent.hashtags}
                      />
                    </div>
                  ))}
                </div>
              </Section>
            ) : (
              <Section delay={300}>
                <div className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-2xl bg-[#7c6aef]/10 p-4">
                      <Wand2 className="h-8 w-8 text-[#7c6aef]/50" />
                    </div>
                    <p className="text-sm text-[#4a4a60]">
                      Your generated content will appear here
                    </p>
                  </div>
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
