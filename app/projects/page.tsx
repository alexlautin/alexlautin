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
import Link from 'next/link';
import { useState } from 'react';
import { projects, techLinks } from "../../data/projects";

import Navbar from "../../components/Navbar";

// Tooltip Component
const Tooltip = ({ children, text, delay = 0, href }: { children: React.ReactNode, text: string, delay?: number, href?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const content = (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50 animate-fadeIn"
          style={{ 
            animationDelay: `${delay}ms`,
            animationDuration: '200ms',
            animationFillMode: 'both'
          }}
        >
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block hover:opacity-80 transition-opacity duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </a>
    );
  }

  return content;
};

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
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-2px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 2s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = fadeInKeyframes;
  document.head.appendChild(style);
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-black overflow-hidden">
      <main className="flex-grow px-4 py-12">
        <Navbar />
        <div className="mx-auto max-w-4xl text-center mb-16 mt-16">
          <h1 className="mb-8 text-5xl md:text-7xl font-bold leading-tight tracking-tight text-slate-800">
            Projects
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A selection of the projects I have worked on.
          </p>
        </div>
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/50 p-4 pt-8 overflow-visible transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:bg-white hover:-translate-y-1 animate-fadeIn opacity-0 hover:border-indigo-200"
              style={{ 
                animationDelay: `${idx * 120}ms`, 
                animationFillMode: 'forwards'
              }}
            >
              {/* Project image positioned half on, half off the card */}
              <div className="absolute -top-6 left-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white transition-shadow duration-300 group-hover:shadow-lg">
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
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-all duration-300 group-hover:translate-x-1">
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{project.description}</p>
                
                {/* Tech stack with improved design */}
                <div className="flex flex-wrap items-center gap-3 mb-6 group-hover:gap-4 transition-all duration-200">
                  {project.technologies.map((tech, techIdx) => {
                    const techIcon = {
                      'Next.js': SiNextdotjs,
                      'Tailwind CSS': SiTailwindcss,
                      'Firebase': SiFirebase,
                      'Vercel': SiVercel,
                      'Supabase': SiSupabase,
                      'Resend': SiResend,
                      'Headless UI': SiHeadlessui,
                    }[tech];

                    if (!techIcon) return null;
                    const Icon = techIcon;

                    return (
                      <Tooltip key={tech} text={tech} href={techLinks[tech as keyof typeof techLinks]}>
                        <div 
                          className="p-2 rounded-lg bg-slate-100 text-slate-700 transition-all duration-150 group-hover:bg-teal-100 group-hover:text-teal-700 group-hover:scale-105" 
                          style={{transitionDelay: `${techIdx * 20}ms`}}
                        >
                          <Icon size={16} />
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-between items-center">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-full shadow-md group-hover:bg-slate-700 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  >
                    <span>Learn More</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-full shadow-sm hover:bg-slate-50 transition-all duration-300 group-hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Live Demo</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}