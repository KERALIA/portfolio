'use client';

import { useEffect, useRef } from 'react';

const AURA_LERP = 0.15;
const MAG_RADIUS = 90;
const MAG_STRENGTH = 0.12;

const HOVER_SELECTORS =
  'a, button, [role="button"], .glass-card--interactive, [data-tilt], input, textarea, select, label[for]';

const MAGNETIC_SELECTORS = 'button[type="submit"], .btn-primary, .magnetic';

export function CursorAura() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (!finePointer || reducedMotion) return;

    document.documentElement.classList.add('custom-cursor-active');

    const dot = dotRef.current!;

    let mouse = { x: -9999, y: -9999 };
    let magOffset = { x: 0, y: 0 };
    let frameId = 0;
    let visible = false;

    const tick = () => {
      const targetX = mouse.x + magOffset.x;
      const targetY = mouse.y + magOffset.y;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      frameId = requestAnimationFrame(tick);
    };

    const magneticEls: HTMLElement[] = [];
    const magnetCleanups: (() => void)[] = [];

    const bindMagnetic = () => {
      document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTORS).forEach((el) => {
        if (magneticEls.includes(el)) return;
        magneticEls.push(el);

        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          if (Math.hypot(e.clientX - cx, e.clientY - cy) < MAG_RADIUS) {
            magOffset.x = (cx - e.clientX) * MAG_STRENGTH;
            magOffset.y = (cy - e.clientY) * MAG_STRENGTH;
          }
        };
        const onLeave = () => {
          magOffset = { x: 0, y: 0 };
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        magnetCleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    };

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      if (!visible) {
        visible = true;
        dot.dataset.visible = 'true';
      }
    };

    const onLeave = () => {
      visible = false;
      dot.dataset.visible = 'false';
    };

    const onHoverIn = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER_SELECTORS)) {
        dot.classList.add('cursor-dot--hover');
      }
    };

    const onHoverOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER_SELECTORS)) {
        dot.classList.remove('cursor-dot--hover');
        magOffset = { x: 0, y: 0 };
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onHoverIn, { passive: true });
    document.addEventListener('mouseout', onHoverOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    bindMagnetic();
    const mo = new MutationObserver(bindMagnetic);
    mo.observe(document.body, { childList: true, subtree: true });

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onHoverIn);
      document.removeEventListener('mouseout', onHoverOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      magnetCleanups.forEach((fn) => fn());
      mo.disconnect();
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden data-visible="false" />;
}
