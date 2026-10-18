'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, ArrowUpRight, Check, Copy } from 'lucide-react';
import { BrandIcon } from '@/components/brand-icons';
import { cn } from '@/lib/utils';

interface ContactChannel {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  canCopy?: boolean;
  badgeBg: string;
  badgeFg: string;
  icon: 'email' | 'github' | 'linkedin';
}

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: 'EMAIL',
    value: 'aumkeralia406@gmail.com',
    href: 'mailto:aumkeralia406@gmail.com',
    canCopy: true,
    badgeBg: '#EA4335',
    badgeFg: '#ffffff',
    icon: 'email',
  },
  {
    label: 'GITHUB',
    value: 'github.com/KERALIA',
    href: 'https://github.com/KERALIA',
    external: true,
    badgeBg: '#24292e',
    badgeFg: '#ffffff',
    icon: 'github',
  },
  {
    label: 'LINKEDIN',
    value: 'Aum Patel',
    href: 'https://www.linkedin.com/in/aum-patel-b25740388',
    external: true,
    badgeBg: '#0A66C2',
    badgeFg: '#ffffff',
    icon: 'linkedin',
  },
];

export function ContactCards() {
  const reduceMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {CONTACT_CHANNELS.map((item, idx) => {
        const isEmail = item.icon === 'email';

        return (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            className={cn(
              'group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl',
              'border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md',
              'transition-all duration-300 ease-out select-none',
              'hover:border-[var(--accent)] hover:shadow-[0_12px_32px_rgba(10,132,255,0.14)]',
              'overflow-hidden text-left'
            )}
          >
            {/* Top row: Brand Badge Disc + Label + Action Indicator */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                {/* Brand Glyph Disc (matching ChannelLinkCards) */}
                <div
                  className="inline-flex size-8 items-center justify-center rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: item.badgeBg, color: item.badgeFg }}
                >
                  {item.icon === 'email' ? (
                    <Mail className="size-4" strokeWidth={2.2} />
                  ) : item.icon === 'github' ? (
                    <BrandIcon name="github" className="size-4" />
                  ) : (
                    <BrandIcon name="linkedin" className="size-4" />
                  )}
                </div>
                <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                  {item.label}
                </span>
              </div>

              {/* Action indicator: Copy button for Email, ArrowUpRight for external links */}
              {isEmail ? (
                <button
                  type="button"
                  onClick={(e) => handleCopyEmail(e, item.value)}
                  title="Copy email address"
                  className={cn(
                    'p-1.5 rounded-lg border border-[var(--border)] transition-all',
                    copiedEmail
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                      : 'bg-[var(--surface-hover)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--border-hover)]'
                  )}
                >
                  {copiedEmail ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              ) : (
                <div className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--accent)]/40 transition-all">
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              )}
            </div>

            {/* Bottom row: Value / Handle */}
            <div className="mt-1">
              <span className="text-sm sm:text-base font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[#0A84FF] transition-colors break-all">
                {item.value}
              </span>
            </div>

            {/* Subtle bottom border gradient reveal on hover */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#0A84FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        );
      })}
    </div>
  );
}
