export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  video?: string;
  videoPoster?: string;
  // A recording of the product in use, shown full width on the project page above the screenshots
  demo?: { src: string; poster: string; caption: string };
  color: string;
  link?: string;
  // A no-sign-up demo of the product; shown as "Try the demo" on the card and project page
  demoLink?: string;
  github?: string;
  technologies: string[];
  features: string[];
  year: string;
  type: 'Web App' | 'Hackathon';
  status: 'Live' | 'In Development' | 'Archived';
  // Full-width card on the homepage; everything else sits in the two-column grid
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'harness',
    title: 'Harness',
    description: 'Desktop app that watches what AI coding agents do on your computer and pauses them before something risky finishes. Built at Emory Hacks.',
    longDescription: 'Harness is a local safety monitor for AI coding agents like Claude Code, Codex, and Gemini CLI, built at Emory Hacks. When an agent runs npm install, its window shows one line and a checkmark, but a package\'s install script could be reading your .env and uploading it. Harness follows the whole chain of processes, files, and connections underneath the agent, plants decoy secrets that no honest task should open, scores each session from 0 to 100, and can pause the agent before it finishes. It runs entirely on your computer as a menu bar app for macOS and Windows, built with Node.js and Tauri.',
    images: ['/optimized/projects/harness/site.webp', '/optimized/projects/harness/dashboard.webp', '/optimized/projects/harness/paused.webp', '/optimized/projects/harness/timeline.webp'],
    video: '/optimized/projects/harness/scroll.mp4',
    videoPoster: '/optimized/projects/harness/scroll-poster.webp',
    demo: {
      src: '/optimized/projects/harness/demo.mp4',
      poster: '/optimized/projects/harness/demo-poster.webp',
      caption: 'A real Claude Code session: Harness blocks the agent from reading a .env file before the command runs, and the safety score drops.'
    },
    color: '#EBCFAF',
    link: 'https://getharness.vercel.app',
    demoLink: 'https://getharness.vercel.app/demo',
    github: 'https://github.com/alexlautin/harness',
    technologies: ['Node.js', 'Tauri 2', 'Rust', 'JavaScript', 'Next.js', 'Gemini'],
    features: [
      'Follows every process an agent starts, including package install scripts the agent never typed',
      'Decoy secrets that flag any process that reads them',
      'Auto-protect pauses an agent the moment it does something dangerous',
      'Safety score from 0 to 100 with a plain-language reason for every point lost',
      'Menu bar app for macOS and Windows with a local dashboard',
      'Runs entirely on your computer, with no account and no telemetry'
    ],
    year: '2026',
    type: 'Hackathon',
    status: 'Live',
    featured: true
  },
  {
    id: 'gathr',
    title: 'Gathr',
    description: 'All-in-one app for running a student club: team chat, admissions, calendar, attendance and alumni, on the web and iPhone. Used every day by EEVM.',
    longDescription: 'Gathr started as the internal hub for Emory Entrepreneurship & Venture Management and now runs the whole club: 72 active members across 9 divisions, with more than 88,000 messages kept instead of being wiped by Slack\'s free tier. I\'m one of its lead developers, working with two other members on a React and FastAPI web app and a native SwiftUI iPhone app. It replaces Slack, Google Forms and GroupMe with one place for chat, blind admissions review, events and check-in, photos, reimbursements and a LinkedIn-synced alumni directory. We\'re now opening it to other Emory clubs, each with its own branding and its own database.',
    images: ['/optimized/projects/gathr/landing.webp', '/optimized/projects/gathr/home.webp', '/optimized/projects/gathr/calendar.webp'],
    color: '#B9D6CF',
    link: 'https://gathr.eevm.app',
    demoLink: 'https://gathr.eevm.app/demo',
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'SQLite', 'SwiftUI'],
    features: [
      'Team chat with channels, threads, DMs and iPhone push, with full history kept',
      'Admissions pipeline with blind screening, weighted rubrics and live deliberation',
      'Calendar, RSVPs, QR check-in and attendance standing for every member',
      'Club photo library with face tagging',
      'Reimbursements and card requests routed to the finance team',
      'Alumni directory synced from LinkedIn',
      'MCP server so members can use the hub from Claude, ChatGPT or Gemini',
      'Per-club branding and a separate database for each club'
    ],
    year: '2026',
    type: 'Web App',
    status: 'Live',
    featured: true
  },
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
    images: ['/optimized/projects/greekboard/landing.webp', '/optimized/projects/greekboard/dashboard.webp', '/optimized/projects/greekboard/events.webp', '/optimized/projects/greekboard/dues.webp'],
    color: '#A9BBF7',
    link: 'https://greekboard.alexlautin.com',
    demoLink: 'https://greekboard.alexlautin.com/demo',
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
      'Video interviews with competitive sailors',
      'Podcast page with every episode',
      'Statically exported Next.js site with no server to run',
      'Layout that works from phones to wide screens'
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
    images: ['/optimized/projects/invitide/home.webp', '/optimized/projects/invitide/events.webp'],
    color: '#DCD5B4',
    link: 'https://invitide.vercel.app',
    demoLink: 'https://invitide.vercel.app/demo',
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
    status: 'Live'
  },
  {
    id: 'sevenworks',
    title: 'SevenWorks',
    description: 'Resume builder with a live PDF preview and autosave. Built as a group project for a class.',
    longDescription: 'SevenWorks is a resume builder made as a group project for a class at Emory, using Next.js, Firebase, and @react-pdf/renderer. You edit your details, watch the PDF preview update as you type, and download the result. Work is saved automatically.',
    images: ['/optimized/projects/sevenworks/home.webp', '/optimized/projects/sevenworks/editor.webp'],
    color: '#E6BDB9',
    link: 'https://sevenworks-emory.vercel.app',
    demoLink: 'https://sevenworks-emory.vercel.app/demo',
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
    status: 'Live'
  },
  {
    id: 'galleryboard',
    title: 'GalleryBoard',
    description: 'Classroom whiteboard where each student draws on a private board and the teacher sees live previews of all of them. Built with a team at a hackathon.',
    longDescription: 'GalleryBoard is a classroom whiteboard platform built with a team at a hackathon, using Next.js, Supabase, and shadcn/ui. A teacher creates a room, students join with a code, and each student gets a private whiteboard that updates in real time. The teacher can see a live preview of every board.',
    images: ['/optimized/projects/galleryboard/home.webp', '/optimized/projects/galleryboard/classroom.webp'],
    color: '#BEDCCB',
    link: 'https://galleryboard.vercel.app',
    demoLink: 'https://galleryboard.vercel.app/demo',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'],
    features: [
      'Teachers open a room and students join with a short code',
      'A private, real-time whiteboard for every student',
      'Live grid of every student\'s board for the teacher',
      'Open any board full screen',
      'Anonymous animal names for students',
      'Works with touch and mouse'
    ],
    year: '2025',
    type: 'Hackathon',
    status: 'Live'
  }
];
