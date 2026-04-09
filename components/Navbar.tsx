"use client";

import { Fragment, useState, useEffect, useRef } from 'react';
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
  const scrollLocked = useRef(false);

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

    const sectionIds = ['about', 'projects', 'contact'];
    const THRESHOLD = 120; // px from top of viewport to consider a section "active"

    const onScroll = () => {
      if (scrollLocked.current) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveTab(sectionIds.length - 1);
        window.history.replaceState(null, '', '#contact');
        return;
      }
      let activeIndex = 0;
      let closestTop = -Infinity;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= THRESHOLD && top > closestTop) {
            closestTop = top;
            activeIndex = i;
          }
        }
      }
      setActiveTab(activeIndex);
      window.history.replaceState(null, '', `#${sectionIds[activeIndex]}`);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
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
      window.location.href = `/${href}`;
      return;
    }

    setActiveTab(index);
    scrollLocked.current = true;
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
        setTimeout(() => { scrollLocked.current = false; }, 800);
      }, mobileMenuOpen ? 300 : 0);
    }
  };

  return (
    <header className={classNames(
      'fixed inset-x-0 top-0 z-50 transition-all duration-200 font-[var(--font-inter)] border-b',
      isScrolled
        ? 'py-3 bg-[#F9F7F4]/90 backdrop-blur-md border-stone-200 shadow-[0_1px_0_0_rgb(0,0,0,0.03)]'
        : 'py-4 bg-transparent border-transparent'
    )}>
      <div className="relative flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6">
        {/* Logo/Name on Left */}
        <a
          href={noActiveTab ? "/#about" : "#about"}
          onClick={(e) => handleClick(e, '#about', 0)}
          className="text-base font-semibold text-[#111111] hover:opacity-50 transition-opacity duration-150 touch-manipulation rounded-md px-1 py-1 z-50 relative tracking-tight"
        >
          AL
        </a>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <Tab.Group selectedIndex={activeTab >= 0 ? activeTab : undefined} onChange={setActiveTab}>
            <Tab.List className="flex space-x-1 p-1">
              {tabs.map((tab, index) => (
                <Tab key={tab.key} as={Fragment}>
                  {({ selected }) => (
                    <div className="relative flex flex-col items-center">
                      <a
                        href={tab.href}
                        onClick={(e) => handleClick(e, tab.href, index)}
                        className={classNames(
                          'px-4 py-2 text-sm transition focus:outline-none touch-manipulation',
                          selected && !noActiveTab ? 'text-[#111111] font-medium' : 'text-stone-400 hover:text-[#111111] font-normal'
                        )}
                      >
                        {tab.name}
                      </a>
                      {selected && !noActiveTab && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-px bg-[#111111]" />
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
            href={noActiveTab ? "/#contact" : "#contact"}
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

