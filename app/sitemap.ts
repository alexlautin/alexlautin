import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const SITE = 'https://alexlautin.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, priority: 1 },
    ...projects.map((p) => ({ url: `${SITE}/projects/${p.id}`, priority: 0.7 })),
  ];
}
