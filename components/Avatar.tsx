"use client";

import Image from 'next/image';

export default function Avatar({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/photo.png"
      alt="Personal avatar"
      width={112}
      height={112}
      className={`h-28 w-28 rounded-2xl border border-slate-200 shadow-sm object-cover select-none ${className}`}
      priority={true}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
