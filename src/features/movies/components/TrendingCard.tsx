import { Link } from 'react-router-dom';
import type { FC } from 'react';
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
 * Displays movie poster with rank badge, title, and rating.
 */
export const TrendingCard: FC<Readonly<TrendingCardProps>> = ({
  movie,
  rank,
  className,
}) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div
      className={cn('group flex flex-col items-start gap-3', 'w-54', className)}
    >
      {/* Image Container */}
      <Link to={`/movie/${movie.id}`} className='relative block'>
        <div className='relative h-80.25 w-54 overflow-hidden rounded-xl'>
          <img
            src={imageUrl}
            alt={movie.title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
            loading='lazy'
          />

          {/* Rank Badge */}
          <div className='absolute top-3 left-3 flex size-12 items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md'>
            <span className='text-neutral-10 text-lg font-semibold'>
              {rank}
            </span>
          </div>
        </div>
      </Link>

      {/* Movie Info */}
      <div className='flex flex-col items-start gap-0.5 self-stretch'>
        {/* Movie Title */}
        <Link to={`/movie/${movie.id}`} className='w-full'>
          <h3 className='font-poppins text-neutral-10 line-clamp-1 w-full text-lg font-semibold'>
            {movie.title}
          </h3>
        </Link>

        {/* Rating Container */}
        <div className='flex flex-row items-center gap-1'>
          <StarFillIcon className='h-5 w-5 text-yellow-500' />
          <span className='font-poppins text-md font-normal text-neutral-400'>
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for TrendingCard.
 */
export const TrendingCardSkeleton: FC = () => (
  <div className='flex w-54 animate-pulse flex-col gap-3'>
    <div className='h-80.25 w-54 rounded-xl bg-neutral-800' />
    <div className='flex flex-col gap-1'>
      <div className='h-5 w-3/4 rounded bg-neutral-800' />
      <div className='h-4 w-1/3 rounded bg-neutral-800' />
    </div>
  </div>
);
