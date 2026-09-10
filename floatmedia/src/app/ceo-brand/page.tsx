'use client';

import { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  MessageCircle,
  Share2,
  ThumbsUp,
  Plus,
  Loader2,
  PenTool,
  BarChart3,
  Zap,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
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

interface ContentSuggestion {
  id: string;
  topic: string;
  hook: string;
  content: string;
  hashtags: string[];
}

interface PostHistory {
  id: string;
  content: string;
  platform: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
}

const mockPostHistory: PostHistory[] = [
  {
    id: '1',
    content: "Excited to share that we just closed our Series B! This milestone wouldn't be possible without our incredible team and the trust our customers place in us every day.",
    platform: 'LinkedIn',
    date: '2 days ago',
    likes: 156,
    comments: 23,
    shares: 12,
  },
  {
    id: '2',
    content: "The future of AI isn't about replacing humans \u2014 it's about amplifying human potential. We're building tools that make every team member superhuman.",
    platform: 'LinkedIn',
    date: '5 days ago',
    likes: 234,
    comments: 45,
    shares: 18,
  },
  {
    id: '3',
    content: "Three lessons I learned scaling from 10 to 100 employees:\n1. Hire for culture add, not culture fit\n2. Document everything early\n3. Celebrate small wins loudly",
    platform: 'X',
    date: '1 week ago',
    likes: 89,
    comments: 12,
    shares: 8,
  },
  {
    id: '4',
    content: "Product-market fit isn't a moment \u2014 it's a continuous conversation with your customers. Never stop listening.",
    platform: 'LinkedIn',
    date: '2 weeks ago',
    likes: 178,
    comments: 31,
    shares: 15,
  },
];

const defaultSuggestions: ContentSuggestion[] = [
  {
    id: '1',
    topic: 'Industry Thought Leadership',
    hook: "The biggest mistake leaders make with AI adoption isn't what you think...",
    content: "The biggest mistake leaders make with AI adoption isn't choosing the wrong tool \u2014 it's ignoring the human side of transformation.\n\nAfter working with hundreds of teams, I've found that technology is never the bottleneck. Mindset is.\n\nHere's what actually works:\n\u2022 Start with the problem, not the tool\n\u2022 Involve your team from day one\n\u2022 Celebrate early wins to build momentum\n\u2022 Accept that failure is part of the journey\n\nThe companies that win with AI aren't the ones with the biggest budgets. They're the ones with the boldest culture.",
    hashtags: ['Leadership', 'AI', 'Innovation', 'Management'],
  },
  {
    id: '2',
    topic: 'Behind the Scenes',
    hook: 'What I wish someone told me before starting my first company...',
    content: "What I wish someone told me before starting my first company:\n\n1. Your first idea will probably change completely\n2. Cash flow is oxygen \u2014 respect it\n3. The best hires will challenge you, not just agree with you\n4. Work-life balance isn't a perk, it's a strategy\n5. The market doesn't care about your feelings\n\nBuilding a company is the hardest thing I've ever done. And the most rewarding.\n\nTo every founder grinding right now \u2014 keep going. Your breakthrough is closer than you think.",
    hashtags: ['Entrepreneurship', 'StartupLife', 'Founders', 'Leadership'],
  },
  {
    id: '3',
    topic: 'Data-Driven Insight',
    hook: "We analyzed 1,000+ LinkedIn posts. Here's what actually drives engagement...",
    content: "We analyzed 1,000+ LinkedIn posts from top CEOs. Here's what actually drives engagement:\n\n\u2192 Stories outperform stats 3:1\n\u2192 Posts with 3-5 hashtags get 2x more reach\n\u2192 Questions at the start boost comments by 47%\n\u2192 Personal experiences get 5x more shares\n\u2192 The sweet spot? 1,200-1,500 characters\n\nBut here's the real insight: authenticity always wins.\n\nPeople don't engage with perfection. They engage with truth.\n\nStop trying to sound like a corporate press release. Start sharing what you actually think.",
    hashtags: ['ContentStrategy', 'LinkedIn', 'PersonalBranding', 'Marketing'],
  },
];

const stats = [
  { label: 'Total Posts', value: '12', icon: PenTool },
  { label: 'Total Engagement', value: '1,247', icon: TrendingUp },
  { label: 'Avg Engagement', value: '104', icon: BarChart3 },
  { label: 'Top Post', value: '234', icon: Sparkles },
];

export default function CEOBrandPage() {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<ContentSuggestion | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuggestions(defaultSuggestions);
    setLoading(false);
  };

  const handleUseThis = (suggestion: ContentSuggestion) => {
    setSelectedSuggestion(suggestion);
  };

  return (
    <div className="min-h-screen bg-[#08080f] px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <Section delay={0}>
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                CEO Personal Brand
              </p>
              <h1 className="text-3xl font-bold text-white">
                Alex Thompson
              </h1>
              <p className="mt-1 text-[#6e6e85]">
                Build thought leadership and drive engagement across platforms.
              </p>
            </div>
            <Button onClick={handleGenerate} disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {loading ? 'Generating...' : 'Create For Me'}
            </Button>
          </div>
        </Section>

        {/* Stats Row */}
        <Section delay={100}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-5"
              >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                    {stat.label}
                  </p>
                  <stat.icon className="h-4 w-4 text-[#4a4a60]" />
                </div>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Content Suggestions */}
        {suggestions.length > 0 && (
          <Section delay={200}>
            <div>
              <p className="mb-4 text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                Content Suggestions
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="flex flex-col rounded-xl border border-[#1a1a30] bg-[#10101c] p-5 transition-all duration-200 hover:border-[#2a2a42]"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#7c6aef]" />
                      <span className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                        {suggestion.topic}
                      </span>
                    </div>
                    <p className="mb-3 flex-1 font-medium text-white">
                      {suggestion.hook}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {suggestion.hashtags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-[#1a1a30] bg-[#08080f] px-2 py-0.5 text-xs text-[#6e6e85]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1.5"
                      onClick={() => handleUseThis(suggestion)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Use This
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Selected Suggestion Preview */}
        {selectedSuggestion && (
          <Section delay={0}>
            <div>
              <p className="mb-4 text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                Post Preview
              </p>
              <Card>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c6aef]/10">
                      <Sparkles className="h-5 w-5 text-[#7c6aef]" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-semibold text-white">
                          Alex Thompson
                        </span>
                        <Badge variant="info">AI Generated</Badge>
                      </div>
                      <p className="mb-4 whitespace-pre-wrap text-[#6e6e85]">
                        {selectedSuggestion.content}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSuggestion.hashtags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm text-[#7c6aef]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-6 text-sm text-[#4a4a60]">
                        <span className="flex items-center gap-1.5">
                          <ThumbsUp className="h-4 w-4" />
                          Post
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageCircle className="h-4 w-4" />
                          Comment
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Share2 className="h-4 w-4" />
                          Share
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
        )}

        {/* Post History */}
        <Section delay={300}>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">
                Post History
              </p>
              <span className="text-sm text-[#4a4a60]">
                {mockPostHistory.length} posts
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {mockPostHistory.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-[#1a1a30] bg-[#10101c] p-5 transition-colors hover:border-[#2a2a42]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant={post.platform === 'LinkedIn' ? 'info' : 'default'}>
                        {post.platform}
                      </Badge>
                      <span className="flex items-center gap-1.5 text-xs text-[#4a4a60]">
                        <Clock className="h-3 w-3" />
                        {post.date}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#4a4a60]" />
                  </div>
                  <p className="mb-4 whitespace-pre-wrap text-[#6e6e85]">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-[#4a4a60]">
                    <span className="flex items-center gap-1.5 transition-colors hover:text-white">
                      <ThumbsUp className="h-4 w-4" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5 transition-colors hover:text-white">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </span>
                    <span className="flex items-center gap-1.5 transition-colors hover:text-white">
                      <Share2 className="h-4 w-4" />
                      {post.shares}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
