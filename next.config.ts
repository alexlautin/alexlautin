import type { NextConfig } from "next";

// Development only: React's dev tooling needs eval, and Vercel Analytics loads its debug script
// from a separate host (in production it is served from this site)
const devOnly = process.env.NODE_ENV === 'development' ? " 'unsafe-eval' https://va.vercel-scripts.com" : '';
const scriptSrc = `script-src 'self' 'unsafe-inline'${devOnly} https://challenges.cloudflare.com https://cloud.umami.is;`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/resume': ['./private/resume.pdf'],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Project screenshots and videos. Without this they're served as "check with the
        // server every time", and Safari does exactly that whenever Back re-creates an
        // image, leaving it blank until the answer comes back. The image optimizer copies
        // this lifetime onto the resized versions. A replaced file shows within a day.
        source: '/optimized/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: `frame-src 'self' https://challenges.cloudflare.com; ${scriptSrc}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
