import { type FC } from 'react';
import { Button } from '../../../components/ui/Button';

interface LoadMoreOverlayProps {
  onLoadMore: () => void;
}

/**
 * LoadMoreOverlay component provides a gradient fade and a "Load More" button.
 */
export const LoadMoreOverlay: FC<Readonly<LoadMoreOverlayProps>> = ({
  onLoadMore,
}) => {
  return (
    <div className='absolute bottom-0 left-1/2 z-30 flex w-screen -translate-x-1/2 flex-col justify-end'>
      <div className='from-base-black to-base-black/60 h-overlay-height relative flex w-full flex-col items-center justify-end bg-linear-to-t from-8% pb-22.5 md:justify-center md:from-20% md:pb-0'>
        <Button
          variant='secondary'
          size='lg'
          onClick={onLoadMore}
          className='md:text-md h-11 min-w-50 text-sm font-semibold md:h-13 md:min-w-57.5'
        >
          Load More
        </Button>
      </div>
    </div>
  );
};
