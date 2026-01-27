import { useState, useEffect } from 'react';
import type { Movie } from '../../../types/movie';

export const useHeroCarousel = (movies: Movie[]) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!movies?.length || movies.length <= 1) return;

    const nextSlide = () => {
      setCurrentIdx((prev) => (prev + 1) % Math.min(movies.length, 5));
      setIsFading(false);
    };

    const startTransition = () => {
      setIsFading(true);
      setTimeout(nextSlide, 700);
    };

    const timer = setInterval(startTransition, 4000);

    return () => clearInterval(timer);
  }, [movies]);

  return { currentIdx, isFading };
};
