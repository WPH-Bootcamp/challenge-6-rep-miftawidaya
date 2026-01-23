import { type FC, useState } from 'react';
import { cn } from '../../lib/cn';

interface MoviePosterProps {
  posterUrl: string | null;
  title: string;
}

/**
 * Movie poster display with fallback for missing images.
 * Includes individual image loading state for smooth UX.
 */
export const MoviePoster: FC<Readonly<MoviePosterProps>> = ({
  posterUrl,
  title,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className='shrink-0'>
      <div className='relative h-48 w-32 overflow-hidden rounded-lg bg-neutral-800 sm:h-96 sm:w-65 sm:rounded-xl'>
        {posterUrl ? (
          <>
            {/* Image loading skeleton */}
            {!isImageLoaded && (
              <div className='absolute inset-0 animate-pulse bg-neutral-800' />
            )}
            <img
              src={posterUrl}
              alt={title}
              className={cn(
                'h-full w-full object-cover transition-opacity duration-300',
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
          </>
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='64'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-neutral-500'
            >
              <rect x='2' y='2' width='20' height='20' rx='2.18' ry='2.18' />
              <line x1='7' y1='2' x2='7' y2='22' />
              <line x1='17' y1='2' x2='17' y2='22' />
              <line x1='2' y1='12' x2='22' y2='12' />
              <line x1='2' y1='7' x2='7' y2='7' />
              <line x1='2' y1='17' x2='7' y2='17' />
              <line x1='17' y1='17' x2='22' y2='17' />
              <line x1='17' y1='7' x2='22' y2='7' />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
