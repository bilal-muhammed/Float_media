'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  isToday,
  isSameDay,
  addDays,
} from 'date-fns';
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

interface ScheduledPost {
  id: string;
  title: string;
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'tiktok';
  time: string;
  date: Date;
  status: 'scheduled' | 'draft' | 'published';
}

const platformColors: Record<string, string> = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  twitter: 'bg-sky-500',
  facebook: 'bg-blue-600',
  linkedin: 'bg-blue-700',
  tiktok: 'bg-black',
};

const statusVariants: Record<string, 'default' | 'success' | 'warning' | 'info'> = {
  scheduled: 'info',
  draft: 'warning',
  published: 'success',
};

const mockPosts: ScheduledPost[] = [
  {
    id: '1',
    title: 'Summer collection showcase reel',
    platform: 'instagram',
    time: '10:00 AM',
    date: new Date(),
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Thread: Tips for content creators',
    platform: 'twitter',
    time: '12:30 PM',
    date: new Date(),
    status: 'scheduled',
  },
  {
    id: '3',
    title: 'Behind the scenes of our latest shoot',
    platform: 'facebook',
    time: '3:00 PM',
    date: addDays(new Date(), 1),
    status: 'scheduled',
  },
  {
    id: '4',
    title: 'Industry insights carousel',
    platform: 'linkedin',
    time: '9:00 AM',
    date: addDays(new Date(), 2),
    status: 'draft',
  },
  {
    id: '5',
    title: 'Trending dance challenge video',
    platform: 'tiktok',
    time: '6:00 PM',
    date: addDays(new Date(), 3),
    status: 'scheduled',
  },
  {
    id: '6',
    title: 'Product launch announcement',
    platform: 'instagram',
    time: '11:00 AM',
    date: addDays(new Date(), -1),
    status: 'published',
  },
  {
    id: '7',
    title: 'Weekly newsletter promo',
    platform: 'facebook',
    time: '2:00 PM',
    date: addDays(new Date(), 4),
    status: 'scheduled',
  },
];

export default function CalendarPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', platform: 'instagram', date: '', time: '' });

  const weekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
  });

  const monthYear = format(currentWeekStart, 'MMMM yyyy');
  const weekRange = `${format(weekDays[0], 'MMM d')} – ${format(weekDays[6], 'MMM d, yyyy')}`;

  const getPostsForDay = (day: Date) =>
    mockPosts.filter((post) => isSameDay(post.date, day));

  const handleSchedulePost = () => {
    setShowModal(false);
    setNewPost({ title: '', platform: 'instagram', date: '', time: '' });
  };

  return (
    <div className="min-h-screen bg-[#08080f] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Section delay={0}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8 text-[#7c6aef]" />
              <div>
                <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
                <p className="text-sm text-[#6e6e85]">{weekRange}</p>
              </div>
            </div>
            <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Schedule Post
            </Button>
          </div>
        </Section>

        {/* Week Navigation */}
        <Section delay={100}>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentWeekStart((prev) => subWeeks(prev, 1))}
              className="p-2 rounded-lg hover:bg-[#10101c] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#6e6e85]" />
            </button>
            <h2 className="text-xl font-semibold text-white">{monthYear}</h2>
            <button
              onClick={() => setCurrentWeekStart((prev) => addWeeks(prev, 1))}
              className="p-2 rounded-lg hover:bg-[#10101c] transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#6e6e85]" />
            </button>
          </div>
        </Section>

        {/* Weekly Calendar Grid */}
        <Section delay={200}>
          <div className="flex gap-3 overflow-x-auto pb-4 md:grid md:grid-cols-7 md:gap-4">
            {weekDays.map((day) => {
              const posts = getPostsForDay(day);
              const dayIsToday = isToday(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <div
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`min-w-[170px] flex-shrink-0 rounded-xl border transition-all cursor-pointer md:min-w-0 ${
                    isSelected
                      ? 'border-[#7c6aef] bg-[#10101c]'
                      : 'border-[#1a1a30] bg-[#10101c]'
                  } hover:shadow-md hover:shadow-[#7c6aef]/10`}
                >
                  {/* Day Header */}
                  <div className="p-3 border-b border-[#1a1a30]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#4a4a60] uppercase">
                        {format(day, 'EEE')}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          dayIsToday
                            ? 'bg-[#7c6aef] text-white w-7 h-7 rounded-full flex items-center justify-center'
                            : 'text-white'
                        }`}
                      >
                        {format(day, 'd')}
                      </span>
                    </div>
                  </div>

                  {/* Posts for this day */}
                  <div className="p-2 space-y-2">
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <Card key={post.id} className="p-2 hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span
                              className={`text-[10px] font-medium text-white px-1.5 py-0.5 rounded ${platformColors[post.platform]}`}
                            >
                              {post.platform}
                            </span>
                            <Badge variant={statusVariants[post.status]} className="text-[10px]">
                              {post.status}
                            </Badge>
                          </div>
                          <p className="text-xs font-medium text-white line-clamp-2 mb-1">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-[#6e6e85]">
                            <Clock className="w-3 h-3" />
                            {post.time}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <button className="p-0.5 rounded hover:bg-[#1a1a30]">
                              <Edit className="w-3 h-3 text-[#4a4a60] hover:text-[#7c6aef]" />
                            </button>
                            <button className="p-0.5 rounded hover:bg-[#1a1a30]">
                              <Trash2 className="w-3 h-3 text-[#4a4a60] hover:text-red-500" />
                            </button>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-24 text-[#4a4a60]">
                        <Calendar className="w-6 h-6 mb-1 opacity-50" />
                        <span className="text-[10px]">No posts</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Schedule Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Schedule Post</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#4a4a60] hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6e6e85] mb-1">
                  Post Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter post title..."
                  className="w-full px-3 py-2 border border-[#1a1a30] rounded-lg bg-[#08080f] text-white focus:ring-2 focus:ring-[#7c6aef] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6e6e85] mb-1">
                  Platform
                </label>
                <select
                  value={newPost.platform}
                  onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                  className="w-full px-3 py-2 border border-[#1a1a30] rounded-lg bg-[#08080f] text-white focus:ring-2 focus:ring-[#7c6aef] focus:border-transparent outline-none"
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6e6e85] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newPost.date}
                    onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                    className="w-full px-3 py-2 border border-[#1a1a30] rounded-lg bg-[#08080f] text-white focus:ring-2 focus:ring-[#7c6aef] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6e6e85] mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newPost.time}
                    onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                    className="w-full px-3 py-2 border border-[#1a1a30] rounded-lg bg-[#08080f] text-white focus:ring-2 focus:ring-[#7c6aef] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSchedulePost}>Schedule</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
