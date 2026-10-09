export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  video?: string;
  videoPoster?: string;
  color: string;
  link?: string;
  github?: string;
  technologies: string[];
  features: string[];
  year: string;
  type: 'Web App' | 'Hackathon';
  status: 'Live' | 'In Development' | 'Archived';
}

export const projects: Project[] = [
  {
    id: 'eevm',
    title: 'EEVM',
    description: 'Website for Emory Entrepreneurship & Venture Management. I worked on the Fall 2026 redesign.',
    longDescription: 'The website for Emory Entrepreneurship & Venture Management, the student organization behind HackATL. I helped build it with the club\'s team in React, Vite, and Tailwind CSS, and worked on the Fall 2026 redesign, which covered the homepage and every inner page, gave each page its own URL, and rebuilt the scroll effects to run smoothly on mobile.',
    images: ['/optimized/projects/eevm/home.webp', '/optimized/projects/eevm/about.webp', '/optimized/projects/eevm/initiatives.webp'],
    video: '/optimized/projects/eevm/scroll.mp4',
    videoPoster: '/optimized/projects/eevm/scroll-poster.webp',
    color: '#BCE0E3',
    link: 'https://www.eevm.org',
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    features: [
      'Full redesign of the homepage and all inner pages for Fall 2026',
      'Separate URL for every page',
      'Scroll-driven hero and team rows using native CSS scroll timelines',
      'Team directory covering 5 divisions and 3 initiatives',
      'Initiatives page for HackATL, Excellerator, and Girls into VC',
      'Applications and contact pages'
    ],
    year: '2026',
    type: 'Web App',
    status: 'Live'
  },
  {
    id: 'greekboard',
    title: 'GreekBoard',
    description: 'Chapter management platform for fraternities, with dues payments through Stripe, event management, and role-based access.',
    longDescription: 'GreekBoard is a chapter management platform for fraternities, built with Next.js, TypeScript, Tailwind CSS, Neon Postgres, Clerk, and Stripe. Chapter officers get one dashboard to track dues, manage events, monitor member standing, and review activity logs, with each chapter\'s data kept separate.',
    images: ['/optimized/projects/greekboard/landing.webp'],
    color: '#A9BBF7',
    link: 'https://greekboard.alexlautin.com',
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
    description: 'Website of video and podcast interviews about competitive sailing, built with Next.js.',
    longDescription: 'Speedsail is a website of video and podcast interviews about sailing fast, built with Next.js and Tailwind CSS.',
    images: ['/optimized/projects/speedsail/home.webp', '/optimized/projects/speedsail/videos.webp', '/optimized/projects/speedsail/podcast.webp', '/optimized/projects/speedsail/about.webp'],
    color: '#C3D2D6',
    link: 'https://speedsail.alexlautin.com',
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
    description: 'Event management platform with AI-written event descriptions and QR-code check-in. Built with a team at a hackathon.',
    longDescription: 'Invitide is an event management platform built with a team of four at a hackathon, using Next.js, Supabase, and Gemini. Hosts can create and share events, generate event descriptions with AI, and track attendance with QR codes.',
    images: ['/optimized/projects/invitide/home.webp'],
    color: '#DCD5B4',
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
    title: 'SevenWorks',
    description: 'Resume builder with a live PDF preview and autosave. Built as a group project for a class.',
    longDescription: 'SevenWorks is a resume builder made as a group project for a class at Emory, using Next.js, Firebase, and @react-pdf/renderer. You edit your details, watch the PDF preview update as you type, and download the result. Work is saved automatically.',
    images: ['/optimized/projects/sevenworks/home.webp', '/optimized/projects/sevenworks/templates.webp', '/optimized/projects/sevenworks/dashboard.webp', '/optimized/projects/sevenworks/editor.webp'],
    color: '#E6BDB9',
    link: 'https://sevenworks-emory.vercel.app',
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
    title: 'GalleryBoard',
    description: 'Classroom whiteboard where each student draws on a private board and the teacher sees live previews of all of them. Built with a team at a hackathon.',
    longDescription: 'GalleryBoard is a classroom whiteboard platform built with a team at a hackathon, using Next.js, Supabase, and shadcn/ui. A teacher creates a room, students join with a code, and each student gets a private whiteboard that updates in real time. The teacher can see a live preview of every board.',
    images: ['/optimized/projects/galleryboard/home.webp'],
    color: '#BEDCCB',
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
  }
];
