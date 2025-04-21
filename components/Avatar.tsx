"use client";

import Image from 'next/image';

export default function Avatar({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/photo.png"
      alt="Personal avatar"
      width={112}
      height={112}
      className={`h-28 w-28 rounded-full border border-gray-200 shadow-sm object-cover ${className}`}
      priority={true}
    />
  );
}
