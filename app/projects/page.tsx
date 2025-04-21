"use client";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiSupabase,
  SiFirebase,
  SiHeadlessui,
} from "react-icons/si";
import Image from 'next/image';

import Navbar from "../../components/Navbar";

const projects = [
  {
    image: '/speedsail.png',
    title: 'Speedsail',
    description: 'Static site for sailing vlogs built with Next.js & Vercel.',
    link: 'https://www.speedsail.org',
  },
  {
    image: '/invitide.png',
    title: 'Invitide',
    description: 'A modern retro-styled event management platform.',
    link: 'https://invitide.vercel.app',
  },
  {
    image: '/sevenworks.png',
    title: 'Sevenworks',
    description: 'Real-time analytics dashboard for web apps.',
    link: 'https://www.sevenworks.tech',
  },
  {
    image: '/galleryboard.jpeg',
    title: 'Galleryboard',
    description: 'Real-time analytics dashboard for web apps.',
    link: 'https://galleryboard.vercel.app',
  },
  {
    image: '/photo.png',
    title: 'Personal Website',
    description: 'Personal website showcasing my projects.',
    link: 'https://alexlautin.vercel.app',
  }
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black overflow-hidden">
      <main className="flex-grow px-4 py-10">
        <Navbar />
        <div className="mx-auto max-w-3xl text-center mb-14 mt-14">
          <h1 className="mb-6 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-orange-400">
            Projects
          </h1>
          <p className="text-lg text-gray-500">A selection of the projects I have worked on.</p>
        </div>
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col bg-white rounded-2xl shadow-lg border border-slate-100 p-6 pt-8 group transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl animate-fadeIn opacity-0"
              style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'forwards' }}
            >
              <div className="absolute -top-6 left-6">
              <Image
                src={project.image}
                alt={project.title}
                width={48}
                height={48}
                className={`w-12 h-12 rounded-full object-${project.title === 'Galleryboard' ? 'contain' : 'cover'} border-2 border-white shadow-md bg-white`}
                priority={false}
              />
              </div>
              <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-500 transition-colors duration-300">
                {project.title}
              </h2>
              <p className="text-gray-500 text-sm mb-3 min-h-[48px]">{project.description}</p>
              <div className="flex gap-3 mb-4 text-lg text-gray-600 dark:text-gray-400">
                {project.title === "Sevenworks" && (
                <>
                  <SiNextdotjs title="Next.js" />
                  <SiTailwindcss title="Tailwind CSS" />
                  <SiFirebase title="Firebase" />
                  <SiVercel title="Vercel" />
                </>
                )}
                {project.title === "Galleryboard" && (
                <>
                  <SiNextdotjs title="Next.js" />
                  <SiSupabase title="Supabase" />
                  <SiTailwindcss title="Tailwind CSS" />
                  <SiVercel title="Vercel" />
                </>
                )}
                {project.title === "Invitide" && (
                <>
                  <SiNextdotjs title="Next.js" />
                  <SiTailwindcss title="Tailwind CSS" />
                  <SiSupabase title="Supabase" />
                  <SiVercel title="Vercel" />
                </>
                )}
                {project.title === "Speedsail" && (
                <>
                  <SiNextdotjs title="Next.js" />
                  <SiTailwindcss title="Tailwind CSS" />
                  <SiVercel title="Vercel" />
                </>
                )}
                {project.title === "Personal Website" && (
                <>
                  <SiNextdotjs title="Next.js" />
                  <SiTailwindcss title="Tailwind CSS" />
                  <SiHeadlessui title="Headless UI" />
                  <SiVercel title="Vercel" />
                </>
                )}
              </div>
              <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium hover:underline">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                Visit site
              </span>
              </div>
            </a>
          ))}
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white px-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Alex Lautin — Built with Next.js & Tailwind CSS
      </footer>
    </div>
  );
}