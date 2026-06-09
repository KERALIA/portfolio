import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import ContactForm from '@/components/dynamic-contact-form';

export default function Home() {
  return (
    <main className="text-foreground">
      <HeroSection />

      {/* ── About ─────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 px-4 reveal">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <p className="section-eyebrow">About</p>
            <h2 className="section-title">
              Aum Patel — systems engineer &amp; full-stack developer.
            </h2>
          </header>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="about-voice">
              <p>
                I&apos;m Aum — I build things from the kernel up.
              </p>
              <p>
                Most developers pick a lane. I picked both. On one side, I&apos;m deep in
                AOSP source — writing device trees, debugging Camera HAL crashes at 3am,
                migrating vendor blobs from Android 15 to 16. On the other, I&apos;m
                shipping type-safe Next.js apps with Supabase backends and real-time
                dashboards.
              </p>
              <p>
                Currently studying Computer Engineering at A.D. Patel Institute of
                Technology (8.15 CGPA), but the real education happens in the trenches —
                patching SELinux policies, reverse-engineering vendor binaries, and
                learning why that one Binder call keeps timing out.
              </p>
            </div>

            <div className="about-bio">
              <p>
                Aum Patel (also known as Aum Keralia, handle KERALIA) is a systems engineer
                and full-stack developer from Gujarat, India. He specializes in Android
                Open Source Project (AOSP) development, custom ROM engineering, kernel
                debugging, and Hardware Abstraction Layer (HAL) development for MediaTek
                and Qualcomm chipsets.
              </p>
              <p>
                On the web side, Aum builds production applications using Next.js 14,
                React 18, TypeScript, and PostgreSQL. His open-source work includes device
                trees, kernel sources, and hardware HALs published on GitHub under the
                KERALIA handle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills / Stack ────────────────────────────────────────────── */}
      <section id="skills" className="py-20 px-4 reveal">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <p className="section-eyebrow">Stack</p>
            <h2 className="section-title">
              The systems, the web, and the glue that holds it together.
            </h2>
          </header>

          <div className="skills-grid">
            <div className="skills-card">
              <p className="skills-card__label">Systems</p>
              <div className="skills-card__items">
                <span className="skills-card__item">AOSP</span>
                <span className="skills-card__item">Hardware Abstraction Layers (HALs)</span>
                <span className="skills-card__item">Device Trees (DTB)</span>
                <span className="skills-card__item">Generic Kernel Image (GKI)</span>
                <span className="skills-card__item">SELinux Policy</span>
                <span className="skills-card__item">Make (.mk) · Soong (.bp) · Ninja</span>
                <span className="skills-card__item">Device Bring-up · Vendor Extraction</span>
                <span className="skills-card__item">Reverse Engineering</span>
              </div>
            </div>

            <div className="skills-card">
              <p className="skills-card__label">Web</p>
              <div className="skills-card__items">
                <span className="skills-card__item">Next.js 14 · React 18</span>
                <span className="skills-card__item">TypeScript</span>
                <span className="skills-card__item">Node.js</span>
                <span className="skills-card__item">PostgreSQL</span>
                <span className="skills-card__item">Supabase (RLS, Realtime)</span>
                <span className="skills-card__item">Tailwind CSS</span>
                <span className="skills-card__item">REST APIs · Edge Functions</span>
              </div>
            </div>

            <div className="skills-card">
              <p className="skills-card__label">Tools</p>
              <div className="skills-card__items">
                <span className="skills-card__item">Git · GitHub</span>
                <span className="skills-card__item">Gerrit (AOSP code review)</span>
                <span className="skills-card__item">ADB · Logcat</span>
                <span className="skills-card__item">Python · Bash</span>
                <span className="skills-card__item">Kotlin · C · C++</span>
                <span className="skills-card__item">Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />

      {/* ── Contact ───────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative px-4 pb-28 pt-4 md:pt-6 md:pb-32"
      >
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-12 md:mb-14 reveal">
            <p className="section-eyebrow">Get in Touch</p>
            <h2 className="section-title">
              Let&apos;s build something together.
            </h2>
            <p className="section-body">
              Have a project in mind, want to collaborate, or just want to chat about
              systems engineering? Drop Aum a message and you&apos;ll hear back shortly.
            </p>
          </div>

          <div className="contact-card reveal reveal-delay-1" data-tilt>
            <ContactForm />
          </div>

          <div className="mt-10 md:mt-12 reveal reveal-delay-2">
            <div className="contact-info-grid">
              {[
                {
                  label: 'Email',
                  href: 'mailto:aumkeralia406@gmail.com',
                  text: 'aumkeralia406@gmail.com',
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/KERALIA',
                  text: 'github.com/KERALIA',
                  external: true,
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/aum-patel-b25740388',
                  text: 'Aum Patel',
                  external: true,
                },
              ].map(({ label, href, text, external }) => (
                <div key={label} className="contact-info-card">
                  <p className="contact-info-label">{label}</p>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="contact-info-link"
                  >
                    {text}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] py-8 px-4 reveal">
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
