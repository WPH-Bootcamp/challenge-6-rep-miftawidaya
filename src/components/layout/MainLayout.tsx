import type { FC } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { TrailerModal } from '../ui/TrailerModal';
import { useTrailerStore } from '../../store/trailer';

/**
 * MainLayout component that provides the common page structure.
 */
export const MainLayout: FC = () => {
  return (
    <div className='bg-background flex min-h-screen flex-col text-white'>
      <Navbar />
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className='flex min-h-svh items-center justify-center'>
              <div className='border-primary h-12 w-12 animate-spin rounded-full border-b-2' />
            </div>
          }
        >
          <main className='flex-1'>
            <Outlet />
          </main>
        </Suspense>
      </ErrorBoundary>
      <Footer />
      <GlobalTrailer />
    </div>
  );
};

/**
 * Helper component to render the trailer modal globally based on store state.
 */
const GlobalTrailer: FC = () => {
  const { isOpen, movieId, movieTitle, closeTrailer } = useTrailerStore();

  if (!isOpen || movieId === null) return null;

  return (
    <TrailerModal
      movieId={movieId}
      movieTitle={movieTitle}
      isOpen={isOpen}
      onClose={closeTrailer}
    />
  );
};
