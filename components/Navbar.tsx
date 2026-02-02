"use client";

import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { name: 'About', href: '#about', key: 'about' },
    { name: 'Projects', href: '#projects', key: 'projects' },
    { name: 'Contact', href: '#contact', key: 'contact' },
  ];
  
  const handleClick = (e: React.MouseEvent, href: string, index: number) => {
    e.preventDefault();
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
      isScrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-md' : 'py-6 bg-transparent'
    )}>
      <div className="relative flex items-center justify-between max-w-6xl mx-auto px-6">
        {/* Logo/Name on Left */}
        <a href="#about" onClick={(e) => handleClick(e, '#about', 0)} className="text-xl font-bold text-slate-800 hover:text-teal-600 transition-colors duration-200">
          AL
        </a>
        
        {/* Center Navigation - Absolutely centered on page */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
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
                          'rounded-full px-5 py-2 text-sm font-medium transition focus:outline-none',
                          selected ? 'text-slate-800 font-semibold' : 'text-slate-600 hover:text-slate-800'
                        )}
                      >
                        {tab.name}
                      </a>
                      {selected && (
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
        
        {/* CTA Button on Right */}
        <a 
          href="/contact"
          className="hidden md:block px-5 py-2 bg-slate-800 text-white text-sm font-semibold rounded-full hover:bg-teal-600 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}
