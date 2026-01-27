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
    <div className='relative w-full overflow-hidden'>
      {/* Navigation & Overlays Container (Centered, max 1440px) */}
      <div className='pointer-events-none absolute inset-0 z-10 mx-auto max-w-360'>
        {/* Side Blockers - Overlap by 1px to prevent subpixel gaps */}
        <div className='bg-base-black right-full-overlap absolute -top-px -bottom-px w-screen' />
        <div className='bg-base-black left-full-overlap absolute -top-px -bottom-px w-screen' />

        {/* Left Fade Overlay */}
        {canScrollLeft && (
          <div className='nav-lg:from-base-black nav-lg:w-107.5 from-base-black/80 absolute top-0 left-0 h-full w-22.5 bg-linear-to-r to-transparent transition-[width] duration-300' />
        )}

        {/* Right Fade Overlay */}
        {canScrollRight && (
          <div className='nav-lg:from-base-black nav-lg:w-107.5 from-base-black/80 absolute top-0 right-0 h-full w-22.5 bg-linear-to-l to-transparent transition-[width] duration-300' />
        )}

        {/* Left Navigation Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount('left')}
            className='nav-lg:left-15 top-nav-top-left pointer-events-auto absolute left-1.5 size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-neutral-800 md:size-14'
            aria-label='Scroll left'
          >
            <ChevronLeft className='text-neutral-10 mx-auto size-5 md:size-6' />
          </button>
        )}

        {/* Right Navigation Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount('right')}
            className='nav-lg:right-15 top-nav-top-right pointer-events-auto absolute right-1.5 size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-neutral-800 md:size-14'
            aria-label='Scroll right'
          >
            <ChevronRight className='text-neutral-10 mx-auto size-5 md:size-6' />
          </button>
        )}
      </div>

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
          isDragging ? 'cursor-grabbing scroll-auto!' : 'cursor-grab'
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
    </div>
  );
};
