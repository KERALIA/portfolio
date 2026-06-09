import { ArrowRight } from 'lucide-react';
import HeroTitle from '@/components/hero-title';

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-24"
    >
      <div className="max-w-4xl w-full text-center flex flex-col items-center gap-8">
        {/* Specialty tags */}
        <p className="hero-tagline reveal">AOSP · Custom ROMs · Web Architecture</p>

        {/* Greeting with cursor */}
        <p className="reveal reveal-delay-1">
          <span className="hero-intro">
            Hi, I&apos;m Aum Patel<span className="cursor-blink" aria-hidden="true">|</span>
          </span>
        </p>

        {/* Big bold heading */}
        <div className="reveal reveal-delay-2 w-full">
          <HeroTitle />
        </div>

        {/* Body text */}
        <p className="hero-body reveal reveal-delay-3 text-center mx-auto">
          I build at the intersection of low-level Android internals and modern web
          architecture — from kernel patches and HAL debugging to type-safe Next.js
          applications backed by Supabase.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center reveal reveal-delay-4">
          <a href="#projects" className="cta-primary group">
            View Work
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#contact" className="cta-secondary group">
            Get in Touch
            <span className="text-[var(--accent)]">→</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="reveal reveal-delay-5 pt-12" aria-hidden>
          <div className="scroll-indicator mx-auto" />
        </div>
      </div>
    </section>
  );
}
