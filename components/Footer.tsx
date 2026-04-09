"use client";


export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#F9F7F4]">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
        <span className="text-sm text-stone-400">© {new Date().getFullYear()} Alex Lautin</span>
        <div className="flex items-center gap-5">
          <a href="https://github.com/alexlautin" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-[#111111] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/alexlautin/" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-[#111111] transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
