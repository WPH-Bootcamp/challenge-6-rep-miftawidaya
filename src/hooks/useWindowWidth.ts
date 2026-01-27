import { useState, useEffect } from 'react';

/**
 * Hook to track window width with resize listener.
 */
export const useWindowWidth = () => {
  const [width, setWidth] = useState(globalThis.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis.innerWidth);
    globalThis.addEventListener('resize', handleResize);
    return () => globalThis.removeEventListener('resize', handleResize);
  }, []);

  return width;
};
