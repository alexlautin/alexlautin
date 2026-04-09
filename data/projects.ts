export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  link: string;
  github?: string;
  technologies: string[];
  features: string[];
  year: string;
  type: 'Web App' | 'Hackathon' | 'Portfolio';
  status: 'Live' | 'In Development' | 'Archived';
}

export const projects: Project[] = [
  {
    id: 'greekboard',
    title: 'GreekBoard',
    description: 'Multi-tenant chapter management platform with Stripe-integrated dues processing, event management, and role-based access control.',
    longDescription: 'GreekBoard is a multi-tenant fraternity management platform built with Next.js 14, TypeScript, Tailwind CSS, Neon Postgres, Clerk, and Stripe. Designed with a dark fintech aesthetic, it provides chapter officers with a unified dashboard to track dues, manage events, monitor member standing, and review activity logs. All scoped per organization.',
    image: '/optimized/greekboard.webp',
    images: ['/optimized/projects/greekboard/landing.webp'],
    link: 'https://greekboard.alexlautin.me',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Neon Postgres', 'Clerk', 'Stripe'],
    features: [
      'Multi-tenant architecture with per-chapter data isolation',
      'Dues tracking with Stripe payment integration',
      'Event creation and RSVP management',
      'Member standing and status management',
      'Activity logging and audit trail',
      'Dark fintech-inspired UI',
      'Clerk authentication with role-based access control'
    ],
    year: '2026',
    type: 'Web App',
    status: 'Live'
  },
  {
    id: 'speedsail',
    title: 'Speedsail',
    description: 'Content platform for competitive sailing interviews; SEO-optimized with Next.js.',
    longDescription: 'Speedsail is a modern sailing interview website built with Next.js and Tailwind CSS. Discover and learn from in-depth interviews with sailors, featuring curated sailing interviews.',
    image: '/optimized/speedsail.webp',
    images: ['/optimized/projects/speedsail/home.webp', '/optimized/projects/speedsail/videos.webp', '/optimized/projects/speedsail/podcast.webp', '/optimized/projects/speedsail/about.webp'],
    link: 'https://www.speedsail.org',
    technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
    features: [
      'Responsive design optimized for all devices',
      'SEO-optimized content structure',
      'Fast loading times with Next.js optimization',
      'Clean, modern UI/UX design',
      'Content management system integration'
    ],
    year: '2025',
    type: 'Web App',
    status: 'Archived'
  },
  {
    id: 'invitide',
    title: 'Invitide',
    description: 'Event management platform built at hackathon; AI-generated event descriptions and QR-code attendance tracking.',
    longDescription: 'Invitide is a modern event management platform built with Next.js, Supabase, and Gemini. Easily create, manage, and share events, generate AI event descriptions, and track attendance with QR codes.',
    image: '/optimized/invitide.webp',
    images: ['/optimized/invitide.webp'],
    link: 'https://invitide.vercel.app',
    technologies: ['Next.js', 'Tailwind CSS', 'Supabase', 'Vercel', 'Resend'],
    features: [
      'Create and manage events',
      'AI-generated event descriptions',
      'RSVP and attendee management',
      'QR code check-in for event attendance',
      'User authentication (email/password, GitHub OAuth)',
      'User profiles with display names',
      'Video call integration (Jitsi)',
      'Responsive, modern UI'
    ],
    year: '2025',
    type: 'Hackathon',
    status: 'Archived'
  },
  {
    id: 'sevenworks',
    title: 'Sevenworks',
    description: 'Real-time resume builder with live PDF preview and per-session autosave via Firebase.',
    longDescription: 'SevenWorks is a modern, real-time resume builder built with Next.js, Firebase, and @react-pdf/renderer. Instantly create, edit, autosave, and download professional resumes with a live PDF preview.',
    image: '/optimized/sevenworks.webp',
    images: ['/optimized/projects/sevenworks/home.webp', '/optimized/projects/sevenworks/templates.webp', '/optimized/projects/sevenworks/dashboard.webp', '/optimized/projects/sevenworks/editor.webp'],
    link: 'https://www.sevenworks.tech',
    technologies: ['Next.js', 'Tailwind CSS', 'Firebase', 'Vercel'],
    features: [
      'Live editing of personal, experience, and education information',
      'Real-time PDF preview and instant updates as you type',
      'Autosave and autoload of form data to Firestore (per user session)',
      'Download your resume as a PDF',
      'User authentication (Firebase Auth)',
      'Responsive, modern UI'
    ],
    year: '2025',
    type: 'Web App',
    status: 'Archived'
  },
  {
    id: 'galleryboard',
    title: 'Galleryboard',
    description: 'Collaborative classroom whiteboard platform built at hackathon; real-time multi-user drawing with teacher-side student board previews.',
    longDescription: 'GalleryBoard is a collaborative classroom whiteboard platform built with Next.js, Supabase, and shadcn/ui. Teachers can create rooms, students can join with a code, and everyone gets a real-time, private whiteboard. Teachers can view live previews of all student boards.',
    image: '/optimized/galleryboard.webp',
    images: ['/optimized/projects/galleryboard/home.webp'],
    link: 'https://galleryboard.vercel.app',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'],
    features: [
      'Real-time collaborative drawing',
      'Multi-user support',
      'Educational tools integration',
      'Save and share boards',
      'Touch and mouse support',
      'Classroom management features'
    ],
    year: '2025',
    type: 'Hackathon',
    status: 'Archived'
  },
  {
    id: 'personal-website',
    title: 'Personal Website',
    description: 'A personal website showcasing my projects.',
    longDescription: 'A personal website showcasing my projects. Built with Next.js and Vercel.',
    image: '/optimized/photo.webp',
    images: ['/optimized/projects/portfolio/about.webp', '/optimized/projects/portfolio/projects.webp', '/optimized/projects/portfolio/contact.webp'],
    link: 'https://alexlautin.vercel.app',
    technologies: ['Next.js', 'Tailwind CSS', 'Headless UI', 'Vercel'],
    features: [
      'Responsive portfolio design',
      'Project showcase with details',
      'Smooth animations and transitions',
      'SEO optimization',
      'Contact form integration',
      'Performance optimized'
    ],
    year: '2025',
    type: 'Portfolio',
    status: 'Archived'
  }
];

export const getTechStackIcons = () => ({
  'Next.js': 'SiNextdotjs',
  'Next.js 14': 'SiNextdotjs',
  'TypeScript': 'SiTypescript',
  'Tailwind CSS': 'SiTailwindcss',
  'Firebase': 'SiFirebase',
  'Vercel': 'SiVercel',
  'Supabase': 'SiSupabase',
  'Resend': 'SiResend',
  'Headless UI': 'SiHeadlessui',
  'Stripe': 'SiStripe',
  'Clerk': 'SiClerk'
});

export const techLinks = {
  'Next.js': 'https://nextjs.org',
  'Next.js 14': 'https://nextjs.org',
  'TypeScript': 'https://www.typescriptlang.org',
  'Tailwind CSS': 'https://tailwindcss.com',
  'Firebase': 'https://firebase.google.com',
  'Vercel': 'https://vercel.com',
  'Supabase': 'https://supabase.com',
  'Resend': 'https://resend.com',
  'Headless UI': 'https://headlessui.com',
  'Neon Postgres': 'https://neon.tech',
  'Stripe': 'https://stripe.com',
  'Clerk': 'https://clerk.com'
};