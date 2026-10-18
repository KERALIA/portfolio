import HeroSection from '@/components/hero-section';
import KpiTicker from '@/components/kpi-ticker';
import AboutSection from '@/components/about-section';
import SystemsArchitecture from '@/components/systems-architecture';
import TechMarquee from '@/components/tech-marquee';
import ProjectsSection from '@/components/projects-section';
import ContactForm from '@/components/contact-form';
import { BorderBeam } from '@/components/ui/border-beam';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { ContactCards } from '@/components/contact-cards';

export default function Home() {
  return (
    <main className="text-foreground min-h-screen">

      {/* ── 1. Hero with Aceternity Spotlight & React Bits Typography ──── */}
      <HeroSection />

      {/* ── 2. Real Accomplishments & Metrics (Magic UI NumberTicker) ─── */}
      <KpiTicker />

      {/* ── 3. About Section (Magic UI BlurFade & BorderBeam) ─────────── */}
      <AboutSection />

      {/* ── 4. Full AOSP & Systems Hierarchy (Magic UI AnimatedBeam) ───── */}
      <SystemsArchitecture />

      {/* ── 5. Technical Stack Marquee (Magic UI Marquee) ─────────────── */}
      <TechMarquee />

      {/* ── 6. Featured Work (Nectar Ingredients, AOSP Stack, Focus) ───── */}
      <ProjectsSection />

      {/* ── 7. Contact Section ────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative px-4 pb-28 pt-8 md:pt-12 md:pb-32 overflow-hidden"
      >
        <BackgroundBeams className="-z-10 opacity-30 dark:opacity-50 pointer-events-none" />
        <div className="max-w-3xl mx-auto w-full relative z-10">
          <div className="mb-12 md:mb-14 text-center">
            <p className="section-eyebrow">Direct Outreach</p>
            <h2 className="section-title">
              Let&apos;s Build Systems Together.
            </h2>
            <p className="section-body mt-3">
              Have an AOSP bring-up, high-scale web platform, or systems engineering challenge? Drop Aum a direct message.
            </p>
          </div>

          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10 shadow-2xl overflow-hidden">
            <BorderBeam size={180} duration={8} colorFrom="#0A84FF" colorTo="#38BDF8" borderWidth={1} />
            <ContactForm />
          </div>

          <div className="mt-10 md:mt-12">
            <ContactCards />
          </div>
        </div>
      </section>

      {/* ── 8. Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--text-muted)]">
          <p>© 2026 Aum Patel (Aum Keralia)</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/KERALIA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aum-patel-b25740388"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:aumkeralia406@gmail.com"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
