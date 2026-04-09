"use client";
import Navbar from '../../components/Navbar';
import Avatar from '@/components/Avatar';
import { SiLinkedin, SiGithub, SiOrcid, SiGooglescholar } from '@/components/icons';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { projects } from "../../data/projects";
import Link from 'next/link';

export const dynamic = 'force-static';

type EmailRevealState = 'hidden' | 'pending' | 'loading' | 'revealed' | 'error';

export default function Home() {
  const [emailReveal, setEmailReveal] = useState<EmailRevealState>('hidden');
  const [revealedEmail, setRevealedEmail] = useState('');

  const handleTurnstileSuccess = async (token: string) => {
    setEmailReveal('loading');
    try {
      const res = await fetch('/api/reveal-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error('Verification failed');
      const { email } = await res.json();
      setRevealedEmail(email);
      setEmailReveal('revealed');
    } catch {
      setEmailReveal('error');
    }
  };

  return (
    <main id="main-content" className="flex flex-col bg-[#F9F7F4] text-[#111111]">
      <Navbar />

      {/* About */}
      <section id="about" className="min-h-screen flex flex-col justify-center px-6">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-16">
            {/* Text */}
            <div className="flex-1">
              <p className="text-sm font-medium tracking-widest text-stone-400 uppercase mb-8">
                Emory University · Atlanta, GA
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#111111] mb-8">
                Alex<br />Lautin
              </h1>
              <p className="text-lg text-stone-500 leading-relaxed max-w-sm mb-10">
                CS student with a focus on consulting and product.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="https://www.linkedin.com/in/alexlautin/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-stone-400 hover:text-[#111111] transition-colors">
                  <SiLinkedin size={14} /> LinkedIn
                </a>
                <a href="https://github.com/alexlautin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-stone-400 hover:text-[#111111] transition-colors">
                  <SiGithub size={14} /> GitHub
                </a>
                <a href="https://orcid.org/0009-0006-0555-7424" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-stone-400 hover:text-[#111111] transition-colors">
                  <SiOrcid size={14} /> ORCID
                </a>
                <a href="https://scholar.google.com/citations?user=Z2EZFfoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-stone-400 hover:text-[#111111] transition-colors">
                  <SiGooglescholar size={14} /> Scholar
                </a>
              </div>
            </div>
            {/* Portrait */}
            <div className="flex-shrink-0">
              <Avatar className="w-64 h-80 md:w-72 md:h-96 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="projects" className="min-h-screen flex flex-col justify-center px-6 py-24 border-t border-stone-200">
        <div className="max-w-4xl mx-auto w-full">
          <p className="text-sm font-medium tracking-widest text-stone-400 uppercase mb-10">Selected Work</p>
          <div className="divide-y divide-stone-200">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group flex items-start justify-between gap-8 py-7 hover:opacity-60 transition-opacity duration-200 animate-fadeUp"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-lg font-semibold text-[#111111]">{project.title}</h3>
                    {project.status === 'Live' && (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-6 pt-1">
                  <span className="text-sm text-stone-400 hidden sm:block">{project.year}</span>
                  <svg className="w-4 h-4 text-stone-300 group-hover:text-stone-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="min-h-screen flex flex-col justify-center px-6 py-24 border-t border-stone-200">
        <div className="max-w-4xl mx-auto w-full">
          <p className="text-sm font-medium tracking-widest text-stone-400 uppercase mb-6">Contact</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-6 max-w-md">
            Let&apos;s connect.
          </h2>
          <p className="text-stone-500 mb-10 max-w-sm leading-relaxed">
            Open to consulting opportunities, product roles, and interesting conversations.
          </p>

          {emailReveal === 'revealed' ? (
            <a
              href={`mailto:${revealedEmail}`}
              className="inline-flex items-center gap-3 text-xl font-semibold text-[#111111] hover:opacity-60 transition-opacity"
            >
              {revealedEmail}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ) : emailReveal === 'pending' || emailReveal === 'loading' ? (
            <div className="space-y-3">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={handleTurnstileSuccess}
                onError={() => setEmailReveal('error')}
                options={{ theme: 'light' }}
              />
              {emailReveal === 'loading' && (
                <p className="text-sm text-stone-400">Verifying...</p>
              )}
            </div>
          ) : emailReveal === 'error' ? (
            <div className="space-y-4">
              <p className="text-sm text-red-500">Verification failed. Please try again.</p>
              <button
                onClick={() => setEmailReveal('pending')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setEmailReveal('pending')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Reveal email
              </button>
              <a
                href="https://www.linkedin.com/in/alexlautin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-stone-600 text-sm font-medium rounded-lg hover:border-stone-400 transition-colors"
              >
                <SiLinkedin size={14} />
                Connect on LinkedIn
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
