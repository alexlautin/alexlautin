import Navbar from '../../components/Navbar';
import Avatar from '@/components/Avatar';
import { SiLinkedin, SiGithub, SiOrcid } from 'react-icons/si';

export const dynamic = 'force-static';

import LocationBadge from '../../components/LocationBadge';

export default function Home() {
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
          <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-2xl mx-auto relative z-10">
            <LocationBadge />
            <div className="mb-6">
              <Avatar className="w-28 h-28 rounded-full mx-auto ring-4 ring-indigo-200" />
            </div>
            <h1 className="mb-8 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-orange-400">
              Alex Lautin
            </h1>
            <p className="mt-6 mb-8 text-lg md:text-xl text-gray-700">
              Student at Emory University studying Computer Science and Mathematics.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/alexlautin/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <SiLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.github.com/alexlautin"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <SiGithub className="w-6 h-6" />
              </a>
              <a
                href="https://orcid.org/0009-0006-0555-7424"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <SiOrcid className="w-6 h-6" />
              </a>
            </div>
          </div>
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