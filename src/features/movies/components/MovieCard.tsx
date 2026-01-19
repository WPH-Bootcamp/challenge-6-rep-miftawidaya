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
    : 'https://via.placeholder.com/500x750?text=No+Image';

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
          <img
            src={imageUrl}
            alt={movie.title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
            loading='lazy'
          />
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
  <div className='gap-spacing-md flex animate-pulse flex-col'>
    <div className='rounded-radius-2xl aspect-2/3 bg-neutral-800' />
    <div className='h-4 w-3/4 rounded bg-neutral-800' />
    <div className='h-3 w-1/4 rounded bg-neutral-800' />
  </div>
);
