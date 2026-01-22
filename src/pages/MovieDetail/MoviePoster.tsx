import type { FC } from 'react';

interface MoviePosterProps {
  posterUrl: string | null;
  title: string;
}

/**
 * Movie poster display with fallback for missing images.
 */
export const MoviePoster: FC<Readonly<MoviePosterProps>> = ({
  posterUrl,
  title,
}) => (
  <div className='shrink-0'>
    <div className='h-96 w-65 overflow-hidden rounded-xl bg-neutral-800'>
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={title}
          className='h-full w-full object-cover'
        />
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
