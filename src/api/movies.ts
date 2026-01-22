import { api } from '../lib/api';
import type {
  Movie,
  MovieDetails,
  MovieCredits,
  MovieVideo,
  TMDBPaginatedResponse,
} from '../types/movie';

/**
 * Fetches popular movies from TMDB.
 */
export const getPopularMovies = async (): Promise<Movie[]> => {
  const { data } =
    await api.get<TMDBPaginatedResponse<Movie>>('/movie/popular');
  return data.results;
};

/**
 * Fetches trending movies (day) from TMDB.
 */
export const getTrendingMovies = async (): Promise<Movie[]> => {
  const { data } = await api.get<TMDBPaginatedResponse<Movie>>(
    '/trending/movie/day'
  );
  return data.results;
};

/**
 * Fetches now playing movies from TMDB.
 */
export const getNowPlayingMovies = async (
  page = 1
): Promise<TMDBPaginatedResponse<Movie>> => {
  const { data } = await api.get<TMDBPaginatedResponse<Movie>>(
    '/movie/now_playing',
    {
      params: { page },
    }
  );
  return data;
};

/**
 * Fetches movie details by ID.
 */
export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const { data } = await api.get<MovieDetails>(`/movie/${id}`);
  return data;
};

/**
 * Fetches movie credits (cast and crew) by ID.
 */
export const getMovieCredits = async (id: number): Promise<MovieCredits> => {
  const { data } = await api.get<MovieCredits>(`/movie/${id}/credits`);
  return data;
};

/**
 * Searches for movies by query with pagination.
 */
export const searchMovies = async (
  query: string,
  page = 1
): Promise<TMDBPaginatedResponse<Movie>> => {
  const { data } = await api.get<TMDBPaginatedResponse<Movie>>(
    '/search/movie',
    {
      params: { query, page },
    }
  );
  return data;
};

/**
 * Fetches movie videos (trailers, clips) by ID.
 */
export const getMovieVideos = async (id: number): Promise<MovieVideo[]> => {
  const { data } = await api.get<{ results: MovieVideo[] }>(
    `/movie/${id}/videos`
  );
  return data.results;
};
