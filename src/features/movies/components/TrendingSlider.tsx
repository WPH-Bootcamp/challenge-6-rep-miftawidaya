import { type FC, useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TrendingCard, TrendingCardSkeleton } from './TrendingCard';
import type { Movie } from '../../../types/movie';
import { cn } from '../../../lib/cn';

interface TrendingSliderProps {
  movies: Movie[];
  isLoading?: boolean;
}

/**
 * TrendingSlider component with native touch scroll and mouse drag for desktop.
 * Mobile: Uses native scroll for natural momentum and inertia.
 * Desktop: Adds mouse drag functionality for better UX.
 */
export const TrendingSlider: FC<Readonly<TrendingSliderProps>> = ({
  movies,
  isLoading,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const {
      scrollLeft: sl,
      scrollWidth,
      clientWidth,
    } = scrollContainerRef.current;

    // Use a larger threshold on mobile to prevent the narrow left arrow/overlay
    // from showing when snapped at the start (avoiding subpixel or snapping issues).
    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 30 : 10;

    setCanScrollLeft(sl > threshold);
    setCanScrollRight(sl + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const handleScroll = () => {
    updateScrollState();
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const amount = direction === 'left' ? -240 : 240;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Mouse drag handlers for desktop only
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftStart(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    // Check if mouse button is pressed (buttons property)
    if (e.buttons !== 1) return;

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const distance = Math.abs(x - startX);

    // Only start dragging after moving more than 5px
    if (distance > 5) {
      setIsDragging(true);
      e.preventDefault();
      const walk = x - startX;
      scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
    }
  };

  const handleMouseUp = () => {
    // Small delay to prevent click events immediately after drag
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  if (isLoading) {
    return (
      <div className='slider-padding-left flex gap-4 overflow-hidden md:gap-5'>
        {Array.from({ length: 6 }, (_, i) => (
          <TrendingCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className='relative'>
      <section
        ref={scrollContainerRef}
        aria-label='Trending movies carousel'
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'slider-padding scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth md:snap-none md:gap-5',
          isDragging ? 'cursor-grabbing !scroll-auto' : 'cursor-grab'
        )}
      >
        {movies.slice(0, 10).map((movie, index) => (
          <div
            key={movie.id}
            className='shrink-0 snap-start select-none md:snap-align-none'
            style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
          >
            <TrendingCard movie={movie} rank={index + 1} />
          </div>
        ))}
      </section>

      {/* Left Fade Overlay & Navigation Arrow */}
      {canScrollLeft && (
        <div className='pointer-events-none absolute top-0 left-0 z-10 flex h-66.5 w-20 items-center justify-start bg-linear-to-r from-black to-transparent md:h-80.25 md:w-107.5'>
          <button
            onClick={() => scrollByAmount('left')}
            className='pointer-events-auto ml-2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md transition-transform hover:scale-105 md:ml-6 md:size-14'
            aria-label='Scroll left'
          >
            <ChevronLeft className='text-neutral-10 size-5.5 md:size-7' />
          </button>
        </div>
      )}

      {/* Right Fade Overlay & Navigation Arrow */}
      {canScrollRight && (
        <div className='pointer-events-none absolute top-0 right-0 z-10 flex h-66.5 w-20 items-center justify-end bg-linear-to-l from-black to-transparent md:h-80.25 md:w-107.5'>
          <button
            onClick={() => scrollByAmount('right')}
            className='pointer-events-auto mr-2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md transition-transform hover:scale-105 md:mr-6 md:size-14'
            aria-label='Scroll right'
          >
            <ChevronRight className='text-neutral-10 size-5.5 md:size-7' />
          </button>
        </div>
      )}
    </div>
  );
};
