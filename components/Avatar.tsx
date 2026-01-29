"use client";

import Image from 'next/image';

export default function Avatar({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/photo.png"
      alt="Alex Lautin - Computer Science student at Emory University"
      width={112}
      height={112}
      sizes="(max-width: 768px) 256px, 320px"
      className={`h-28 w-28 rounded-2xl border border-slate-200 shadow-sm object-cover select-none ${className}`}
      priority={true}
      quality={85}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
