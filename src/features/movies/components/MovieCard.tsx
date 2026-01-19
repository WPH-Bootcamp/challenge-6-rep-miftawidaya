import { Link } from 'react-router-dom';
import type { FC } from 'react';
import { useFavoritesStore } from '../../../store/favorites';
import { Badge } from '../../../components/ui/Badge';
import {
  HeartFillIcon,
  HeartOutlineIcon,
  StarFillIcon,
} from '../../../components/ui/Icon';
import { cn } from '../../../lib/cn';

import type { Movie } from '../../../types/movie';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

/**
 * MovieCard component to display a movie poster with rating and favorite toggle.
 */
export const MovieCard: FC<Readonly<MovieCardProps>> = ({
  movie,
  className,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
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
      className={cn('group gap-spacing-md relative flex flex-col', className)}
    >
      <Link to={`/movie/${movie.id}`}>
        <div className='rounded-radius-2xl relative aspect-2/3 overflow-hidden'>
          <img
            src={imageUrl}
            alt={movie.title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
            loading='lazy'
          />

          {/* Overlay */}
          <div className='from-background/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          {/* Action Buttons */}
          <div className='top-spacing-md right-spacing-md gap-spacing-xs absolute flex flex-col'>
            <button
              onClick={toggleFavorite}
              className={cn(
                'glassmorphism flex size-10 cursor-pointer items-center justify-center rounded-full transition-all hover:scale-110',
                favorite ? 'text-primary-300' : 'text-white'
              )}
            >
              {favorite ? (
                <HeartFillIcon size={20} className='text-primary-300' />
              ) : (
                <HeartOutlineIcon size={20} className='text-white' />
              )}
            </button>
          </div>

          {/* Rating Badge */}
          <Badge className='bottom-spacing-md left-spacing-md glassmorphism absolute flex items-center gap-1 border-none text-white'>
            <StarFillIcon size={12} className='text-yellow-500' />
            {movie.vote_average.toFixed(1)}
          </Badge>
        </div>
      </Link>

      <div className='flex flex-col'>
        <Link to={`/movie/${movie.id}`}>
          <h3 className='group-hover:text-primary-300 line-clamp-1 text-base font-semibold transition-colors'>
            {movie.title}
          </h3>
        </Link>
        <p className='text-sm text-neutral-500'>
          {new Date(movie.release_date).getFullYear() || 'N/A'}
        </p>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for MovieCard.
 */
export const MovieCardSkeleton: FC = () => (
  <div className='gap-spacing-md flex animate-pulse flex-col'>
    <div className='rounded-radius-2xl aspect-[2/3] bg-neutral-800' />
    <div className='h-4 w-3/4 rounded bg-neutral-800' />
    <div className='h-3 w-1/4 rounded bg-neutral-800' />
  </div>
);
