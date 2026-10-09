"use client";
import Avatar from '@/components/Avatar';
import SiteHeader from '@/components/SiteHeader';
import ScreenshotTile from '@/components/ScreenshotTile';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useEffect, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { projects } from "../data/projects";
import Link from 'next/link';

export const dynamic = 'force-static';

const SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Tells search engines these profiles belong to the same person as this site
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Alex Lautin',
  url: 'https://alexlautin.com',
  description: 'Computer science and economics student at Emory University, pursuing roles in product management.',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Emory University' },
  sameAs: [
    'https://www.linkedin.com/in/alexlautin/',
    'https://github.com/alexlautin',
    'https://scholar.google.com/citations?user=Z2EZFfoAAAAJ',
    'https://orcid.org/0009-0006-0555-7424',
  ],
};

// Umami cancels same-tab clicks on `data-umami-event` links, waits for its request to
// finish, then forces a full page load. Report from onClick instead so Next's
// client-side navigation stays instant.
const track = (name: string, data?: Record<string, string>) => {
  (window as unknown as { umami?: { track: (n: string, d?: object) => unknown } }).umami?.track(name, data);
};

const introLink = "underline decoration-neutral-300 underline-offset-4 hover:decoration-ink transition-colors";
const contactRow = "group flex items-baseline justify-between gap-6 border-t border-rule py-5 text-xl md:text-2xl font-medium tracking-tight";

function Arrow() {
  return (
    <span aria-hidden="true" className="text-faint transition-all duration-200 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      ↗
    </span>
  );
}

export default function Home() {
  const [revealedEmail, setRevealedEmail] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [challengeNeeded, setChallengeNeeded] = useState(false);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [loadChallenge, setLoadChallenge] = useState(false);

  // Cloudflare's script is ~650 KB, so hold it back until the visitor interacts
  // (or a few seconds pass) instead of competing with the first paint.
  useEffect(() => {
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;
    const start = () => {
      setLoadChallenge(true);
      events.forEach((e) => window.removeEventListener(e, start));
      clearTimeout(timer);
    };
    const timer = setTimeout(start, 6000);
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      clearTimeout(timer);
    };
  }, []);

  const handleTurnstileSuccess = async (token: string) => {
    try {
      const res = await fetch('/api/reveal-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) { setVerifyFailed(true); return; }
      const { email, resumeUrl } = await res.json();
      setRevealedEmail(email);
      setResumeUrl(resumeUrl);
    } catch {
      setVerifyFailed(true);
    }
  };

  return (
    <>
      <SiteHeader initials />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

        {/* Intro */}
        <section id="about" className="wrap pt-14 md:pt-28 pb-16 md:pb-24">
          <div className="grid gap-8 md:grid-cols-12 md:gap-8 md:items-start">
            <div className="md:col-span-9">
              <h1 className="text-[clamp(2rem,4.7vw,3.9rem)] font-medium leading-[1.06] tracking-[-0.035em] text-balance">
                <span className="block font-bold">Alex Lautin</span>
                <span className="block text-faint">
                  CS and economics student at Emory University, pursuing roles in product management.
                </span>
              </h1>
              <p className="mt-6 md:mt-8 flex flex-wrap gap-x-6 gap-y-2">
                <a href="https://www.linkedin.com/in/alexlautin/" target="_blank" rel="noopener noreferrer" className={introLink} data-umami-event="LinkedIn click">LinkedIn</a>
                <a href="https://scholar.google.com/citations?user=Z2EZFfoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={introLink} data-umami-event="Scholar click">Google Scholar</a>
                <a href="https://orcid.org/0009-0006-0555-7424" target="_blank" rel="noopener noreferrer" className={introLink} data-umami-event="ORCID click">ORCID</a>
                {resumeUrl && (
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer nofollow" className={introLink} data-umami-event="Resume open">Resume</a>
                )}
                {revealedEmail && (
                  <a href={`mailto:${revealedEmail}`} className={introLink} onClick={() => track('Email click')}>Email</a>
                )}
              </p>
            </div>
            <div className="order-first md:order-none md:col-span-3 md:justify-self-end">
              <Avatar className="w-24 h-28 md:w-48 md:h-60 rounded-xl" />
            </div>
          </div>

          <dl className="grid gap-x-8 gap-y-6 md:grid-cols-3 mt-14 md:mt-24 border-t border-rule pt-6">
            <div>
              <dt className="text-sm text-muted mb-1.5">Education</dt>
              <dd className="font-medium">Emory University</dd>
              <dd className="text-muted">B.S. Computer Science · 2027</dd>
              <dd className="text-muted">AI concentration · Economics minor</dd>
            </div>
            <div>
              <dt className="text-sm text-muted mb-1.5">Experience</dt>
              <dd className="font-medium">Baldor Specialty Foods</dd>
              <dd className="text-muted">Product Management Intern · 2026</dd>
            </div>
            <div>
              <dt className="text-sm text-muted mb-1.5">Research</dt>
              <dd className="font-medium">Emory University School of Medicine</dd>
              <dd className="text-muted">Research Assistant</dd>
            </div>
          </dl>
        </section>

        {/* Projects */}
        <section id="projects" className="wrap pb-20 md:pb-32">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] mb-6 md:mb-8">Selected projects</h2>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-16">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                draggable={false}
                className={`group block [-webkit-tap-highlight-color:transparent] select-none ${project.status === 'Live' ? 'md:col-span-2' : ''}`}
                onClick={() => track('Open project', { project: project.id })}
              >
                <ScreenshotTile src={project.images[0]} color={project.color} wide={project.status === 'Live'} priority={i === 0} />
                <div className="mt-4 flex items-baseline justify-between gap-6">
                  <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
                  <span className="text-muted tabular-nums">{project.year}</span>
                </div>
                <p className="mt-1 text-muted max-w-lg">{project.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="wrap pb-16 md:pb-24">
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">Contact</h2>
              {verifyFailed && !revealedEmail && (
                <p className="mt-2 text-muted">Reach out on LinkedIn</p>
              )}
              {/* Turnstile runs invisibly once loaded — no user interaction needed */}
              {SITEKEY && loadChallenge && !revealedEmail && (
                <div className={challengeNeeded ? 'mt-4' : 'absolute -left-[9999px]'} aria-hidden={!challengeNeeded}>
                  {/* The bot check fails for crawlers; a failure here must never break the page */}
                  <ErrorBoundary onError={() => setVerifyFailed(true)}>
                    <Turnstile
                      siteKey={SITEKEY}
                      onSuccess={handleTurnstileSuccess}
                      onBeforeInteractive={() => setChallengeNeeded(true)}
                      onError={() => setVerifyFailed(true)}
                      options={{ appearance: 'interaction-only', theme: 'light' }}
                    />
                  </ErrorBoundary>
                </div>
              )}
            </div>
            <div className="md:col-span-8 border-b border-rule">
              {revealedEmail && (
                <a href={`mailto:${revealedEmail}`} className={contactRow} onClick={() => track('Email click')}>
                  <span className="break-all">{revealedEmail}</span>
                  <Arrow />
                </a>
              )}
              <a href="https://www.linkedin.com/in/alexlautin/" target="_blank" rel="noopener noreferrer" className={contactRow} data-umami-event="LinkedIn click">
                LinkedIn
                <Arrow />
              </a>
              <a href="https://scholar.google.com/citations?user=Z2EZFfoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={contactRow} data-umami-event="Scholar click">
                Google Scholar
                <Arrow />
              </a>
              <a href="https://orcid.org/0009-0006-0555-7424" target="_blank" rel="noopener noreferrer" className={contactRow} data-umami-event="ORCID click">
                ORCID
                <Arrow />
              </a>
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer nofollow" className={contactRow} data-umami-event="Resume open">
                  Resume
                  <Arrow />
                </a>
              )}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
