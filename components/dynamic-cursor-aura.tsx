'use client';
import dynamic from 'next/dynamic';

export const CursorAura = dynamic(() => import('@/components/cursor-aura').then((m) => m.CursorAura), { ssr: false });
