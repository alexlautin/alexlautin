'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

// Remembers where each page was scrolled to. Going back/forward restores that
// spot; opening a new page always starts at the top.
const STORAGE_KEY = 'scroll-positions';
const positions = new Map<string, number>();
let popped = false;
let mounted = false;

function load() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, number>;
    Object.entries(saved).forEach(([path, y]) => positions.set(path, y));
  } catch {}
}

function persist() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(positions)));
  } catch {}
}

// Programmatic scrolls are ignored while an iOS momentum scroll is still running,
// which is how a project page could open already scrolled down. Briefly locking
// the page stops the momentum first. Only on touch devices: on desktop the lock
// would make the scrollbar flicker.
function jumpTo(y: number) {
  const root = document.documentElement;
  const touch = window.matchMedia('(pointer: coarse)').matches;
  if (touch) root.style.overflow = 'hidden';
  window.scrollTo({ top: y, left: 0, behavior: 'instant' });

  // Unlock on whichever fires first; animation frames pause in background tabs, and the
  // page must never be left locked
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    root.style.overflow = '';
    window.scrollTo({ top: y, left: 0, behavior: 'instant' });
  };
  requestAnimationFrame(finish);
  setTimeout(finish, 80);
}

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // The browser would otherwise restore the old offset before the new page has rendered
    history.scrollRestoration = 'manual';
    load();

    let timer: ReturnType<typeof setTimeout>;
    const save = () => {
      positions.set(location.pathname, window.scrollY);
      clearTimeout(timer);
      timer = setTimeout(persist, 150);
    };
    const onPop = () => { popped = true; };
    // 'manual' is remembered by the history entry, so a reload would first paint the top
    // of the page (the photo) and only jump down once this script ran. Handing the page
    // back to the browser as it unloads lets the reload open at the right spot straight away.
    const onHide = () => {
      positions.set(location.pathname, window.scrollY);
      persist();
      history.scrollRestoration = 'auto';
    };
    // Coming back from the back/forward cache: this page is live again
    const onShow = () => { history.scrollRestoration = 'manual'; };

    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('popstate', onPop);
    window.addEventListener('pagehide', onHide);
    window.addEventListener('pageshow', onShow);

    // Fallback for a reload the browser didn't restore itself
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (nav && (nav.type === 'reload' || nav.type === 'back_forward') && !location.hash) {
      const y = positions.get(location.pathname);
      if (y && Math.abs(window.scrollY - y) > 2) jumpTo(y);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', save);
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('pageshow', onShow);
    };
  }, []);

  useLayoutEffect(() => {
    if (!mounted) {
      mounted = true; // the initial load is handled above
      return;
    }
    const wasPop = popped;
    popped = false;
    if (location.hash) return; // in-page anchors scroll themselves

    if (wasPop) {
      jumpTo(positions.get(pathname) ?? 0);
    } else {
      jumpTo(0);
      positions.set(pathname, 0);
    }
  }, [pathname]);

  return null;
}
