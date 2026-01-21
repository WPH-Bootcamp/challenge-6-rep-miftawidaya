import { lazy } from 'react';
import { type RouteObject, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';

const HomePage = lazy(() =>
  import('../pages/HomePage').then((module) => ({ default: module.HomePage }))
);
const SearchPage = lazy(() =>
  import('../pages/SearchPage').then((module) => ({
    default: module.SearchPage,
  }))
);
const FavoritesPage = lazy(() =>
  import('../pages/FavoritesPage').then((module) => ({
    default: module.FavoritesPage,
  }))
);
const MovieDetailPage = lazy(() =>
  import('../pages/MovieDetailPage').then((module) => ({
    default: module.MovieDetailPage,
  }))
);
const ComponentTestPage = lazy(() =>
  import('../pages/ComponentTestPage').then((module) => ({
    default: module.ComponentTestPage,
  }))
);

export const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: '/test',
        element: <ComponentTestPage />,
      },
      {
        path: '*',
        element: <Navigate to='/' replace />,
      },
    ],
  },
];
