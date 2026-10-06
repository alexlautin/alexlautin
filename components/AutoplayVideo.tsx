'use client';

import { useEffect, useRef } from 'react';

// Safari only autoplays when the element is muted *as a property*; React renders
// `muted` as an attribute, so set it directly and start playback ourselves.
export default function AutoplayVideo(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked (e.g. Low Power Mode): leave the poster and controls-free fallback.
    });
  }, []);

  return <video ref={ref} autoPlay muted loop playsInline {...props} />;
}
