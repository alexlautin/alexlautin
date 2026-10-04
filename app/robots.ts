import type { MetadataRoute } from 'next';

// AI training crawlers; search engines are still allowed on the public pages.
const AI_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'meta-externalagent',
  'Amazonbot',
  'Claude-Web',
  'cohere-ai',
  'Diffbot',
  'Omgilibot',
  'ImagesiftBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: AI_CRAWLERS, disallow: '/' },
    ],
    sitemap: 'https://alexlautin.com/sitemap.xml',
  };
}
