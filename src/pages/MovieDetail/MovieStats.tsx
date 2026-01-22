import type { FC } from 'react';
import {
  StarFillIcon,
  VideoIcon,
  EmojiHappyIcon,
} from '../../components/ui/Icon';

interface MovieStatsProps {
  rating: number;
  genre: string;
}

/**
 * Stats cards displaying rating, genre, and age limit.
 */
export const MovieStats: FC<Readonly<MovieStatsProps>> = ({
  rating,
  genre,
}) => (
  <div className='grid grid-cols-3 gap-3 md:gap-5'>
    {/* Rating Card */}
    <div className='flex flex-col items-center gap-1 rounded-xl border border-neutral-700 bg-black p-3 sm:gap-2 sm:rounded-2xl sm:p-5'>
      <StarFillIcon className='size-6 text-yellow-500 md:size-8' />
      <div className='flex flex-col items-center gap-0.5'>
        <span className='md:text-md text-xs font-normal text-neutral-300'>
          Rating
        </span>
        <span className='text-neutral-10 text-sm font-semibold md:text-xl'>
          {rating.toFixed(1)}/10
        </span>
      </div>
    </div>

    {/* Genre Card */}
    <div className='flex flex-col items-center gap-1 rounded-xl border border-neutral-700 bg-black p-3 sm:gap-2 sm:rounded-2xl sm:p-5'>
      <VideoIcon className='text-neutral-10 size-6 md:size-8' />
      <div className='flex flex-col items-center gap-0.5'>
        <span className='md:text-md text-xs font-normal text-neutral-300'>
          Genre
        </span>
        <span className='text-neutral-10 text-sm font-semibold md:text-xl'>
          {genre}
        </span>
      </div>
    </div>

    {/* Age Limit Card */}
    <div className='flex flex-col items-center gap-1 rounded-xl border border-neutral-700 bg-black p-3 sm:gap-2 sm:rounded-2xl sm:p-5'>
      <EmojiHappyIcon className='text-neutral-10 size-6 md:size-8' />
      <div className='flex flex-col items-center gap-0.5'>
        <span className='md:text-md text-xs font-normal text-neutral-300'>
          Age Limit
        </span>
        <span className='text-neutral-10 text-sm font-semibold md:text-xl'>
          13
        </span>
      </div>
    </div>
  </div>
);
