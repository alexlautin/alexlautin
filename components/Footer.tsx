"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-600">© {new Date().getFullYear()} Alex Lautin</div>
        <nav className="flex items-center gap-4">
          <Link href="#about" className="text-sm text-slate-600 hover:text-slate-800">About</Link>
          <Link href="#projects" className="text-sm text-slate-600 hover:text-slate-800">Projects</Link>
          <Link href="#contact" className="text-sm text-slate-600 hover:text-slate-800">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://github.com/alexlautin" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800">GitHub</a>
          <a href="https://www.linkedin.com/in/alexlautin/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
