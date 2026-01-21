import type { FC } from 'react';
import type { MovieVideo } from '../../../types/movie';

interface TrailerContentProps {
  isLoading: boolean;
  isError: boolean;
  trailer: MovieVideo | null;
  movieTitle: string;
}

/**
 * Renders trailer content based on current state.
 * Eliminates nested ternary by using early returns.
 */
export const TrailerContent: FC<Readonly<TrailerContentProps>> = ({
  isLoading,
  isError,
  trailer,
  movieTitle,
}) => {
  // Loading State
  if (isLoading) {
    return (
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='border-primary-300 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent' />
          <p className='text-sm text-neutral-400'>Loading trailer...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4 px-8 text-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-red-500'
            >
              <circle cx='12' cy='12' r='10' />
              <line x1='12' y1='8' x2='12' y2='12' />
              <line x1='12' y1='16' x2='12.01' y2='16' />
            </svg>
          </div>
          <div>
            <p className='text-lg font-semibold text-white'>Failed to Load</p>
            <p className='mt-1 text-sm text-neutral-400'>
              Unable to fetch trailer. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success State - Has Trailer
  if (trailer) {
    // YouTube embed parameters:
    // autoplay=1 - Start playing automatically
    // rel=0 - Don't show related videos from other channels
    // modestbranding=1 - Minimal YouTube branding
    // iv_load_policy=3 - Hide video annotations
    // disablekb=0 - Allow keyboard controls
    const embedParams = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      iv_load_policy: '3',
    });

    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${trailer.key}?${embedParams.toString()}`}
        title={`${movieTitle} - ${trailer.name}`}
        className='absolute inset-0 h-full w-full'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    );
  }

  // Empty State - No Trailer
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4 px-8 text-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 p-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-neutral-400'
          >
            <polygon points='23 7 16 12 23 17 23 7' />
            <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
            <line x1='1' y1='1' x2='23' y2='23' />
          </svg>
        </div>
        <div>
          <p className='text-md font-semibold text-white md:text-lg'>
            No Trailer Available
          </p>
          <p className='mt-1 hidden text-sm text-neutral-400 md:block'>
            Sorry, we couldn't find a trailer for "{movieTitle}"
          </p>
        </div>
      </div>
    </div>
  );
};
