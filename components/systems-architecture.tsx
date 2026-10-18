'use client';

import React, { forwardRef, useRef } from 'react';
import { Cpu, ShieldCheck, Layers, Smartphone, Globe, Database, Terminal } from 'lucide-react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { cn } from '@/lib/utils';

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string; sublabel?: string }
>(({ className, children, label, sublabel }, ref) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        ref={ref}
        className={cn(
          'z-10 flex size-12 md:size-14 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 shadow-md transition-all duration-300 hover:scale-105 hover:border-[var(--accent)]',
          className
        )}
      >
        {children}
      </div>
      {label && <span className="text-[11px] md:text-xs font-semibold text-[var(--text-primary)] tracking-tight text-center max-w-[120px]">{label}</span>}
      {sublabel && <span className="text-[9px] md:text-[10px] text-[var(--text-muted)] font-mono text-center max-w-[120px] line-clamp-1">{sublabel}</span>}
    </div>
  );
});

Circle.displayName = 'Circle';

export default function SystemsArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const divKernelRef = useRef<HTMLDivElement>(null);
  const divHalRef = useRef<HTMLDivElement>(null);
  const divSepolicyRef = useRef<HTMLDivElement>(null);
  const divCenterRef = useRef<HTMLDivElement>(null);
  const divNextRef = useRef<HTMLDivElement>(null);
  const divDbRef = useRef<HTMLDivElement>(null);

  return (
    <section id="systems" className="relative w-full px-4 py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="mb-14 text-center max-w-3xl mx-auto">
          <p className="section-eyebrow">AOSP &amp; Systems Architecture</p>
          <h2 className="section-title">
            The Full Kernel-to-HAL-to-Web Pipeline
          </h2>
          <p className="section-body mt-3">
            Authoring hardware trees from the ground up: MediaTek Linux kernel patches, C++ hardware abstraction layers, vendor SELinux rules, custom ROM bring-up, and high-performance web backends.
          </p>
        </header>

        <div
          ref={containerRef}
          className="relative flex w-full max-w-4xl mx-auto items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 md:p-12 backdrop-blur-md shadow-2xl overflow-hidden"
        >
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Left Column: Low-Level Internals */}
          <div className="flex flex-col justify-between gap-6 md:gap-10 z-10">
            <Circle
              ref={divKernelRef}
              label="Linux Kernel"
              sublabel="xiaomi_rodin-kernel"
            >
              <Cpu className="size-6 text-[var(--accent)]" />
            </Circle>
            <Circle
              ref={divHalRef}
              label="Hardware HALs"
              sublabel="C++ MTK & Xiaomi"
            >
              <Layers className="size-6 text-purple-400" />
            </Circle>
            <Circle
              ref={divSepolicyRef}
              label="SELinux Security"
              sublabel="mediatek_sepolicy_vndr"
            >
              <ShieldCheck className="size-6 text-emerald-400" />
            </Circle>
          </div>

          {/* Center Hub: POCO X7 Pro AOSP Core */}
          <div className="flex flex-col items-center justify-center z-10 mx-2 md:mx-6">
            <Circle
              ref={divCenterRef}
              className="size-16 md:size-20 border-[var(--accent)]/50 bg-[var(--surface)] shadow-[0_0_30px_rgba(10,132,255,0.25)]"
              label="AOSP Android 16"
              sublabel="POCO X7 Pro (rodin)"
            >
              <Smartphone className="size-8 md:size-10 text-[var(--accent)]" />
            </Circle>
            <span className="mt-2 text-[10px] md:text-xs text-[var(--accent)] font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              Dimensity 8400 Ultra
            </span>
          </div>

          {/* Right Column: Web Platforms & Real-Time Data */}
          <div className="flex flex-col justify-around gap-10 md:gap-14 z-10">
            <Circle
              ref={divNextRef}
              label="Nectar Ingredients"
              sublabel="Next.js 16 + Groq LPU"
            >
              <Globe className="size-6 text-cyan-400" />
            </Circle>
            <Circle
              ref={divDbRef}
              label="Database & Auth"
              sublabel="Supabase RLS & Sheets"
            >
              <Database className="size-6 text-emerald-400" />
            </Circle>
          </div>

          {/* Animated Beams: Kernel -> Center */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={divKernelRef}
            toRef={divCenterRef}
            curvature={-25}
            duration={4}
            gradientStartColor="#0A84FF"
            gradientStopColor="#60A5FA"
          />

          {/* Animated Beams: HAL -> Center */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={divHalRef}
            toRef={divCenterRef}
            curvature={0}
            duration={3.5}
            gradientStartColor="#A855F7"
            gradientStopColor="#0A84FF"
          />

          {/* Animated Beams: SELinux -> Center */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={divSepolicyRef}
            toRef={divCenterRef}
            curvature={25}
            duration={4.2}
            gradientStartColor="#10B981"
            gradientStopColor="#0A84FF"
          />

          {/* Animated Beams: Center -> Next.js */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={divCenterRef}
            toRef={divNextRef}
            curvature={-20}
            duration={3.8}
            gradientStartColor="#0A84FF"
            gradientStopColor="#06B6D4"
          />

          {/* Animated Beams: Center -> Database */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={divCenterRef}
            toRef={divDbRef}
            curvature={20}
            duration={4}
            gradientStartColor="#0A84FF"
            gradientStopColor="#10B981"
          />
        </div>

        {/* Stack hierarchy pill indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
            android_device_xiaomi_rodin-kernel
          </span>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
            android_hardware_xiaomi
          </span>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
            android_hardware_mediatek
          </span>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
            android_device_mediatek_sepolicy_vndr
          </span>
        </div>
      </div>
    </section>
  );
}
