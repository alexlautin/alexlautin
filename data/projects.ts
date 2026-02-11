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
    id: 'speedsail',
    title: 'Speedsail',
    description: 'A modern inspirational sailing interview website.',
    longDescription: 'Speedsail is a modern sailing interview website built with Next.js and Tailwind CSS. Discover and learn from in-depth interviews with sailors, featuring curated sailing interviews.',
    image: '/speedsail.png',
    images: ['/projects/speedsail/home.png', '/projects/speedsail/videos.png', '/projects/speedsail/podcast.png', '/projects/speedsail/about.png'],
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
    status: 'Live'
  },
  {
    id: 'invitide',
    title: 'Invitide',
    description: 'A hackathon project, a modern retro-styled event management platform.',
    longDescription: 'Invitide is a modern event management platform built with Next.js, Supabase, and Gemini. Easily create, manage, and share events, generate AI event descriptions, and track attendance with QR codes.',
    image: '/invitide.png',
    images: ['/invitide.png'],
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
    description: 'A real-time resume enhancement tool and builder.',
    longDescription: 'SevenWorks is a modern, real-time resume builder built with Next.js, Firebase, and @react-pdf/renderer. Instantly create, edit, autosave, and download professional resumes with a live PDF preview.',
    image: '/sevenworks.png',
    images: ['/projects/sevenworks/home.png', '/projects/sevenworks/templates.png', '/projects/sevenworks/dashboard.png', '/projects/sevenworks/editor.png'],
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
    description: 'A hackathon project, a collaborative classroom whiteboard platform.',
    longDescription: 'GalleryBoard is a collaborative classroom whiteboard platform built with Next.js, Supabase, and shadcn/ui. Teachers can create rooms, students can join with a code, and everyone gets a real-time, private whiteboard. Teachers can view live previews of all student boards.',
    image: '/galleryboard.jpeg',
    images: ['/projects/galleryboard/home.png'],
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
    image: '/photo.png',
    images: ['/projects/portfolio/about.png', '/projects/portfolio/projects.png', '/projects/portfolio/contact.png'],
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
    status: 'Live'
  }
];

export const getTechStackIcons = () => ({
  'Next.js': 'SiNextdotjs',
  'Tailwind CSS': 'SiTailwindcss',
  'Firebase': 'SiFirebase',
  'Vercel': 'SiVercel',
  'Supabase': 'SiSupabase',
  'Resend': 'SiResend',
  'Headless UI': 'SiHeadlessui'
});

export const techLinks = {
  'Next.js': 'https://nextjs.org',
  'Tailwind CSS': 'https://tailwindcss.com',
  'Firebase': 'https://firebase.google.com',
  'Vercel': 'https://vercel.com',
  'Supabase': 'https://supabase.com',
  'Resend': 'https://resend.com',
  'Headless UI': 'https://headlessui.com'
};