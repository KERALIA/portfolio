'use client';

import React from 'react';
import { BlurFade } from '@/components/ui/blur-fade';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { BrandIcon } from '@/components/brand-icons';
import { ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="mb-14">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 mb-3">
              <span className="size-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>Core Engineering DNA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              Systems Internals to High-Scale Cloud Architecture.
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--text-secondary)] max-w-2xl font-mono">
              Bridging bare-metal silicon, Linux kernels, and type-safe distributed web platforms.
            </p>
          </BlurFade>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Systems Engineering Trench with Aceternity CardSpotlight */}
          <BlurFade delay={0.2} inView className="h-full">
            <CardSpotlight
              color="#0A84FF"
              radius={380}
              className="h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-[var(--accent)]/60 transition-all duration-300"
            >
              <div className="relative z-10">
                {/* Authentic Tech Badges Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
                      <BrandIcon name="android" className="size-5" />
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-inner">
                      <BrandIcon name="linux" className="size-5" />
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-inner">
                      <BrandIcon name="cpp" className="size-5" />
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)]">
                    Low-Level Systems
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  Kernel to Hardware Abstraction
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                  C · C++ · SELinux · AOSP 15/16
                </p>

                <div className="mt-5 space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    Most developers pick a single layer of the stack. I build across all of them. Deep in Android Open Source Project (AOSP) source trees, I author device trees from scratch, diagnose camera sensor initialization panics, trace MediaTek Binder IPC deadlocks, and migrate vendor blobs across Android 15 and 16.
                  </p>
                  <p>
                    Pursuing Computer Engineering at A.D. Patel Institute of Technology (8.15 CGPA), my practical engineering happens in the trenches — authoring strict SELinux domain transitions, reverse-engineering MediaTek vendor binaries, and patching Linux GKI 6.6+ kernel drivers.
                  </p>
                </div>
              </div>

              {/* Subsystem Specifications Footer */}
              <div className="relative z-10 mt-8 pt-5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="size-2 rounded-full bg-blue-400" />
                  <span>MediaTek Dimensity &amp; Snapdragon</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 font-semibold">
                  Linux GKI 6.6+
                </span>
              </div>
            </CardSpotlight>
          </BlurFade>

          {/* Card 2: Production Web & In-Memory RAG with Aceternity CardSpotlight */}
          <BlurFade delay={0.3} inView className="h-full">
            <CardSpotlight
              color="#10B981"
              radius={380}
              className="h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-emerald-500/60 transition-all duration-300"
            >
              <div className="relative z-10">
                {/* Authentic Tech Badges Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white shadow-inner">
                      <BrandIcon name="nextjs" className="size-5" />
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#3178C6]/10 border border-[#3178C6]/30 text-[#3178C6] shadow-inner">
                      <BrandIcon name="typescript" className="size-5" />
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
                      <BrandIcon name="supabase" className="size-5" />
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)]">
                    Production Full-Stack
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight group-hover:text-emerald-400 transition-colors">
                  Production Web &amp; In-Memory RAG Systems
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                  Next.js 16 (Turbopack) · Supabase PostgreSQL · Groq LPU
                </p>

                <div className="mt-5 space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    On the web and distributed systems side, I design and ship production platforms like <strong className="text-[var(--text-primary)]">Nectar Ingredients</strong>, integrating sub-second conversational sales consultants powered by Groq LPU + Qwen with custom in-memory pre-retrieval RAG pipelines.
                  </p>
                  <p>
                    My web architectures leverage Next.js App Router, React 19, TypeScript strict typing, and Supabase PostgreSQL with strict Row Level Security (RLS) policies, transactional migrations, and real-time webhook event synchronization.
                  </p>
                </div>
              </div>

              {/* Subsystem Specifications Footer */}
              <div className="relative z-10 mt-8 pt-5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <span>Sub-Second Groq LPU Inference</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  PostgreSQL RLS
                </span>
              </div>
            </CardSpotlight>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
