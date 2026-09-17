'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const Velaris = dynamic(() => import('@/components/Velaris'), { ssr: false });

export default function Footer() {
  return (
    <footer className="border-t border-[#27272a]">
      <Velaris
        bg="#0a0a0a"
        colors={['#0891b2', '#22d3ee', '#06b6d4', '#164e63']}
        speed={3.0}
        grain={0.1}
        height="auto"
        className="!h-auto"
      >
        <div className="relative mx-auto max-w-[1200px] px-6 py-10 md:py-16 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5">
                <img src="/images/logo.png" alt="Flot Media" className="h-11 w-11 object-contain -ml-1" />
                <div className="flex flex-col leading-none">
                  <span className="text-[14px] font-bold tracking-wide text-[#fafafa]">FLOT MEDIA</span>
                  <span className="text-[9px] font-semibold tracking-[0.2em] text-[#22d3ee] uppercase mt-[2px]">Beyond Billboards</span>
                </div>
              </Link>
              <p className="mt-4 text-[15px] leading-relaxed text-[#a1a1aa]">
                A one-stop platform for next-gen advertising: 3D holographic displays, and Flotad — the software that runs your whole screen network from one login.
              </p>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#71717a]">Company</h4>
              <ul className="mt-4 space-y-3">
                <li><Link href="/" className="text-[14px] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">Overview</Link></li>
                <li><Link href="/for-franchises" className="text-[14px] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">For franchises</Link></li>
                <li><a href="https://wa.me/919497672692?text=Hi%2C%20I%27m%20interested%20in%20Flot%20Media" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#71717a]">Product</h4>
              <ul className="mt-4 space-y-3">
                <li><span className="text-[14px] text-[#a1a1aa]">Transparent film displays</span></li>
                <li><span className="text-[14px] text-[#a1a1aa]">Hanging holographic panels</span></li>
                <li><span className="text-[14px] text-[#a1a1aa]">Flotad cloud platform</span></li>
                <li><span className="text-[14px] text-[#a1a1aa]">3D content studio</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#71717a]">Reach us</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="mailto:hello@flotad.com" className="flex items-center gap-1 text-[14px] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                    hello@flotad.com <ArrowUpRight className="h-3 w-3 opacity-40" />
                  </a>
                </li>
                <li>
                  <a href="https://flotad.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[14px] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                    flotad.com <ArrowUpRight className="h-3 w-3 opacity-40" />
                  </a>
                </li>
                <li className="pt-2 text-[13px] text-[#71717a]">Flot Media LLP · Registered office: Pathanamthitta, Kerala, India</li>
              </ul>
            </div>
          </div>
          <div className="relative mt-8 md:mt-14 border-t border-[#27272a]/50 pt-8">
            <p className="text-[12px] text-[#71717a]">Flot Media LLP · Registered office: Pathanamthitta, Kerala, India</p>
            <p className="mt-2 text-[12px] text-[#71717a]">&copy; 2026 Flot Media LLP. All rights reserved.</p>
          </div>
        </div>
      </Velaris>
    </footer>
  );
}
