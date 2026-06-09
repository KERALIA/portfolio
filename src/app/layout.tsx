import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Navigation from '@/components/navigation';
import MotionProvider from '@/components/motion-provider';
import { CursorAura } from '@/components/dynamic-cursor-aura';
import JsonLd from '@/src/components/json-ld';
import './globals.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap', preload: true });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap', preload: true });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://project-portfolio-aum.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aum Patel (Aum Keralia) — Portfolio | Systems & Full-Stack Developer',
    template: '%s | Aum Patel Portfolio',
  },
  description:
    'Aum Patel (Aum Keralia) — Developer portfolio showcasing projects in Android systems engineering (AOSP, custom ROMs), full-stack web development (React, Next.js, TypeScript), and scalable architecture. View projects and get in touch with Aum.',
  keywords: [
    'Aum Patel', 'Aum Keralia', 'Aum', 'Patel Aum',
    'Aum Patel portfolio', 'Aum Keralia portfolio', 'Aum portfolio',
    'Aum Patel projects', 'Aum Keralia projects', 'Aum developer',
    'Aum Patel developer', 'Aum Keralia developer',
    'KERALIA', 'Android developer', 'AOSP developer',
    'custom ROM developer', 'systems engineer', 'full-stack developer',
    'React developer', 'Next.js developer', 'portfolio', 'project portfolio',
  ],
  authors: [{ name: 'Patel Aum', url: 'https://github.com/KERALIA' }],
  creator: 'Patel Aum',
  openGraph: {
    title: 'Aum Patel (Aum Keralia) — Portfolio | Systems & Full-Stack Developer',
    description:
      'Portfolio of Aum Patel (Aum Keralia): Deep-level Android systems engineer and full-stack web developer. AOSP, custom ROMs, React & Next.js.',
    type: 'website',
    url: siteUrl,
    siteName: 'Aum Patel Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aum Patel (Aum Keralia) — Systems & Full-Stack Developer',
    description: 'Deep-level Android & full-stack developer. AOSP, custom ROMs, and modern web architecture. Portfolio of Aum.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/android-icon-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/ms-icon-144x144.png', sizes: '144x144' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    subject: 'Aum Patel (Aum Keralia) — Developer Portfolio',
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/ms-icon-144x144.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light')}else if(t==='dark'||!t&&window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.classList.add('dark')}else{document.documentElement.classList.add('light')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <Navigation />
        <MotionProvider>
          <div className="relative z-[1]">{children}</div>
        </MotionProvider>
        {/* Custom cursor — pointer-events:none, sits above all content */}
        <CursorAura />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <JsonLd />
      </body>
    </html>
  );
}
