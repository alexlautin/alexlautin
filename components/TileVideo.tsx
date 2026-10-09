'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// The cover image (children) is the same file the homepage card already loaded, so it
// paints instantly; the video fades in over it only once it is really playing. If
// autoplay is blocked (e.g. iOS Low Power Mode) the image simply stays.
export default function TileVideo({
  src,
  label,
  className,
  children,
}: {
  src: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const onPlaying = () => setPlaying(true);
    video.addEventListener('playing', onPlaying);

    // Safari only autoplays when muted is set as a property, not just the attribute
    video.muted = true;
    video.play().catch(() => {});
    // Autoplay can win the race against hydration, so check what already happened
    if (!video.paused && video.readyState >= 3) setPlaying(true);

    return () => video.removeEventListener('playing', onPlaying);
  }, []);

  return (
    <div className="relative">
      {children}
      <video
        ref={ref}
        src={src}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        draggable={false}
        className={`${className} absolute inset-0 h-full ${playing ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
