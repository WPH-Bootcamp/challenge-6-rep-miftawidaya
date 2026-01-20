import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { MainLayout } from './components/layout/MainLayout';
import { ScrollToTop } from './components/ScrollToTop';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const SearchPage = lazy(() =>
  import('./pages/SearchPage').then((m) => ({ default: m.SearchPage }))
);
const FavoritesPage = lazy(() =>
  import('./pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage }))
);
const MovieDetailPage = lazy(() =>
  import('./pages/MovieDetailPage').then((m) => ({
    default: m.MovieDetailPage,
  }))
);
const ComponentTestPage = lazy(() =>
  import('./pages/ComponentTestPage').then((m) => ({
    default: m.ComponentTestPage,
  }))
);

/**
 * Main application router entry point.
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position='top-center'
        toastOptions={{
          className:
            'glassmorphism rounded-full text-white border-neutral-800 px-6 py-3',
          duration: 3000,
        }}
      />
      <MainLayout>
        <Suspense
          fallback={
            <div className='bg-background flex h-screen items-center justify-center'>
              <div className='border-primary-300 size-12 animate-spin rounded-full border-4 border-t-transparent' />
            </div>
          }
        >
          <Routes>
            {/* Main Routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='/movie/:id' element={<MovieDetailPage />} />
            <Route path='/test' element={<ComponentTestPage />} />

            {/* Catch-all */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
