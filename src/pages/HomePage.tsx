import { type FC, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTrendingMovies } from '../api/movies';
import { useTitle } from '../hooks/useTitle';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { HeroSection } from '../features/movies/components/HeroSection';
import { TrendingSlider } from '../features/movies/components/TrendingSlider';
import {
  MovieCard,
  MovieCardSkeleton,
} from '../features/movies/components/MovieCard';
import ErrorFallback from '../components/ui/ErrorFallback';
import { LoadMoreOverlay } from '../features/movies/components/LoadMoreOverlay';
import type { Movie } from '../types/movie';
import { cn } from '../lib/cn';

/**
 * HomePage displaying hero slideshow, trending slider, and infinite new release grid.
 */
export const HomePage: FC = () => {
  useTitle('Home');
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const width = useWindowWidth();
  const [isInfiniteEnabled, setIsInfiniteEnabled] = useState(false);

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
    if (!hasNextPage || isFetchingNextPage || !isInfiniteEnabled) return;

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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isInfiniteEnabled]);

  const allMovies = infiniteData?.pages.flatMap((page) => page.results) || [];

  const initialLimit = useMemo(() => {
    if (width < 640) return 10; // Mobile: 2 cols * 5 rows
    if (width < 1024) return 12; // SM/MD: 3/4 cols * 4/3 rows
    return 15; // LG+: 5 cols * 3 rows
  }, [width]);

  const displayedMovies = isInfiniteEnabled
    ? allMovies
    : allMovies.slice(0, initialLimit);

  const handleLoadMore = () => {
    setIsInfiniteEnabled(true);
  };

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
    <div className='flex flex-col'>
      <HeroSection
        movies={trendingMovies || []}
        isLoading={isLoadingTrending}
      />

      {/* Trending Section */}
      <section className='bg-base-black flex w-full flex-col gap-6 pb-10 md:z-10 md:-mt-11.5 md:gap-10 md:pb-20'>
        <h2 className='slider-padding-left text-display-xs text-neutral-10 md:text-display-lg font-bold'>
          Trending Now
        </h2>
        <TrendingSlider
          movies={trendingMovies || []}
          isLoading={isLoadingTrending}
        />
      </section>

      {/* New Release Section */}
      <section
        className={cn(
          'custom-container flex w-full flex-col md:z-10',
          isInfiniteEnabled ? 'pb-20' : 'pb-6 md:pb-0'
        )}
      >
        <h2 className='text-display-xs text-neutral-10 md:text-display-lg pb-6 font-bold md:pb-10'>
          New Release
        </h2>

        <div className='relative pb-10 md:pb-22.5'>
          <div className='grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 md:gap-y-10 lg:grid-cols-5'>
            {isLoadingNowPlaying
              ? Array.from({ length: 10 }, (_, i) => (
                  <MovieCardSkeleton key={`skeleton-${i}`} />
                ))
              : displayedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}

            {isInfiniteEnabled &&
              isFetchingNextPage &&
              Array.from({ length: 5 }, (_, i) => (
                <MovieCardSkeleton key={`loading-${i}`} />
              ))}
          </div>

          {!isInfiniteEnabled && !isLoadingNowPlaying && (
            <LoadMoreOverlay onLoadMore={handleLoadMore} />
          )}
        </div>

        {/* sentinel for infinite scroll */}
        <div
          ref={loadMoreRef}
          className={cn('w-full', isInfiniteEnabled ? 'h-10' : 'h-0')}
        />
      </section>
    </div>
  );
};
