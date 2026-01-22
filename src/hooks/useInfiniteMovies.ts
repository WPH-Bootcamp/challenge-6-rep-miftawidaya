import { useInfiniteQuery } from '@tanstack/react-query';
import { getNowPlayingMovies } from '../api/movies';
import type { Movie, TMDBPaginatedResponse } from '../types/movie';

/**
 * Custom hook for infinite movie fetching.
 */
export const useInfiniteMovies = () => {
  return useInfiniteQuery<TMDBPaginatedResponse<Movie>>({
    queryKey: ['movies', 'infinite'],
    queryFn: ({ pageParam = 1 }) => getNowPlayingMovies(pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
