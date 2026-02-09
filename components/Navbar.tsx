"use client";

import { Fragment, useState, useEffect } from 'react';
import { Tab, Dialog, Transition } from '@headlessui/react';
import { HiMenu, HiX } from 'react-icons/hi';
import Button from './Button';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ noActiveTab = false }: { noActiveTab?: boolean }) {
  const [activeTab, setActiveTab] = useState(noActiveTab ? -1 : 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (noActiveTab) return;

    const handleHashChange = () => {
      const hash = window.location.hash || '#about';
      const tabs = [
        { name: 'About', href: '#about', key: 'about' },
        { name: 'Projects', href: '#projects', key: 'projects' },
        { name: 'Contact', href: '#contact', key: 'contact' },
      ];
      const index = tabs.findIndex(tab => tab.href === hash);
      if (index !== -1) setActiveTab(index);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [noActiveTab]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (noActiveTab) return;

    const sections = ['about', 'projects', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const index = sections.indexOf(sectionId);
          if (index !== -1) {
            setActiveTab(index);
            window.history.replaceState(null, '', `#${sectionId}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [noActiveTab]);

  const tabs = [
    { name: 'About', href: '#about', key: 'about' },
    { name: 'Projects', href: '#projects', key: 'projects' },
    { name: 'Contact', href: '#contact', key: 'contact' },
  ];

  const handleClick = (e: React.MouseEvent, href: string, index: number) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (noActiveTab) {
      window.location.href = `/about${href}`;
      return;
    }

    setActiveTab(index);
    const element = document.querySelector(href);
    if (element) {
      // Small timeout to allow mobile menu to close smoothly before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }, mobileMenuOpen ? 300 : 0);
    }
  };

  return (
    <header className={classNames(
      'fixed inset-x-0 top-0 z-50 transition-all duration-300 font-[var(--font-inter)]',
      isScrolled ? 'py-3 sm:py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-4 sm:py-6 bg-transparent'
    )}>
      <div className="relative flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6">
        {/* Logo/Name on Left */}
        <a
          href={noActiveTab ? "/about#about" : "#about"}
          onClick={(e) => handleClick(e, '#about', 0)}
          className="text-lg sm:text-xl font-bold text-slate-800 hover:text-teal-600 transition-colors duration-200 touch-manipulation focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md px-2 py-1 z-50 relative"
        >
          AL
        </a>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <Tab.Group selectedIndex={activeTab >= 0 ? activeTab : undefined} onChange={setActiveTab}>
            <Tab.List className={classNames(
              'flex space-x-1 rounded-full p-1 transition-all duration-300',
              isScrolled ? 'bg-slate-100/80' : 'bg-white/70 backdrop-blur-sm shadow-sm'
            )}>
              {tabs.map((tab, index) => (
                <Tab key={tab.key} as={Fragment}>
                  {({ selected }) => (
                    <div className="relative flex flex-col items-center">
                      <a
                        href={tab.href}
                        onClick={(e) => handleClick(e, tab.href, index)}
                        className={classNames(
                          'rounded-full px-5 py-2 text-sm font-medium transition focus:outline-none touch-manipulation focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
                          selected && !noActiveTab ? 'text-slate-800 font-semibold' : 'text-slate-600 hover:text-slate-800'
                        )}
                      >
                        {tab.name}
                      </a>
                      {selected && !noActiveTab && (
                        <span
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-teal-600"
                        />
                      )}
                    </div>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50 relative">
          <button
            type="button"
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* CTA Button on Right (Desktop) */}
        <div className="hidden md:block">
          <Button
            href={noActiveTab ? "/about#contact" : "#contact"}
            onClick={(e) => {
              e.preventDefault();
              handleClick(e, '#contact', 2);
            }}
            variant="primary"
            size="sm"
          >
            Let&apos;s Talk
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl">
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="-m-1.5 p-1.5 text-lg font-bold text-slate-800"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    handleClick(e, '#about', 0);
                  }}
                >
                  AL
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <HiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {tabs.map((tab, index) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        onClick={(e) => handleClick(e, tab.href, index)}
                        className={classNames(
                          "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-slate-50",
                          activeTab === index && !noActiveTab ? "text-teal-600 bg-slate-50" : "text-gray-900"
                        )}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(e, '#contact', 2);
                      }}
                      className="w-full justify-center"
                      size="lg"
                    >
                      Let&apos;s Talk
                    </Button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  );
}

