export default function JsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://project-portfolio-aum.vercel.app';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Aum Patel',
    alternateName: ['Aum Keralia', 'Patel Aum', 'Aum', 'KERALIA'],
    givenName: 'Aum',
    familyName: 'Patel',
    additionalName: 'Keralia',
    url: siteUrl,
    jobTitle: 'Systems & Full-Stack Developer',
    description:
      'Aum Patel (Aum Keralia) is a deep-level Android systems engineer and full-stack web developer specializing in AOSP, custom ROMs, and modern web architecture.',
    knowsAbout: [
      'Android Development',
      'AOSP',
      'Custom ROM Development',
      'Full-Stack Web Development',
      'Systems Engineering',
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'C++',
      'Java',
      'Go',
      'Python',
      'PostgreSQL',
      'Redis',
    ],
    sameAs: [
      'https://github.com/KERALIA',
      'https://www.linkedin.com/in/aum-patel-b25740388',
    ],
    email: 'mailto:aumkeralia406@gmail.com',
    image: `${siteUrl}/opengraph-image`,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Aum Patel & Aum Keralia — Developer Portfolio',
    description:
      'Portfolio of Aum Patel (Aum Keralia) — Systems & Full-Stack Developer showcasing projects in AOSP, custom ROMs, React, and Next.js.',
    author: { '@id': `${siteUrl}/#person` },
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: 'Aum Patel (Aum Keralia) — Portfolio',
    mainEntity: { '@id': `${siteUrl}/#person` },
    dateCreated: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
