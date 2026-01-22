import { type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getMovieDetails, getMovieCredits } from '../../api/movies';
import { Button } from '../../components/ui/Button';
import {
  PlayIcon,
  HeartFillIcon,
  HeartOutlineIcon,
  CalendarIcon,
  CheckIcon,
} from '../../components/ui/Icon';
import { useTitle } from '../../hooks/useTitle';
import { useFavoritesStore } from '../../store/favorites';
import { TrailerModal } from '../../components/ui/TrailerModal';
import type { MovieDetails, MovieCredits } from '../../types/movie';

import { MovieDetailSkeleton } from './MovieDetailSkeleton';
import { MovieDetailError } from './MovieDetailError';
import { HeroBackdrop } from './HeroBackdrop';
import { MoviePoster } from './MoviePoster';
import { MovieStats } from './MovieStats';
import { CastSection } from './CastSection';

/**
 * MovieDetailPage displaying full metadata, synopsis, cast, and backdrop.
 * Refactored to use sub-components for better maintainability.
 */
export const MovieDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<MovieDetails>({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(Number(id)),
    enabled: !!id,
  });

  const { data: credits } = useQuery<MovieCredits>({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => getMovieCredits(Number(id)),
    enabled: !!id,
  });

  useTitle(movie?.title || 'Movie Details');

  const favorite = movie ? isFavorite(movie.id) : false;

  const toggleFavorite = () => {
    if (!movie) return;
    try {
      if (favorite) {
        removeFavorite(movie.id);
        toast.success('Removed from Favorites');
      } else {
        addFavorite(movie);
        toast.success('Success Add to Favorites', {
          icon: <CheckIcon size={24} className='text-white' />,
        });
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
      toast.error('Failed to update favorites. Please try again.');
    }
  };

  // Loading state
  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  // Error state
  if (error || !movie) {
    return <MovieDetailError />;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseDate = new Date(movie.release_date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const primaryGenre = movie.genres?.[0]?.name || 'N/A';
  const cast = credits?.cast?.slice(0, 5) || [];

  return (
    <div className='relative min-h-screen pb-37.5'>
      <HeroBackdrop backdropUrl={backdropUrl} title={movie.title} />

      {/* Main Content */}
      <div className='custom-container relative z-10 flex flex-col gap-12 pt-103'>
        {/* Top Section: Poster + Info Row */}
        <div className='flex flex-col gap-8 md:flex-row md:gap-8'>
          <MoviePoster posterUrl={posterUrl} title={movie.title} />

          {/* Movie Info - Title, Date, Buttons, Stats */}
          <div className='flex flex-1 flex-col gap-6'>
            {/* Title + Date + Buttons Block */}
            <div className='flex flex-col gap-8 md:flex-row md:items-start md:justify-between'>
              {/* Left: Title + Date */}
              <div className='flex flex-col gap-4'>
                {/* Title */}
                <h1 className='text-display-lg text-neutral-10 md:text-display-xl font-bold'>
                  {movie.title}
                </h1>

                {/* Release Date */}
                <div className='flex items-center gap-2'>
                  <CalendarIcon size={24} className='text-neutral-10' />
                  <span className='text-md font-normal text-white'>
                    {releaseDate}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className='flex items-center gap-4'>
                  <Button
                    variant='primary'
                    size='lg'
                    className='gap-2 px-6'
                    onClick={() => setIsTrailerOpen(true)}
                  >
                    Watch Trailer
                    <PlayIcon />
                  </Button>
                  <button
                    onClick={toggleFavorite}
                    className='flex size-11 cursor-pointer items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60 backdrop-blur-md transition-transform hover:scale-105 md:size-13'
                    aria-label={
                      favorite ? 'Remove from favorites' : 'Add to favorites'
                    }
                  >
                    {favorite ? (
                      <HeartFillIcon size={24} className='text-primary-300' />
                    ) : (
                      <HeartOutlineIcon size={24} className='text-neutral-10' />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <MovieStats rating={movie.vote_average} genre={primaryGenre} />
          </div>
        </div>

        {/* Overview Section */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-display-sm text-neutral-10 md:text-display-md font-bold'>
            Overview
          </h2>
          <p className='text-md font-normal text-neutral-400'>
            {movie.overview}
          </p>
        </div>

        <CastSection cast={cast} />
      </div>

      {/* Trailer Modal */}
      {movie && (
        <TrailerModal
          movieId={movie.id}
          movieTitle={movie.title}
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieDetailPage;
