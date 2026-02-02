"use client";

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <main className="relative flex flex-col min-h-screen bg-slate-50 text-gray-900 antialiased">
      <Navbar noActiveTab />
      
      <section className="relative min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-2xl w-full mx-auto text-center">
          <div className="space-y-6">
            <h1 className="text-8xl md:text-9xl font-bold text-slate-800">
              404
            </h1>
            <div className="h-1 w-20 bg-teal-600 rounded-full mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Page Not Found
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white text-base font-semibold rounded-full shadow-md hover:bg-teal-600 transform hover:scale-[1.02] transition-all duration-200"
              >
                <span>Go Home</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <Link
                href="/about#projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 text-slate-700 text-base font-semibold rounded-full hover:bg-slate-100 transition-all duration-200"
              >
                <span>View Projects</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
