import Link from 'next/link';

// The homepage opens with the full name already, so it shows initials here
export default function SiteHeader({ initials = false }: { initials?: boolean }) {
  return (
    <header className="wrap pt-6 md:pt-8 flex items-baseline justify-between">
      <Link href="/" aria-label="Alex Lautin, home" className="font-medium tracking-tight hover:opacity-60 transition-opacity">
        {initials ? 'AL' : 'Alex Lautin'}
      </Link>
      <nav className="flex items-baseline gap-6 text-muted">
        <Link href="/#projects" className="hover:text-ink transition-colors">Projects</Link>
        <Link href="/#contact" className="hover:text-ink transition-colors">Contact</Link>
      </nav>
    </header>
  );
}
