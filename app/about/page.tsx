"use client";
import Navbar from '../../components/Navbar';
import Avatar from '@/components/Avatar';
import { SiLinkedin, SiGithub, SiOrcid, SiGooglescholar, SiNextdotjs, SiTailwindcss, SiVercel, SiSupabase, SiFirebase, SiHeadlessui, SiResend } from 'react-icons/si';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, techLinks } from "../../data/projects";

export const dynamic = 'force-static';

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

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen bg-slate-50 text-gray-900 antialiased">
      <Navbar />
      
      {/* About Section */}
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center py-32 px-6"
      >
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-800">
                Alex Lautin
              </h1>
              <div className="h-1 w-20 bg-teal-600 rounded-full"></div>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
                Computer Science student at Emory University.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Tooltip text="LinkedIn" href="https://www.linkedin.com/in/alexlautin/">
                  <div className="group relative p-3 rounded-xl bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-200">
                    <SiLinkedin className="w-5 h-5" />
                  </div>
                </Tooltip>
                <Tooltip text="GitHub" href="https://www.github.com/alexlautin">
                  <div className="group relative p-3 rounded-xl bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-200">
                    <SiGithub className="w-5 h-5" />
                  </div>
                </Tooltip>
                <Tooltip text="ORCID" href="https://orcid.org/0009-0006-0555-7424">
                  <div className="group relative p-3 rounded-xl bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-200">
                    <SiOrcid className="w-5 h-5" />
                  </div>
                </Tooltip>
                <Tooltip text="Google Scholar" href="https://scholar.google.com/citations?user=Z2EZFfoAAAAJ&hl=en">
                  <div className="group relative p-3 rounded-xl bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-200">
                    <SiGooglescholar className="w-5 h-5" />
                  </div>
                </Tooltip>
              </div>
            </div>

            {/* Right: Avatar */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/10 to-slate-500/10 rounded-3xl blur-3xl"></div>
                <Avatar className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-xl ring-2 ring-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-32 px-6 bg-white border-y border-slate-200"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Projects
            </h2>
            <div className="h-1 w-20 bg-teal-600 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              A selection of the projects I have worked on.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative flex flex-col bg-white rounded-2xl shadow-md border border-slate-200/50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-teal-300"
              >
                {/* Project image - now inline at top */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={48}
                      height={48}
                      className={`w-full h-full object-${project.title === 'Galleryboard' ? 'contain' : 'cover'}`}
                      unoptimized={false}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="flex-grow flex flex-col">
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{project.description}</p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center gap-2 mb-auto">
                    {project.technologies.map((tech) => {
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
                            className="p-2 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 transition-all duration-150 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300" 
                          >
                            <Icon size={14} />
                          </div>
                        </Tooltip>
                      );
                    })}
                  </div>

                  {/* Buttons at bottom */}
                  <div className="flex gap-3 mt-6">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-teal-600 transition-all duration-200"
                    >
                      <span>Learn More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Demo</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-32 px-6 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Get in Touch
            </h2>
            <div className="h-1 w-20 bg-teal-600 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Let&apos;s work together.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
              <form 
                action="https://formspree.io/f/xyzwgknw" 
                method="POST" 
                className="flex flex-col gap-6"
              >
                {/* Honeypot field for spam protection */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white text-base font-semibold rounded-full shadow-md hover:bg-teal-600 transform hover:scale-[1.02] transition-all duration-200"
                >
                  <span>Send Message</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
