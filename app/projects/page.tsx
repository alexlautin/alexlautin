"use client";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiSupabase,
  SiFirebase,
  SiHeadlessui,
  SiResend,
} from "react-icons/si";
import Image from 'next/image';

import Navbar from "../../components/Navbar";

// Add CSS animation styles
const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = fadeInKeyframes;
  document.head.appendChild(style);
}

const projects = [
  {
    image: '/speedsail.png',
    title: 'Speedsail',
    description: 'A modern inspirational sailing interview website.',
    link: 'https://www.speedsail.org',
  },
  {
    image: '/invitide.png',
    title: 'Invitide',
    description: 'A hackathon project, a modern retro-styled event management platform.',
    link: 'https://invitide.vercel.app',
  },
  {
    image: '/sevenworks.png',
    title: 'Sevenworks',
    description: 'A real-time resume enhancement tool and builder.',
    link: 'https://www.sevenworks.tech',
  },
  {
    image: '/galleryboard.jpeg',
    title: 'Galleryboard',
    description: 'A hackathon project, an individual shared classroom whiteboard tool.',
    link: 'https://galleryboard.vercel.app',
  },
  {
    image: '/photo.png',
    title: 'Personal Website',
    description: 'A personal website showcasing my projects.',
    link: 'https://alexlautin.vercel.app',
  }
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-black overflow-hidden">
      <main className="flex-grow px-4 py-12">
        <Navbar />
        <div className="mx-auto max-w-4xl text-center mb-16 mt-16">
          <h1 className="mb-8 text-5xl md:text-7xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Projects
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A selection of the projects I have worked on.
          </p>
        </div>
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/50 p-4 pt-8 overflow-visible transition-all duration-300 ease-out hover:scale-[1.01] hover:shadow-xl hover:bg-white animate-fadeIn opacity-0"
              style={{ 
                animationDelay: `${idx * 120}ms`, 
                animationFillMode: 'forwards'
              }}
            >
              {/* Project image positioned half on, half off the card */}
              <div className="absolute -top-6 left-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={48}
                    height={48}
                    className={`w-full h-full object-${project.title === 'Galleryboard' ? 'contain' : 'cover'}`}
                    unoptimized={false}
                  />
                </div>
              </div>

              <div className="flex-grow mt-4">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{project.description}</p>
                
                {/* Tech stack with improved design */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {project.title === "Sevenworks" && (
                  <>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiNextdotjs title="Next.js" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiTailwindcss title="Tailwind CSS" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiFirebase title="Firebase" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiVercel title="Vercel" size={16} /></div>
                  </>
                  )}
                  {project.title === "Galleryboard" && (
                  <>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiNextdotjs title="Next.js" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiSupabase title="Supabase" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiTailwindcss title="Tailwind CSS" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiVercel title="Vercel" size={16} /></div>
                  </>
                  )}
                  {project.title === "Invitide" && (
                  <>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiNextdotjs title="Next.js" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiTailwindcss title="Tailwind CSS" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiSupabase title="Supabase" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiVercel title="Vercel" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiResend title="Resend" size={16} /></div>
                  </>
                  )}
                  {project.title === "Speedsail" && (
                  <>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiNextdotjs title="Next.js" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiTailwindcss title="Tailwind CSS" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiVercel title="Vercel" size={16} /></div>
                  </>
                  )}
                  {project.title === "Personal Website" && (
                  <>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiNextdotjs title="Next.js" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiTailwindcss title="Tailwind CSS" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiHeadlessui title="Headless UI" size={16} /></div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><SiVercel title="Vercel" size={16} /></div>
                  </>
                  )}
                </div>
                
                {/* Enhanced CTA button */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-full shadow-md group-hover:bg-slate-700 transition-all duration-300">
                  <span>Explore Project</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
      <footer className="border-t border-slate-200/50 bg-white/60 backdrop-blur-sm px-6 py-8 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-500 mb-2">
            © {new Date().getFullYear()} Alex Lautin — Built with Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}