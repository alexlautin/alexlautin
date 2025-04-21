import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Avatar from '@/components/Avatar';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen bg-gray-50 text-gray-900 antialiased overflow-hidden">
      <div className="flex-grow flex items-center justify-center">
        <Navbar />
        {/* --- Hero --- */}
        <section
          id="about"
          className="relative flex items-center justify-center py-24 px-6 text-center"
        >
          <div className="bg-white backdrop-blur-md bg-opacity-80 shadow-lg rounded-2xl p-10 max-w-2xl mx-auto">
            <div className="mb-6">
              <Avatar className="w-28 h-28 rounded-full mx-auto ring-4 ring-indigo-200" />
            </div>
            <h1 className="mb-8 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-orange-400">
              Alex Lautin
            </h1>
            <p className="mt-6 mb-8 text-lg md:text-xl text-gray-700">
              Student at Emory University studying Computer Science and Mathematics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/projects"
                className="rounded-full bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-indigo-500 transition"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-indigo-600 px-6 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </div>
      {/* --- Footer --- */}
      <footer className="border-t border-gray-200 bg-white px-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Alex Lautin — Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}