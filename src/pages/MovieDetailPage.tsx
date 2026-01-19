import { type FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../api/movies';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Star, Play, Calendar, Clock, ChevronLeft } from 'lucide-react';
import { useTitle } from '../hooks/useTitle';
import type { Movie } from '../types/movie';

/**
 * MovieDetailPage displaying full metadata, synopsis, and backdrop.
 */
export const MovieDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<
    Movie & {
      genres: { id: number; name: string }[];
      runtime: number;
      tagline: string;
    }
  >({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(Number(id)),
    enabled: !!id,
  });

  useTitle(movie?.title || 'Movie Details');

  if (isLoading) {
    return (
      <div className='flex h-[80vh] items-center justify-center pt-24'>
        <div className='border-primary-300 size-12 animate-spin rounded-full border-4 border-t-transparent' />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className='custom-container pb-spacing-11xl pt-24 text-center'>
        <h1 className='text-display-sm text-red-500'>Movie not found</h1>
        <Link to='/'>
          <Button variant='outline' className='mt-spacing-lg'>
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  return (
    <div className='flex flex-col'>
      {/* Hero Backdrop */}
      <div className='relative h-[60vh] w-full'>
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className='h-full w-full object-cover'
          />
        )}
        <div className='from-background via-background/60 absolute inset-0 bg-gradient-to-t to-transparent' />

        <Link to='/' className='left-spacing-xl absolute top-24'>
          <Button variant='secondary' className='size-12 rounded-full p-0'>
            <ChevronLeft />
          </Button>
        </Link>
      </div>

      {/* Content */}
      <div className='custom-container -mt-spacing-11xl pb-spacing-11xl relative z-10'>
        <div className='gap-spacing-4xl grid grid-cols-1 md:grid-cols-12'>
          {/* Poster */}
          <div className='md:col-span-4 lg:col-span-3'>
            <div className='rounded-radius-3xl aspect-[2/3] overflow-hidden border border-neutral-800 shadow-2xl'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='h-full w-full object-cover'
              />
            </div>
          </div>

          {/* Details */}
          <div className='gap-spacing-xl pt-spacing-8xl flex flex-col md:col-span-8 md:pt-20 lg:col-span-9'>
            <div className='gap-spacing-xs flex flex-col'>
              {movie.tagline && (
                <span className='text-primary-300 text-sm font-medium tracking-widest uppercase'>
                  {movie.tagline}
                </span>
              )}
              <h1 className='text-display-xl font-bold'>{movie.title}</h1>
            </div>

            <div className='gap-spacing-xl flex flex-wrap items-center text-neutral-400'>
              <div className='flex items-center gap-1.5'>
                <Star className='size-5 fill-yellow-500 text-yellow-500' />
                <span className='font-bold text-white'>
                  {movie.vote_average.toFixed(1)}
                </span>
                <span>/ 10</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Clock className='size-5' />
                <span>{movie.runtime} min</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Calendar className='size-5' />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>

            <div className='gap-spacing-sm flex flex-wrap'>
              {movie.genres.map((genre) => (
                <Badge
                  key={genre.id}
                  variant='secondary'
                  className='glassmorphism text-neutral-300'
                >
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className='gap-spacing-md flex max-w-3xl flex-col'>
              <h3 className='text-xl font-bold'>Overview</h3>
              <p className='text-lg leading-relaxed text-neutral-400'>
                {movie.overview}
              </p>
            </div>

            <div className='gap-spacing-md mt-spacing-xl flex items-center'>
              <Button variant='primary' size='lg' className='gap-2 px-10'>
                <Play className='fill-current' /> Watch Trailer
              </Button>
              <Button variant='secondary' size='lg' className='px-10'>
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
