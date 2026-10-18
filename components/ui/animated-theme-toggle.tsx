'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AnimationVariant =
  | 'circle'
  | 'rectangle'
  | 'circle-blur'
  | 'polygon';

export type AnimationStart =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'top-center'
  | 'bottom-center'
  | 'bottom-up'
  | 'top-down'
  | 'left-right'
  | 'right-left';

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case 'top-left':
      return { cx: '0', cy: '0' };
    case 'top-right':
      return { cx: '40', cy: '0' };
    case 'bottom-left':
      return { cx: '0', cy: '40' };
    case 'bottom-right':
      return { cx: '40', cy: '40' };
    case 'top-center':
      return { cx: '20', cy: '0' };
    case 'bottom-center':
      return { cx: '20', cy: '40' };
    default:
      return { cx: '20', cy: '20' };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === 'circle-blur') {
    if (start === 'center') {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }
    const coords = getPositionCoords(start);
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${coords.cx}" cy="${coords.cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  if (start === 'center') return '';
  if (variant === 'rectangle') return '';

  const coords = getPositionCoords(start);
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${coords.cx}" cy="${coords.cy}" r="20" fill="white"/></svg>`;
};

export const createAnimation = (
  variant: AnimationVariant = 'circle',
  start: AnimationStart = 'center',
  blur = false,
): Animation => {
  if (variant === 'circle' && start === 'center') {
    return {
      name: `${variant}-${start}${blur ? '-blur' : ''}`,
      css: `
      ::view-transition-group(root) {
        animation-duration: 0.6s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }
      ::view-transition-new(root) {
        animation-name: reveal-light${blur ? '-blur' : ''};
        ${blur ? 'filter: blur(2px);' : ''}
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark${blur ? '-blur' : ''};
        ${blur ? 'filter: blur(2px);' : ''}
      }
      @keyframes reveal-dark${blur ? '-blur' : ''} {
        from {
          clip-path: circle(0% at 50% 50%);
          ${blur ? 'filter: blur(8px);' : ''}
        }
        to {
          clip-path: circle(120% at 50% 50%);
          ${blur ? 'filter: blur(0px);' : ''}
        }
      }
      @keyframes reveal-light${blur ? '-blur' : ''} {
        from {
          clip-path: circle(0% at 50% 50%);
          ${blur ? 'filter: blur(8px);' : ''}
        }
        to {
          clip-path: circle(120% at 50% 50%);
          ${blur ? 'filter: blur(0px);' : ''}
        }
      }
      `,
    };
  }

  return {
    name: 'default',
    css: `
      ::view-transition-group(root) {
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
      }
    `,
  };
};

const THEME_STORAGE_KEY = 'aum_patel_portfolio_theme';
const STYLE_ID = 'theme-transition-styles';

export const useAppTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const initialDark = saved ? saved === 'dark' : document.documentElement.classList.contains('dark');
    setIsDark(initialDark);
  }, []);

  const updateStyles = useCallback((css: string) => {
    if (typeof window === 'undefined') return;
    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
  }, []);

  const toggle = useCallback(
    (variant: AnimationVariant = 'circle', start: AnimationStart = 'center') => {
      const next = !isDark;
      setIsDark(next);

      const animation = createAnimation(variant, start, false);
      updateStyles(animation.css);

      const applyTheme = () => {
        const nextMode = next ? 'dark' : 'light';
        localStorage.setItem(THEME_STORAGE_KEY, nextMode);
        const html = document.documentElement;
        html.classList.remove('light', 'dark');
        html.classList.add(nextMode);
      };

      if (typeof document !== 'undefined' && 'startViewTransition' in document) {
        (document as any).startViewTransition(applyTheme);
      } else {
        applyTheme();
      }
    },
    [isDark, updateStyles],
  );

  return { isDark, toggle };
};

// ── Theme Button 1: Yin-Yang / Orbital Morph ─────────────────────────────
export const ThemeToggleButton1 = ({
  isDark,
  onToggle,
  className = '',
}: {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}) => (
  <button
    type="button"
    aria-label="Toggle theme (Orbit)"
    className={cn(
      'relative flex items-center justify-center size-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent)] active:scale-95 shadow-sm',
      className,
    )}
    onClick={onToggle}
  >
    <svg viewBox="0 0 240 240" fill="none" className="size-5" xmlns="http://www.w3.org/2000/svg">
      <motion.g
        animate={{ rotate: isDark ? -180 : 0 }}
        transition={{ ease: 'easeInOut', duration: 0.35 }}
      >
        <path
          d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
          fill="currentColor"
        />
        <path
          d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
          fill="var(--accent)"
        />
      </motion.g>
      <motion.path
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ ease: 'easeInOut', duration: 0.35 }}
        d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
        fill="currentColor"
      />
    </svg>
  </button>
);

// ── Theme Button 2: Sun-Ray Crescent Morph (Skiper4 #2) ──────────────────
export const ThemeToggleButton2 = ({
  isDark,
  onToggle,
  className = '',
}: {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}) => (
  <button
    type="button"
    aria-label="Toggle theme (Solar/Lunar)"
    className={cn(
      'relative flex items-center justify-center size-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent)] active:scale-95 shadow-sm',
      className,
    )}
    onClick={onToggle}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      strokeLinecap="round"
      viewBox="0 0 32 32"
      className="size-5"
    >
      <clipPath id="skiper-btn-2-port">
        <motion.path
          animate={{ y: isDark ? 10 : 0, x: isDark ? -12 : 0 }}
          transition={{ ease: 'easeInOut', duration: 0.35 }}
          d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
        />
      </clipPath>
      <g clipPath="url(#skiper-btn-2-port)">
        <motion.circle
          animate={{ r: isDark ? 10 : 7.5 }}
          transition={{ ease: 'easeInOut', duration: 0.35 }}
          cx="16"
          cy="16"
        />
        <motion.g
          animate={{
            rotate: isDark ? -100 : 0,
            scale: isDark ? 0.5 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ ease: 'easeInOut', duration: 0.35 }}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M16 5.5v-4" />
          <path d="M16 30.5v-4" />
          <path d="M1.5 16h4" />
          <path d="M26.5 16h4" />
          <path d="m23.4 8.6 2.8-2.8" />
          <path d="m5.7 26.3 2.9-2.9" />
          <path d="m5.8 5.8 2.8 2.8" />
          <path d="m23.4 23.4 2.9 2.9" />
        </motion.g>
      </g>
    </svg>
  </button>
);

// ── Theme Button 3: Corona Dots Morph (Skiper4 #3) ──────────────────────
export const ThemeToggleButton3 = ({
  isDark,
  onToggle,
  className = '',
}: {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}) => (
  <button
    type="button"
    aria-label="Toggle theme (Constellation)"
    className={cn(
      'relative flex items-center justify-center size-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent)] active:scale-95 shadow-sm',
      className,
    )}
    onClick={onToggle}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      strokeLinecap="round"
      viewBox="0 0 32 32"
      className="size-5"
    >
      <clipPath id="skiper-btn-3-port">
        <motion.path
          animate={{ y: isDark ? 14 : 0, x: isDark ? -11 : 0 }}
          transition={{ ease: 'easeInOut', duration: 0.35 }}
          d="M0-11h25a1 1 0 0017 13v30H0Z"
        />
      </clipPath>
      <g clipPath="url(#skiper-btn-3-port)">
        <motion.circle
          animate={{ r: isDark ? 10 : 8 }}
          transition={{ ease: 'easeInOut', duration: 0.35 }}
          cx="16"
          cy="16"
        />
        <motion.g
          animate={{
            scale: isDark ? 0.5 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ ease: 'easeInOut', duration: 0.35 }}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
        </motion.g>
      </g>
    </svg>
  </button>
);

// ── Theme Button 4: Filament Lamp (Skiper4 #4) ──────────────────────────
export const ThemeToggleButton4 = ({
  isDark,
  onToggle,
  className = '',
}: {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}) => (
  <button
    type="button"
    aria-label="Toggle theme (Filament)"
    className={cn(
      'relative flex items-center justify-center size-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent)] active:scale-95 shadow-sm',
      className,
    )}
    onClick={onToggle}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      strokeWidth="0.7"
      stroke="currentColor"
      fill="currentColor"
      strokeLinecap="round"
      viewBox="0 0 32 32"
      className="size-5"
    >
      <path
        strokeWidth="0"
        d="M9.4 9.9c1.8-1.8 4.1-2.7 6.6-2.7 5.1 0 9.3 4.2 9.3 9.3 0 2.3-.8 4.4-2.3 6.1-.7.8-2 2.8-2.5 4.4 0 .2-.2.4-.5.4-.2 0-.4-.2-.4-.5v-.1c.5-1.8 2-3.9 2.7-4.8 1.4-1.5 2.1-3.5 2.1-5.6 0-4.7-3.7-8.5-8.4-8.5-2.3 0-4.4.9-5.9 2.5-1.6 1.6-2.5 3.7-2.5 6 0 2.1.7 4 2.1 5.6.8.9 2.2 2.9 2.7 4.9 0 .2-.1.5-.4.5h-.1c-.2 0-.4-.1-.4-.4-.5-1.7-1.8-3.7-2.5-4.5-1.5-1.7-2.3-3.9-2.3-6.1 0-2.3 1-4.7 2.7-6.5z"
      />
      <path d="M19.8 28.3h-7.6" />
      <path d="M19.8 29.5h-7.6" />
      <path d="M19.8 30.7h-7.6" />
      <motion.path
        animate={{
          pathLength: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ ease: 'easeInOut', duration: 0.35 }}
        pathLength="1"
        fill="none"
        d="M14.6 27.1c0-3.4 0-6.8-.1-10.2-.2-1-1.1-1.7-2-1.7-1.2-.1-2.3 1-2.2 2.3.1 1 .9 1.9 2.1 2h7.2c1.1-.1 2-1 2.1-2 .1-1.2-1-2.3-2.2-2.3-.9 0-1.7.7-2 1.7 0 3.4 0 6.8-.1 10.2"
      />
      <motion.g
        animate={{
          scale: isDark ? 0.5 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ ease: 'easeInOut', duration: 0.35 }}
      >
        <path pathLength="1" d="M16 6.4V1.3" />
        <path pathLength="1" d="M26.3 15.8h5.1" />
        <path pathLength="1" d="m22.6 9 3.7-3.6" />
        <path pathLength="1" d="M9.4 9 5.7 5.4" />
        <path pathLength="1" d="M5.7 15.8H.6" />
      </motion.g>
    </svg>
  </button>
);

// ── Theme Button 5: Eclipse Morph (Skiper4 #5) ──────────────────────────
export const ThemeToggleButton5 = ({
  isDark,
  onToggle,
  className = '',
}: {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}) => (
  <button
    type="button"
    aria-label="Toggle theme (Eclipse)"
    className={cn(
      'relative flex items-center justify-center size-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent)] active:scale-95 shadow-sm',
      className,
    )}
    onClick={onToggle}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 32 32"
      className="size-5"
    >
      <clipPath id="skiper-btn-4-port">
        <motion.path
          animate={{ y: isDark ? 5 : 0, x: isDark ? -20 : 0 }}
          transition={{ ease: 'easeInOut', duration: 0.35 }}
          d="M0-5h55v37h-55zm32 12a1 1 0 0025 0 1 1 0 00-25 0"
        />
      </clipPath>
      <g clipPath="url(#skiper-btn-4-port)">
        <circle cx="16" cy="16" r="14" />
      </g>
    </svg>
  </button>
);

// ── Complete Interactive Toggle with Style Selector ──────────────────────
export function ModernThemeToggle() {
  const { isDark, toggle } = useAppTheme();
  const [styleIndex, setStyleIndex] = useState<number>(2); // defaults to Sun-Ray Crescent
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const renderActiveButton = () => {
    switch (styleIndex) {
      case 1:
        return <ThemeToggleButton1 isDark={isDark} onToggle={toggle} />;
      case 2:
        return <ThemeToggleButton2 isDark={isDark} onToggle={toggle} />;
      case 3:
        return <ThemeToggleButton3 isDark={isDark} onToggle={toggle} />;
      case 4:
        return <ThemeToggleButton4 isDark={isDark} onToggle={toggle} />;
      case 5:
        return <ThemeToggleButton5 isDark={isDark} onToggle={toggle} />;
      default:
        return <ThemeToggleButton2 isDark={isDark} onToggle={toggle} />;
    }
  };

  return (
    <div className="relative flex items-center gap-1.5">
      {renderActiveButton()}

      {/* Subtle trigger to switch between the 5 morphing styles */}
      <button
        type="button"
        aria-label="Switch Theme Toggle Animation Style"
        title="Switch animation style (Skiper4)"
        onClick={() => setShowPicker(!showPicker)}
        className="size-8 rounded-lg border border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center text-xs"
      >
        <Palette className="size-3.5" />
      </button>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="absolute right-0 top-11 z-50 p-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md shadow-2xl flex flex-col gap-2 min-w-[210px]"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Toggle FX (Skiper4)
              </span>
              <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">
                #{styleIndex}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setStyleIndex(idx);
                    setShowPicker(false);
                  }}
                  className={cn(
                    'size-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center border transition-all',
                    styleIndex === idx
                      ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)]'
                      : 'border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--text-secondary)]',
                  )}
                >
                  {idx}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
