import { type FC, useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TrendingCard, TrendingCardSkeleton } from './TrendingCard';
import type { Movie } from '../../../types/movie';

interface TrendingSliderProps {
  movies: Movie[];
  isLoading?: boolean;
}

/**
 * TrendingSlider component with draggable scroll, navigation arrows.
 * Responsive: Mobile shows 2 columns with gap-4, Desktop shows horizontal scroll with gap-5.
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
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const {
      scrollLeft: sl,
      scrollWidth,
      clientWidth,
    } = scrollContainerRef.current;
    setCanScrollLeft(sl > 10);
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

  // Drag handlers - only activate drag after movement threshold
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const distance = Math.abs(x - startX);

    // Only start dragging after moving more than 5px
    if (distance > 5) {
      setIsDragging(true);
      e.preventDefault();
      const walk = (x - startX) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (isLoading) {
    return (
      <div
        className='flex gap-4 overflow-hidden px-4 md:gap-5 md:px-0'
        style={{
          paddingLeft: 'max(calc((100vw - 1208px) / 2 + 24px), 16px)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <TrendingCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className='relative'>
      {/* Scrollable List */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`scrollbar-hide flex gap-4 overflow-x-auto md:gap-5 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          paddingLeft: 'max(calc((100vw - 1208px) / 2 + 24px), 16px)',
          paddingRight: 'max(calc((100vw - 1208px) / 2 + 24px), 16px)',
        }}
      >
        {movies.slice(0, 10).map((movie, index) => (
          <div
            key={movie.id}
            className='shrink-0 select-none'
            style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
          >
            <TrendingCard movie={movie} rank={index + 1} />
          </div>
        ))}
      </div>

      {/* Left Fade Overlay & Navigation Arrow */}
      {canScrollLeft && (
        <div className='pointer-events-none absolute top-0 left-0 z-10 flex h-66.5 w-30.75 items-center justify-start bg-gradient-to-r from-black to-transparent md:h-80.25 md:w-107.5'>
          <button
            onClick={() => scrollByAmount('left')}
            className='pointer-events-auto ml-2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md transition-transform hover:scale-105 md:ml-4 md:size-14'
            aria-label='Scroll left'
          >
            <ChevronLeft className='text-neutral-10 size-5.5 md:size-7' />
          </button>
        </div>
      )}

      {/* Right Fade Overlay & Navigation Arrow */}
      {canScrollRight && (
        <div className='pointer-events-none absolute top-0 right-0 z-10 flex h-66.5 w-30.75 items-center justify-end bg-gradient-to-l from-black to-transparent md:h-80.25 md:w-107.5'>
          <button
            onClick={() => scrollByAmount('right')}
            className='pointer-events-auto mr-2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md transition-transform hover:scale-105 md:mr-4 md:size-14'
            aria-label='Scroll right'
          >
            <ChevronRight className='text-neutral-10 size-5.5 md:size-7' />
          </button>
        </div>
      )}
    </div>
  );
};
