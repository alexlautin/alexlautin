import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export const metadata = { title: 'Page not found | Alex Lautin' };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="wrap py-24 md:py-40 min-h-[70vh]">
        <h1 className="text-[clamp(2rem,4.7vw,3.9rem)] font-medium leading-[1.06] tracking-[-0.035em] max-w-3xl">
          Page not found.{' '}
          <span className="text-faint">It doesn&apos;t exist or has been moved.</span>
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="font-medium text-paper bg-ink hover:bg-neutral-700 transition-colors px-5 py-2.5 rounded-lg">
            Go home
          </Link>
          <Link href="/#projects" className="font-medium border border-rule hover:border-ink transition-colors px-5 py-2.5 rounded-lg">
            View projects
          </Link>
        </div>
      </main>
    </>
  );
}
