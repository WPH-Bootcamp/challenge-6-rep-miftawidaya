import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { Movie } from '../types/movie';

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

/**
 * Zustand store for managing favorite movies with persistence.
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),
      isFavorite: (movieId) => get().favorites.some((m) => m.id === movieId),
    }),
    {
      name: 'movie-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
