'use client';

import { useEffect, useState } from 'react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ModernThemeToggle } from '@/components/ui/animated-theme-toggle';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'systems', label: 'Systems' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const;

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const updateFavicons = (t: Theme) => {
    const selectors = 'link[rel="icon"], link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]';
    const links = document.querySelectorAll<HTMLLinkElement>(selectors);
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (t === 'dark') {
        if (!href.startsWith('/dark/')) {
          link.setAttribute('href', '/dark' + href);
        }
      } else {
        if (href.startsWith('/dark/')) {
          link.setAttribute('href', href.replace('/dark/', '/'));
        }
      }
    });
    const msMeta = document.querySelector<HTMLMetaElement>('meta[name="msapplication-TileImage"]');
    if (msMeta) {
      msMeta.content = t === 'dark' ? '/dark/ms-icon-144x144.png' : '/ms-icon-144x144.png';
    }
    const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = t === 'dark' ? '#0a0a0a' : '#ffffff';
    }
  };

  useEffect(() => {
    const apply = (t: Theme) => {
      const html = document.documentElement;
      html.classList.remove('light', 'dark');
      html.classList.add(t);
      updateFavicons(t);
    };

    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      apply(stored);
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved: Theme = isDark ? 'dark' : 'light';
      setTheme(resolved);
      apply(resolved);
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        const isDark = mq.matches;
        const resolved: Theme = isDark ? 'dark' : 'light';
        setTheme(resolved);
        apply(resolved);
      }
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(next);
    updateFavicons(next);
  };

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
        <div className="site-nav__inner">
          <a href="#top" className="site-nav__brand font-eras text-lg font-bold tracking-tight" onClick={handleLinkClick}>
            Aum Patel<span className="text-[var(--accent)]">.</span>
          </a>

          {/* Desktop Navigation with Motion Primitives AnimatedBackground */}
          <div className="hidden md:flex items-center p-1 rounded-xl border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-md" role="navigation" aria-label="Primary">
            <AnimatedBackground
              defaultValue={activeSection}
              className="rounded-lg bg-[var(--surface-hover)] border border-[var(--border-hover)]"
              transition={{
                type: 'spring',
                bounce: 0.15,
                duration: 0.3,
              }}
              enableHover
            >
              {SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  data-id={id}
                  href={`#${id}`}
                  className={`px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeSection === id ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {label}
                </a>
              ))}
            </AnimatedBackground>
          </div>

          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden sm:inline-flex site-nav__cta site-nav__cta-btn">
              Let&apos;s Talk
            </a>

            <ModernThemeToggle />

            <button
              type="button"
              className="md:hidden site-nav__toggle"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="site-nav__panel" role="dialog" aria-modal="true">
          <div className="site-nav__panel-header">
            <a href="#top" className="site-nav__brand font-eras text-lg font-bold tracking-tight" onClick={handleLinkClick}>
              Aum Patel<span className="text-[var(--accent)]">.</span>
            </a>
            <div className="flex items-center gap-2">
              <ModernThemeToggle />
              <button
                type="button"
                className="site-nav__toggle"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="site-nav__panel-links">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="site-nav__panel-link"
                onClick={handleLinkClick}
              >
                {label}
              </a>
            ))}
            <a href="#contact" className="site-nav__panel-link font-semibold text-[var(--accent)]" onClick={handleLinkClick}>
              Let&apos;s Talk →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
