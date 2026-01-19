import { type FC, useEffect, useRef } from 'react';
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
import type { Movie } from '../types/movie';

/**
 * HomePage displaying hero slideshow, trending slider, and infinite new release grid.
 */
export const HomePage: FC = () => {
  useTitle('Home');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data: trendingMovies, isLoading: isLoadingTrending } = useQuery<
    Movie[]
  >({
    queryKey: ['trending'],
    queryFn: getTrendingMovies,
  });

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingNowPlaying,
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

  return (
    <div className='flex flex-col gap-15 pb-20'>
      <HeroSection
        movies={trendingMovies || []}
        isLoading={isLoadingTrending}
      />

      <section className='custom-container relative z-10 -mt-12 flex flex-col gap-6 md:gap-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-display-xs md:text-display-sm font-bold'>
            Trending Movies
          </h1>
        </div>
        <TrendingSlider
          movies={trendingMovies || []}
          isLoading={isLoadingTrending}
        />
      </section>

      <section className='custom-container flex flex-col gap-6 md:gap-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-display-xs md:text-display-sm font-bold'>
            New Releases
          </h1>
        </div>

        <div className='grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:grid-cols-5'>
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
