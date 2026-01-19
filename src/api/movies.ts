import { api } from '../lib/api';

/**
 * Fetches popular movies from TMDB.
 */
export const getPopularMovies = async () => {
  const { data } = await api.get('/movie/popular');
  return data.results;
};

/**
 * Fetches trending movies (day) from TMDB.
 */
export const getTrendingMovies = async () => {
  const { data } = await api.get('/trending/movie/day');
  return data.results;
};

/**
 * Fetches now playing movies from TMDB.
 */
export const getNowPlayingMovies = async (page = 1) => {
  const { data } = await api.get('/movie/now_playing', {
    params: { page },
  });
  return data;
};

/**
 * Fetches movie details by ID.
 */
export const getMovieDetails = async (id: number) => {
  const { data } = await api.get(`/movie/${id}`);
  return data;
};
