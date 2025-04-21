"use client";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiSupabase,
  SiFirebase,
} from "react-icons/si";

import Navbar from "../../components/Navbar";

const projects = [
  {
    image: '/speedsail.png',
    title: 'Speedsail',
    description: 'Static site for sailing vlogs built with Next.js & Vercel.',
    link: 'https://speedsail.org',
  },
  {
    image: '/invitide.png',
    title: 'Invitide',
    description: 'A modern retro-styled event management platform.',
    link: '#',
  },
  {
    image: '/sevenworks.png',
    title: 'Sevenworks',
    description: 'Real-time analytics dashboard for web apps.',
    link: '#',
  },
  {
    image: '/galleryboard.jpeg',
    title: 'Galleryboard',
    description: 'Real-time analytics dashboard for web apps.',
    link: '#',
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      <main className="flex-grow px-4 py-10">
        <Navbar />
        <div className="mx-auto max-w-3xl text-center mb-16 mt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Projects</h1>
          <p className="text-lg text-gray-500">A selection of things I’ve built, shipped, or contributed to.</p>
        </div>
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="relative flex flex-col bg-white rounded-2xl shadow-lg border border-slate-100 p-6 pt-8 group transition hover:shadow-xl"
            >
              <div className="absolute -top-6 left-6">
                {project.title === 'Galleryboard' ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-12 h-12 rounded-full object-contain border-2 border-white shadow-md bg-white"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md bg-white"
                  />
                )}
              </div>
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-500 transition">
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
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium hover:underline"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  Visit site
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white px-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Alex Lautin — Built with Next.js & Tailwind CSS
      </footer>
    </div>
  );
}