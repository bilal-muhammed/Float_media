'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye, ThumbsUp, MessageCircle, Share2, ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
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

type TimeRange = '7' | '30' | '90';

interface PlatformData {
  name: string;
  color: string;
  barColor: string;
  engagement: number;
  posts: number;
  growth: number;
  icon: React.ReactNode;
}

interface TopPost {
  title: string;
  platform: string;
  platformBadge: 'default' | 'info' | 'success' | 'warning' | 'danger';
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  date: string;
}

const platformData: PlatformData[] = [
  { name: 'LinkedIn', color: 'text-blue-400', barColor: 'bg-blue-500', engagement: 4200, posts: 15, growth: 12.5, icon: <Users className="h-4 w-4" /> },
  { name: 'X (Twitter)', color: 'text-gray-300', barColor: 'bg-gray-400', engagement: 3800, posts: 12, growth: 8.3, icon: <MessageCircle className="h-4 w-4" /> },
  { name: 'Instagram', color: 'text-pink-400', barColor: 'bg-pink-500', engagement: 2900, posts: 10, growth: 15.2, icon: <Eye className="h-4 w-4" /> },
  { name: 'TikTok', color: 'text-cyan-400', barColor: 'bg-cyan-500', engagement: 1200, posts: 6, growth: 22.1, icon: <ThumbsUp className="h-4 w-4" /> },
  { name: 'Facebook', color: 'text-blue-500', barColor: 'bg-blue-600', engagement: 350, posts: 4, growth: -3.2, icon: <Share2 className="h-4 w-4" /> },
];

const topPosts: TopPost[] = [
  { title: '5 Leadership Lessons from Scaling a Startup', platform: 'LinkedIn', platformBadge: 'info', engagement: 1847, likes: 1203, comments: 342, shares: 302, views: 15200, date: '2 days ago' },
  { title: 'The Future of AI in Content Marketing', platform: 'X (Twitter)', platformBadge: 'default', engagement: 1523, likes: 987, comments: 289, shares: 247, views: 12800, date: '3 days ago' },
  { title: 'Behind the Scenes: Building Our Product', platform: 'Instagram', platformBadge: 'success', engagement: 1205, likes: 876, comments: 198, shares: 131, views: 9400, date: '4 days ago' },
  { title: 'Quick Tips for Better Time Management', platform: 'TikTok', platformBadge: 'warning', engagement: 892, likes: 654, comments: 143, shares: 95, views: 8200, date: '5 days ago' },
  { title: 'Industry Trends Report 2026', platform: 'LinkedIn', platformBadge: 'info', engagement: 756, likes: 498, comments: 156, shares: 102, views: 7100, date: '1 week ago' },
];

const metrics = [
  { label: 'Total Posts', value: '47', change: '+12', positive: true, icon: TrendingUp },
  { label: 'Total Engagement', value: '12,450', change: '+2,340', positive: true, icon: ThumbsUp },
  { label: 'Avg Engagement Rate', value: '4.2%', change: '+0.8%', positive: true, icon: BarChart3 },
  { label: 'Best Performing Platform', value: 'LinkedIn', change: 'Top platform', positive: true, icon: Users },
];

const maxEngagement = Math.max(...platformData.map((p) => p.engagement));

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30');

  const totalEngagement = platformData.reduce((sum, p) => sum + p.engagement, 0);
  const totalPosts = platformData.reduce((sum, p) => sum + p.posts, 0);

  return (
    <div className="min-h-screen bg-[#08080f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <Section delay={0}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Analytics Overview</h1>
                <p className="mt-1 text-[#6e6e85]">Track your content performance across all platforms.</p>
              </div>
              <div className="flex items-center gap-2 bg-[#10101c] border border-[#1a1a30] rounded-lg p-1">
                {([
                  { value: '7', label: 'Last 7 days' },
                  { value: '30', label: 'Last 30 days' },
                  { value: '90', label: 'Last 90 days' },
                ] as const).map((option) => (
                  <Button
                    key={option.value}
                    variant={timeRange === option.value ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setTimeRange(option.value)}
                    className="text-xs"
                  >
                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </Section>

          <Section delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <Card key={metric.label} hover className="bg-[#10101c] border-[#1a1a30]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a30]">
                        <metric.icon className="h-5 w-5 text-[#7c6aef]" />
                      </div>
                      <Badge variant={metric.positive ? 'success' : 'danger'}>
                        {metric.positive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {metric.change}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#4a4a60]">{metric.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section delay={200}>
            <Card className="bg-[#10101c] border-[#1a1a30]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">Platform Breakdown</p>
                  <span className="text-sm text-[#6e6e85]">
                    {totalPosts} posts &middot; {totalEngagement.toLocaleString()} total engagement
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {platformData.map((platform) => {
                  const widthPercent = (platform.engagement / maxEngagement) * 100;
                  return (
                    <div key={platform.name} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div className="flex items-center gap-3">
                          <div className={`${platform.color}`}>{platform.icon}</div>
                          <span className="text-sm font-medium text-white">{platform.name}</span>
                          <span className="text-xs text-[#4a4a60]">{platform.posts} posts</span>
                        </div>
                        <div className="flex items-center gap-3 sm:justify-end">
                          <span className="text-sm font-semibold text-white">
                            {platform.engagement.toLocaleString()}
                          </span>
                          <span className={`text-xs ${platform.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {platform.growth >= 0 ? '+' : ''}{platform.growth}%
                          </span>
                        </div>
                      </div>
                      <div className="relative h-3 rounded-full bg-[#1a1a30] overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 ${platform.barColor} rounded-full transition-all duration-700`}
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Section delay={300} className="lg:col-span-2">
              <Card className="bg-[#10101c] border-[#1a1a30]">
                <CardHeader>
                  <p className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">Top Performing Posts</p>
                </CardHeader>
                <CardContent className="divide-y divide-[#1a1a30]">
                  {topPosts.map((post, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a1a30] text-sm font-bold text-[#7c6aef]">
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">{post.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={post.platformBadge}>{post.platform}</Badge>
                            <span className="text-xs text-[#4a4a60]">{post.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6 shrink-0 flex-wrap">
                        <div className="flex items-center gap-1.5 text-[#6e6e85]">
                          <Eye className="h-3.5 w-3.5" />
                          <span className="text-xs">{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#6e6e85]">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span className="text-xs">{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 text-[#6e6e85]">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span className="text-xs">{post.comments}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 text-[#6e6e85]">
                          <Share2 className="h-3.5 w-3.5" />
                          <span className="text-xs">{post.shares}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-[#7c6aef]">{post.engagement.toLocaleString()}</span>
                          <span className="text-xs text-[#4a4a60]">eng.</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Section>

            <Section delay={400}>
              <Card className="bg-[#10101c] border-[#1a1a30]">
                <CardHeader>
                  <p className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase">Content Performance</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6e6e85]">Avg. Likes per Post</span>
                      <span className="font-medium text-white">265</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1a1a30] overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-[#7c6aef]" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6e6e85]">Avg. Comments per Post</span>
                      <span className="font-medium text-white">78</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1a1a30] overflow-hidden">
                      <div className="h-full w-1/2 rounded-full bg-[#7c6aef]/70" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6e6e85]">Avg. Shares per Post</span>
                      <span className="font-medium text-white">45</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1a1a30] overflow-hidden">
                      <div className="h-full w-1/3 rounded-full bg-[#7c6aef]/50" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6e6e85]">Avg. Views per Post</span>
                      <span className="font-medium text-white">2,480</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1a1a30] overflow-hidden">
                      <div className="h-full w-5/6 rounded-full bg-[#7c6aef]/40" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1a1a30]">
                    <p className="text-xs font-semibold tracking-widest text-[#4a4a60] uppercase mb-3">Post Type Breakdown</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-[#1a1a30]/50 p-3 text-center">
                        <p className="text-xl font-bold text-white">22</p>
                        <p className="text-xs text-[#4a4a60]">Text Posts</p>
                      </div>
                      <div className="rounded-lg bg-[#1a1a30]/50 p-3 text-center">
                        <p className="text-xl font-bold text-white">14</p>
                        <p className="text-xs text-[#4a4a60]">Image Posts</p>
                      </div>
                      <div className="rounded-lg bg-[#1a1a30]/50 p-3 text-center">
                        <p className="text-xl font-bold text-white">8</p>
                        <p className="text-xs text-[#4a4a60]">Video Posts</p>
                      </div>
                      <div className="rounded-lg bg-[#1a1a30]/50 p-3 text-center">
                        <p className="text-xl font-bold text-white">3</p>
                        <p className="text-xs text-[#4a4a60]">Carousels</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
