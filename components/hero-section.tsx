'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { BrandIcon } from '@/components/brand-icons';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import SplitText from '@/components/SplitText';
import Magnet from '@/components/Magnet';

export default function HeroSection() {
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  // 120fps Hardware-Accelerated Lerped Parallax Engine
  useEffect(() => {
    let animationFrameId: number;
    let currentY = 0;
    let targetY = 0;
    let isRunning = false;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Background layer moves at 0.32 depth velocity
      targetY = scrollY * 0.32;
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const renderLoop = () => {
      // Linear interpolation decoupled from main thread: currentY += (targetY - currentY) * 0.12
      currentY += (targetY - currentY) * 0.12;

      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;
      }

      // Smooth organic asymptotic deceleration with no abrupt threshold cutoffs
      if (Math.abs(targetY - currentY) > 0.01) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        currentY = targetY;
        if (parallaxBgRef.current) {
          parallaxBgRef.current.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;
        }
        isRunning = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden"
    >
      {/* 120fps Hardware-Accelerated Lerped Parallax with Vertical Container Bleed (-top-[12%] h-[124%]) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div
          ref={parallaxBgRef}
          className="absolute -top-[12%] inset-x-0 h-[124%] pointer-events-none will-change-transform"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Aceternity Ambient Spotlight Backdrop */}
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#0A84FF"
          />
          {/* Ambient radial glow to prevent dark voids during fast kinetic flings */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#0A84FF]/[0.08] rounded-full blur-[140px] -z-10" />
        </div>
      </div>

      <div className="max-w-4xl w-full text-center flex flex-col items-center gap-7 z-10">
        {/* Magic UI Animated Shiny Specialty Badge with Official AOSP Brand Symbol */}
        <div className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-1.5 backdrop-blur-md transition-all hover:border-[var(--accent)]/50 shadow-sm">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse mr-2.5" />
          <BrandIcon name="android" className="size-3.5 text-emerald-400 mr-2" />
          <AnimatedShinyText className="inline-flex items-center justify-center text-xs font-mono font-medium text-[var(--text-primary)]">
            <span>AOSP · Hardware HALs · Full-Stack Web Architecture</span>
          </AnimatedShinyText>
        </div>

        {/* Greeting with cursor */}
        <p className="hero-intro text-[var(--text-primary)] !m-0">
          Hi, I&apos;m Aum Patel<span className="cursor-blink" aria-hidden="true">|</span>
        </p>

        {/* React Bits SplitText Headline Reveal */}
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            <SplitText
              text="Engineering systems from the kernel up to high-scale web platforms."
              className="inline-block"
              delay={25}
              duration={0.6}
            />
          </h1>
        </div>

        {/* Subtitle description */}
        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          I build at the intersection of low-level Android internals and modern cloud architecture — from MediaTek Dimensity kernel trees and C++ HALs to type-safe Next.js platforms with in-memory RAG inference.
        </p>

        {/* Magnetic Primary CTA + Shimmer Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Magnet padding={40} magnetStrength={3} disabled={false}>
            <a href="#projects" className="inline-block">
              <ShimmerButton
                shimmerColor="#0A84FF"
                shimmerSize="0.1em"
                borderRadius="14px"
                shimmerDuration="3s"
                background="var(--surface)"
                className="shadow-2xl border-[var(--border-hover)] text-sm font-semibold px-6 py-3.5 text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>Explore Featured Work</span>
                  <ArrowRight className="size-4 text-[var(--accent)]" />
                </span>
              </ShimmerButton>
            </a>
          </Magnet>

          <a
            href="#contact"
            className="px-6 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] transition-all duration-200"
          >
            Get in Touch →
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="pt-10" aria-hidden="true">
          <div className="scroll-indicator mx-auto" />
        </div>
      </div>
    </section>
  );
}
