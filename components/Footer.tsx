"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-slate-200 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-600 order-2 md:order-1">© {new Date().getFullYear()} Alex Lautin</div>
        <nav className="flex items-center gap-4 sm:gap-6 order-1 md:order-2">
          <Link href="#about" className="text-sm text-slate-600 hover:text-slate-800 transition-colors touch-manipulation">About</Link>
          <Link href="#projects" className="text-sm text-slate-600 hover:text-slate-800 transition-colors touch-manipulation">Projects</Link>
          <Link href="#contact" className="text-sm text-slate-600 hover:text-slate-800 transition-colors touch-manipulation">Contact</Link>
        </nav>
        <div className="flex items-center gap-3 sm:gap-4 order-3">
          <a href="https://github.com/alexlautin" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-800 transition-colors touch-manipulation">GitHub</a>
          <a href="https://www.linkedin.com/in/alexlautin/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-800 transition-colors touch-manipulation">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
