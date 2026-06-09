import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'Aum Patel (Aum Keralia) — Systems & Full-Stack Developer Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            'linear-gradient(135deg, #0a0a0f 0%, #0d1520 50%, #0a0f1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            marginBottom: 8,
            display: 'flex',
          }}
        >
          Aum Patel
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: '#aaa',
            marginBottom: 20,
            display: 'flex',
          }}
        >
          Aum Keralia
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#7eb8ff',
            fontWeight: 600,
            letterSpacing: '0.08em',
            display: 'flex',
          }}
        >
          Systems & Full-Stack Developer
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#888',
            marginTop: 24,
            display: 'flex',
          }}
        >
          AOSP · Custom ROMs · React · Next.js · TypeScript
        </div>
      </div>
    ),
    { ...size }
  );
}
