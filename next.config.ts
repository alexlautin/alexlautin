import type { NextConfig } from "next";

// Development only: React's dev tooling needs eval, and Vercel Analytics loads its debug script
// from a separate host (in production it is served from this site)
const devOnly = process.env.NODE_ENV === 'development' ? " 'unsafe-eval' https://va.vercel-scripts.com" : '';
const scriptSrc = `script-src 'self' 'unsafe-inline'${devOnly} https://challenges.cloudflare.com https://cloud.umami.is;`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
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
