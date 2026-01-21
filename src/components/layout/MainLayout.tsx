import type { FC } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from '../ui/Toaster';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

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
            <div className='flex h-[50vh] items-center justify-center'>
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
      <Toaster />
    </div>
  );
};
