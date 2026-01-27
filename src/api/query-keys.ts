/**
 * Query Key Factory
 * Centralized query keys for TanStack Query to ensure consistency and avoid typos.
 */
export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  trending: () => [...movieKeys.lists(), 'trending'] as const,
  infinite: () => [...movieKeys.lists(), 'infinite'] as const,
  search: (query: string) => [...movieKeys.lists(), 'search', query] as const,
  details: (id: number | string) =>
    [...movieKeys.all, 'detail', id.toString()] as const,
  credits: (id: number | string) =>
    [...movieKeys.details(id), 'credits'] as const,
  videos: (id: number | string) =>
    [...movieKeys.details(id), 'videos'] as const,
};
