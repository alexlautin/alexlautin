"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.id === slug);

  function toOptimizedPath(p: string) {
    if (!p) return p;
    const webp = p.replace(/\.(png|jpe?g)$/i, '.webp');
    if (webp.startsWith('/optimized/')) return webp;
    if (webp.startsWith('/')) return `/optimized${webp}`;
    return `/optimized/${webp}`;
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F9F7F4] text-[#111111]">

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#111111] hover:opacity-50 transition-opacity">AL</Link>
          <Link href="/#contact" className="text-sm font-medium text-white bg-[#111111] hover:bg-stone-700 transition-colors duration-150 px-4 py-1.5 rounded-full">Contact</Link>
        </div>
      </header>

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Back */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#111111] transition-colors mb-10"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </Link>

          {/* Header */}
          <div className="pb-8 border-b border-stone-200 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-[#111111]">{project.title}</h1>
              <span className="text-xs text-stone-400 tabular-nums">{project.year}</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed max-w-xl">{project.longDescription}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#111111] hover:bg-stone-700 transition-colors duration-150 px-4 py-2 rounded-full"
            >
              View project
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] border border-stone-300 hover:border-stone-500 transition-colors px-4 py-2 rounded-full"
              >
                GitHub
              </a>
            )}
          </div>

          {/* Screenshots */}
          {project.images && project.images.length > 0 && (
            <div className="mb-12">
              <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-4">Screenshots</p>
              <div className="grid gap-3">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                    <picture>
                      <source srcSet={toOptimizedPath(image)} type="image/webp" />
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={1200}
                        height={675}
                        sizes="(max-width: 640px) 100vw, 768px"
                        className="w-full h-auto"
                      />
                    </picture>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-10">
            <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-4">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 border border-stone-200 rounded-full text-xs text-stone-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-4">Features</p>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                  <span className="text-stone-300 flex-shrink-0 select-none mt-px">—</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </main>
  );
}
