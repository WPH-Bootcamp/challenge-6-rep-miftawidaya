import type { FC } from 'react';

interface HeroBackdropProps {
  backdropUrl: string;
  title: string;
}

/**
 * Hero backdrop section with gradient overlay for movie detail page.
 */
export const HeroBackdrop: FC<Readonly<HeroBackdropProps>> = ({
  backdropUrl,
  title,
}) => (
  <>
    {/* Full Backdrop - starts from top, behind navbar */}
    <div className='absolute inset-x-0 top-0 h-103 w-full'>
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={title}
          className='h-full w-full object-cover'
        />
      )}
      {/* Gradient overlay - inside backdrop */}
      <div className='absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent' />
    </div>
    {/* Extended gradient - blends backdrop into content area */}
    <div className='absolute inset-x-0 top-90 h-20 bg-linear-to-b from-transparent to-black' />
  </>
);
