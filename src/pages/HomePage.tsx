import { type FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTrendingMovies } from '../api/movies';
import { useTitle } from '../hooks/useTitle';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import { HeroSection } from '../features/movies/components/HeroSection';
import { TrendingSlider } from '../features/movies/components/TrendingSlider';
import {
  MovieCard,
  MovieCardSkeleton,
} from '../features/movies/components/MovieCard';
import ErrorFallback from '../components/ui/ErrorFallback';
import type { Movie } from '../types/movie';

/**
 * HomePage displaying hero slideshow, trending slider, and infinite new release grid.
 */
export const HomePage: FC = () => {
  useTitle('Home');
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data: trendingMovies,
    isLoading: isLoadingTrending,
    isError: isErrorTrending,
    error: errorTrending,
  } = useQuery<Movie[]>({
    queryKey: ['trending'],
    queryFn: getTrendingMovies,
  });

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingNowPlaying,
    isError: isErrorNowPlaying,
    error: errorNowPlaying,
  } = useInfiniteMovies();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allMovies = infiniteData?.pages.flatMap((page) => page.results) || [];

  // Error State
  if (isErrorTrending || isErrorNowPlaying) {
    const error = errorTrending || errorNowPlaying;
    return (
      <ErrorFallback
        error={
          error instanceof Error ? error : new Error('Failed to load movies')
        }
        onReset={() => navigate('/')}
        onRefresh={() => globalThis.location.reload()}
      />
    );
  }

  return (
    <div className='flex flex-col pb-20'>
      <HeroSection
        movies={trendingMovies || []}
        isLoading={isLoadingTrending}
      />

      {/* Trending Section */}
      <section className='z-10 flex flex-col gap-6 pb-10 md:-mt-10 md:gap-10 md:pb-20'>
        <h2 className='slider-padding-left text-display-xs text-neutral-10 md:text-display-lg font-bold'>
          Trending Now
        </h2>
        <TrendingSlider
          movies={trendingMovies || []}
          isLoading={isLoadingTrending}
        />
      </section>

      {/* New Release Section */}
      <section className='custom-container z-10 flex w-full flex-col gap-10 pb-20'>
        <h2 className='text-display-sm text-neutral-10 md:text-display-lg font-bold'>
          New Release
        </h2>

        <div className='grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {isLoadingNowPlaying
            ? Array.from({ length: 10 }, (_, i) => (
                <MovieCardSkeleton key={`skeleton-${i}`} />
              ))
            : allMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}

          {isFetchingNextPage &&
            Array.from({ length: 5 }, (_, i) => (
              <MovieCardSkeleton key={`loading-${i}`} />
            ))}
        </div>

        {/* sentinel for infinite scroll */}
        <div ref={loadMoreRef} className='h-10 w-full' />
      </section>
    </div>
  );
};
