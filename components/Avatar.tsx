"use client";

import Image from 'next/image';
import photo from './assets/photo.webp';

export default function Avatar({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Hoisted into <head>: starts the download with the page's first requests */}
      <link rel="preload" as="image" href={photo.src} fetchPriority="high" />
      <Image
        src={photo}
        alt="Alex Lautin - Computer Science student at Emory University"
        sizes="(max-width: 768px) 96px, 192px"
        className="object-cover h-full w-full select-none"
        priority={true}
        decoding="sync"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
