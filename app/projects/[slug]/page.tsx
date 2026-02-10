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

  if (!project) {
    notFound();
  }

  return (
    <main className="relative flex flex-col min-h-screen bg-transparent text-gray-900 antialiased">
      <Navbar noActiveTab />

      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12">
          {/* Back button */}
          <Link
            href="/about#projects"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors duration-200 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Projects</span>
          </Link>

          {/* Project header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white flex-shrink-0">
                <Image
                  src={project.image}
                  alt={`${project.title} logo`}
                  width={64}
                  height={64}
                  className={`w-full h-full object-${project.title === 'Galleryboard' ? 'contain' : 'cover'}`}
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                  {project.title}
                </h1>
                <p className="text-slate-600 mt-2">{project.type} • {project.year} • {project.status}</p>
              </div>
            </div>
            <div className="h-1 w-20 bg-teal-600 rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white text-base font-semibold rounded-xl shadow-md hover:bg-teal-600 transition-all duration-200"
            >
              <span>View Live Demo</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 text-base font-semibold rounded-xl hover:bg-slate-100 transition-all duration-200"
              >
                <span>View on GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>

          {/* Screenshot gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Screenshots</h2>
              <div className="grid gap-6">
                {project.images.map((image, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white">
                    <Image
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={1200}
                      height={675}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium shadow-sm"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
