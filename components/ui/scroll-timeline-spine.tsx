'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionCheckpoint {
  id: string;
  number: string;
  label: string;
  tag: string;
  shortLabel: string;
}

const SECTIONS: SectionCheckpoint[] = [
  { id: 'top', number: '01', label: 'Intro', tag: 'AOSP & Full-Stack', shortLabel: 'INTRO' },
  { id: 'systems', number: '02', label: 'Systems', tag: 'Kernel & HALs', shortLabel: 'SYSTEMS' },
  { id: 'featured-nectar', number: '03', label: 'Nectar B2B', tag: 'Flagship Platform', shortLabel: 'NECTAR' },
  { id: 'stack', number: '04', label: 'Tech Stack', tag: 'Languages & Tools', shortLabel: 'STACK' },
  { id: 'projects', number: '05', label: 'Work', tag: 'Open-Source & Web', shortLabel: 'WORK' },
  { id: 'contact', number: '06', label: 'Contact', tag: 'Direct Line', shortLabel: 'CONTACT' },
];

// Generate ruler ticks for authentic PDFCraft graduation markings
const RULER_TICKS = Array.from({ length: 51 }, (_, i) => ({
  index: i,
  isMajor: i % 5 === 0,
  label: i % 5 === 0 ? String(i) : null,
}));

export function ScrollTimelineSpine() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  // Direct GPU needle transform without re-rendering component
  const needleTop = useTransform(smoothProgress, (latest) => `${(latest * 100).toFixed(2)}%`);

  const percentRef = useRef<HTMLSpanElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const activeSectionRef = useRef('top');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHoveredRail, setIsHoveredRail] = useState(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const sectionPositionsRef = useRef<Record<string, number>>({});
  const rafIdRef = useRef<number | null>(null);

  // Live tabular percentage readout updated directly in DOM to eliminate 120 React re-renders/sec
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      const p = Math.min(Math.max(Math.round(latest * 100), 0), 100);
      if (percentRef.current) {
        percentRef.current.textContent = `${String(p).padStart(3, '0')}%`;
      }
    });
  }, [smoothProgress]);

  // Cache section positions on mount and window resize to eliminate forced synchronous reflows
  const cacheSectionPositions = useCallback(() => {
    const positions: Record<string, number> = {};
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) {
        positions[section.id] = el.offsetTop;
      }
    }
    sectionPositionsRef.current = positions;
  }, []);

  // Track scrolling activity & section positions with RAF throttling
  const handleScrollActivity = useCallback(() => {
    setIsScrolling(true);
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    // After 1400ms of being steady without scroll activity, hide the active indicator
    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1400);

    if (rafIdRef.current) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const scrollY = window.scrollY + 250;
      let current = SECTIONS[0].id;
      const positions = sectionPositionsRef.current;

      for (const section of SECTIONS) {
        const top = positions[section.id];
        if (top !== undefined && scrollY >= top - 120) {
          current = section.id;
        }
      }

      // Only re-render when the active section boundary is actually crossed
      if (current !== activeSectionRef.current) {
        activeSectionRef.current = current;
        setActiveSection(current);
      }
    });
  }, []);

  useEffect(() => {
    cacheSectionPositions();
    window.addEventListener('scroll', handleScrollActivity, { passive: true });
    window.addEventListener('resize', () => {
      cacheSectionPositions();
      handleScrollActivity();
    }, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollActivity);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [cacheSectionPositions, handleScrollActivity]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientY - rect.top) / rect.height;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: clickRatio * totalHeight,
      behavior: 'smooth',
    });
  };

  const getActiveIndex = () => {
    const idx = SECTIONS.findIndex((s) => s.id === activeSection);
    return idx >= 0 ? idx : 0;
  };

  const currentIdx = getActiveIndex();
  const isRailVisible = isScrolling || isHoveredRail;

  return (
    <>
      {/* ── Mobile/Tablet Sleek Top Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-black/[0.04] dark:bg-white/[0.06] pointer-events-none lg:hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0A84FF] via-[#38BDF8] to-[#0A84FF] origin-left shadow-[0_0_10px_rgba(10,132,255,0.7)]"
          style={{ scaleX: smoothProgress }}
        />
      </div>

      {/* ── Invisible Right Margin Hover Trigger Strip ── */}
      <div
        aria-hidden="true"
        onMouseEnter={() => setIsHoveredRail(true)}
        onMouseLeave={() => setIsHoveredRail(false)}
        className="fixed inset-y-0 right-0 z-40 hidden lg:block w-16 lg:w-20 pointer-events-auto"
      />

      {/* ── Exact PDFCraft-Style Scroll Timeline Ruler Spine (Full Right Margin) ── */}
      {/* Hidden when steady, appears on scroll or right edge hover */}
      <aside
        ref={railRef}
        aria-label="Page position"
        role="scrollbar"
        onClick={handleRailClick}
        onMouseEnter={() => setIsHoveredRail(true)}
        onMouseLeave={() => setIsHoveredRail(false)}
        className={cn(
          'fixed inset-y-0 right-0 z-40 hidden lg:flex flex-col justify-between w-14 lg:w-16 xl:w-[68px] select-none cursor-crosshair overflow-visible transition-all duration-500 ease-out',
          isRailVisible
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-3 pointer-events-none',
        )}
      >
        {/* Background rail backdrop layer separated so children can overflow freely to the left */}
        <div className="absolute inset-0 border-l border-black/[0.08] dark:border-white/[0.08] bg-white/65 dark:bg-[#0c0d0f]/65 backdrop-blur-md -z-10 pointer-events-none" />

        {/* ── Top HUD Progress Percentage Display (PDFCraft Style) ── */}
        <div className="pt-5 px-1.5 flex flex-col items-center gap-1 z-10">
          <span className="text-[8px] font-sans font-semibold tracking-[0.2em] text-neutral-400/90 dark:text-neutral-500 uppercase">
            PROGRESS
          </span>
          <span
            ref={percentRef}
            className="text-[12.5px] font-sans font-bold tabular-nums text-[#0A84FF] tracking-tight"
          >
            000%
          </span>
          <div className="w-6 h-px bg-black/[0.08] dark:bg-white/[0.1] mt-1" />
        </div>

        {/* ── Continuous Progress Track with Glowing Spine & Ruler Ticks ── */}
        <div className="relative flex-1 my-3 w-full overflow-visible">
          {/* Subtle millimeter/scale ruler graduation ticks */}
          <div className="absolute inset-y-0 right-0 w-full flex flex-col justify-between py-2 pointer-events-none">
            {RULER_TICKS.map((tick) => (
              <div
                key={tick.index}
                className="relative flex items-center justify-end pr-0.5 w-full"
              >
                {tick.label && (
                  <span className="absolute right-4 text-[8.5px] font-sans text-neutral-400/90 dark:text-neutral-500 font-medium tabular-nums select-none tracking-normal">
                    {tick.label}
                  </span>
                )}
                <div
                  className={cn(
                    'h-[1px] transition-colors',
                    tick.isMajor
                      ? 'w-3 bg-neutral-400/90 dark:bg-neutral-600/90'
                      : 'w-1.5 bg-neutral-300/60 dark:bg-neutral-700/60',
                  )}
                />
              </div>
            ))}
          </div>

          {/* Vertical spine baseline */}
          <div className="absolute inset-y-2 right-[5px] w-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-full" />

          {/* Dynamic Glowing Continuous Progress Line */}
          <motion.div
            className="absolute inset-y-2 right-[5px] w-[2px] bg-gradient-to-b from-[#0A84FF] via-[#38BDF8] to-[#0A84FF] rounded-full origin-top shadow-[0_0_12px_rgba(10,132,255,0.85)]"
            style={{ scaleY: smoothProgress }}
          />

          {/* Live Needle Indicator */}
          <motion.div
            className="absolute right-0 w-3.5 h-[2px] bg-[#0A84FF] shadow-[0_0_8px_#0A84FF]"
            style={{
              top: needleTop,
            }}
          />

          {/* Section Checkpoint Nodes */}
          <div className="absolute inset-y-4 right-[1px] flex flex-col justify-between items-center pointer-events-auto">
            {SECTIONS.map((sec, idx) => {
              const isActive = activeSection === sec.id;
              const isPast = idx < currentIdx;

              return (
                <div
                  key={sec.id}
                  title={`${sec.number} · ${sec.label}`}
                  className="relative flex items-center justify-center group cursor-pointer py-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(sec.id);
                  }}
                >
                  {/* Interactive Checkpoint Node */}
                  <div
                    className={cn(
                      'rounded-full transition-all duration-300 flex items-center justify-center',
                      isActive
                        ? 'size-3.5 border-2 border-[#0A84FF] bg-white dark:bg-[#0c0d0f] shadow-[0_0_14px_rgba(10,132,255,0.9)] scale-125'
                        : isPast
                          ? 'size-2.5 border border-[#0A84FF]/80 bg-white dark:bg-[#0c0d0f]'
                          : 'size-2.5 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-[#0c0d0f] group-hover:scale-125 group-hover:border-[#0A84FF]',
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-full transition-all duration-300',
                        isActive
                          ? 'size-1 bg-[#0A84FF] animate-pulse'
                          : isPast
                            ? 'size-1 bg-[#0A84FF]/80'
                            : 'size-1 bg-transparent group-hover:bg-[#0A84FF]/60',
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Section Jump Anchors (Authentic PDFCraft Footer Style - No Truncation) ── */}
        <div className="pb-5 px-1.5 flex flex-col items-center gap-2 z-10 border-t border-black/[0.08] dark:border-white/[0.08] pt-3 w-full">
          <div className="flex flex-col items-center gap-1 w-full">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(sec.id);
                  }}
                  className={cn(
                    'font-sans text-[9.5px] tracking-[0.14em] uppercase text-center w-full whitespace-nowrap py-0.5 rounded transition-all duration-200',
                    isActive
                      ? 'text-[#0A84FF] font-semibold drop-shadow-[0_0_8px_rgba(10,132,255,0.45)] scale-[1.04]'
                      : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 font-medium',
                  )}
                  title={sec.label}
                >
                  {sec.shortLabel}
                </button>
              );
            })}
          </div>
          <span className="text-[7.5px] font-sans font-semibold text-neutral-400/80 dark:text-neutral-500 tracking-[0.22em] uppercase pt-1 border-t border-black/[0.04] dark:border-white/[0.04] w-full text-center">
            HUD
          </span>
        </div>
      </aside>
    </>
  );
}
