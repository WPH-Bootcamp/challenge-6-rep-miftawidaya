import type { FC } from 'react';

/**
 * Skeleton loader for MovieDetailPage while data is being fetched.
 */
export const MovieDetailSkeleton: FC = () => (
  <div className='relative min-h-screen pb-37.5'>
    {/* Backdrop Skeleton */}
    <div className='absolute inset-x-0 top-0 h-103 w-full bg-neutral-900'>
      <div className='absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent' />
    </div>

    {/* Main Content Skeleton */}
    <div className='custom-container relative z-10 flex animate-pulse flex-col gap-12 pt-103'>
      {/* Top Section: Poster + Info Row */}
      <div className='flex flex-col gap-8 md:flex-row md:gap-8'>
        {/* Poster Skeleton */}
        <div className='shrink-0'>
          <div className='h-96 w-65 rounded-xl bg-neutral-800' />
        </div>

        {/* Movie Info Skeleton */}
        <div className='flex flex-1 flex-col gap-6'>
          {/* Title + Date + Buttons Block */}
          <div className='flex flex-col gap-4'>
            {/* Title Skeleton */}
            <div className='h-10 w-3/4 rounded-lg bg-neutral-800 md:h-14' />
            {/* Date Skeleton */}
            <div className='h-6 w-48 rounded bg-neutral-800' />
            {/* Buttons Skeleton */}
            <div className='flex items-center gap-4'>
              <div className='h-14 w-44 rounded-full bg-neutral-800' />
              <div className='size-11 rounded-full bg-neutral-800 md:size-13' />
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className='flex flex-wrap gap-5'>
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className='flex h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-700 bg-black p-5 md:w-69'
              >
                <div className='size-8 rounded-full bg-neutral-800' />
                <div className='h-4 w-16 rounded bg-neutral-800' />
                <div className='h-6 w-20 rounded bg-neutral-800' />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Section Skeleton */}
      <div className='flex flex-col gap-2'>
        <div className='h-8 w-40 rounded-lg bg-neutral-800' />
        <div className='flex flex-col gap-2'>
          <div className='h-5 w-full rounded bg-neutral-800' />
          <div className='h-5 w-full rounded bg-neutral-800' />
          <div className='h-5 w-3/4 rounded bg-neutral-800' />
        </div>
      </div>

      {/* Cast Section Skeleton */}
      <div className='flex flex-col gap-6'>
        <div className='h-8 w-48 rounded-lg bg-neutral-800' />
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className='flex items-center gap-4'>
              <div className='h-26 w-17.25 shrink-0 rounded-lg bg-neutral-800' />
              <div className='flex flex-col gap-2'>
                <div className='h-5 w-32 rounded bg-neutral-800' />
                <div className='h-4 w-24 rounded bg-neutral-800' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
