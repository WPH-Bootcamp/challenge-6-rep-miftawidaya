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
      <section className='custom-container py-spacing-8xl'>
        <h2 className='text-display-sm mb-spacing-xl font-bold'>
          Trending Now
        </h2>
        <div className='gap-spacing-xl flex overflow-hidden'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='min-w-[200px] flex-1'>
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='custom-container py-spacing-8xl relative z-20 mt-[-var(--spacing-6xl)] overflow-hidden'>
      <h2 className='text-display-sm mb-spacing-xl font-bold'>Trending Now</h2>

      <div className='gap-spacing-xl pb-spacing-md scrollbar-hide flex overflow-x-auto'>
        {movies.slice(0, 10).map((movie, index) => (
          <div
            key={movie.id}
            className='relative min-w-[200px] flex-1 transition-transform hover:scale-105'
          >
            {/* Rank Number */}
            <div className='text-display-3xl absolute -bottom-8 -left-2 z-20 font-black text-white/40 select-none'>
              {index + 1}
            </div>
            <MovieCard movie={movie} className='h-full pl-6' />
          </div>
        ))}
      </div>
    </section>
  );
};
