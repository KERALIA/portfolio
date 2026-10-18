'use client';

import { Marquee } from '@/components/ui/marquee';

const SYSTEMS_STACK = [
  { name: 'AOSP', desc: 'Android Open Source Project' },
  { name: 'Linux Kernel', desc: 'GKI & Driver Patching' },
  { name: 'C / C++', desc: 'Hardware Abstraction Layers' },
  { name: 'SELinux', desc: 'Vendor Security Policies' },
  { name: 'MediaTek Dimensity', desc: '8400 Ultra Hardware' },
  { name: 'Soong & Make', desc: 'Android Build System (.bp / .mk)' },
  { name: 'Ninja', desc: 'Fast Native Compilation' },
  { name: 'Gerrit', desc: 'AOSP Code Review Pipeline' },
  { name: 'ADB & Fastboot', desc: 'Device Flashing & Logcat' },
  { name: 'Vendor Blobs', desc: 'HAL Reverse Engineering' },
];

const WEB_STACK = [
  { name: 'Next.js 16', desc: 'Turbopack App Router' },
  { name: 'React 19', desc: 'Modern Component Model' },
  { name: 'TypeScript', desc: 'Strict End-to-End Safety' },
  { name: 'Supabase', desc: 'PostgreSQL, RLS & Realtime' },
  { name: 'Groq LPU', desc: 'Sub-Second LLM Inference' },
  { name: 'Tailwind CSS', desc: 'Utility Design Tokens' },
  { name: 'Three.js / WebGL', desc: 'Interactive 3D Canvases' },
  { name: 'Google Sheets DB', desc: 'Apps Script Cloud Bridge' },
  { name: 'Vercel', desc: 'Edge Functions & CI/CD' },
  { name: 'REST & Webhooks', desc: 'Transactional Event Pipelines' },
];

export default function TechMarquee() {
  return (
    <section id="stack" className="relative w-full py-20 px-4 overflow-hidden border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto mb-12">
        <header className="text-center max-w-2xl mx-auto">
          <p className="section-eyebrow">Technical Mastery</p>
          <h2 className="section-title">
            From Bare-Metal Silicon to Edge Web Runtimes
          </h2>
        </header>
      </div>

      <div className="relative flex flex-col gap-4 max-w-6xl mx-auto overflow-hidden">
        {/* Row 1: Systems Engineering */}
        <Marquee pauseOnHover className="[--duration:35s]">
          {SYSTEMS_STACK.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-colors duration-200"
            >
              <div className="size-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)] font-mono">{item.name}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Web & Full-Stack */}
        <Marquee reverse pauseOnHover className="[--duration:35s]">
          {WEB_STACK.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-emerald-500/50 transition-colors duration-200"
            >
              <div className="size-2 rounded-full bg-emerald-400" />
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)] font-mono">{item.name}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      </div>
    </section>
  );
}
