"use client";

import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ noActiveTab = false }: { noActiveTab?: boolean }) {
  const [activeTab, setActiveTab] = useState(noActiveTab ? -1 : 0);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
    
    // If we're on a page without sections (like 404), navigate to /about with the hash
    if (noActiveTab) {
      window.location.href = `/about${href}`;
      return;
    }
    
    setActiveTab(index);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className={classNames(
      'fixed inset-x-0 top-0 z-20 transition-all duration-300 font-[var(--font-inter)]',
      isScrolled ? 'py-3 sm:py-4 bg-white/90 backdrop-blur-md shadow-md' : 'py-4 sm:py-6 bg-transparent'
    )}>
      <div className="relative flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6">
        {/* Logo/Name on Left */}
        <a 
          href={noActiveTab ? "/about#about" : "#about"} 
          onClick={(e) => handleClick(e, '#about', 0)} 
          className="text-lg sm:text-xl font-bold text-slate-800 hover:text-teal-600 transition-colors duration-200 touch-manipulation focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md px-2 py-1"
        >
          AL
        </a>
        
        {/* Center Navigation - Responsive positioning */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
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
                          'rounded-full px-4 sm:px-5 py-2 text-sm font-medium transition focus:outline-none touch-manipulation focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
                          selected && !noActiveTab ? 'text-slate-800 font-semibold' : 'text-slate-600 hover:text-slate-800'
                        )}
                      >
                        {tab.name}
                      </a>
                      {selected && !noActiveTab && (
                        <span
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 rounded-full bg-teal-600"
                        />
                      )}
                    </div>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        
        {/* Mobile Navigation - Simple links for mobile */}
        <div className="flex sm:hidden space-x-3">
          {tabs.map((tab, index) => (
            <a
              key={tab.key}
              href={tab.href}
              onClick={(e) => handleClick(e, tab.href, index)}
              className={classNames(
                'text-sm font-medium transition touch-manipulation px-2 py-1.5 rounded-md focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
                activeTab === index && !noActiveTab ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-slate-800'
              )}
            >
              {tab.name}
            </a>
          ))}
        </div>
        
        {/* CTA Button on Right - hidden on mobile to save space */}
        <a 
          href={noActiveTab ? "/about#contact" : "#contact"}
          onClick={(e) => handleClick(e, '#contact', 2)}
          className="hidden md:block px-4 sm:px-5 py-2 bg-slate-800 text-white text-sm font-semibold rounded-full hover:bg-teal-600 transition-all duration-200 shadow-sm hover:shadow-md touch-manipulation btn-press focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Let&apos;s Talk
        </a>
      </div>
    </header>
  );
}
