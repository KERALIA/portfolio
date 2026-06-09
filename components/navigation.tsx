'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Stack' },
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
    // Select all icon-related link elements
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
    // Also update the msapplication-TileImage meta tag
    const msMeta = document.querySelector<HTMLMetaElement>('meta[name="msapplication-TileImage"]');
    if (msMeta) {
      msMeta.content = t === 'dark' ? '/dark/ms-icon-144x144.png' : '/ms-icon-144x144.png';
    }
    // Update theme-color meta tag
    const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = t === 'dark' ? '#0a0a0a' : '#ffffff';
    }
  };

  // Theme: read localStorage; if absent, follow system preference.
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <a href="#top" className="site-nav__brand" onClick={handleLinkClick}>
            Aum Patel
          </a>

          <div className="site-nav__links" role="navigation" aria-label="Primary">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`site-nav__link ${activeSection === id ? 'is-active' : ''}`}
              >
                {label}
              </a>
            ))}
          </div>

          <a href="#contact" className="site-nav__cta site-nav__cta-btn">
            Let&apos;s Talk
          </a>

          <button
            type="button"
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="site-nav__toggle"
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
      </nav>

      {mobileOpen && (
        <div className="site-nav__panel" role="dialog" aria-modal="true">
          <div className="site-nav__panel-header">
            <a href="#top" className="site-nav__brand" onClick={handleLinkClick}>
              Aum Patel
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="theme-toggle"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
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
            <a href="#contact" className="site-nav__panel-link" onClick={handleLinkClick}>
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </>
  );
}
