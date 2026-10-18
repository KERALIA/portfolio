'use client';

import React from 'react';
import { ArrowUpRight, Github, Globe, CheckCircle2, Shield, Layers, Zap, Database } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { ChannelLinkCards } from '@/components/channel-link-cards';
import { BrandIcon } from '@/components/brand-icons';
import { SienaParallax } from '@/components/ui/siena-parallax';

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full px-4 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* ── 1. ACETERNITY CONTAINER SCROLL ANIMATION (NECTAR INGREDIENTS MAIN FRAME) ── */}
        <div id="featured-nectar">
        <ContainerScroll
          titleComponent={
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 font-mono">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Featured Flagship Production Platform</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
                Nectar Ingredients
              </h2>
              <p className="text-sm md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-mono">
                B2B E-Commerce &amp; In-Memory Pre-Retrieval RAG Engine
              </p>
            </div>
          }
        >
          {/* Inside the 3D tilted dashboard container */}
          <div className="h-full w-full bg-[var(--surface)] text-[var(--text-primary)] flex flex-col justify-between p-4 md:p-8 overflow-y-auto rounded-2xl border border-[var(--border)]">
            {/* Mockup Top Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center font-bold text-[var(--accent)] shadow-inner">
                  N
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold font-mono text-[var(--text-primary)]">
                    Nectar Ingredients Pvt. Ltd.
                  </h4>
                  <p className="text-[10px] md:text-xs text-[var(--text-muted)]">Surendranagar, Gujarat · Commercial B2B</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] md:text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Groq LPU: 140ms
                </span>
                <span className="text-[10px] md:text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Supabase RLS Active
                </span>
              </div>
            </div>

            {/* Core README Highlights Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)]/40 flex gap-3.5 hover:border-[var(--accent)]/40 transition-colors">
                <CheckCircle2 className="size-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-[var(--text-primary)]">40+ Pure Single-Source Dehydrated Powders</h5>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    Low-temperature vacuum processing retaining natural aroma, essential volatile oils, and key bioactive antioxidants (<em className="text-[var(--text-primary)]">lycopene, curcumin, allicin, gingerol</em>).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)]/40 flex gap-3.5 hover:border-amber-500/40 transition-colors">
                <Zap className="size-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-[var(--text-primary)]">In-Memory Pre-Retrieval RAG Engine</h5>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    Sub-second conversational sales consultant powered by Groq LPU + Qwen with automated Certificate of Analysis (COA) retrieval and instant brochure routing.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)]/40 flex gap-3.5 hover:border-emerald-500/40 transition-colors">
                <Database className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-[var(--text-primary)]">Dual Supabase &amp; Sheets Cloud Sync</h5>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    High-speed PostgreSQL transactional auth and orders synchronized with Google Sheets Cloud DB and Google Apps Script factory webhooks.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)]/40 flex gap-3.5 hover:border-cyan-500/40 transition-colors">
                <Globe className="size-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-[var(--text-primary)]">End-to-End B2B Commerce Pipeline</h5>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    Sample basket workflow, dynamic tiered wholesale pricing rules, Paytm payment gateway, automated invoice dispatch, and live client portal.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Live Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]">
                  <BrandIcon name="nextjs" className="size-4 text-[var(--text-primary)]" />
                  <BrandIcon name="typescript" className="size-4 text-[#3178C6]" />
                  <BrandIcon name="supabase" className="size-4 text-[#3ECF8E]" />
                  <BrandIcon name="tailwind" className="size-4 text-[#38BDF8]" />
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] ml-2">Next.js 16 · Turbopack · React 19</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://nectaringredients.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs md:text-sm font-semibold shadow-lg shadow-[var(--accent)]/20 hover:bg-[var(--accent)]/90 transition-all"
                >
                  <Globe className="size-4" />
                  Visit Live Platform
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href="https://github.com/KERALIA/Nectar_Ingredients"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs md:text-sm font-medium border border-[var(--border)] hover:border-[var(--accent)] transition-all"
                >
                  <Github className="size-4" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </ContainerScroll>
        </div>

        {/* ── 2. THREE PRO CARDS WITH ACETERNITY CARDSPOTLIGHT & AUTHENTIC SYMBOLS (SIENA PARALLAX) ── */}
        <SienaParallax className="my-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: POCO X7 Pro AOSP Stack */}
          <CardSpotlight
            color="#0A84FF"
            radius={320}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 flex flex-col justify-between hover:border-[var(--accent)]/60 transition-all duration-300 shadow-xl group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
                  <BrandIcon name="android" className="size-5" />
                  <BrandIcon name="linux" className="size-5 text-amber-400" />
                  <BrandIcon name="cpp" className="size-5 text-blue-400" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)]">
                  AOSP Architecture
                </span>
              </div>

              <h4 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                POCO X7 Pro (rodin) AOSP Bring-up
              </h4>
              <p className="mt-2.5 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                Complete low-level Android 16 bring-up for Xiaomi rodin on MediaTek Dimensity 8400 Ultra. Authored device trees from scratch, resolved Camera HAL crashes, and built the GKI kernel tree.
              </p>

              {/* Exact Repos requested */}
              <div className="mt-5 p-3.5 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
                  <Layers className="size-3.5 text-[var(--accent)]" />
                  Full Kernel-to-HAL Hierarchy:
                </div>
                <div className="text-[11px] text-[var(--text-muted)] pl-5 space-y-1">
                  <p className="hover:text-[var(--text-primary)] transition-colors">• android_device_xiaomi_rodin-kernel</p>
                  <p className="hover:text-[var(--text-primary)] transition-colors">• android_hardware_mediatek (C++ / HIDL)</p>
                  <p className="hover:text-[var(--text-primary)] transition-colors">• android_hardware_xiaomi (C++ / AIDL)</p>
                  <p className="hover:text-[var(--text-primary)] transition-colors">• android_device_mediatek_sepolicy_vndr</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-muted)]">C++ · SELinux · Make</span>
              <a
                href="https://github.com/KERALIA/.github"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
              >
                GitHub Hub <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </CardSpotlight>

          {/* Card 2: Absolute Focus Userscript */}
          <CardSpotlight
            color="#10B981"
            radius={320}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-300 shadow-xl group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
                  <Shield className="size-5 text-emerald-400" />
                  <BrandIcon name="javascript" className="size-5 text-amber-300" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)]">
                  Privacy Utility
                </span>
              </div>

              <h4 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors">
                Absolute Focus – Privacy &amp; Visibility Engine
              </h4>
              <p className="mt-2.5 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                Advanced developer utility and privacy-enforcing userscript designed to enforce persistent document visibility states and active focus contexts globally. Intercepts intrusive behavioral telemetry streams and suppresses disruptive layout tracking popups.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {['JavaScript', 'DOM Events', 'Page Visibility API', 'Telemetry Interception'].map((t) => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-muted)]">Userscript Engine</span>
              <a
                href="https://github.com/KERALIA/absolute-focus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
              >
                Inspect Code <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </CardSpotlight>

          {/* Card 3: LancerLink Client Portal */}
          <CardSpotlight
            color="#06B6D4"
            radius={320}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 flex flex-col justify-between hover:border-cyan-500/60 transition-all duration-300 shadow-xl group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner">
                  <BrandIcon name="nextjs" className="size-5 text-[var(--text-primary)]" />
                  <BrandIcon name="typescript" className="size-5 text-[#3178C6]" />
                  <BrandIcon name="supabase" className="size-5 text-[#3ECF8E]" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)]">
                  Full-Stack SaaS
                </span>
              </div>

              <h4 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                LancerLink – Freelancer Client Portal
              </h4>
              <p className="mt-2.5 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                Full-stack client management portal featuring real-time project status boards, automated invoice generation, and secure client tenant isolation backed by Supabase Row Level Security (RLS).
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL RLS'].map((t) => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
              <a
                href="https://lancer-link-web.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-primary)] hover:text-cyan-400"
              >
                Live Demo <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href="https://github.com/KERALIA/Lancer_link_web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline"
              >
                GitHub <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </CardSpotlight>
        </div>
        </SienaParallax>

        {/* ── 3. USER PROVIDED INTERACTIVE LINK CARDS WITH BACKGROUND CUBES GRID ── */}
        <div className="my-16">
          <ChannelLinkCards />
        </div>
      </div>
    </section>
  );
}
