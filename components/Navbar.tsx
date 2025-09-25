"use client";

import React, { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShow(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY > lastScrollY.current) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { name: 'About', href: '/about', key: 'about' },
    { name: 'Projects', href: '/projects', key: 'projects' },
    { name: 'Contact', href: '/contact', key: 'contact' },
  ];
  const currentIndex = tabs.findIndex(tab => pathname === tab.href);
  return (
    <header className={`fixed inset-x-0 top-0 z-20 py-6 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'} font-[var(--font-inter)]`}>
      <div className="flex items-center justify-between max-w-3xl mx-auto px-4">
        <div className="flex-1" />
        <Tab.Group selectedIndex={currentIndex}>
          <Tab.List className="flex space-x-1 rounded-full bg-white/60 dark:bg-gray-800/60 p-1 shadow-sm backdrop-blur transition-colors duration-300">
            {tabs.map((tab) => (
              <Tab key={tab.key} as={Fragment}>
                {({ selected }) => (
                  <div className="relative flex flex-col items-center">
                    <Link
                      href={tab.href}
                      className={classNames(
                        'rounded-full px-4 py-1.5 text-sm font-medium transition focus:outline-none',
                        selected ? 'text-slate-500 dark:text-slate-400 font-bold' : 'text-black dark:text-gray-200 hover:text-slate-500 dark:hover:text-slate-400 font-light'
                      )}
                      prefetch={false}
                      scroll={true}
                    >
                      {tab.name}
                    </Link>
                    {selected && (
                      <span
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.25 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, rgba(45,212,191,0) 0%, rgba(45,212,191,1) 30%, rgba(45,212,191,1) 70%, rgba(45,212,191,0) 100%)'
                        }}
                      />
                    )}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
        <div className="flex-1 flex justify-end" />
      </div>
    </header>
  );
}
