import { Link } from 'react-router-dom';
import type { FC } from 'react';
import { StarFillIcon } from '../../../components/ui/Icon';
import { cn } from '../../../lib/cn';

import type { Movie } from '../../../types/movie';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

/**
 * MovieCard component to display a movie poster with rating.
 */
export const MovieCard: FC<Readonly<MovieCardProps>> = ({
  movie,
  className,
}) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div
      className={cn(
        'group flex flex-col items-start gap-2 md:gap-3',
        'w-43 md:w-54',
        className
      )}
    >
      <Link
        to={`/movie/${movie.id}`}
        className='relative order-0 flex flex-none grow-0'
      >
        <div className='relative order-0 flex h-66.5 w-43 flex-none grow-0 overflow-hidden rounded-lg md:h-80 md:w-54 md:rounded-xl'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={movie.title}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
              loading='lazy'
            />
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
        </div>
      </Link>

      {/* Movie Info */}
      <div className='flex flex-none grow-0 flex-col items-start gap-0.5 self-stretch'>
        {/* Movie Title */}
        <Link to={`/movie/${movie.id}`} className='w-full'>
          <h3 className='text-md font-poppins text-neutral-10 line-clamp-1 w-full font-semibold md:text-lg'>
            {movie.title}
          </h3>
        </Link>

        {/* Rating Container */}
        <div className='flex flex-row items-center gap-1'>
          {/* Star Icon */}
          <StarFillIcon className='h-4.5 w-4.5 text-yellow-500 md:h-5 md:w-5' />

          {/* Rating Value */}
          <span className='font-poppins md:text-md font-regular text-sm text-neutral-400'>
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for MovieCard.
 */
export const MovieCardSkeleton: FC = () => (
  <div className='flex w-43 animate-pulse flex-col gap-2 md:w-54 md:gap-3'>
    {/* Poster Skeleton */}
    <div className='h-66.5 w-full rounded-lg bg-neutral-800 md:h-80 md:rounded-xl' />
    {/* Title Skeleton */}
    <div className='h-5 w-3/4 rounded bg-neutral-800 md:h-6' />
    {/* Rating Skeleton */}
    <div className='h-4 w-1/3 rounded bg-neutral-800' />
  </div>
);
