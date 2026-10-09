import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import SiteHeader from '@/components/SiteHeader';
import ScreenshotTile from '@/components/ScreenshotTile';
import Image from 'next/image';
import Link from 'next/link';

const metaRow = "flex items-baseline justify-between gap-6 border-t border-rule py-3";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  const title = `${project.title} | Alex Lautin`;
  const url = `/projects/${project.id}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.description,
      url,
      siteName: 'Alex Lautin',
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Alex Lautin' }],
    },
    twitter: { card: 'summary_large_image', title, description: project.description, images: ['/og.png'] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const [cover, ...rest] = project.images;
  // When the cover is a video, the first screenshot still belongs in the gallery
  const screenshots = project.video ? project.images : rest;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="wrap pt-12 md:pt-20 pb-20 md:pb-28">

        <Link href="/#projects" className="text-muted hover:text-ink transition-colors">
          ← All projects
        </Link>

        {/* Header */}
        <div className="mt-6 md:mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="text-5xl md:text-7xl font-medium leading-none tracking-[-0.04em]">{project.title}</h1>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-paper bg-ink hover:bg-neutral-700 transition-colors px-5 py-2.5 rounded-lg"
                data-umami-event="Visit project site"
                data-umami-event-project={project.id}
              >
                Visit site
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium border border-rule hover:border-ink transition-colors px-5 py-2.5 rounded-lg"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Cover */}
        {cover && (
          <div className="mt-8 md:mt-12">
            <ScreenshotTile src={cover} video={project.video} poster={project.videoPoster} color={project.color} alt={`${project.title} screenshot 1`} wide priority />
          </div>
        )}

        {/* Overview */}
        <div className="mt-12 md:mt-16 grid gap-10 md:grid-cols-12 md:gap-8">
          <p className="md:col-span-7 text-xl md:text-2xl leading-snug tracking-tight text-pretty">
            {project.longDescription}
          </p>
          <dl className="md:col-span-4 md:col-start-9 border-b border-rule">
            <div className={metaRow}>
              <dt className="text-muted">Year</dt>
              <dd className="tabular-nums">{project.year}</dd>
            </div>
            <div className={metaRow}>
              <dt className="text-muted">Type</dt>
              <dd>{project.type}</dd>
            </div>
            <div className={metaRow}>
              <dt className="text-muted">Status</dt>
              <dd>{project.status}</dd>
            </div>
            <div className={metaRow}>
              <dt className="text-muted flex-shrink-0">Built with</dt>
              <dd className="text-right">{project.technologies.join(', ')}</dd>
            </div>
          </dl>
        </div>

        {/* Features */}
        <h2 className="mt-16 md:mt-24 mb-6 text-2xl md:text-3xl font-medium tracking-[-0.02em]">Features</h2>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {project.features.map((feature, index) => (
            <li key={index} className="border-t border-rule py-3.5">{feature}</li>
          ))}
        </ul>

        {/* Screenshots */}
        {screenshots.length > 0 && (
          <div className="mt-16 md:mt-24 grid gap-6 md:grid-cols-2">
            {screenshots.map((image, index) => (
              <div key={image} className="rounded-xl overflow-hidden border border-rule">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + (project.video ? 1 : 2)}`}
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 100vw, 550px"
                  draggable={false}
                  className="w-full h-auto select-none [-webkit-user-drag:none] [-webkit-touch-callout:none]"
                />
              </div>
            ))}
          </div>
        )}

      </main>
    </>
  );
}
