'use client';

import { useEffect } from 'react';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          const glass = entry.target.querySelector('.glass-card');
          if (glass) {
            glass.classList.add('is-glowing');
            window.setTimeout(() => glass.classList.remove('is-glowing'), 1200);
          }
          revealObserver.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    if (reducedMotion) {
      revealEls.forEach((el) => el.classList.add('active'));
    }

    const maxTilt = 3;
    const cleanups: (() => void)[] = [];
    const boundCards = new WeakSet<HTMLElement>();

    const bindTiltCard = (card: HTMLElement) => {
      if (boundCards.has(card)) return;
      boundCards.add(card);

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-rx', `${-y * maxTilt}deg`);
        card.style.setProperty('--tilt-ry', `${x * maxTilt}deg`);
      };
      const onLeave = () => {
        card.style.removeProperty('--tilt-rx');
        card.style.removeProperty('--tilt-ry');
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };

    const bindAllTiltCards = () => {
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(bindTiltCard);
    };

    if (finePointer && !reducedMotion) {
      bindAllTiltCards();

      const mo = new MutationObserver(bindAllTiltCards);
      mo.observe(document.body, { childList: true, subtree: true });
      cleanups.push(() => mo.disconnect());
    }

    return () => {
      revealObserver.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return <>{children}</>;
}
