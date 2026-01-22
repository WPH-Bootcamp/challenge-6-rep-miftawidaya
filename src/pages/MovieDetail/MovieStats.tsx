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
  <div className='flex flex-wrap gap-5'>
    {/* Rating Card */}
    <div className='flex w-full flex-col items-center gap-2 rounded-2xl border border-neutral-700 bg-black p-5 md:w-69'>
      <StarFillIcon size={32} className='text-yellow-500' />
      <div className='flex flex-col items-center gap-0.5'>
        <span className='text-md font-normal text-neutral-300'>Rating</span>
        <span className='text-neutral-10 text-xl font-semibold'>
          {rating.toFixed(1)}/10
        </span>
      </div>
    </div>

    {/* Genre Card */}
    <div className='flex w-full flex-col items-center gap-2 rounded-2xl border border-neutral-700 bg-black p-5 md:w-69'>
      <VideoIcon size={32} className='text-neutral-10' />
      <div className='flex flex-col items-center gap-0.5'>
        <span className='text-md font-normal text-neutral-300'>Genre</span>
        <span className='text-neutral-10 text-xl font-semibold'>{genre}</span>
      </div>
    </div>

    {/* Age Limit Card */}
    <div className='flex w-full flex-col items-center gap-2 rounded-2xl border border-neutral-700 bg-black p-5 md:w-69'>
      <EmojiHappyIcon size={32} className='text-neutral-10' />
      <div className='flex flex-col items-center gap-0.5'>
        <span className='text-md font-normal text-neutral-300'>Age Limit</span>
        <span className='text-neutral-10 text-xl font-semibold'>13</span>
      </div>
    </div>
  </div>
);
