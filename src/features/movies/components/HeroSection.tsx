import { Link } from 'react-router-dom';
import { type FC, useState } from 'react';
import { useHeroCarousel } from '../hooks/useHeroCarousel';
import { PlayIcon } from '../../../components/ui/Icon';
import { Button } from '../../../components/ui/Button';
import { TrailerModal } from '../../../components/ui/TrailerModal';
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
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  // Lock selected movie when trailer opens (prevents carousel from changing it)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Return empty placeholder with proper height while loading
  // (no skeleton needed - hero has reveal animation)
  if (isLoading || !movies?.length) {
    return (
      <header className='relative min-h-133.25 w-full bg-black md:h-202.5'>
        <div className='absolute inset-0 bg-linear-to-t from-black to-transparent' />
      </header>
    );
  }

  const movie = movies[currentIdx];

  const handleOpenTrailer = () => {
    setSelectedMovie(movie); // Lock current movie
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
    setSelectedMovie(null); // Clear selection
  };

  return (
    <header className='relative min-h-133.25 w-full overflow-hidden bg-black md:h-202.5'>
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
              <Button
                variant='primary'
                size='lg'
                className='w-full gap-2 md:w-auto md:min-w-57.5'
                onClick={handleOpenTrailer}
              >
                Watch Trailer
                <PlayIcon className='fill-current' />
              </Button>
              <Link to={`/movie/${movie.id}`}>
                <Button
                  variant='secondary'
                  size='lg'
                  className='w-full md:w-auto md:min-w-57.5'
                >
                  See Detail
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal - uses locked selectedMovie, not carousel's current movie */}
      {selectedMovie && (
        <TrailerModal
          movieId={selectedMovie.id}
          movieTitle={selectedMovie.title}
          isOpen={isTrailerOpen}
          onClose={handleCloseTrailer}
        />
      )}
    </header>
  );
};
