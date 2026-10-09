import Image from 'next/image';
import TileVideo from './TileVideo';

// Image `sizes` decide which resized file the browser downloads. A project page cover
// must request the same file as that project's homepage card, so the browser reuses the
// already-loaded image instead of fetching a bigger one and popping it in after the click.
export const TILE_SIZES = {
  wide: '(max-width: 768px) 84vw, 680px',
  narrow: '(max-width: 768px) 82vw, 450px',
};

// A project screenshot framed on that project's colour field.
export default function ScreenshotTile({
  src,
  video,
  color,
  alt = '',
  wide = false,
  sizes,
  priority = false,
}: {
  src: string;
  video?: string;
  color: string;
  alt?: string;
  wide?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  // Not draggable or selectable (no ghost image or blue highlight on click), and on its
  // own compositing layer so Safari doesn't repaint it during the hover transition
  const base = "select-none [-webkit-user-drag:none] [-webkit-touch-callout:none] transform-gpu w-full object-cover object-top rounded-md md:rounded-lg";
  const media = `${base} aspect-[17/10] ring-1 ring-black/10 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5`;
  // Same box as the image underneath, minus the ring and shadow so they aren't drawn twice
  const videoLayer = `${base} transition-transform duration-500 ease-out group-hover:-translate-y-1.5`;

  const image = (
    <Image
      src={src}
      alt={video ? '' : alt}
      width={1200}
      height={710}
      sizes={sizes ?? (wide ? TILE_SIZES.wide : TILE_SIZES.narrow)}
      priority={priority}
      decoding="sync"
      draggable={false}
      className={media}
    />
  );

  return (
    <div
      className={`select-none overflow-hidden rounded-2xl ${wide ? 'p-[8%] md:px-[20%] md:py-[6%]' : 'p-[9%]'}`}
      style={{ backgroundColor: color }}
    >
      {video ? (
        <TileVideo src={video} label={alt} className={videoLayer}>
          {image}
        </TileVideo>
      ) : (
        image
      )}
    </div>
  );
}
