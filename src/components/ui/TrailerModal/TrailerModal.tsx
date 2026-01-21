import { type FC, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieVideos } from '../../../api/movies';
import { cn } from '../../../lib/cn';
import type { MovieVideo } from '../../../types/movie';

interface TrailerModalProps {
  movieId: number;
  movieTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * TrailerModal displays an embedded YouTube trailer in a modal overlay.
 * Fetches trailer data from TMDB API and prioritizes official trailers.
 */
export const TrailerModal: FC<Readonly<TrailerModalProps>> = ({
  movieId,
  movieTitle,
  isOpen,
  onClose,
}) => {
  const { data: videos, isLoading } = useQuery<MovieVideo[]>({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => getMovieVideos(movieId),
    enabled: isOpen && !!movieId,
  });

  // Find the best trailer (prioritize official YouTube trailers)
  const trailer =
    videos?.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official === true
    ) ??
    videos?.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ??
    videos?.find((v) => v.site === 'YouTube');

  // Close on ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-labelledby='trailer-modal-title'
    >
      {/* Modal Content */}
      <div
        className='relative w-full max-w-5xl px-4'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute -top-12 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-800/80 text-white transition-colors hover:bg-neutral-700'
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

        {/* Title (visually hidden for screen readers) */}
        <h2 id='trailer-modal-title' className='sr-only'>
          {movieTitle} - Trailer
        </h2>

        {/* Video Container */}
        <div
          className={cn(
            'aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900',
            isLoading && 'animate-pulse'
          )}
        >
          {isLoading ? (
            <div className='flex h-full items-center justify-center'>
              <div className='border-primary h-12 w-12 animate-spin rounded-full border-b-2' />
            </div>
          ) : trailer ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
              title={`${movieTitle} - ${trailer.name}`}
              className='h-full w-full'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          ) : (
            <div className='flex h-full flex-col items-center justify-center gap-2 text-neutral-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polygon points='23 7 16 12 23 17 23 7' />
                <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
                <line x1='1' y1='1' x2='23' y2='23' />
              </svg>
              <p className='text-lg'>No trailer available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
