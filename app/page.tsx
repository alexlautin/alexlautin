"use client";
import Avatar from '@/components/Avatar';
import { SiLinkedin, SiOrcid, SiGooglescholar } from '@/components/icons';
import { HiArrowRight } from 'react-icons/hi';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { projects } from "../data/projects";
import Link from 'next/link';

export const dynamic = 'force-static';

const SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function Home() {
  const [revealedEmail, setRevealedEmail] = useState('');
  const [challengeNeeded, setChallengeNeeded] = useState(false);
  const [verifyFailed, setVerifyFailed] = useState(false);

  const handleTurnstileSuccess = async (token: string) => {
    try {
      const res = await fetch('/api/reveal-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) { setVerifyFailed(true); return; }
      const { email } = await res.json();
      setRevealedEmail(email);
    } catch {
      setVerifyFailed(true);
    }
  };

  const displayedProjects = projects.filter(p => p.type !== 'Portfolio');

  return (
    <main id="main-content" className="bg-[#F9F7F4] text-[#111111]">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="" className="text-sm font-semibold text-[#111111] hover:opacity-50 transition-opacity">AL</a>
          <a href="#contact" className="text-sm font-medium text-white bg-[#111111] hover:bg-stone-700 transition-colors duration-150 px-4 py-1.5 rounded-full">Contact</a>
        </div>
      </header>

      {/* Hero */}
      <section id="about" className="pt-28 pb-12 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col gap-8">
            {/* Location — mobile: full width above; desktop: inside text column */}
            <p className="md:hidden text-xs font-medium tracking-widest text-stone-400 uppercase">
              Emory University · Atlanta, GA
            </p>

            {/* Name + subtitle + photo */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="hidden md:block text-xs font-medium tracking-widest text-stone-400 uppercase mb-6">
                  Emory University · Atlanta, GA
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111] leading-tight mb-4">
                  Alex Lautin
                </h1>
                <p className="text-base text-stone-600 leading-relaxed max-w-xs mb-6">
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
              <Avatar className="w-28 h-36 md:w-44 md:h-56 rounded-lg flex-shrink-0 border border-stone-200" />
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
      <section id="projects" className="pt-12 pb-12 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <p className="text-sm font-semibold tracking-widest text-stone-600 uppercase">Selected Projects</p>
            <span className="w-6 h-0.5 bg-stone-400" />
          </div>
          <div className="border-b border-stone-200">
            {displayedProjects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={`group flex items-center justify-between gap-8 py-5 hover:opacity-70 transition-opacity duration-150 ${i !== 0 ? 'border-t border-stone-200' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-[#111111]">{project.title}</span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-4 w-20 justify-end">
                  <span className="text-xs text-stone-500 hidden sm:block tabular-nums">{project.year}</span>
                  <HiArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:translate-x-1 transition-transform duration-150" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="pt-12 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <p className="text-sm font-semibold tracking-widest text-stone-600 uppercase">Contact</p>
            <span className="w-6 h-0.5 bg-stone-400" />
          </div>
          <div className="flex flex-col gap-3">
            {/* Turnstile runs invisibly on page load — no user interaction needed */}
            {SITEKEY && !revealedEmail && (
              <div className={challengeNeeded ? undefined : 'absolute -left-[9999px]'} aria-hidden={!challengeNeeded}>
                <Turnstile
                  siteKey={SITEKEY}
                  onSuccess={handleTurnstileSuccess}
                  onBeforeInteractive={() => setChallengeNeeded(true)}
                  options={{ appearance: 'interaction-only', theme: 'light' }}
                />
              </div>
            )}
            {revealedEmail && (
              <a
                href={`mailto:${revealedEmail}`}
                className="text-sm font-medium text-[#111111] hover-underline"
              >
                {revealedEmail}
              </a>
            )}
            {verifyFailed && !revealedEmail && (
              <a
                href="https://www.linkedin.com/in/alexlautin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-500 hover-underline"
              >
                Reach out on LinkedIn
              </a>
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
