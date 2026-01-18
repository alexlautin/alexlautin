"use client";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { projects, techLinks } from '../../../data/projects';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiSupabase,
  SiFirebase,
  SiHeadlessui,
  SiResend,
} from "react-icons/si";
import Navbar from "../../../components/Navbar";

const techIcons = {
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Firebase': SiFirebase,
  'Vercel': SiVercel,
  'Supabase': SiSupabase,
  'Resend': SiResend,
  'Headless UI': SiHeadlessui,
};

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find(p => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-black">
      <main className="flex-grow px-4 py-12">
        <Navbar />
        
        {/* Back button */}
        <div className="mx-auto max-w-4xl mt-16 mb-8">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            Back to Projects
          </Link>
        </div>

        {/* Hero section */}
        <div className="mx-auto max-w-4xl mb-16">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-white flex-shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                width={64}
                height={64}
                className={`w-full h-full object-${project.title === 'Galleryboard' ? 'contain' : 'cover'}`}
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  {project.title}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Live' ? 'bg-green-100 text-green-700' :
                  project.status === 'In Development' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-lg text-slate-600 mb-4">{project.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{project.year}</span>
                <span>•</span>
                <span>{project.type}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mb-12">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <span>View Live Project</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                <span>View Code</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className="mx-auto max-w-4xl grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
              <p className="text-gray-600 leading-relaxed">{project.longDescription}</p>
            </section>

            {/* Features section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid gap-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Screenshots</h2>
              <div className="grid gap-6">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <Image
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={800}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech stack */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tech Stack</h3>
              <div className="space-y-3">
                {project.technologies.map((tech, index) => {
                  const IconComponent = techIcons[tech as keyof typeof techIcons];
                  return (
                    <a
                      key={index}
                      href={techLinks[tech as keyof typeof techLinks]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 group"
                    >
                      {IconComponent && <IconComponent size={20} />}
                      <span className="font-medium">{tech}</span>
                      <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </section>

            {/* Project info */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Year</span>
                  <span className="font-medium">{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Type</span>
                  <span className="font-medium">{project.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status</span>
                  <span className={`font-medium ${
                    project.status === 'Live' ? 'text-green-600' :
                    project.status === 'In Development' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>{project.status}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}