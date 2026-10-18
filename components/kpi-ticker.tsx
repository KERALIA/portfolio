'use client';

import { NumberTicker } from '@/components/ui/number-ticker';

const STATS = [
  {
    value: 13,
    suffix: '+',
    label: 'Open Source Repositories',
    description: 'Kernel trees, HALs, userscripts & production web apps',
  },
  {
    value: 16,
    prefix: 'Android ',
    label: 'AOSP Bring-up',
    description: 'POCO X7 Pro (rodin) Dimensity 8400 Ultra',
  },
  {
    value: 40,
    suffix: '+',
    label: 'Single-Source Powders',
    description: 'B2B commercial platform at Nectar Ingredients',
  },
  {
    value: 8.15,
    decimalPlaces: 2,
    label: 'Computer Engineering CGPA',
    description: 'A.D. Patel Institute of Technology',
  },
];

export default function KpiTicker() {
  return (
    <section className="relative z-10 w-full px-4 py-12 border-y border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {STATS.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-mono flex items-baseline">
              {stat.prefix && <span className="text-xl md:text-2xl mr-1 font-sans">{stat.prefix}</span>}
              <NumberTicker value={stat.value} decimalPlaces={stat.decimalPlaces ?? 0} />
              {stat.suffix && <span className="text-xl md:text-2xl text-[var(--accent)]">{stat.suffix}</span>}
            </div>
            <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{stat.label}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
