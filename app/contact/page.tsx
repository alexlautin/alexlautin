import Navbar from '../../components/Navbar';

export const dynamic = 'force-static';

export default function Contact() {
  return (
    <main className="relative flex flex-col min-h-screen bg-gray-50 text-gray-900 antialiased">
      <div className="flex-grow">
        <Navbar />
        <section className="flex items-center justify-center py-24 px-6 text-center">
          <div className="bg-white backdrop-blur-md bg-opacity-80 shadow-lg rounded-2xl p-10 max-w-md w-full mx-auto">
            <h1 className="mb-6 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Contact
            </h1>
            <p className="mb-8 text-lg text-gray-700">
              Feel free to reach out for collaborations, questions, or just to say hi!
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="mt-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-indigo-500 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
      <footer className="border-t border-gray-200 bg-white px-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Alex Lautin — Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
