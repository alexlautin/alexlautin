import Image from 'next/image';

// A project screenshot framed on that project's colour field.
export default function ScreenshotTile({
  src,
  video,
  poster,
  color,
  alt = '',
  wide = false,
  priority = false,
}: {
  src: string;
  video?: string;
  poster?: string;
  color: string;
  alt?: string;
  wide?: boolean;
  priority?: boolean;
}) {
  const media = "w-full aspect-[17/10] object-cover object-top rounded-md md:rounded-lg ring-1 ring-black/10 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5";

  return (
    <div
      className={`overflow-hidden rounded-2xl ${wide ? 'p-[8%] md:px-[20%] md:py-[6%]' : 'p-[9%]'}`}
      style={{ backgroundColor: color }}
    >
      {video ? (
        <video
          src={video}
          poster={poster ?? src}
          aria-label={alt}
          autoPlay
          muted
          loop
          playsInline
          className={media}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={710}
          sizes={wide ? '(max-width: 768px) 84vw, 680px' : '(max-width: 768px) 82vw, 450px'}
          priority={priority}
          className={media}
        />
      )}
    </div>
  );
}
