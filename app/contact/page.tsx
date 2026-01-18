import Navbar from '../../components/Navbar';

export const dynamic = 'force-static';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-black overflow-hidden">
      <main className="flex-grow px-4 py-12">
        <Navbar />
        <div className="mx-auto max-w-4xl text-center mb-8 mt-16">
          <h1 className="mb-8 text-5xl md:text-7xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Contact
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Please reach out below.
          </p>
        </div>
        
        <div className="mx-auto max-w-2xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/50 p-8">
            <form 
              action="https://formspree.io/f/xyzwgknw" 
              method="POST" 
              className="flex flex-col gap-6"
            >
              {/* Honeypot field for spam protection */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white text-base font-semibold rounded-full shadow-md hover:bg-slate-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                <span>Send Message</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
