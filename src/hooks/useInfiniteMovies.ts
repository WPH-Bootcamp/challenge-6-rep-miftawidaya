import { useInfiniteQuery } from '@tanstack/react-query';
import { getNowPlayingMovies } from '../api/movies';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  page: number;
}

/**
 * Custom hook for infinite movie fetching.
 */
export const useInfiniteMovies = () => {
  return useInfiniteQuery<MoviesResponse>({
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
