'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Monitor, Smartphone, Wifi, Eye, Building2, MapPin, Calendar, Mail } from 'lucide-react';

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

function Reveal({ children, className = '', delay = 0, variant = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number;
  variant?: 'up' | 'left' | 'right' | 'scale' | 'blur';
}) {
  const { ref, visible } = useInView();
  const transforms: Record<string, string> = {
    up: visible ? 'translateY(0)' : 'translateY(50px)',
    left: visible ? 'translateX(0)' : 'translateX(-50px)',
    right: visible ? 'translateX(0)' : 'translateX(50px)',
    scale: visible ? 'scale(1)' : 'scale(0.95)',
    blur: visible ? 'blur(0)' : 'blur(8px)',
  };
  const filters = variant === 'blur' && !visible ? 'blur(8px)' : 'none';
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: transforms[variant],
      filter: variant === 'blur' ? filters : undefined,
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms${variant === 'blur' ? `, filter 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms` : ''}`,
    }}>
      {children}
    </div>
  );
}

function HeadingReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView(0.2);
  const words = typeof children === 'string' ? children.split(' ') : [];
  return (
    <h2 ref={ref} className={className} style={{
      letterSpacing: visible ? '0.04em' : '-0.02em',
      transition: `letter-spacing 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {words.length > 0 ? words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', transition: `margin-right 0.6s cubic-bezier(0.22,1,0.36,1) ${delay + i * 30}ms`, marginRight: visible ? '0.15em' : '0' }}>
          {word}
        </span>
      )) : children}
    </h2>
  );
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const { ref, visible } = useInView(0.5);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ─── HERO ─── */}
      <section className="relative h-screen">
        <div className="sticky top-0 h-screen overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/medias/float_ad_vedio_banner.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="px-6 lg:px-8 w-full max-w-[1200px] mx-auto">
            <Reveal>
              <div className="inline-flex items-center border border-white/20 bg-[#18181b]/10 backdrop-blur-sm px-4 py-1.5 text-[12px] font-medium text-white/80 mb-6">
                A one-stop platform for next-gen advertising
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] max-w-[700px]" style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e0f7fa 30%, #80deea 60%, #ffffff 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(8, 145, 178, 0.3))',
              }}>
                Every screen you own, on one canvas.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 text-[16px] leading-[1.7] text-white/60 max-w-[480px]">
                Your shop window becomes the billboard. Your phone becomes the control room. No pen drives, no agency wait, no new structure to build.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/for-franchises" className="group inline-flex items-center gap-2 bg-[#0891b2] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-[#0e7490] transition-all hover:shadow-[0_0_40px_-8px_rgba(8,145,178,0.5)]">
                  Book a demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/for-franchises" className="inline-flex items-center gap-2 border border-white/20 bg-[#18181b]/5 backdrop-blur-sm px-7 py-3.5 text-[14px] font-medium text-white/90 hover:bg-[#18181b]/10 hover:border-white/30 transition-all">
                  For franchises
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="relative z-10 bg-[#0a0a0a] pt-12 pb-24 px-6 lg:px-8 max-w-[1200px] mx-auto">
        <Reveal>
          <p className="section-label mb-4">What we do</p>
        </Reveal>
        <HeadingReveal className="section-title max-w-[700px]" delay={60}>
          Today a campaign moves by pen drive. With Flotad it moves in one click.
        </HeadingReveal>
        <Reveal delay={120}>
          <p className="section-subtitle mt-5">
            Design it, aim it, publish it — from one place. AI does the repetitive part: resizing every format and building depth content for holographic screens.
          </p>
        </Reveal>

        {/* 3 Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: '01', label: 'Create', title: 'One brief, every format', desc: 'Your creative is resized for every screen in the network — window, aisle, counter, holographic. No agency round trip for a weekend offer.',
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
            { num: '02', label: 'Target', title: 'Right content, right screen', desc: 'Choose the cities, stores, screens and hours. Each screen gets what suits it — not the same loop everywhere.',
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> },
            { num: '03', label: 'Publish & Prove', title: 'Live in one click', desc: 'Nothing to courier, email or plug in. Every screen reports what it played and when.',
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg> },
          ].map((step, i) => (
            <Reveal key={i} delay={i * 100} variant="scale">
              <div className="group relative border border-[#27272a] bg-[#18181b] px-6 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/30 hover:shadow-[0_20px_50px_-15px_rgba(8,145,178,0.15)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0891b2]/0 to-transparent transition-all duration-500 group-hover:via-[#0891b2]/40" />
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center bg-[#0891b2]/10 text-[#0891b2] transition-colors group-hover:bg-[#0891b2]/20">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#0891b2]/50">{step.num}</span>
                      <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0891b2] leading-tight">{step.label}</h3>
                    </div>
                  </div>
                </div>
                <h4 className="text-[17px] font-semibold text-[#fafafa] leading-snug">{step.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[#a1a1aa]">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Two feature cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal variant="left">
            <div className="group border border-[#27272a] bg-[#18181b] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/30 hover:shadow-[0_20px_50px_-15px_rgba(8,145,178,0.15)]">
              <div className="aspect-[16/10] border border-dashed border-[#27272a] bg-[#0a0a0a] mb-6 flex items-center justify-center transition-colors group-hover:border-[#0891b2]/20">
                <div className="text-center">
                  <Monitor className="h-10 w-10 text-[#0891b2]/25 mx-auto mb-2" />
                  <p className="text-[12px] text-[#71717a]">Product shot — transparent film / holographic display</p>
                </div>
              </div>
              <p className="text-[11px] font-semibold tracking-wider uppercase text-[#71717a]">Flot Media · The Displays</p>
              <h3 className="text-[18px] font-semibold text-[#fafafa] mt-2">Any surface becomes ad space</h3>
              <p className="text-[14px] leading-relaxed text-[#a1a1aa] mt-2">
                Transparent film on your glass facade. Hanging panels. Dual-sided screens. No new structure, no permit, no extra infrastructure.
              </p>
            </div>
          </Reveal>
          <Reveal variant="right">
            <div className="group border border-[#27272a] bg-[#18181b] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/30 hover:shadow-[0_20px_50px_-15px_rgba(8,145,178,0.15)]">
              <div className="aspect-[16/10] border border-dashed border-[#27272a] bg-[#0a0a0a] mb-6 flex items-center justify-center transition-colors group-hover:border-[#0891b2]/20">
                <div className="text-center">
                  <Smartphone className="h-10 w-10 text-[#0891b2]/25 mx-auto mb-2" />
                  <p className="text-[12px] text-[#71717a]">Flotad dashboard screenshot</p>
                </div>
              </div>
              <p className="text-[11px] font-semibold tracking-wider uppercase text-[#71717a]">Flotad · The Platform</p>
              <h3 className="text-[18px] font-semibold text-[#fafafa] mt-2">One login runs the network</h3>
              <p className="text-[14px] leading-relaxed text-[#a1a1aa] mt-2">
                Holographic displays and the screens already in your stores — one dashboard, from a laptop or a phone.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── HOLOGRAPHIC DISPLAY ─── */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/[0.04] via-transparent to-[#0891b2]/[0.02]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0891b2]/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0891b2]/[0.03] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="section-label mb-4">The Holographic Display</p>
          </Reveal>
          <HeadingReveal className="section-title max-w-[600px]" delay={60}>
            Turn your store frontage into a DOOH screen.
          </HeadingReveal>
          <Reveal delay={120}>
            <p className="section-subtitle mt-5">
              A billboard needs a wall, a permit and a month&apos;s booking. A holographic display needs the glass or the wall you already own — and turns it into a 3D advertising screen for your product.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            <Reveal variant="scale">
              <div className="relative border border-[#27272a] bg-[#18181b] overflow-hidden aspect-[16/10]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-110 origin-top">
                  <source src="/medias/float_add_3rd_media.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-4 left-4 z-10 inline-flex items-center border border-[#27272a] bg-[#18181b]/80 backdrop-blur px-3 py-1 text-[11px] font-medium text-[#a1a1aa]">
                  Implementation video · 60–90 sec
                </div>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                { icon: <Monitor className="h-5 w-5 text-[#0891b2] mt-0.5 shrink-0" />, title: 'On the shop window', desc: 'Film bonds to the inside of your glass. Daylight and the window display stay untouched.' },
                { icon: <Wifi className="h-5 w-5 text-[#0891b2] mt-0.5 shrink-0" />, title: 'Hanging in open air', desc: 'No glass needed. Hang it over an aisle or a booth and the graphic floats in the air.' },
                { icon: <Eye className="h-5 w-5 text-[#0891b2] mt-0.5 shrink-0" />, title: 'Two faces, two campaigns', desc: 'Dual-sided film — two campaigns — a different message to each direction of foot traffic.' },
                { icon: <Smartphone className="h-5 w-5 text-[#0891b2] mt-0.5 shrink-0" />, title: 'AI content conversion', desc: 'We turn your flat creative into depth content built for holographic playback.' },
                { icon: <Eye className="h-5 w-5 text-[#0891b2] mt-0.5 shrink-0" />, title: 'Up to 95% transparent', desc: 'From inside the store you still see the street — the display reads like a perforated glass mask, giving you light control and privacy while it advertises outward.' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 80} variant={i % 2 === 0 ? 'left' : 'right'}>
                  <div className="group border border-[#27272a] bg-[#18181b] p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-[#0891b2]/30 hover:shadow-[0_8px_30px_-10px_rgba(8,145,178,0.12)]">
                    <div className="flex items-start gap-3">
                      {item.icon}
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#fafafa]">{item.title}</h4>
                        <p className="text-[13px] text-[#a1a1aa] mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 4 product images */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'The view from inside — up to 95% transparent', desc: 'View from inside the store looking out through the display' },
              { label: 'Transparent film display', desc: 'Transparent LED film — product shot' },
              { label: 'Hanging holographic panel', desc: '3D holographic fan — product shot' },
              { label: 'Flotad adapter hub', desc: 'Flotad adapter hub — small matte black box' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80} variant="scale">
                <div className="group border border-[#27272a] bg-[#18181b] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/30">
                  <div className="aspect-[4/3] flex items-center justify-center border-b border-[#27272a] bg-[#0a0a0a] transition-colors group-hover:bg-[#0891b2]/[0.03]">
                    <div className="text-center px-4">
                      <Monitor className="h-10 w-10 text-[#0891b2]/20 mx-auto mb-2 transition-transform group-hover:scale-110 duration-500" />
                      <p className="text-[11px] text-[#71717a] leading-tight">{item.desc}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[12px] text-[#a1a1aa]">{item.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSIDE FLOTAD ─── */}
      <section className="relative py-24 px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="border-t border-[#27272a] pt-24" />

        <Reveal>
          <p className="section-label mb-4">Inside Flotad</p>
        </Reveal>
        <HeadingReveal className="section-title max-w-[600px]" delay={60}>
          Hundreds of store displays, at your fingertips.
        </HeadingReveal>
        <Reveal delay={120}>
          <p className="section-subtitle mt-5">
            Everything a campaign needs in one place: your approved creative, a map of every screen you own, who is allowed to publish what, and proof of what actually played — on the facade, the aisle and the counter, in every city you operate in.
          </p>
        </Reveal>

        {/* Blurred content — under development */}
        <div className="relative mt-12">
          <div className="blur-[6px] pointer-events-none select-none">
            <Reveal delay={180}>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 border border-[#27272a] bg-[#18181b] px-5 py-2.5 text-[13px] font-medium text-[#fafafa]">
                  Request a walkthrough
                </span>
              </div>
            </Reveal>

            <Reveal delay={240} variant="scale">
              <div className="border border-[#27272a] bg-[#18181b] overflow-hidden">
                <div className="border-b border-[#27272a] px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 bg-[#27c93f]" />
                    </div>
                    <span className="text-[12px] text-[#71717a] ml-2">console.flotad.com / network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#27c93f]" />
                    <span className="text-[12px] text-[#71717a]">All screens reporting</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Screens online', value: 1284, display: '/1,302', highlight: false },
                      { label: 'Campaigns live', value: 17, display: '', highlight: false },
                      { label: 'Stores', value: 128, display: '', highlight: false },
                      { label: 'Playback verified', value: 98.6, suffix: '%', display: '', highlight: true },
                    ].map((stat, i) => (
                      <div key={i} className="border border-[#27272a] bg-[#0a0a0a] p-4">
                        <p className="text-[11px] font-semibold tracking-wider uppercase text-[#71717a]">{stat.label}</p>
                        <p className={`text-[28px] font-bold mt-1 ${stat.highlight ? 'text-[#22d3ee]' : 'text-[#fafafa]'}`}>
                          <CountUp end={stat.value} suffix={stat.suffix || ''} />{stat.display}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center py-16">
                    <Monitor className="h-14 w-14 text-[#0891b2]/15 mx-auto mb-3" />
                    <p className="text-[13px] text-[#71717a]">Product demo video — dashboard walkthrough poster frame</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-[#18181b]/90 backdrop-blur-sm border border-[#27272a] px-6 py-3 flex items-center gap-3">
              <div className="w-2 h-2 bg-[#22d3ee] animate-pulse" />
              <span className="text-[14px] font-semibold text-[#fafafa] tracking-wide uppercase">Under Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE BIGGER PICTURE ─── */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden" style={{ isolation: 'isolate' }}>
        <img src="/images/2nd_banner.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: -2 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]/60" style={{ zIndex: -1 }} />

        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="section-label mb-4">The Bigger Picture</p>
          </Reveal>
          <HeadingReveal className="section-title max-w-[600px]" delay={60}>
            One network. Four ways to use it.
          </HeadingReveal>
          <Reveal delay={120}>
            <p className="section-subtitle mt-5">
              One stop for next-generation advertising: we build the ad space, the screens on it, and the platform that sells time on both. Franchise networks come first — the rest opens as the network grows.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px">
            {[
              { badge: 'Live first', badgeColor: 'bg-[#0891b2]/20 text-[#22d3ee]', icon: <Building2 className="h-5 w-5" />, title: 'If you run a chain of stores', desc: 'Control every screen in every branch from one login — the ones you own today and the holographic ones you add later. Your ad space, your content, your schedule.' },
              { badge: 'Next', badgeColor: 'bg-white/10 text-white/60', icon: <MapPin className="h-5 w-5" />, title: 'If you want to advertise', desc: "Book time on someone else's holographic window by the minute, from your phone. Pick the location, pick the hour, upload, pay. No sales call, no monthly contract." },
              { badge: 'Next', badgeColor: 'bg-white/10 text-white/60', icon: <Monitor className="h-5 w-5" />, title: 'If you own the footfall', desc: 'Malls, cafés, showrooms, lobbies — turn a window or a wall into earning ad space. We install, the platform fills the time, you take a share of what it makes.' },
              { badge: 'Next', badgeColor: 'bg-white/10 text-white/60', icon: <Calendar className="h-5 w-5" />, title: 'If you run events and expos', desc: 'Rent a fleet of holographic displays for the week, or bring your own, and drive every screen across the venue from one laptop for as long as the event runs.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80} variant={i % 2 === 0 ? 'left' : 'right'}>
                <div className="group bg-[#0a0a0a]/70 backdrop-blur-sm border border-white/10 p-8 h-full transition-all duration-500 hover:-translate-y-1 hover:border-[#0891b2]/30 hover:shadow-[0_20px_50px_-15px_rgba(8,145,178,0.15)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#22d3ee]">{item.icon}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-semibold ${item.badgeColor}`}>{item.badge}</span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-px grid grid-cols-1 md:grid-cols-3 gap-px">
            {[
              { label: 'The Hardware', desc: 'Holographic and transparent displays, supplied and installed — building the ad space itself.' },
              { label: 'The Platform', desc: 'Flotad runs every screen on that space — owned, rented, or already in the store.' },
              { label: 'The Service', desc: 'Maintenance, spare parts, and a studio that turns flat creative into real 3D content.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80} variant="up">
                <div className="bg-[#0a0a0a]/70 backdrop-blur-sm border border-white/10 p-8">
                  <p className="section-label text-[11px] mb-3">{item.label}</p>
                  <p className="text-[14px] leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <p className="mt-8 text-[15px] text-white/50">
              Every display we install makes the network worth more to the next customer. That is the whole plan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── TALK TO US ─── */}
      <section className="relative py-24 px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="border-t border-[#27272a] pt-24" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <p className="section-label mb-4">Talk to us</p>
            </Reveal>
            <HeadingReveal className="section-title max-w-[400px]" delay={60}>
              Tell us what you want to achieve.
            </HeadingReveal>
            <Reveal delay={120}>
              <p className="section-subtitle mt-5">
                Control of the screens you already have, a holographic window that stops people outside, or both. Say what you are aiming for and we will come back with how to get there — and what it costs.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 space-y-3">
                <a href="mailto:hello@flotad.com" className="flex items-center gap-2 text-[14px] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                  <Mail className="h-4 w-4" /> hello@flotad.com
                </a>
                <p className="text-[14px] text-[#71717a]">
                  Flot Media LLP · Registered office: Pathanamthitta, Kerala, India
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} variant="right">
            <form className="border border-[#27272a] bg-[#18181b] p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">Your name</label>
                  <input type="text" placeholder="Full name" className="input-field" />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">Work email</label>
                  <input type="email" placeholder="name@company.com" className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">Company or chain</label>
                  <input type="text" placeholder="Brand name" className="input-field" />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">Screens, roughly (optional)</label>
                  <input type="text" placeholder="e.g. 60 across 12 stores" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#a1a1aa] mb-1.5">What do you want to achieve?</label>
                <textarea rows={4} placeholder="e.g. one dashboard for all our stores, and a holographic window at the flagship" className="input-field resize-none" />
              </div>
              <button type="submit" className="group w-full bg-[#0891b2] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#0e7490] transition-all hover:shadow-[0_0_40px_-8px_rgba(8,145,178,0.5)] flex items-center justify-center gap-2">
                Start the conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="text-center text-[12px] text-[#71717a]">Mockup form — no data is submitted.</p>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
