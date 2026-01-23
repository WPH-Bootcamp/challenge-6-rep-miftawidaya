import { type FC } from 'react';
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
import { useTrailerStore } from '../../store/trailer';
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
  const openTrailer = useTrailerStore((state) => state.openTrailer);

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
      <div className='custom-container relative z-10 flex flex-col gap-8 pt-103 sm:gap-12'>
        {/* Top Section: CSS Grid for responsive layout */}
        <div className='grid grid-cols-[auto_1fr] gap-4 sm:gap-x-8'>
          {/* Poster */}
          <div className='row-span-1'>
            <MoviePoster posterUrl={posterUrl} title={movie.title} />
          </div>

          {/* Info Wrapper: 'contents' on mobile to keep grid behavior, 'flex' on desktop to stack tightly */}
          <div className='contents sm:flex sm:flex-col sm:gap-4 md:gap-6'>
            {/* Title + Date */}
            <div className='flex flex-col justify-start gap-1 self-start sm:gap-4'>
              <h1 className='text-neutral-10 sm:text-display-lg md:text-display-xl text-lg font-bold'>
                {movie.title}
              </h1>
              <div className='flex items-center gap-2'>
                <CalendarIcon className='text-neutral-10 size-4 md:size-6' />
                <span className='md:text-md text-sm font-normal text-white'>
                  {releaseDate}
                </span>
              </div>
            </div>

            {/* Action Buttons - full width on mobile, part of flex column on desktop */}
            <div className='col-span-2 flex items-center gap-3 self-start sm:col-span-1 sm:gap-4 md:h-13'>
              <Button
                variant='primary'
                size='lg'
                className='h-11 flex-1 gap-2 px-4 text-sm sm:flex-none md:h-13 md:min-w-55 md:px-6 md:text-base'
                onClick={() => movie && openTrailer(movie.id, movie.title)}
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
                  <HeartFillIcon className='text-primary-300 size-5 md:size-6' />
                ) : (
                  <HeartOutlineIcon className='text-neutral-10 size-5 md:size-6' />
                )}
              </button>
            </div>

            {/* Stats - full width on mobile, part of flex column on desktop */}
            <div className='col-span-2 sm:col-span-1'>
              <MovieStats rating={movie.vote_average} genre={primaryGenre} />
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className='flex flex-col gap-2'>
          <h2 className='md:text-display-md text-neutral-10 text-xl font-bold'>
            Overview
          </h2>
          <p className='md:text-md text-sm font-normal text-neutral-400'>
            {movie.overview}
          </p>
        </div>

        <CastSection cast={cast} />
      </div>
    </div>
  );
};

export default MovieDetailPage;
