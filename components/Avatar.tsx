import Image from 'next/image';
import photo from './assets/photo.png';

export default function Avatar({ className = "" }: { className?: string }) {
  return (
    <Image
      src={photo}
      alt="Alex Lautin - Computer Science student at Emory University"
      sizes="(max-width: 768px) 256px, 320px"
      className={`h-28 w-28 rounded-2xl border border-slate-200 shadow-sm object-cover select-none ${className}`}
      priority={true}
      placeholder="blur"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
