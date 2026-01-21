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
