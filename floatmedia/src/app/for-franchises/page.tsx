'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Check, X as XIcon, ArrowRight, MousePointerClick, Cable, Zap,
  Eye, Users, Globe, LayoutGrid, Plus, Minus,
  ShoppingBag, Store, Monitor, Wine, CalendarDays, Image as ImageIcon,
} from 'lucide-react';
import { useScrollAnimation, useScrollRevealElements, useTextSplitReveal, useLineReveal } from '@/lib/hooks';
import { cn } from '@/lib/utils';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useInView(0.2);
  return (
    <div ref={ref} className="section-label-premium" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-20px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
      {children}
    </div>
  );
}

function SectionDivider() {
  const { ref, visible } = useInView(0.1);
  return (
    <div ref={ref} className="relative py-1">
      <div className={`section-divider ${visible ? 'is-visible' : ''}`} />
    </div>
  );
}

function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={cn('text-split', className)}>
      {words.map((word, i) => (
        <span key={i} className="word">
          <span className="word-inner">{word}</span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}

function FadeIn({
  children, className, delay = 0, direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const [ref, visible] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px',
  });

  const dirClass = direction === 'left' ? '-translate-x-[40px]' : direction === 'right' ? 'translate-x-[40px]' : 'translate-y-[40px]';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
        visible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${dirClass}`,
        className,
      )}
    >
      {children}
    </div>
  );
}

function StaggerContainer({
  children, className, delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, visible] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px',
  });
  return (
    <div ref={ref} className={cn('grid', className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${(delay || 0) + i * 120}ms` : '0ms' }}
              className={cn(
                'h-full transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]',
              )}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

const todayItems = [
  'Creative goes out by WhatsApp, email — or a pen drive in a courier bag.',
  'Staff swap USBs by hand — up to fifty screens in one store.',
  'Head office cannot see which screen is playing what, or if it is even on.',
  'A four-hour flash offer never happens — coordinating it takes longer than the offer.',
];

const flotadItems = [
  'Upload the creative once.',
  'Pick the stores and the screen zone. Publish.',
  'Every screen reports what it plays and when it last synced.',
  'A flash offer becomes a schedule, not a logistics project.',
];

const benefits = [
  { icon: MousePointerClick, title: 'Single-click control of every screen', text: 'One dashboard, every branch. Target the whole network, a store group, a store, or one screen.' },
  { icon: Cable, title: 'Keep the screens you already bought', text: 'Any brand of TV or LED joins through an HDMI adapter. No display replacement, no write-off.' },
  { icon: Zap, title: 'Flash offers become possible', text: 'Schedule a four-hour offer and pull it back centrally. No store has to lift a finger.' },
  { icon: Eye, title: 'You can finally see the network', text: 'A live list of which screen sits where, what it played, and when it last checked in.' },
  { icon: Users, title: 'Brand consistency, enforced by roles', text: 'Approved creative only. Separate roles for admin, campaigns, uploads and finance.' },
  { icon: Globe, title: 'Wherever your stores are', text: 'Cloud-native and multi-tenant. A store joins wherever it is.' },
];

const steps = [
  { step: '01', icon: Monitor, title: 'Screen survey', text: 'We map what you already have — screens per store, inputs, which locations matter.' },
  { step: '02', icon: Zap, title: 'Pilot branch', text: 'Adapters and an edge box go into one store. Your team publishes a real campaign that week.' },
  { step: '03', icon: Users, title: 'Network onboarding', text: 'Store by store, your branding on the portal, roles set up per team.' },
  { step: '04', icon: Eye, title: 'Holographic upgrades', text: 'Add transparent or hanging displays at flagship locations when the budget allows.' },
];

const industries = [
  { icon: ShoppingBag, title: 'Retail & apparel', text: 'Window displays that change with foot traffic and time of day.' },
  { icon: Store, title: 'Supermarkets', text: 'Aisle screens push offers that match shelf stock.' },
  { icon: LayoutGrid, title: 'Showrooms', text: 'Product stories that rotate by customer segment.' },
  { icon: Wine, title: 'Hospitality', text: 'Lobby and bar screens with live menus and events.' },
  { icon: CalendarDays, title: 'Events & expos', text: 'Temporary screens that pull content from the same platform.' },
];

const faqItems = [
  { q: 'Do we have to replace our current screens?', a: 'No. Existing commercial TVs, monitors and LED walls connect through an HDMI adapter and an in-store edge box, whatever the brand. Holographic displays are an upgrade you choose later, window by window.' },
  { q: 'Can our stores in other states or countries join?', a: 'Yes. The platform is cloud-hosted and multi-tenant, so a store joins wherever it is — onboarding does not depend on us having a local office. Hardware supply and on-site installation are arranged region by region.' },
  { q: 'Who inside our company controls what?', a: 'Roles are separated: admin, campaign manager, content uploader and finance viewer. Store-level users can be limited to viewing what is scheduled rather than changing it.' },
  { q: 'What does it cost?', a: 'It depends on how many screens you run and whether you need hardware, so we quote per network. Tell us what you want to achieve in the form below and we will come back with the numbers.' },
  { q: 'What happens if a store loses internet?', a: 'The edge box keeps playing the last approved schedule locally and syncs the moment the connection returns, so a screen never goes blank because the line dropped.' },
];

export default function DashboardPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [rolloutBgIndex, setRolloutBgIndex] = useState(0);
  useTextSplitReveal();
  useLineReveal();
  useScrollRevealElements();

  useEffect(() => {
    const interval = setInterval(() => {
      setRolloutBgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative flex items-center overflow-hidden py-16 md:py-36">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[300px] w-[300px] md:h-[600px] md:w-[600px] -translate-x-1/2 bg-[#0891b2]/[0.03] blur-[60px] md:blur-[120px]" />
          <div className="floating-orb w-[200px] h-[200px] bg-[#22d3ee]/[0.03] top-[20%] left-[70%]" style={{ animationDelay: '-5s' }} />
          <div className="floating-orb w-[150px] h-[150px] bg-[#0891b2]/[0.04] top-[60%] left-[10%]" style={{ animationDelay: '-12s' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-8 inline-flex items-center gap-2 border border-[#27272a] bg-[#18181b] px-4 py-2 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 bg-[#22d3ee] animate-pulse" />
              <span className="text-[11px] font-medium tracking-wide text-[#a1a1aa]">For franchise &amp; multi-store networks</span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="group relative text-[2rem] font-bold leading-[1.15] text-[#fafafa] md:text-[3.5rem] max-w-[800px]">
              <span className="block">Your marketing team should not</span>
              <span className="block">be couriering pen drives.</span>
              <span className="block h-[3px] w-0 bg-gradient-to-r from-[#0891b2] to-[#22d3ee] transition-all duration-500 ease-out group-hover:w-full mt-3" />
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.8] text-[#a1a1aa]">
              One dashboard controls every screen in every store. Campaigns go live in seconds, not days. Head office sees what is playing, where, and when — without asking anyone.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#0891b2] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#0e7490] hover:shadow-[0_0_60px_-12px_rgba(8,145,178,0.6)] btn-shine"
              >
                Talk to us
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#rollout"
                className="group inline-flex items-center gap-2 border border-white/20 bg-[#18181b]/5 backdrop-blur-sm px-7 py-3.5 text-[14px] font-medium text-white/90 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
              >
                See how it rolls out
                <ArrowRight className="h-3.5 w-3.5 text-[#a1a1aa] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0891b2]" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ THE CHANGE ═══════ */}
      <SectionDivider />
      <section className="section-full-bleed py-14 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionLabel>The Change</SectionLabel>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem]">
              <SplitText text="What a campaign costs you today." />
            </h2>
          </FadeIn>

          <div className="relative mt-14 grid gap-6 md:grid-cols-2">
            <div className="absolute top-0 bottom-0 left-1/2 hidden w-px md:block">
              <div className="line-reveal h-full bg-gradient-to-b from-transparent via-[#27272a] to-transparent" />
            </div>

            <FadeIn direction="left" delay={100}>
              <div className="border border-[#27272a] bg-[#18181b] p-6 md:p-8 h-full">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#a1a1aa]">Today · Manual</p>
                <ul className="mt-6 space-y-4">
                  {todayItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-[#ef4444]/10">
                        <XIcon className="h-3 w-3 text-[#ef4444]" />
                      </div>
                      <span className="text-[14px] leading-[1.7] text-[#a1a1aa]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={200}>
              <div className="h-full flex flex-col">
                <h3 className="section-title text-[1.25rem] md:text-[1.5rem] mb-4">
                  <SplitText text="What it costs on Flotad." />
                </h3>
                <div className="border border-[#0891b2]/10 bg-[#0891b2]/[0.02] p-6 md:p-8 relative h-full">
                  <div className="absolute inset-0 border border-[#0891b2]/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#22d3ee]">On Flotad</p>
                  <ul className="mt-6 space-y-4">
                    {flotadItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-[#0891b2]/10">
                          <Check className="h-3 w-3 text-[#22d3ee]" />
                        </div>
                        <span className="text-[14px] leading-[1.7] text-[#a1a1aa]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ FRANCHISE BENEFITS ═══════ */}
      <SectionDivider />
      <section className="relative py-14 md:py-32 overflow-hidden" style={{ isolation: 'isolate' }}>
        <img src="/images/franchices_1st_banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: -2 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]/60" style={{ zIndex: -1 }} />

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionLabel>Franchise Benefits</SectionLabel>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem]">
              <SplitText text="Six reasons networks move first." />
            </h2>
            <p className="section-subtitle mt-4 max-w-2xl">
              Control of every display inside and outside the store — and a route to next-generation ad space, at your own pace.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" delay={100}>
            {benefits.map((item, i) => (
              <div
                key={i}
                className="group relative flex h-full flex-col border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-sm p-5 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] origin-bottom hover:border-[#0891b2]/30 hover:shadow-[0_20px_50px_-15px_rgba(8,145,178,0.15)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0891b2]/0 to-transparent transition-all duration-500 group-hover:via-[#0891b2]/30" />
                <div className="flex h-10 w-10 items-center justify-center bg-white/5 transition-colors duration-300 group-hover:bg-[#0891b2]/10">
                  <item.icon className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-[#22d3ee]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-[14px] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-white/50">{item.text}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ FLASH CAMPAIGNS ═══════ */}
      <SectionDivider />
      <section className="section-full-bleed py-14 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionLabel>Flash Campaigns</SectionLabel>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem] max-w-3xl">
              <SplitText text="A four-hour sale, in the eleven stores where it matters." />
            </h2>
            <p className="section-subtitle mt-4 max-w-2xl">
              The gap nobody else fills: campaigns aimed at chosen stores and chosen screens, live for exactly as long as the offer lasts.
            </p>
          </FadeIn>

          <div className="mt-14 sm:mt-18">
            <StaggerContainer className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4" delay={100}>
              {steps.map((item, i) => (
                <div key={i} className="group relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center border border-[#27272a] bg-[#0a0a0a] text-[12px] font-bold text-[#0891b2]/60 transition-all duration-300 group-hover:border-[#0891b2]/40 group-hover:text-[#22d3ee] group-hover:bg-[#0891b2]/[0.06]">
                      {item.step}
                    </span>
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-[#27272a] to-transparent lg:block" />
                  </div>

                  <div className="flex h-full flex-col border border-[#27272a] bg-[#18181b] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/30 hover:shadow-[0_20px_50px_-15px_rgba(8,145,178,0.15)]">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#27272a] transition-colors duration-300 group-hover:bg-[#0891b2]/10">
                      <item.icon className="h-5 w-5 text-[#a1a1aa] transition-colors duration-300 group-hover:text-[#22d3ee]" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold text-[#fafafa]">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[#a1a1aa]">{item.text}</p>
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════ HOLOGRAPHIC UPGRADE ═══════ */}
      <SectionDivider />
      <section className="section-full-bleed py-14 md:py-36">
        <div className="mx-auto max-w-[90rem] px-6">
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-8">
            <div className="flex flex-col justify-center overflow-hidden">
              <FadeIn direction="left">
                <SectionLabel>The Upgrade Nobody Else Offers</SectionLabel>
                <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem]">
                  <SplitText text="Turn a conventional ad into a real 3D experience." />
                </h2>
                <p className="mt-5 text-[14px] leading-[1.75] text-[#a1a1aa]">
                  A flat poster is background noise. A product floating in your shop window stops people on the footpath — more walk-ins, more eyes on the product. And it appears in the same dashboard the day it is switched on.
                </p>
              </FadeIn>

              <FadeIn direction="left" delay={150}>
                <ul className="mt-9 space-y-4">
                  {[
                    'The glass facade you already have becomes the ad space — no new structure, no extra infrastructure.',
                    'Or hangs in open air over an aisle, a counter or a booth — no glass required.',
                    'Dual-sided panels play a different message to each direction of foot traffic.',
                    'Start with one flagship branch. Measure it. Then decide where the next one goes.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center bg-[#0891b2]/10">
                        <Check className="h-3.5 w-3.5 text-[#22d3ee]" />
                      </div>
                      <span className="text-[15px] leading-[1.75] text-[#a1a1aa]">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn direction="left" delay={250}>
                <div className="mt-9">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-2 border border-white/20 bg-[#18181b]/5 backdrop-blur-sm px-7 py-3.5 text-[14px] font-medium text-white/90 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    Talk to us about a pilot window
                    <ArrowRight className="h-3.5 w-3.5 text-[#a1a1aa] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0891b2]" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={100}>
              <div className="space-y-4">
                <div className="relative border border-[#27272a] bg-[#18181b] overflow-hidden h-[350px] md:h-[480px]">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/medias/for_franchies_banner.mp4" type="video/mp4" />
                  </video>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { src: '/medias/shoe_ad_banner.png', caption: 'Film going onto glass storefront' },
                    { src: '/medias/hanging_display.png', caption: 'Hanging panel above an aisle' },
                  ].map((item, i) => (
                    <div key={i} className="group relative border border-[#27272a] bg-[#18181b] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] origin-bottom hover:border-[#0891b2]/30 hover:shadow-[0_20px_50px_-15px_rgba(8,145,178,0.15)]">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={item.src} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-[12px] font-medium tracking-wide uppercase text-white/80">{item.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ ROLLOUT ═══════ */}
      <SectionDivider />
      <section id="rollout" className="relative py-14 md:py-36 overflow-hidden" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0" style={{ zIndex: -2 }}>
          <img src="/medias/rollout_bg banner.png" alt="" className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000" style={{ opacity: rolloutBgIndex === 0 ? 1 : 0 }} />
          <img src="/medias/rollout_bg bammer2.png" alt="" className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000" style={{ opacity: rolloutBgIndex === 1 ? 1 : 0 }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/20 to-[#0a0a0a]/50" style={{ zIndex: -1 }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionLabel>Rollout</SectionLabel>
            <h2 className="mt-4 text-[1.5rem] md:text-[2rem] font-bold leading-tight text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}>
              <SplitText text="From first call to a live network." />
            </h2>
            <p className="mt-5 text-[14px] leading-[1.75] text-white max-w-xl font-medium" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.9)' }}>
              One branch first. Your team proves the workflow. Then store by store.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" delay={100}>
            {[
              { step: '01', title: 'Screen survey', text: 'We map what you already have — screens per store, inputs, which locations matter.' },
              { step: '02', title: 'Pilot branch', text: 'Adapters and an edge box go into one store. Your team publishes a real campaign that week.' },
              { step: '03', title: 'Network onboarding', text: 'Store by store, your branding on the portal, roles set up per team.' },
              { step: '04', title: 'Holographic upgrades', text: 'Add transparent or hanging displays at flagship locations when the budget allows.' },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center border border-[#22d3ee]/40 bg-[#22d3ee]/15 text-[11px] font-bold text-[#22d3ee] transition-all duration-300 group-hover:border-[#22d3ee]/60 group-hover:text-[#22d3ee] group-hover:bg-[#22d3ee]/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]">
                    {item.step}
                  </span>
                  <div className="hidden h-px flex-1 bg-gradient-to-r from-[#22d3ee]/40 to-transparent lg:block" />
                </div>

                <div className="flex h-full flex-col border border-white/20 bg-black/50 backdrop-blur-xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#22d3ee]/40 hover:bg-black/60 hover:shadow-[0_20px_50px_-15px_rgba(34,211,238,0.2)]">
                  <h3 className="text-[15px] font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{item.text}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ WHERE IT FITS ═══════ */}
      <SectionDivider />
      <section className="section-full-bleed py-14 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionLabel>Where It Fits</SectionLabel>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem] max-w-3xl">
              <SplitText text="Built for networks that run many rooms at once." />
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" delay={100}>
            {industries.map((item, i) => (
              <div
                key={i}
                className="group flex h-full flex-col border border-[#27272a] bg-[#18181b] p-5 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] origin-bottom hover:border-[#0891b2]/30 hover:shadow-[0_20px_50px_-15px_rgba(8,145,178,0.15)]"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-[#27272a] transition-colors duration-300 group-hover:bg-[#0891b2]/10">
                  <item.icon className="h-5 w-5 text-[#a1a1aa] transition-colors duration-300 group-hover:text-[#22d3ee]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-[14px] font-semibold text-[#fafafa]">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-[1.7] text-[#a1a1aa]">{item.text}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ LOGO WALL ═══════ */}
      <SectionDivider />
      <section className="py-12 sm:py-18 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <p className="sr-fade-up text-[11px] font-semibold tracking-[0.14em] uppercase text-[#71717a]">
            Chain Logo Wall — Drop Partner or Pilot Logos Here
          </p>
          <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" delay={50}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="group relative flex items-center justify-center border border-[#27272a] bg-[#18181b] py-10 overflow-hidden transition-all duration-500 hover:scale-[1.02] origin-center hover:border-[#0891b2]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0891b2]/[0.04] to-transparent bg-[length:200%_100%] animate-[shimmer_3s_infinite]" />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <ImageIcon className="h-7 w-7 text-[#71717a] transition-colors group-hover:text-[#a1a1aa]" strokeWidth={1} />
                  <span className="text-xs text-[#71717a]">Logo</span>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <SectionDivider />
      <section className="section-full-bleed py-14 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem]">
              <SplitText text="Questions we get asked before the first call." />
            </h2>
          </FadeIn>

          <div className="mt-12 space-y-3">
            {faqItems.map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="border border-[#27272a] bg-[#18181b] overflow-hidden transition-all duration-300 hover:border-[#0891b2]/20">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="text-[14px] font-medium text-[#fafafa]">{item.q}</span>
                    <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center transition-all duration-300', openFaq === i ? 'rotate-180 bg-[#0891b2]/10' : 'bg-[#27272a]')}>
                      {openFaq === i ? (
                        <Minus className="h-3.5 w-3.5 text-[#22d3ee]" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 text-[#71717a]" />
                      )}
                    </div>
                  </button>
                  <div className={cn(
                    'grid transition-all duration-300',
                    openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[14px] leading-[1.75] text-[#a1a1aa]">{item.a}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <SectionDivider />
      <section id="contact" className="section-full-bleed py-14 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <SectionLabel>Talk to Us</SectionLabel>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem]">
              <SplitText text="Tell us about your network." />
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="relative mt-12 border border-[#27272a] bg-[#18181b] p-5 sm:p-8 backdrop-blur-sm">
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium text-[#a1a1aa]">Name</label>
                    <input type="text" placeholder="Your name" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium text-[#a1a1aa]">Email</label>
                    <input type="email" placeholder="you@company.com" className="input-field" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium text-[#a1a1aa]">Company or chain</label>
                    <input type="text" placeholder="Brand name" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium text-[#a1a1aa]">Screens, roughly (optional)</label>
                    <input type="text" placeholder="e.g. 60 across 12 stores" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#a1a1aa]">What do you want to achieve?</label>
                  <textarea rows={4} placeholder="Tell us about your network, your stores, and what you are trying to do..." className="input-field resize-none" />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 bg-[#0891b2] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#0e7490] hover:shadow-[0_0_60px_-12px_rgba(8,145,178,0.6)] btn-shine"
                >
                  Talk to us
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
