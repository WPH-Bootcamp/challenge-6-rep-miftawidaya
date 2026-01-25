import { Link } from 'react-router-dom';
import { type FC, useState } from 'react';
import { StarFillIcon } from '../../../components/ui/Icon';
import { cn } from '../../../lib/cn';
import type { Movie } from '../../../types/movie';

interface TrendingCardProps {
  movie: Movie;
  rank: number;
  className?: string;
}

/**
 * TrendingCard component for the Trending Slider.
 * Includes individual image loading state for smooth UX.
 */
export const TrendingCard: FC<Readonly<TrendingCardProps>> = ({
  movie,
  rank,
  className,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div
      className={cn(
        'group flex w-(--card-grid-width) shrink-0 flex-col items-start gap-2 md:gap-3',
        className
      )}
    >
      {/* Image Container */}
      <Link to={`/movie/${movie.id}`} className='relative block w-full'>
        <div className='aspect-poster relative w-full overflow-hidden rounded-lg md:rounded-xl'>
          {imageUrl ? (
            <>
              {/* Image loading skeleton */}
              {!isImageLoaded && (
                <div className='absolute inset-0 animate-pulse bg-neutral-800' />
              )}
              <img
                src={imageUrl}
                alt={movie.title}
                className={cn(
                  'h-full w-full object-cover transition-all duration-300 group-hover:scale-110',
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                loading='lazy'
                onLoad={() => setIsImageLoaded(true)}
              />
            </>
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-neutral-800'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='48'
                height='48'
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

          {/* Rank Badge - 32px mobile, 48px desktop */}
          <div className='absolute top-2 left-2 flex size-8 items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md md:top-3 md:left-3 md:size-12'>
            <span className='text-neutral-10 text-sm font-semibold md:text-lg'>
              {rank}
            </span>
          </div>
        </div>
      </Link>

      {/* Movie Info */}
      <div className='flex flex-col items-start gap-0.5 self-stretch'>
        {/* Movie Title - Text md/Semibold mobile, Text lg/Semibold desktop */}
        <Link to={`/movie/${movie.id}`} className='w-full'>
          <h3 className='font-poppins text-md text-neutral-10 line-clamp-1 w-full font-semibold md:text-lg'>
            {movie.title}
          </h3>
        </Link>

        {/* Rating Container - Star 18px mobile, 20px desktop */}
        <div className='flex flex-row items-center gap-1.5'>
          <StarFillIcon className='h-4.125 w-4.125 text-yellow-500 md:h-4.5 md:w-4.5' />
          <span className='font-poppins md:text-md text-sm font-normal text-neutral-400'>
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for TrendingCard - responsive.
 */
export const TrendingCardSkeleton: FC = () => (
  <div className='flex w-(--card-grid-width) shrink-0 animate-pulse flex-col gap-2 md:gap-3'>
    <div className='aspect-poster w-full rounded-lg bg-neutral-800 md:rounded-xl' />
    <div className='flex flex-col gap-1.5'>
      <div className='h-5 w-3/4 rounded bg-neutral-800' />
      <div className='h-4 w-1/3 rounded bg-neutral-800' />
    </div>
  </div>
);
