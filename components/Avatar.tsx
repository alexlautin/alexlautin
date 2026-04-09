"use client";

import Image from 'next/image';
import photo from './assets/photo.png';
import { useState } from 'react';

export default function Avatar({ className = "" }: { className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      <Image
        src={photo}
        alt="Alex Lautin - Computer Science student at Emory University"
        sizes="(max-width: 768px) 256px, 320px"
        className={`object-cover h-full w-full select-none transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        priority={true}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
