"use client";


export default function Footer() {
  return (
    <footer className="wrap py-8 flex items-center justify-between gap-4 text-sm text-muted">
      <span>© {new Date().getFullYear()} Alex Lautin</span>
      <div className="flex items-center gap-6">
        <a href="https://github.com/alexlautin" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" data-umami-event="GitHub click">GitHub</a>
        <a href="https://www.linkedin.com/in/alexlautin/" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" data-umami-event="LinkedIn click">LinkedIn</a>
      </div>
    </footer>
  );
}
