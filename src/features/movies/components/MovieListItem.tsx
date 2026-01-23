import type { FC } from 'react';
import { toast } from 'sonner';
import { useFavoritesStore } from '../../../store/favorites';
import { Button } from '../../../components/ui/Button';
import {
  PlayIcon,
  HeartFillIcon,
  HeartOutlineIcon,
  StarFillIcon,
} from '../../../components/ui/Icon';
import { cn } from '../../../lib/cn';
import type { Movie } from '../../../types/movie';
import { Link } from 'react-router-dom';

interface MovieListItemProps {
  movie: Movie;
  className?: string;
  onWatchTrailer?: () => void;
}

/**
 * MovieListItem component for displaying a movie in a detailed list view.
 * Shared between Search and Favorites pages.
 */
export const MovieListItem: FC<Readonly<MovieListItemProps>> = ({
  movie,
  className,
  onWatchTrailer,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isFav = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(movie.id);
      toast.success('Removed from Favorites');
    } else {
      addFavorite(movie);
      toast.success('Added to Favorites');
    }
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div
      className={cn(
        'group relative flex flex-col gap-6 border-b border-neutral-800/60 pb-8 last:border-none md:flex-row md:items-start md:gap-6 md:pb-12',
        className
      )}
    >
      {/* Favorite Button - Desktop (Absolute Top Right) */}
      <button
        onClick={toggleFavorite}
        className={cn(
          'glassmorphism backdrop-blur-5 absolute top-0 right-0 hidden size-11 cursor-pointer items-center justify-center rounded-full border-neutral-900 transition-all hover:scale-105 md:flex md:size-14',
          isFav ? 'text-primary-300' : 'text-white'
        )}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? (
          <HeartFillIcon size={24} className='text-primary-300' />
        ) : (
          <HeartOutlineIcon size={24} className='text-white' />
        )}
      </button>

      <div className='flex flex-1 gap-4 md:gap-6'>
        {/* Poster */}
        <Link to={`/movie/${movie.id}`} className='shrink-0'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={movie.title}
              className='h-39 w-26 rounded-lg object-cover md:h-67.5 md:w-45.5 md:rounded-xl'
              loading='lazy'
            />
          ) : (
            <div className='flex h-39 w-26 items-center justify-center rounded-lg bg-neutral-800 md:h-67.5 md:w-45.5 md:rounded-xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
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
        </Link>

        {/* Content Area */}
        <div className='flex flex-1 flex-col gap-1 md:gap-6'>
          <div className='flex flex-col gap-1 md:gap-3'>
            {/* Title */}
            <Link to={`/movie/${movie.id}`}>
              <h3 className='hover:text-primary-300 text-md md:text-display-xs line-clamp-2 font-bold text-white transition-colors md:line-clamp-1 md:pr-15'>
                {movie.title}
              </h3>
            </Link>

            {/* Rating */}
            <div className='flex items-center gap-1.5'>
              <StarFillIcon className='size-4 text-[#E4A802] md:size-5.5' />
              <span className='text-sm font-medium text-white md:text-lg'>
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>

            {/* Overview */}
            <p className='line-clamp-2 max-w-193 text-sm text-neutral-400 md:line-clamp-2 md:text-base md:leading-7.5'>
              {movie.overview}
            </p>
          </div>

          {/* Desktop Actions (Just Watch Trailer) */}
          <div className='hidden items-center gap-2 md:flex md:gap-4'>
            <Button
              variant='primary'
              className='md:text-md h-13 w-50 rounded-full text-sm font-semibold'
              onClick={onWatchTrailer}
            >
              Watch Trailer
              <PlayIcon size={24} className='text-white' />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Actions (full width below content) */}
      <div className='flex items-center gap-4 md:hidden'>
        <Button
          variant='primary'
          className='h-11 flex-1 rounded-full text-sm font-semibold'
          onClick={onWatchTrailer}
        >
          Watch Trailer
          <PlayIcon size={18} className='text-white' />
        </Button>
        <button
          onClick={toggleFavorite}
          className={cn(
            'glassmorphism backdrop-blur-5 flex size-11 cursor-pointer items-center justify-center rounded-full border-neutral-800 transition-all hover:scale-105',
            isFav ? 'text-primary-300' : 'text-white'
          )}
        >
          {isFav ? (
            <HeartFillIcon size={18} className='text-primary-300' />
          ) : (
            <HeartOutlineIcon size={18} className='text-white' />
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for MovieListItem.
 */
export const MovieListItemSkeleton: FC = () => (
  <div className='flex animate-pulse flex-col gap-6 md:flex-row md:gap-6'>
    <div className='flex flex-1 gap-4 md:gap-6'>
      {/* Poster Skeleton */}
      <div className='h-39 w-26 shrink-0 rounded-lg bg-neutral-800 md:h-67.5 md:w-45.5 md:rounded-xl' />

      {/* Content Skeleton */}
      <div className='mt-1 flex flex-1 flex-col gap-2 md:gap-6'>
        <div className='h-6 w-3/4 rounded bg-neutral-800 md:h-8' />
        <div className='h-4 w-20 rounded bg-neutral-800 md:h-6' />
        <div className='flex flex-col gap-2'>
          <div className='h-3 w-full rounded bg-neutral-800 md:h-4' />
          <div className='h-3 w-5/6 rounded bg-neutral-800 md:h-4' />
        </div>

        {/* Desktop Actions Skeleton */}
        <div className='hidden gap-4 md:flex'>
          <div className='h-13 w-50 rounded-full bg-neutral-800' />
        </div>
      </div>
      {/* Floating Favorite Skeleton */}
      <div className='absolute top-0 right-0 hidden size-14 rounded-full bg-neutral-800 md:block' />
    </div>

    {/* Mobile Actions Skeleton */}
    <div className='flex gap-4 md:hidden'>
      <div className='h-11 flex-1 rounded-full bg-neutral-800' />
      <div className='size-11 rounded-full bg-neutral-800' />
    </div>
  </div>
);
