import type { FC } from 'react';
import { MovieCard, MovieCardSkeleton } from './MovieCard';

import type { Movie } from '../../../types/movie';

interface TrendingSliderProps {
  movies: Movie[];
  isLoading?: boolean;
}

/**
 * TrendingSlider component to display a horizontal list of movies with rank overlays.
 */
export const TrendingSlider: FC<Readonly<TrendingSliderProps>> = ({
  movies,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className='flex gap-4 overflow-hidden'>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={`skeleton-${i}`} className='w-40 shrink-0 md:w-57.5'>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='group relative'>
      <div className='scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4'>
        {movies.slice(0, 10).map((movie, index) => (
          <div
            key={movie.id}
            className='relative w-40 shrink-0 snap-start transition-transform duration-300 hover:scale-105 md:w-57.5'
          >
            {/* Rank Number */}
            <div className='text-display-3xl absolute -bottom-6 -left-2 z-20 font-black text-white/40 drop-shadow-lg select-none'>
              {index + 1}
            </div>
            <MovieCard movie={movie} className='h-full pl-6' />
          </div>
        ))}
      </div>
    </div>
  );
};
