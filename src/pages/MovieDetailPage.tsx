import { type FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getMovieDetails, getMovieCredits } from '../api/movies';
import { Button } from '../components/ui/Button';
import {
  PlayIcon,
  HeartFillIcon,
  HeartOutlineIcon,
  CalendarIcon,
  StarFillIcon,
  VideoIcon,
  EmojiHappyIcon,
  CheckIcon,
} from '../components/ui/Icon';
import { useTitle } from '../hooks/useTitle';
import { useFavoritesStore } from '../store/favorites';
import type { Movie } from '../types/movie';

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface MovieCredits {
  cast: CastMember[];
}

/**
 * MovieDetailPage displaying full metadata, synopsis, cast, and backdrop.
 */
export const MovieDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

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
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast.error('Failed to update favorites. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-160 items-center justify-center'>
        <div className='border-primary-300 size-12 animate-spin rounded-full border-4 border-t-transparent' />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className='custom-container pt-24 pb-20 text-center'>
        <h1 className='text-display-sm text-red-500'>Movie not found</h1>
        <Link to='/'>
          <Button variant='outline' className='mt-4'>
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';

  const releaseDate = new Date(movie.release_date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const primaryGenre = movie.genres?.[0]?.name || 'N/A';
  const cast = credits?.cast?.slice(0, 5) || [];

  return (
    <div className='relative min-h-screen pb-37.5'>
      {/* Full Backdrop - starts from top, behind navbar */}
      <div className='absolute inset-x-0 top-0 h-103 w-full'>
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className='h-full w-full object-cover'
          />
        )}
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent' />
      </div>

      {/* Main Content */}
      <div className='custom-container relative z-10 flex flex-col gap-12 pt-103'>
        {/* Top Section: Poster + Info Row */}
        <div className='flex flex-col gap-8 md:flex-row md:gap-8'>
          {/* Poster */}
          <div className='shrink-0'>
            <div className='h-96 w-65 overflow-hidden rounded-xl'>
              <img
                src={posterUrl}
                alt={movie.title}
                className='h-full w-full object-cover'
              />
            </div>
          </div>

          {/* Movie Info - Title, Date, Buttons, Stats */}
          <div className='flex flex-1 flex-col gap-6'>
            {/* Title + Date + Buttons Block */}
            <div className='flex flex-col gap-8 md:flex-row md:items-start md:justify-between'>
              {/* Left: Title + Date */}
              <div className='flex flex-col gap-4'>
                {/* Title - Display xl/Bold */}
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
                  <Button variant='primary' size='lg' className='gap-2 px-6'>
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

            {/* Stats Cards */}
            <div className='flex flex-wrap gap-5'>
              {/* Rating Card */}
              <div className='flex w-full flex-col items-center gap-2 rounded-2xl border border-neutral-700 bg-black p-5 md:w-69'>
                <StarFillIcon size={32} className='text-yellow-500' />
                <div className='flex flex-col items-center gap-0.5'>
                  <span className='text-md font-normal text-neutral-300'>
                    Rating
                  </span>
                  <span className='text-neutral-10 text-xl font-semibold'>
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
              </div>

              {/* Genre Card */}
              <div className='flex w-full flex-col items-center gap-2 rounded-2xl border border-neutral-700 bg-black p-5 md:w-69'>
                <VideoIcon size={32} className='text-neutral-10' />
                <div className='flex flex-col items-center gap-0.5'>
                  <span className='text-md font-normal text-neutral-300'>
                    Genre
                  </span>
                  <span className='text-neutral-10 text-xl font-semibold'>
                    {primaryGenre}
                  </span>
                </div>
              </div>

              {/* Age Limit Card */}
              <div className='flex w-full flex-col items-center gap-2 rounded-2xl border border-neutral-700 bg-black p-5 md:w-69'>
                <EmojiHappyIcon size={32} className='text-neutral-10' />
                <div className='flex flex-col items-center gap-0.5'>
                  <span className='text-md font-normal text-neutral-300'>
                    Age Limit
                  </span>
                  <span className='text-neutral-10 text-xl font-semibold'>
                    13
                  </span>
                </div>
              </div>
            </div>
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

        {/* Cast & Crew Section */}
        {cast.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-display-sm text-neutral-10 md:text-display-md font-bold'>
              Cast & Crew
            </h2>
            {/* Cast Grid */}
            <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
              {cast.map((member) => (
                <div key={member.id} className='flex items-center gap-4'>
                  {/* Cast Image */}
                  <div className='h-26 w-17.25 shrink-0 overflow-hidden rounded-lg bg-neutral-800'>
                    {member.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center text-neutral-500'>
                        N/A
                      </div>
                    )}
                  </div>
                  {/* Cast Info */}
                  <div className='flex flex-col gap-1'>
                    <span className='text-md text-neutral-10 font-semibold'>
                      {member.name}
                    </span>
                    <span className='text-md font-normal text-neutral-400'>
                      {member.character}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
