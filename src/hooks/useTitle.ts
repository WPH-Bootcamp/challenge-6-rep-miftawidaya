import { useEffect } from 'react';

/**
 * Hook to set the page title.
 * @param title - The title to set.
 */
export const useTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    const APP_NAME = 'Movie Explorer';

    if (title.toLowerCase() === 'home' || !title) {
      document.title = APP_NAME;
    } else {
      document.title = `${title} | ${APP_NAME}`;
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
