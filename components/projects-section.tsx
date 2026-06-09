'use client';

import { ArrowRight, ArrowUpRight, Github, Globe } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'AOSP Custom ROM Framework',
    description:
      'Engineered a stable custom Android ROM (Evolution X) for a MediaTek-based device — authored device trees from scratch, resolved Camera HAL crashes by debugging system logs and patching SELinux policies, and migrated the vendor tree from Android 15 to 16 with custom Python scripts.',
    tags: ['AOSP', 'Makefile (.mk)', 'Soong (.bp)', 'Bash', 'SELinux'],
    github: 'https://github.com/KERALIA/.github',
    featured: true,
  },
  {
    id: '2',
    title: 'Full-Stack Freelancer Client Portal',
    description:
      'Built a Next.js 14 client portal with a real-time project dashboard, invoice management, and a protected admin panel. Integrated Supabase (PostgreSQL) with Row Level Security for secure client data isolation across a fully typed TypeScript stack.',
    tags: ['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL'],
    demo: 'https://lancer-link-web.vercel.app/',
    featured: true,
  },
  {
    id: '3',
    title: 'Real-Time Android Chat Application',
    description:
      'Built a fully functional real-time messaging app with cloud-based message synchronization and image sharing. Implemented robust error handling and deployed using best practices for scalability and performance.',
    tags: ['Android', 'Kotlin', 'XML', 'Material UI'],
    github: 'https://github.com/KERALIA/Kotlin-Realtime-Chat-Application',
  },
  {
    id: '4',
    title: 'System Performance Controller',
    description:
      'Comprehensive profiling and control tool for analyzing Android system performance. Captures thermal data, memory usage, CPU cycles, and provides real-time tuning controls for governor policies, thermal throttle thresholds, and I/O scheduling — all surfaced through a clean terminal interface.',
    tags: ['Android', 'Python', 'Go', 'Performance'],
    github: 'https://github.com/KERALIA/android_device_xiaomi_rodin/tree/lineage-23.2/configs',
  },
];

const bentoClass = (index: number) => {
  const layouts = [
    'md:col-span-7 lg:col-span-7',
    'md:col-span-5 lg:col-span-5',
    'md:col-span-5 lg:col-span-5',
    'md:col-span-7 lg:col-span-7',
  ];
  return layouts[index % 4] ?? 'md:col-span-6';
};

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full px-4 pt-24 pb-10 md:pt-32 md:pb-14"
    >
      <div className="max-w-6xl mx-auto w-full">
        <header className="mb-14 md:mb-20 reveal">
          <p className="section-eyebrow">Selected Work</p>
          <h2 className="section-title">
            A selection of projects demonstrating capabilities in systems programming, full-stack development, and building scalable solutions from the ground up.
          </h2>
        </header>

        <div className="project-bento-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-tilt
              className={`project-card reveal ${bentoClass(index)}`}
            >
              <div className="project-card__inner">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-card__divider" />

                <div className="project-card__links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden />
                      View {project.title} on GitHub
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Globe className="h-3.5 w-3.5" aria-hidden />
                      Live Demo
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center reveal">
          <a
            href="https://github.com/KERALIA"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-btn"
          >
            <span>View All of Aum&apos;s Projects on GitHub</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
