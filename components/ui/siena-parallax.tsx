'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SienaParallaxProps {
  children?: React.ReactNode;
  className?: string;
}

export function SienaParallax({ children, className }: SienaParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  // Multi-velocity layer transforms
  const yLayerBack = useTransform(smoothProgress, [0, 1], [-60, 60]);
  const yLayerMid = useTransform(smoothProgress, [0, 1], [-30, 30]);
  const yLayerFront = useTransform(smoothProgress, [0, 1], [40, -40]);
  const rotateLayer = useTransform(smoothProgress, [0, 1], [-3, 3]);
  const scaleLayer = useTransform(smoothProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden py-16', className)}
    >
      {/* Background Deep Parallax Layer with Floating System Badges */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-between px-6 opacity-25 dark:opacity-20 select-none will-change-transform"
        style={{ y: yLayerBack }}
      >
        <span className="text-5xl md:text-8xl font-mono font-black text-transparent [-webkit-text-stroke:1px_var(--border-hover)]">
          KERNEL
        </span>
        <span className="text-5xl md:text-8xl font-mono font-black text-transparent [-webkit-text-stroke:1px_var(--border-hover)]">
          HAL
        </span>
        <span className="text-5xl md:text-8xl font-mono font-black text-transparent [-webkit-text-stroke:1px_var(--border-hover)]">
          AOSP
        </span>
      </motion.div>

      {/* Mid Parallax Layer with Floating Architectural Tags */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10 select-none will-change-transform"
        style={{ y: yLayerMid, rotate: rotateLayer }}
      >
        <div className="absolute top-10 left-12 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 text-[10px] font-mono text-[var(--accent)] backdrop-blur-sm shadow-sm">
          <span className="size-1.5 rounded-full bg-[var(--accent)]" />
          mediatek_sepolicy_vndr
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 text-[10px] font-mono text-emerald-400 backdrop-blur-sm shadow-sm">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          android_hardware_xiaomi
        </div>
      </motion.div>

      {/* Foreground Interactive Content Layer */}
      <motion.div
        className="relative z-20 w-full will-change-transform"
        style={{ y: yLayerFront, scale: scaleLayer }}
      >
        {children}
      </motion.div>
    </div>
  );
}
