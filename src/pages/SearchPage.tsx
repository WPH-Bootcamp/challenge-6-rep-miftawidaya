import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/movies';
import {
  MovieListItem,
  MovieListItemSkeleton,
} from '../features/movies/components/MovieListItem';
import type { Movie } from '../types/movie';
import { useTitle } from '../hooks/useTitle';
import { Button } from '../components/ui/Button';

/**
 * SearchPage displaying results for a query with infinite scroll support.
 */
export const SearchPage: FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  useTitle(query ? `Search: ${query}` : 'Search');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['search', query],
      queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam as number),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      enabled: !!query,
    });

  const movies = (data?.pages.flatMap((page) => page.results) as Movie[]) || [];

  // Initial State: No query (blank screen)
  if (!query) {
    return <div className='bg-background min-h-screen pt-16 md:pt-22.5' />;
  }

  return (
    <div className='custom-container flex min-h-screen flex-col gap-8 pt-24 pb-20 md:pt-32'>
      {/* Loading State */}
      {isLoading && (
        <div className='flex flex-col gap-8'>
          {Array.from({ length: 5 }, (_, i) => (
            <MovieListItemSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* Found State */}
      {!isLoading && movies.length > 0 && (
        <div className='flex flex-col gap-8'>
          {movies.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}

          {hasNextPage && (
            <div className='flex justify-center pt-8'>
              <Button
                variant='outline'
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                size='lg'
                className='rounded-full'
              >
                {isFetchingNextPage ? 'Loading more...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Not Found State */}
      {!isLoading && movies.length === 0 && (
        <div className='flex flex-col items-center justify-center pt-24 text-center md:pt-40'>
          <img
            src='/images/clapperboard.svg'
            alt='Not Found'
            className='mb-6 size-40 opacity-80'
          />
          <h2 className='mb-2 text-xl font-bold text-white md:text-2xl'>
            Data Not Found
          </h2>
          <p className='text-sm text-neutral-500 md:text-base'>
            Try other keywords
          </p>
        </div>
      )}

      <div ref={null} className='h-10' />
    </div>
  );
};
