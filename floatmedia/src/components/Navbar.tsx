'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled || !isHome
            ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-[#27272a]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/images/logo.png" alt="Flot Media" className="h-11 w-11 object-contain -ml-1" />
            <div className="flex flex-col leading-none">
              <span className={cn('text-[13px] font-bold tracking-wide transition-colors', scrolled || !isHome ? 'text-[#fafafa]' : 'text-white')}>FLOT MEDIA</span>
              <span className={cn('text-[8px] font-semibold tracking-[0.2em] uppercase mt-[2px] transition-colors', scrolled || !isHome ? 'text-[#22d3ee]' : 'text-white/60')}>Beyond Billboards</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                'relative px-4 py-2 text-[13px] font-medium transition-all duration-200',
                pathname === '/'
                  ? scrolled || !isHome ? 'text-[#fafafa]' : 'text-white'
                  : scrolled || !isHome ? 'text-[#a1a1aa] hover:text-[#fafafa]' : 'text-white/60 hover:text-white'
              )}
            >
              Company
              {pathname === '/' && <span className={cn('absolute bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] w-4 transition-colors', scrolled || !isHome ? 'bg-[#22d3ee]' : 'bg-white')} />}
            </Link>
            <Link
              href="/for-franchises"
              className={cn(
                'relative px-4 py-2 text-[13px] font-medium transition-all duration-200',
                pathname === '/for-franchises'
                  ? scrolled || !isHome ? 'text-[#fafafa]' : 'text-white'
                  : scrolled || !isHome ? 'text-[#a1a1aa] hover:text-[#fafafa]' : 'text-white/60 hover:text-white'
              )}
            >
              For franchises
              {pathname === '/for-franchises' && <span className={cn('absolute bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] w-4 transition-colors', scrolled || !isHome ? 'bg-[#22d3ee]' : 'bg-white')} />}
            </Link>
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-5">
            <a href="https://wa.me/919497672692?text=Hi%2C%20I%27m%20interested%20in%20Flot%20Media" target="_blank" rel="noopener noreferrer" className={cn('text-[13px] transition-colors', scrolled || !isHome ? 'text-[#a1a1aa] hover:text-[#fafafa]' : 'text-white/60 hover:text-white')}>
              Contact
            </a>
            <a
              href="https://wa.me/919497672692?text=Hi%2C%20I%27d%20like%20to%20book%20a%20demo%20of%20Flot%20Media"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 px-4 py-[7px] text-[13px] font-semibold transition-all duration-300',
                scrolled || !isHome
                  ? 'bg-[#0891b2] text-white hover:bg-[#0e7490]'
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              )}
            >
              Book a Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile */}
          <button className={cn('md:hidden flex items-center justify-center w-11 h-11', scrolled || !isHome ? 'text-[#a1a1aa]' : 'text-white')} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-[#0a0a0a] border-l border-[#27272a] px-6 py-20">
            <nav className="space-y-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className={cn('block py-3 text-sm font-medium', pathname === '/' ? 'text-[#fafafa]' : 'text-[#a1a1aa]')}>Company</Link>
              <Link href="/for-franchises" onClick={() => setMobileOpen(false)} className={cn('block py-3 text-sm font-medium', pathname === '/for-franchises' ? 'text-[#fafafa]' : 'text-[#a1a1aa]')}>For franchises</Link>
              <a href="https://wa.me/919497672692?text=Hi%2C%20I%27m%20interested%20in%20Flot%20Media" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-[#a1a1aa]">Contact</a>
            </nav>
            <div className="mt-8">
              <a href="https://wa.me/919497672692?text=Hi%2C%20I%27d%20like%20to%20book%20a%20demo%20of%20Flot%20Media" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 bg-[#0891b2] px-5 py-3 text-sm font-semibold text-white">
                Book a Demo <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
