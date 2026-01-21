import type { FC } from 'react';
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
    } else {
      addFavorite(movie);
    }
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div
      className={cn(
        'group flex flex-col gap-6 border-b border-neutral-800/60 pb-8 last:border-none md:flex-row md:items-start md:gap-6',
        className
      )}
    >
      <div className='flex flex-1 gap-4 md:gap-6'>
        {/* Poster */}
        <Link to={`/movie/${movie.id}`} className='shrink-0'>
          <img
            src={imageUrl}
            alt={movie.title}
            className='h-39 w-26 rounded-lg object-cover md:h-67.5 md:w-45.5 md:rounded-xl'
            loading='lazy'
          />
        </Link>

        {/* Content Area */}
        <div className='flex flex-1 flex-col gap-1 md:gap-6'>
          <div className='flex flex-col gap-1 md:gap-3'>
            {/* Title */}
            <Link to={`/movie/${movie.id}`}>
              <h3 className='hover:text-primary-300 line-clamp-2 text-base font-bold text-white transition-colors md:line-clamp-1 md:text-2xl'>
                {movie.title}
              </h3>
            </Link>

            {/* Rating */}
            <div className='flex items-center gap-1'>
              <StarFillIcon className='size-4.5 text-[#E4A802] md:size-6' />
              <span className='text-sm font-medium text-white md:text-lg'>
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>

            {/* Overview */}
            <p className='line-clamp-2 max-w-193 text-sm text-neutral-400 md:line-clamp-2 md:text-base md:leading-7.5'>
              {movie.overview}
            </p>
          </div>

          {/* Desktop Actions (part of the content vertical stack) */}
          <div className='mt-auto hidden items-center gap-4 md:flex'>
            <Button
              variant='primary'
              className='h-13 w-50 rounded-full text-base font-semibold'
              onClick={onWatchTrailer}
            >
              Watch Trailer
              <PlayIcon size={24} className='ml-2 text-white' />
            </Button>
            <button
              onClick={toggleFavorite}
              className={cn(
                'glassmorphism backdrop-blur-5 flex size-14 cursor-pointer items-center justify-center rounded-full border-neutral-800 transition-all hover:scale-105',
                isFav ? 'text-primary-300' : 'text-white'
              )}
            >
              {isFav ? (
                <HeartFillIcon size={24} className='text-primary-300' />
              ) : (
                <HeartOutlineIcon size={24} className='text-white' />
              )}
            </button>
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
          <PlayIcon size={20} className='ml-2 text-white' />
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
        <div className='mt-auto hidden gap-4 md:flex'>
          <div className='h-13 w-50 rounded-full bg-neutral-800' />
          <div className='size-14 rounded-full bg-neutral-800' />
        </div>
      </div>
    </div>

    {/* Mobile Actions Skeleton */}
    <div className='flex gap-4 md:hidden'>
      <div className='h-11 flex-1 rounded-full bg-neutral-800' />
      <div className='size-11 rounded-full bg-neutral-800' />
    </div>
  </div>
);
