'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface BackgroundCubesGridProps {
  className?: string;
  cubeSize?: number;
}

export function BackgroundCubesGrid({ className, cubeSize = 54 }: BackgroundCubesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {/* Dynamic ambient cursor glow */}
      <div
        className="absolute -inset-px opacity-40 transition-opacity duration-300 ease-out dark:opacity-60"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(10, 132, 255, 0.22), transparent 75%)`,
        }}
      />

      {/* Isometric 3D Geometric Cube Grid */}
      <svg
        className="absolute inset-0 size-full stroke-[var(--border)] opacity-60 dark:opacity-75 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_80%,transparent_100%)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="isometric-cubes-pattern"
            width={cubeSize}
            height={cubeSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Outer box border */}
            <path
              d={`M 0 0 L ${cubeSize} 0 L ${cubeSize} ${cubeSize} L 0 ${cubeSize} Z`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="stroke-[var(--border)]"
            />
            {/* Isometric 3D center cube projection */}
            <path
              d={`M 0 0 L ${cubeSize / 2} ${cubeSize / 2} L ${cubeSize} 0`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="stroke-[var(--accent)]/40"
            />
            <path
              d={`M ${cubeSize / 2} ${cubeSize / 2} L ${cubeSize / 2} ${cubeSize}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="stroke-[var(--accent)]/40"
            />
            {/* Corner connection node */}
            <circle
              cx={cubeSize / 2}
              cy={cubeSize / 2}
              r="1.5"
              className="fill-[var(--accent)]"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#isometric-cubes-pattern)" />
      </svg>
    </div>
  );
}
