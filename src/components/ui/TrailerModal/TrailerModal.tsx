import { type FC, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieVideos } from '../../../api/movies';
import { TrailerContent } from './TrailerContent';
import type { MovieVideo } from '../../../types/movie';

interface TrailerModalProps {
  movieId: number;
  movieTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * TrailerModal Component
 *
 * Displays trailer in a modal overlay with guaranteed UI foundation.
 * Container renders with proper dimensions regardless of API state.
 */
export const TrailerModal: FC<Readonly<TrailerModalProps>> = ({
  movieId,
  movieTitle,
  isOpen,
  onClose,
}) => {
  // Data fetching
  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery<MovieVideo[]>({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => getMovieVideos(movieId),
    enabled: isOpen && !!movieId,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  // Find best trailer (prioritize official YouTube trailers)
  const trailer =
    videos?.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
    ) ??
    videos?.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ??
    videos?.find((v) => v.site === 'YouTube') ??
    null;

  // Keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Early return if closed
  if (!isOpen) return null;

  return (
    // Layer 1: Overlay
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-labelledby='trailer-modal-title'
    >
      {/* Close button - fixed at top right corner of modal */}
      <button
        onClick={onClose}
        className='absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 md:top-6 md:right-6'
        aria-label='Close trailer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      </button>

      {/* Layer 2: Modal container */}
      <div
        className='relative w-full max-w-302'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screen reader title */}
        <h2 id='trailer-modal-title' className='sr-only'>
          {movieTitle} - Trailer
        </h2>

        {/* Layer 3: Video container - guaranteed dimensions */}
        <div className='min-h-video relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900'>
          {/* Content - renders based on state */}
          <TrailerContent
            isLoading={isLoading}
            isError={isError}
            trailer={trailer}
            movieTitle={movieTitle}
          />
        </div>
      </div>
    </div>
  );
};
