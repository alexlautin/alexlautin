"use client";

export default function Avatar({ className = "" }: { className?: string }) {
  return (
    <img
      src="/photo.png"
      alt="Personal avatar"
      className={`h-28 w-28 rounded-full border border-gray-200 shadow-sm object-cover ${className}`}
    />
  );
}
