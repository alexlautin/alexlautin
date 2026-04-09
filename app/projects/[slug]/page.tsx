"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar';
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
    <main className="flex flex-col min-h-screen bg-[#F9F7F4] text-[#111111]">
      <Navbar noActiveTab />

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            href="/about#projects"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
                <picture>
                  <source srcSet={toOptimizedPath(project.image)} type="image/webp" />
                  <Image
                    src={project.image}
                    alt={`${project.title} logo`}
                    width={48}
                    height={48}
                    sizes="48px"
                    className={`w-full h-full object-${project.title === 'Galleryboard' ? 'contain' : 'cover'}`}
                  />
                </picture>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{project.title}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-slate-400">{project.type} · {project.year}</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                    project.status === 'Live' ? 'text-emerald-600' :
                    project.status === 'In Development' ? 'text-amber-600' : 'text-slate-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      project.status === 'Live' ? 'bg-emerald-500' :
                      project.status === 'In Development' ? 'bg-amber-500' : 'bg-slate-300'
                    }`} />
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-base text-slate-600 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-12 pb-10 border-b border-slate-100">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
            >
              View Live Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                View on GitHub
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>

          {/* Screenshots */}
          {project.images && project.images.length > 0 && (
            <div className="mb-12">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Screenshots</h2>
              <div className="grid gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
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
            <h2 className="text-base font-semibold text-slate-900 mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-4">Features</h2>
            <ul className="space-y-2.5">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
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
