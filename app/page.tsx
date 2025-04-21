import { Fragment } from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import Navbar from '../components/Navbar';

export const dynamic = 'force-static';

/** Utility to concatenate classes */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const tabs = ['About', 'Articles', 'Projects', 'Speaking', 'Uses'];

  return (
    <main className="relative min-h-screen bg-white text-black antialiased">
      <Navbar />

      {/* --- Decorative gradient backdrop (mirrors Tailwind Spotlight) --- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[140vh] w-[140vw] rounded-full bg-gradient-radial from-emerald-400/30 via-indigo-500/10 to-transparent blur-3xl" />
        <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 rotate-45 bg-gradient-conic from-indigo-500 via-sky-500 to-emerald-400 opacity-20 blur-3xl" />
      </div>

      {/* --- Hero --- */}
      <section
        id="about"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
      >
        <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-7xl">
          Crafting&nbsp;
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">
            delightful
          </span>
          &nbsp;web experiences
        </h1>
        <p className="mb-10 max-w-xl text-lg text-slate-300 md:text-xl">
          I’m Alex Lautin, a developer&nbsp;&amp;&nbsp;sailor who turns ideas into
          fast, accessible websites.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="#projects"
            className="rounded-lg bg-emerald-500 px-6 py-3 text-base font-medium text-white shadow hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="rounded-lg border border-slate-700/60 px-6 py-3 text-base font-medium text-slate-300 hover:border-slate-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            Contact Me
          </Link>
        </div>
      </section>
      {/* --- Footer --- */}
      <footer
        id="contact"
        className="border-t border-slate-800 bg-slate-900/60 px-6 py-10 text-center text-sm text-slate-400"
      >
        © {new Date().getFullYear()} Alex Lautin — Built with Next.js&nbsp;&&nbsp;Tailwind CSS
      </footer>
    </main>
  );
}