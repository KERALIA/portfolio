# Aum Patel — Portfolio

Personal portfolio website built with Next.js 15 (App Router), TypeScript, and vanilla CSS. Features a custom theme system (light/dark with system preference detection), contact form backed by Supabase, and server-side SEO optimization.

**Live:** [project-portfolio-aum.vercel.app](https://project-portfolio-aum.vercel.app)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Vanilla CSS with CSS custom properties
- **Database:** Supabase (PostgreSQL)
- **Analytics:** Vercel Analytics
- **Deployment:** Vercel

## Features

- Light/dark theme with `localStorage` persistence and `prefers-color-scheme` system follow
- Contact form with server-side validation, rate limiting, and Supabase storage
- SEO: JSON-LD structured data, dynamic OG/Twitter images, sitemap, robots.txt
- Custom cursor interaction (desktop only, respects `prefers-reduced-motion`)
- Fully responsive — mobile-first layout with slide-in navigation panel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Supabase project (for the contact form)

### Setup

```bash
git clone https://github.com/KERALIA/portfolio.git
cd portfolio
npm install
```

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── src/app/            # Next.js App Router (pages, API routes, SEO)
│   ├── api/contact/    # Contact form API endpoint
│   ├── globals.css     # Design system & all styles
│   ├── layout.tsx      # Root layout with fonts, metadata, theme script
│   └── page.tsx        # Main page (hero, about, skills, projects, contact)
├── components/         # React components
│   ├── navigation.tsx  # Sticky nav with theme toggle
│   ├── hero-section.tsx
│   ├── projects-section.tsx
│   ├── contact-form.tsx
│   ├── cursor-aura.tsx # Custom cursor (desktop)
│   └── motion-provider.tsx # Tilt interaction provider
├── lib/                # Utilities (Supabase client, rate limiting, env validation)
├── public/             # Static assets (favicons, icons)
└── supabase/           # Database migrations
```

## License

MIT
