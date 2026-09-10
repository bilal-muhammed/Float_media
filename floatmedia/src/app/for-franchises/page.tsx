'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check, X as XIcon, ArrowRight, MousePointerClick, Cable, Zap,
  Eye, Users, Globe, LayoutGrid, Plus, Minus,
  ShoppingBag, Store, Monitor, Wine, CalendarDays, Image as ImageIcon,
} from 'lucide-react';
import { useScrollAnimation, useScrollRevealElements, useTextSplitReveal, useLineReveal } from '@/lib/hooks';
import { cn } from '@/lib/utils';

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
  useTextSplitReveal();
  useLineReveal();
  useScrollRevealElements();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ═══════ HERO ═══════ */}
      <section className="relative flex items-center overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 bg-[#0891b2]/[0.03] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-8 inline-flex items-center gap-2 border border-[#27272a] bg-[#18181b] px-4 py-2 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 bg-[#22d3ee] animate-pulse" />
              <span className="text-[11px] font-medium tracking-wide text-[#a1a1aa]">For franchise &amp; multi-store networks</span>
            </div>
          </FadeIn>

          <div className="relative border border-[#27272a] bg-[#18181b] p-1 backdrop-blur-md">
            <div className="border border-[#27272a] bg-[#18181b] p-7 md:p-12">
              <FadeIn delay={100}>
                <h1 className="text-[2rem] font-bold leading-[1.1] text-[#fafafa] md:text-[3.5rem]">
                  Your marketing team should not be couriering pen drives.
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#a1a1aa]">
                  One dashboard controls every screen in every store. Campaigns go live in seconds, not days. Head office sees what is playing, where, and when — without asking anyone.
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-2 bg-[#0891b2] px-6 py-3.5 text-[13px] font-semibold text-white transition-all hover:bg-[#0e7490] hover:shadow-[0_0_60px_-12px_rgba(8,145,178,0.6)]"
                  >
                    Talk to us
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="#rollout"
                    className="group inline-flex items-center gap-2 border border-[#27272a] px-6 py-3.5 text-[13px] font-medium text-[#fafafa] transition-all duration-300 hover:border-[#0891b2]/30 hover:bg-[#0891b2]/[0.04]"
                  >
                    See how it rolls out
                    <ArrowRight className="h-3.5 w-3.5 text-[#a1a1aa] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0891b2]" />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ THE CHANGE ═══════ */}
      <section className="section-full-bleed border-t border-[#27272a] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="section-label">The Change</p>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem]">
              <SplitText text="What a campaign costs you today." />
              <br />
              <SplitText text="What it costs on Flotad." />
            </h2>
          </FadeIn>

          <div className="relative mt-14 grid gap-6 md:grid-cols-2">
            <div className="absolute top-0 bottom-0 left-1/2 hidden w-px md:block">
              <div className="line-reveal h-full bg-gradient-to-b from-transparent via-[#27272a] to-transparent" />
            </div>

            <FadeIn direction="left" delay={100}>
              <div className="border border-[#27272a] bg-[#18181b] p-6 md:p-8">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#a1a1aa]">Today · Manual</p>
                <ul className="mt-6 space-y-4">
                  {todayItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-[#ef4444]/10">
                        <XIcon className="h-3 w-3 text-[#ef4444]" />
                      </div>
                      <span className="text-[13px] leading-[1.7] text-[#a1a1aa]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={200}>
              <div className="border border-[#0891b2]/10 bg-[#0891b2]/[0.02] p-6 md:p-8">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#22d3ee]">On Flotad</p>
                <ul className="mt-6 space-y-4">
                  {flotadItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-[#0891b2]/10">
                        <Check className="h-3 w-3 text-[#22d3ee]" />
                      </div>
                      <span className="text-[13px] leading-[1.7] text-[#a1a1aa]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ FRANCHISE BENEFITS ═══════ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ isolation: 'isolate' }}>
        <img src="/images/franchices_1st_banner.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: -2 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]/60" style={{ zIndex: -1 }} />

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="section-label mb-3">Franchise Benefits</p>
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
                className="group relative flex h-full flex-col border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-sm p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/30 hover:shadow-[0_8px_40px_-12px_rgba(8,145,178,0.15)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0891b2]/0 to-transparent transition-all duration-500 group-hover:via-[#0891b2]/30" />
                <div className="flex h-10 w-10 items-center justify-center bg-white/5 transition-colors duration-300 group-hover:bg-[#0891b2]/10">
                  <item.icon className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-[#22d3ee]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-[14px] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-[1.7] text-white/50">{item.text}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ FLASH CAMPAIGNS ═══════ */}
      <section className="section-full-bleed border-t border-[#27272a] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="section-label">Flash Campaigns</p>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem] max-w-3xl">
              <SplitText text="A four-hour sale, in the eleven stores where it matters." />
            </h2>
            <p className="section-subtitle mt-4 max-w-2xl">
              The gap nobody else fills: campaigns aimed at chosen stores and chosen screens, live for exactly as long as the offer lasts.
            </p>
          </FadeIn>

          <div className="mt-18">
            <StaggerContainer className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4" delay={100}>
              {steps.map((item, i) => (
                <div key={i} className="group relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center border border-[#27272a] bg-[#0a0a0a] text-[12px] font-bold text-[#0891b2]/60 transition-all duration-300 group-hover:border-[#0891b2]/40 group-hover:text-[#22d3ee] group-hover:bg-[#0891b2]/[0.06]">
                      {item.step}
                    </span>
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-[#27272a] to-transparent lg:block" />
                  </div>

                  <div className="flex h-full flex-col border border-[#27272a] bg-[#18181b] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/20 hover:shadow-[0_8px_40px_-12px_rgba(8,145,178,0.08)]">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#27272a] transition-colors duration-300 group-hover:bg-[#0891b2]/10">
                      <item.icon className="h-5 w-5 text-[#a1a1aa] transition-colors duration-300 group-hover:text-[#22d3ee]" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-[14px] font-semibold text-[#fafafa]">{item.title}</h3>
                    <p className="mt-2 text-[12px] leading-[1.7] text-[#a1a1aa]">{item.text}</p>
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════ HOLOGRAPHIC UPGRADE ═══════ */}
      <section className="section-full-bleed border-t border-[#27272a] py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:items-start">
            <div>
              <FadeIn direction="left">
                <p className="section-label">The Upgrade Nobody Else Offers</p>
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
                      <span className="text-[14px] leading-[1.75] text-[#a1a1aa]">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn direction="left" delay={250}>
                <div className="mt-9">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-2 border border-[#27272a] px-6 py-3.5 text-[13px] font-medium text-[#fafafa] transition-all duration-300 hover:border-[#0891b2]/30 hover:bg-[#0891b2]/[0.04]"
                  >
                    Talk to us about a pilot window
                    <ArrowRight className="h-3.5 w-3.5 text-[#a1a1aa] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0891b2]" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={100}>
              <div className="space-y-5">
                <div className="relative border border-[#27272a] bg-[#18181b] overflow-hidden aspect-[16/10]">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/medias/for_franchies_banner.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute top-6 left-6 z-10 border border-[#27272a] bg-[#0a0a0a]/90 px-4 py-2 text-[11px] font-medium text-[#a1a1aa] backdrop-blur-sm">
                    Install walkthrough
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Film going onto glass storefront',
                    'Hanging panel above an aisle',
                  ].map((caption, i) => (
                    <div key={i} className="border border-[#27272a] bg-[#18181b] min-h-[170px] flex items-center justify-center p-4">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="flex h-12 w-12 items-center justify-center bg-[#27272a]">
                          <svg className="h-6 w-6 text-[#71717a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                        </div>
                        <p className="text-[11px] text-[#71717a] max-w-[140px]">{caption}</p>
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
      <section id="rollout" className="section-full-bleed border-t border-[#27272a] py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="section-label">Rollout</p>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem]">
              <SplitText text="From first call to a live network." />
            </h2>
            <p className="mt-5 text-[14px] leading-[1.75] text-[#a1a1aa] max-w-xl">
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
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center border border-[#27272a] bg-[#0a0a0a] text-[11px] font-bold text-[#0891b2]/60 transition-all duration-300 group-hover:border-[#0891b2]/40 group-hover:text-[#22d3ee] group-hover:bg-[#0891b2]/[0.06] group-hover:scale-110">
                    {item.step}
                  </span>
                  <div className="hidden h-px flex-1 bg-gradient-to-r from-[#27272a] to-transparent lg:block" />
                </div>

                <div className="flex h-full flex-col border border-[#27272a] bg-[#18181b] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/20 hover:shadow-[0_8px_40px_-12px_rgba(8,145,178,0.08)]">
                  <h3 className="text-[14px] font-semibold text-[#fafafa]">{item.title}</h3>
                  <p className="mt-2 text-[12px] leading-[1.7] text-[#a1a1aa]">{item.text}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ WHERE IT FITS ═══════ */}
      <section className="section-full-bleed border-t border-[#27272a] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="section-label">Where It Fits</p>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem] max-w-3xl">
              <SplitText text="Built for networks that run many rooms at once." />
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" delay={100}>
            {industries.map((item, i) => (
              <div
                key={i}
                className="group flex h-full flex-col border border-[#27272a] bg-[#18181b] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/20 hover:shadow-[0_8px_40px_-12px_rgba(8,145,178,0.08)]"
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
      <section className="border-t border-[#27272a] py-18">
        <div className="mx-auto max-w-7xl px-6">
          <p className="sr-fade-up text-[11px] font-semibold tracking-[0.14em] uppercase text-[#71717a]">
            Chain Logo Wall — Drop Partner or Pilot Logos Here
          </p>
          <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" delay={50}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="group relative flex items-center justify-center border border-[#27272a] bg-[#18181b] py-10 overflow-hidden transition-all duration-500 hover:border-[#0891b2]/20"
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
      <section className="section-full-bleed border-t border-[#27272a] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="section-label">FAQ</p>
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
                      <p className="px-5 pb-5 text-[13px] leading-[1.75] text-[#a1a1aa]">{item.a}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="section-full-bleed border-t border-[#27272a] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="section-label">Talk to Us</p>
            <h2 className="section-title mt-4 text-[1.5rem] md:text-[2rem]">
              <SplitText text="Tell us about your network." />
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="relative mt-12 border border-[#27272a] bg-[#18181b] p-8 backdrop-blur-sm">
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#a1a1aa]">Name</label>
                    <input type="text" placeholder="Your name" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#a1a1aa]">Email</label>
                    <input type="email" placeholder="you@company.com" className="input-field" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#a1a1aa]">Company or chain</label>
                    <input type="text" placeholder="Brand name" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#a1a1aa]">Screens, roughly (optional)</label>
                    <input type="text" placeholder="e.g. 60 across 12 stores" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#a1a1aa]">What do you want to achieve?</label>
                  <textarea rows={4} placeholder="Tell us about your network, your stores, and what you are trying to do..." className="input-field resize-none" />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 bg-[#0891b2] px-6 py-3.5 text-[13px] font-semibold text-white transition-all hover:bg-[#0e7490] hover:shadow-[0_0_60px_-12px_rgba(8,145,178,0.6)]"
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
