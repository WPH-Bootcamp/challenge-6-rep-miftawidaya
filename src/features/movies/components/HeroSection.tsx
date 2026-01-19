import { Link } from 'react-router-dom';
import { type FC } from 'react';
import { useHeroCarousel } from '../hooks/useHeroCarousel';
import { PlayIcon } from '../../../components/ui/Icon';
import { Button } from '../../../components/ui/Button';
import type { Movie } from '../../../types/movie';
import { cn } from '../../../lib/cn';

interface HeroSectionProps {
  movies: Movie[];
  isLoading?: boolean;
}

/**
 * HeroSection component to display a full-height slideshow of trending movies.
 */
export const HeroSection: FC<Readonly<HeroSectionProps>> = ({
  movies,
  isLoading,
}) => {
  const { currentIdx, isFading } = useHeroCarousel(movies);

  if (isLoading || !movies?.length) {
    return (
      <header className='relative h-202.5 w-full animate-pulse bg-neutral-950'>
        <div className='custom-container pb-spacing-10xl flex h-full flex-col justify-end'>
          <div className='mb-spacing-md h-12 w-1/3 rounded bg-neutral-800' />
          <div className='h-20 w-1/2 rounded bg-neutral-800' />
        </div>
      </header>
    );
  }

  const movie = movies[currentIdx];

  return (
    <header className='relative h-202.5 w-full overflow-hidden bg-black'>
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          isFading ? 'opacity-0' : 'opacity-100'
        )}
      >
        {/* Backdrop Image */}
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className='animate-scale-up absolute inset-0 h-full w-full object-cover'
          key={movie.id} // Force scale animation restart
        />

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-black to-transparent' />

        {/* Content Container */}
        <div
          key={`content-${movie.id}`} // Force text animation restart
          className='custom-container absolute inset-0 z-20 flex flex-col justify-start pt-55.75 md:pt-74.5'
        >
          <div className='flex flex-col gap-6 md:gap-12'>
            {/* Text Content */}
            <div className='gap-spacing-sm flex flex-col md:gap-4'>
              <h1 className='text-display-xs md:text-display-2xl text-neutral-25 animate-fade-in-up fill-mode-forwards font-bold opacity-0 delay-100'>
                {movie.title}
              </h1>
              <p className='md:text-md animate-fade-in-up fill-mode-forwards line-clamp-3 max-w-158.75 text-sm font-normal text-neutral-400 opacity-0 delay-200'>
                {movie.overview}
              </p>
            </div>
            {/* Call to Actions */}
            <div className='animate-fade-in-up fill-mode-forwards flex flex-col gap-4 opacity-0 delay-300 md:flex-row'>
              <Link to={`/movie/${movie.id}`}>
                <Button
                  variant='primary'
                  size='lg'
                  className='w-full gap-2 md:min-w-57.5'
                >
                  Watch Trailer
                  <PlayIcon className='fill-current' />
                </Button>
              </Link>
              <Link to={`/movie/${movie.id}`}>
                <Button
                  variant='secondary'
                  size='lg'
                  className='w-full md:min-w-57.5'
                >
                  See Detail
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
