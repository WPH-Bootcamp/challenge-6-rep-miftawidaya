import { create } from 'zustand';

interface TrailerState {
  isOpen: boolean;
  movieId: number | null;
  movieTitle: string;
  openTrailer: (movieId: number, movieTitle: string) => void;
  closeTrailer: () => void;
}

/**
 * Global store for managing the trailer modal state.
 */
export const useTrailerStore = create<TrailerState>((set) => ({
  isOpen: false,
  movieId: null,
  movieTitle: '',
  openTrailer: (movieId, movieTitle) =>
    set({
      isOpen: true,
      movieId,
      movieTitle,
    }),
  closeTrailer: () =>
    set({
      isOpen: false,
      movieId: null,
      movieTitle: '',
    }),
}));
