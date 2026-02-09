"use client";
import Navbar from '../../components/Navbar';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { SiLinkedin, SiGithub, SiOrcid, SiGooglescholar, SiNextdotjs, SiTailwindcss, SiVercel, SiSupabase, SiFirebase, SiHeadlessui, SiResend } from '@/components/icons';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, techLinks } from "../../data/projects";

export const dynamic = 'force-static';

// Form validation types
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormState {
  data: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError?: string;
}

// Tooltip Component
const Tooltip = ({ children, text, delay = 0, href }: { children: React.ReactNode, text: string, delay?: number, href?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const content = (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50 animate-fadeIn"
          style={{
            animationDelay: `${delay}ms`,
            animationDuration: '200ms',
            animationFillMode: 'both'
          }}
        >
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-80 transition-opacity duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </a>
    );
  }

  return content;
};

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const [formState, setFormState] = useState<FormState>({
    data: { name: '', email: '', message: '' },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
  });

  // Image loading handler
  const handleImageLoad = (imageId: string) => {
    setImageLoading(prev => ({ ...prev, [imageId]: false }));
  };

  const handleImageLoadStart = (imageId: string) => {
    setImageLoading(prev => ({ ...prev, [imageId]: true }));
  };

  // Form validation functions
  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) return 'Message is required';
    if (message.trim().length < 10) return 'Message must be at least 10 characters';
    return undefined;
  };

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'name': return validateName(value);
      case 'email': return validateEmail(value);
      case 'message': return validateMessage(value);
      default: return undefined;
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    const error = validateField(field, value);
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: error },
      submitError: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const errors: FormErrors = {
      name: validateName(formState.data.name),
      email: validateEmail(formState.data.email),
      message: validateMessage(formState.data.message),
    };

    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) {
      setFormState(prev => ({ ...prev, errors }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true, errors: {}, submitError: undefined }));

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('https://formspree.io/f/xyzwgknw', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormState({
          data: { name: '', email: '', message: '' },
          errors: {},
          isSubmitting: false,
          isSubmitted: true,
        });

        // Reset success state after 5 seconds
        setTimeout(() => {
          setFormState(prev => ({ ...prev, isSubmitted: false }));
        }, 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.errors?.[0]?.message || 'Failed to send message';
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      console.error('Form submission error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: errorMessage,
      }));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main id="main-content" className="relative flex flex-col min-h-screen bg-slate-50 text-gray-900 antialiased">
      <Navbar />

      {/* About Section */}
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-slate-50"
      >
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-4 sm:space-y-6 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-800">
                Alex Lautin
              </h1>
              <div className="h-1 w-16 sm:w-20 bg-teal-600 rounded-full mx-auto md:mx-0"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed">
                Computer Science student at Emory University.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 justify-center md:justify-start">
                <Tooltip text="LinkedIn" href="https://www.linkedin.com/in/alexlautin/">
                  <div className="group relative p-2.5 sm:p-3 rounded-xl bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-200 touch-manipulation btn-press hover-lift" aria-label="Visit Alex Lautin's LinkedIn profile">
                    <SiLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </Tooltip>
                <Tooltip text="GitHub" href="https://www.github.com/alexlautin">
                  <div className="group relative p-2.5 sm:p-3 rounded-xl bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-200 touch-manipulation btn-press hover-lift" aria-label="Visit Alex Lautin's GitHub profile">
                    <SiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </Tooltip>
                <Tooltip text="ORCID" href="https://orcid.org/0009-0006-0555-7424">
                  <div className="group relative p-2.5 sm:p-3 rounded-xl bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-200 touch-manipulation btn-press hover-lift" aria-label="Visit Alex Lautin's ORCID profile">
                    <SiOrcid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </Tooltip>
                <Tooltip text="Google Scholar" href="https://scholar.google.com/citations?user=Z2EZFfoAAAAJ&hl=en">
                  <div className="group relative p-2.5 sm:p-3 rounded-xl bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-200 touch-manipulation btn-press hover-lift" aria-label="Visit Alex Lautin's Google Scholar profile">
                    <SiGooglescholar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </Tooltip>
              </div>
            </div>

            {/* Right: Avatar */}
            <div className="flex justify-center md:justify-end order-first md:order-last">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/10 to-slate-500/10 rounded-3xl blur-2xl opacity-70"></div>
                <Avatar className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl shadow-xl ring-2 ring-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-white via-slate-50/50 to-white border-y border-slate-200"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-teal-500/5 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-slate-500/5 rounded-full blur-2xl opacity-50"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Projects
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-teal-600 rounded-full mx-auto mb-4 sm:mb-6"></div>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              A selection of the projects I have worked on.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group relative flex flex-col bg-white rounded-2xl shadow-md border border-slate-200/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-teal-300 touch-manipulation hover-lift"
              >
                {/* Project image - now inline at top */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white flex-shrink-0 group-hover:border-teal-300 transition-colors duration-300 relative">
                    {imageLoading[project.id] && (
                      <div className="absolute inset-0 bg-slate-100 animate-pulse-subtle flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <Image
                      src={project.image}
                      alt={`${project.title} project thumbnail`}
                      width={48}
                      height={48}
                      sizes="48px"
                      className={`w-full h-full object-${project.title === 'Galleryboard' ? 'contain' : 'cover'} transition-all duration-300 ${imageLoading[project.id] ? 'image-loading' : 'image-loaded'
                        }`}
                      loading="lazy"
                      onLoadingComplete={() => handleImageLoad(project.id)}
                      onLoadStart={() => handleImageLoadStart(project.id)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors duration-300 truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500">{project.type} • {project.year}</p>
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <p className="text-slate-600 text-sm mb-4 sm:mb-6 leading-relaxed">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-auto">
                    {project.technologies.map((tech) => {
                      const techIcon = {
                        'Next.js': SiNextdotjs,
                        'Tailwind CSS': SiTailwindcss,
                        'Firebase': SiFirebase,
                        'Vercel': SiVercel,
                        'Supabase': SiSupabase,
                        'Resend': SiResend,
                        'Headless UI': SiHeadlessui,
                      }[tech];

                      if (!techIcon) return null;
                      const Icon = techIcon;

                      return (
                        <Tooltip key={tech} text={tech} href={techLinks[tech as keyof typeof techLinks]}>
                          <div
                            className="p-1.5 sm:p-2 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 transition-all duration-150 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 touch-manipulation"
                          >
                            <Icon size={12} className="sm:w-3.5 sm:h-3.5" />
                          </div>
                        </Tooltip>
                      );
                    })}
                  </div>

                  {/* Buttons at bottom */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <Button
                      href={`/projects/${project.id}`}
                      className="flex-1"
                      rightIcon={
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      }
                      aria-label={`Learn more about ${project.title} project`}
                    >
                      View Details
                    </Button>
                    <Button
                      href={project.link}
                      variant="outline"
                      external
                      className="flex-1 sm:flex-initial"
                      leftIcon={
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      }
                      aria-label={`View live demo of ${project.title}`}
                    >
                      Live Demo
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50"
      >
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-teal-500/5 rounded-full blur-2xl opacity-50"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Let&apos;s Work Together
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-teal-600 rounded-full mx-auto mb-4 sm:mb-6"></div>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              Have a project in mind? Contact me!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-6 md:p-8">
              {formState.isSubmitted ? (
                // Success Message
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-slate-600 mb-6">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
                    className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                  {/* Honeypot field for spam protection */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  {formState.submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                      <p className="font-medium mb-2">{formState.submitError}</p>
                      <p className="text-xs">
                        You can also reach me directly at{' '}
                        <a href="mailto:alexlautin@gmail.com" className="underline hover:text-red-800">
                          alexlautin@gmail.com
                        </a>
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        value={formState.data.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full rounded-xl border px-3 sm:px-4 py-3 bg-slate-50 hover:bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition-all text-base ${formState.errors.name
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-slate-200 hover:border-slate-300 focus:ring-teal-500'
                          }`}
                        required
                        disabled={formState.isSubmitting}
                      />
                      {formState.errors.name && (
                        <p className="mt-1 text-sm text-red-600">{formState.errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="your@email.com"
                        value={formState.data.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full rounded-xl border px-3 sm:px-4 py-3 bg-slate-50 hover:bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition-all text-base ${formState.errors.email
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-slate-200 hover:border-slate-300 focus:ring-teal-500'
                          }`}
                        required
                        disabled={formState.isSubmitting}
                      />
                      {formState.errors.email && (
                        <p className="mt-1 text-sm text-red-600">{formState.errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formState.data.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full rounded-xl border px-3 sm:px-4 py-3 bg-slate-50 hover:bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition-all resize-none text-base ${formState.errors.message
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-slate-200 hover:border-slate-300 focus:ring-teal-500'
                        }`}
                      required
                      disabled={formState.isSubmitting}
                    />
                    {formState.errors.message && (
                      <p className="mt-1 text-sm text-red-600">{formState.errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={formState.isSubmitting || Object.values(formState.errors).some(error => error)}
                    className="w-full sm:w-auto px-8 py-3 sm:py-4 rounded-full text-base"
                    isLoading={formState.isSubmitting}
                    rightIcon={!formState.isSubmitting && (
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  >
                    {formState.isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-30 p-3 sm:p-4 bg-slate-800 text-white rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 touch-manipulation btn-press hover-lift focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </main>
  );
}
