"use client";
import Avatar from '@/components/Avatar';
import { SiLinkedin, SiOrcid, SiGooglescholar } from '@/components/icons';
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

  const displayedProjects = projects.filter(p => p.type !== 'Portfolio');

  return (
    <main id="main-content" className="bg-[#F9F7F4] text-[#111111]">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#about" className="text-sm font-semibold text-[#111111] hover:opacity-50 transition-opacity">AL</a>
          <a href="#contact" className="text-sm font-medium text-white bg-[#111111] hover:bg-stone-700 transition-colors duration-150 px-4 py-1.5 rounded-full">Contact</a>
        </div>
      </header>

      {/* Hero */}
      <section id="about" className="relative pt-28 pb-20 px-6 border-b border-stone-200">
        <div className="max-w-3xl mx-auto">
          {/* Photo — absolutely positioned top-right, doesn't affect text flow */}
          <div className="absolute top-28 right-6 md:right-[max(1.5rem,calc(50%-768px/2))]">
            <Avatar className="w-36 h-44 md:w-44 md:h-56 rounded-xl" />
          </div>

          <div className="flex flex-col gap-8">
            {/* Name */}
            <div className="pr-44 md:pr-52">
              <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-4">
                Emory University · Atlanta, GA
              </p>
              <h1 className="text-5xl font-bold tracking-tight text-[#111111] leading-tight">
                Alex Lautin
              </h1>
            </div>

            {/* Value prop + links */}
            <div>
              <p className="text-base text-stone-600 leading-relaxed max-w-xs mb-8">
                CS and economics student pursuing roles in product management and consulting.
              </p>
              <div className="flex items-center gap-5">
                <a href="https://www.linkedin.com/in/alexlautin/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#111111] transition-colors">
                  <SiLinkedin size={12} /> LinkedIn
                </a>
                <a href="https://orcid.org/0009-0006-0555-7424" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#111111] transition-colors">
                  <SiOrcid size={12} /> ORCID
                </a>
                <a href="https://scholar.google.com/citations?user=Z2EZFfoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#111111] transition-colors">
                  <SiGooglescholar size={12} /> Scholar
                </a>
              </div>
            </div>

            {/* Fact grid */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-stone-200">
              <div>
                <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-1.5">Education</p>
                <p className="text-sm font-medium text-[#111111]">Emory University</p>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">B.S. Computer Science, Minor in Economics · 2027</p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-1.5">Research</p>
                <p className="text-sm font-medium text-[#111111]">Emory University School of Medicine</p>
                <p className="text-xs text-stone-500 mt-0.5">Research Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 border-b border-stone-200">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-10">Selected Projects</p>
          <div className="divide-y divide-stone-200">
            {displayedProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group flex items-start justify-between gap-8 py-5 hover:opacity-60 transition-opacity duration-150"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-[#111111]">{project.title}</span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-4 pt-0.5">
                  <span className="text-xs text-stone-400 hidden sm:block tabular-nums">{project.year}</span>
                  <svg
                    className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-500 group-hover:translate-x-0.5 transition-all duration-150"
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-8">Contact</p>
          <div className="flex flex-col gap-3">
            {emailReveal === 'revealed' ? (
              <a
                href={`mailto:${revealedEmail}`}
                className="text-sm font-medium text-[#111111] hover-underline"
              >
                {revealedEmail}
              </a>
            ) : emailReveal === 'pending' || emailReveal === 'loading' ? (
              <div className="space-y-2">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={handleTurnstileSuccess}
                  onError={() => setEmailReveal('error')}
                  options={{ theme: 'light', appearance: 'interaction-only' }}
                />
                {emailReveal === 'loading' && (
                  <p className="text-xs text-stone-400">Verifying...</p>
                )}
              </div>
            ) : emailReveal === 'error' ? (
              <div className="space-y-3">
                <p className="text-xs text-red-500">Verification failed. Please try again.</p>
                <button
                  onClick={() => setEmailReveal('pending')}
                  className="text-sm font-medium text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity"
                >
                  Try again
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEmailReveal('pending')}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] hover-underline w-fit"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Show email address
              </button>
            )}
            <a
              href="https://www.linkedin.com/in/alexlautin/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] hover-underline w-fit"
            >
              <SiLinkedin size={13} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
