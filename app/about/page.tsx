"use client";
import Navbar from '../../components/Navbar';
import Avatar from '@/components/Avatar';
import { SiLinkedin, SiGithub, SiOrcid, SiGooglescholar } from 'react-icons/si';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const dynamic = 'force-static';

import LocationBadge from '../../components/LocationBadge';

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
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="relative flex flex-col min-h-screen bg-gray-50 text-gray-900 antialiased overflow-hidden">
      <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="flex-grow flex items-center justify-center">
        <Navbar />
        {/* --- Hero --- */}
        <section
          id="about"
          className="relative flex items-center justify-center py-24 px-6 text-center"
        >
          <motion.div
            className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-2xl mx-auto relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <LocationBadge />
            <motion.div className="mb-6" variants={itemVariants}>
              <Avatar className="w-28 h-28 rounded-full mx-auto ring-4 ring-indigo-200" />
            </motion.div>
            <motion.h1
              className="mb-8 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-orange-400"
              variants={itemVariants}
            >
              Alex Lautin
            </motion.h1>
            <motion.p
              className="mt-6 mb-8 text-lg md:text-xl text-gray-700"
              variants={itemVariants}
            >
              Student at Emory University studying Computer Science and Mathematics.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-6"
              variants={itemVariants}
            >
              <Tooltip text="LinkedIn" href="https://www.linkedin.com/in/alexlautin/">
                <div className="group relative p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <SiLinkedin className="w-6 h-6" />
                </div>
              </Tooltip>
              <Tooltip text="GitHub" href="https://www.github.com/alexlautin">
                <div className="group relative p-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <SiGithub className="w-6 h-6" />
                </div>
              </Tooltip>
              <Tooltip text="ORCID" href="https://orcid.org/0009-0006-0555-7424">
                <div className="group relative p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <SiOrcid className="w-6 h-6" />
                </div>
              </Tooltip>
              <Tooltip text="Google Scholar" href="https://scholar.google.com/citations?user=Z2EZFfoAAAAJ&hl=en">
                <div className="group relative p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <SiGooglescholar className="w-6 h-6" />
                </div>
              </Tooltip>
            </motion.div>
          </motion.div>
        </section>
      </div>
      {/* --- Footer --- */}
      <footer className="border-t border-slate-200/50 bg-white/60 backdrop-blur-sm px-6 py-8 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-500 mb-2">
            © {new Date().getFullYear()} Alex Lautin — Built with Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}