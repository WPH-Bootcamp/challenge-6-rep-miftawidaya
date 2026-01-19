import { type FC } from 'react';
import { useFavoritesStore } from '../store/favorites';
import { MovieListItem } from '../features/movies/components/MovieListItem';
import { useTitle } from '../hooks/useTitle';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

/**
 * FavoritesPage displaying movies saved by the user.
 * Synced with Figma list layout.
 */
export const FavoritesPage: FC = () => {
  useTitle('My Favorites');
  const { favorites } = useFavoritesStore();

  return (
    <div className='bg-background min-h-screen pt-16 pb-20 md:pt-22.5'>
      <div className='custom-container pt-6 md:pt-16'>
        <header className='mb-8 md:mb-12'>
          <h1 className='text-display-xs md:text-display-lg font-bold text-white'>
            Favorites
          </h1>
        </header>

        {favorites.length > 0 ? (
          <div className='flex flex-col gap-8 md:gap-12'>
            {favorites.map((movie) => (
              <div key={movie.id} className='flex flex-col gap-8 md:gap-12'>
                <MovieListItem movie={movie} />
                <div className='h-px w-full bg-neutral-800/60' />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center pt-24 text-center md:pt-40'>
            <p className='mb-8 text-lg text-neutral-500'>
              You haven't added any favorites yet.
            </p>
            <Link to='/'>
              <Button variant='primary' className='rounded-full'>
                Discover Movies
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
