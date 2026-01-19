import { Link } from 'react-router-dom';
import { type FC, useState, useEffect } from 'react';
import { Play } from 'lucide-react';
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
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!movies?.length || movies.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % Math.min(movies.length, 5));
    }, 8000);

    return () => clearInterval(timer);
  }, [movies]);

  if (isLoading || !movies?.length) {
    return (
      <header className='relative h-screen w-full animate-pulse bg-neutral-950'>
        <div className='custom-container pb-spacing-10xl flex h-full flex-col justify-end'>
          <div className='mb-spacing-md h-12 w-1/3 rounded bg-neutral-800' />
          <div className='h-20 w-1/2 rounded bg-neutral-800' />
        </div>
      </header>
    );
  }

  return (
    <header className='relative h-screen w-full overflow-hidden'>
      {movies.slice(0, 5).map((movie, idx) => (
        <div
          key={movie.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            idx === currentIdx ? 'opacity-100' : 'opacity-0'
          )}
        >
          {/* Backdrop Image */}
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className='absolute inset-0 h-full w-full object-cover'
          />

          {/* Gradient Overlays */}
          <div className='from-background via-background/40 absolute inset-0 bg-gradient-to-r to-transparent' />
          <div className='from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent' />

          <div className='custom-container pb-spacing-11xl relative flex h-full flex-col justify-end'>
            <div className='gap-spacing-xl flex max-w-2xl flex-col'>
              <h1 className='text-display-2xl font-bold tracking-tight text-white uppercase'>
                {movie.title}
              </h1>
              <p className='line-clamp-3 text-lg text-neutral-300'>
                {movie.overview}
              </p>
              <div className='gap-spacing-md flex items-center'>
                <Link to={`/movie/${movie.id}`}>
                  <Button variant='primary' size='lg' className='gap-2'>
                    <Play className='fill-current' /> Watch Trailer
                  </Button>
                </Link>
                <Link to={`/movie/${movie.id}`}>
                  <Button variant='secondary' size='lg'>
                    See Detail
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className='bottom-spacing-10xl right-spacing-7xl absolute z-20 flex gap-2'>
        {movies.slice(0, 5).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              idx === currentIdx ? 'bg-primary-300 w-8' : 'w-1.5 bg-white/30'
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </header>
  );
};
