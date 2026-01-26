import type { FC } from 'react';

/**
 * Skeleton loader for MovieDetailPage while data is being fetched.
 * Matches the responsive layout of the actual MovieDetailPage.
 */
export const MovieDetailSkeleton: FC = () => (
  <div className='relative min-h-screen pb-37.5'>
    {/* Backdrop Skeleton */}
    <div className='absolute inset-x-0 top-0 h-103 w-full bg-neutral-900'>
      <div className='from-base-black via-base-black/60 absolute inset-0 bg-linear-to-t to-transparent' />
    </div>

    {/* Main Content Skeleton */}
    <div className='custom-container relative z-10 flex animate-pulse flex-col gap-8 pt-103 sm:gap-12'>
      {/* Top Section: CSS Grid for responsive layout - matches index.tsx */}
      <div className='grid grid-cols-[auto_1fr] gap-4 sm:gap-x-8'>
        {/* Poster Skeleton - matches MoviePoster.tsx responsive sizing */}
        <div className='row-span-1 shrink-0'>
          <div className='h-48 w-32 rounded-lg bg-neutral-800 sm:h-96 sm:w-65 sm:rounded-xl' />
        </div>

        {/* Info Wrapper: 'contents' on mobile to keep grid behavior, 'flex' on desktop */}
        <div className='contents sm:flex sm:flex-col sm:gap-4 md:gap-6'>
          {/* Title + Date Block */}
          <div className='flex flex-col justify-start gap-1 self-start sm:gap-4'>
            {/* Title Skeleton */}
            <div className='h-6 w-40 rounded-lg bg-neutral-800 sm:h-10 sm:w-64 md:h-14 md:w-80' />
            {/* Date Skeleton */}
            <div className='flex items-center gap-2'>
              <div className='size-4 rounded bg-neutral-800 md:size-6' />
              <div className='h-4 w-32 rounded bg-neutral-800 md:h-5 md:w-40' />
            </div>
          </div>

          {/* Action Buttons - full width on mobile */}
          <div className='col-span-2 flex items-center gap-3 self-start sm:col-span-1 sm:gap-4'>
            <div className='h-11 flex-1 rounded-full bg-neutral-800 sm:h-13 sm:w-44 sm:flex-none' />
            <div className='size-11 rounded-full bg-neutral-800 md:size-13' />
          </div>

          {/* Stats Cards Skeleton - matches MovieStats.tsx grid layout */}
          <div className='col-span-2 sm:col-span-1'>
            <div className='grid grid-cols-3 gap-3 md:gap-5'>
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className='bg-base-black flex flex-col items-center gap-1 rounded-xl border border-neutral-700 p-3 sm:gap-2 sm:rounded-2xl sm:p-5'
                >
                  <div className='size-6 rounded-full bg-neutral-800 md:size-8' />
                  <div className='flex flex-col items-center gap-0.5'>
                    <div className='h-3 w-10 rounded bg-neutral-800 md:h-4 md:w-12' />
                    <div className='h-4 w-8 rounded bg-neutral-800 md:h-5 md:w-14' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section Skeleton */}
      <div className='flex flex-col gap-2'>
        <div className='h-6 w-24 rounded-lg bg-neutral-800 md:h-8 md:w-40' />
        <div className='flex flex-col gap-2'>
          <div className='h-4 w-full rounded bg-neutral-800 md:h-5' />
          <div className='h-4 w-full rounded bg-neutral-800 md:h-5' />
          <div className='h-4 w-3/4 rounded bg-neutral-800 md:h-5' />
        </div>
      </div>

      {/* Cast Section Skeleton */}
      <div className='flex flex-col gap-6'>
        <div className='h-6 w-32 rounded-lg bg-neutral-800 md:h-8 md:w-48' />
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
