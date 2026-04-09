"use client";
import Navbar from '../../components/Navbar';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { SiLinkedin, SiGithub, SiOrcid, SiGooglescholar, SiNextdotjs, SiTailwindcss, SiVercel, SiSupabase, SiFirebase, SiHeadlessui, SiResend } from '@/components/icons';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import Image from 'next/image';
import { projects, techLinks } from "../../data/projects";

export const dynamic = 'force-static';

type EmailRevealState = 'hidden' | 'pending' | 'loading' | 'revealed' | 'error';

function HomeInner() {
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

  const techIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'Next.js': SiNextdotjs,
    'Tailwind CSS': SiTailwindcss,
    'Firebase': SiFirebase,
    'Vercel': SiVercel,
    'Supabase': SiSupabase,
    'Resend': SiResend,
    'Headless UI': SiHeadlessui,
  };

  return (
    <main id="main-content" className="flex flex-col min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Hero */}
      <section id="about" className="min-h-screen flex items-center px-6 py-32">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col-reverse md:flex-row md:items-center gap-12 md:gap-20">
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900">
                  Alex Lautin
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-md">
                  Computer Science student at Emory University. Interested in product and consulting.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <a
                  href="https://github.com/alexlautin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <SiGithub size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/alexlautin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <SiLinkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://orcid.org/0009-0006-0555-7424"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ORCID"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <SiOrcid size={14} />
                  <span>ORCID</span>
                </a>
                <a
                  href="https://scholar.google.com/citations?user=Z2EZFfoAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Scholar"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <SiGooglescholar size={14} />
                  <span>Scholar</span>
                </a>

                {emailReveal === 'revealed' ? (
                  <a
                    href={`mailto:${revealedEmail}`}
                    className="text-sm text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {revealedEmail}
                  </a>
                ) : (
                  <button
                    onClick={() => setEmailReveal('pending')}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {emailReveal === 'loading' ? 'Verifying...' : emailReveal === 'error' ? 'Failed — try again' : 'Email'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              <Avatar className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl ring-1 ring-slate-900/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">Projects</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group flex flex-col bg-white border border-slate-100 rounded-xl p-5 hover:border-slate-200 hover:shadow-sm transition-all duration-200 animate-fadeIn"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={36}
                      height={36}
                      className={`w-full h-full object-${project.title === 'Galleryboard' ? 'contain' : 'cover'}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{project.year}</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                        project.status === 'Live' ? 'text-emerald-600' :
                        project.status === 'In Development' ? 'text-amber-600' : 'text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          project.status === 'Live' ? 'bg-emerald-500' :
                          project.status === 'In Development' ? 'bg-amber-500' : 'bg-slate-300'
                        }`} />
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed flex-grow mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => {
                    const Icon = techIconMap[tech];
                    if (!Icon) return null;
                    return (
                      <a
                        key={tech}
                        href={techLinks[tech as keyof typeof techLinks]}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={tech}
                        className="p-1.5 rounded-md bg-slate-50 text-slate-400 border border-slate-100 hover:text-slate-700 hover:border-slate-200 transition-colors"
                      >
                        <Icon size={12} />
                      </a>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <Button href={`/projects/${project.id}`} size="sm" className="flex-1 justify-center">
                    Details
                  </Button>
                  <Button href={project.link} variant="outline" size="sm" external className="flex-1 justify-center">
                    Live
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Get in touch</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed max-w-md">
            Interested in collaborating, exploring opportunities, or just connecting? Clilck to see my email below to reach out.
          </p>

          {emailReveal === 'revealed' ? (
            <a
              href={`mailto:${revealedEmail}`}
              className="inline-flex items-center gap-2 text-slate-900 font-medium hover:text-teal-600 transition-colors"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {revealedEmail}
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
                <p className="text-sm text-slate-400">Verifying...</p>
              )}
            </div>
          ) : emailReveal === 'error' ? (
            <div className="space-y-3">
              <p className="text-sm text-red-600">Verification failed.</p>
              <button
                onClick={() => setEmailReveal('pending')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEmailReveal('pending')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              See email
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return <HomeInner />;
}
