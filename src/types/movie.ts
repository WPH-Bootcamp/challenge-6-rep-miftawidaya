/**
 * Core Movie interface for TMDB movie objects.
 */
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}

/**
 * Extended movie details from TMDB `/movie/{id}` endpoint.
 */
export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
}

/**
 * Generic paginated response from TMDB API.
 */
export interface TMDBPaginatedResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

/**
 * Cast member from TMDB `/movie/{id}/credits` endpoint.
 */
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

/**
 * Movie credits response from TMDB API.
 */
export interface MovieCredits {
  cast: CastMember[];
}

/**
 * Movie video object from TMDB `/movie/{id}/videos` endpoint.
 */
export interface MovieVideo {
  id: string;
  key: string; // YouTube video ID
  name: string;
  site: string; // "YouTube", "Vimeo", etc.
  type: string; // "Trailer", "Teaser", "Clip", etc.
  official: boolean;
  published_at: string;
}

/**
 * Error response from TMDB API.
 */
export interface TMDBErrorResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}
