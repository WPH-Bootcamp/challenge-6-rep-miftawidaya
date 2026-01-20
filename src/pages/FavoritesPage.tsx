import { type FC } from 'react';
import { useFavoritesStore } from '../store/favorites';
import { MovieListItem } from '../features/movies/components/MovieListItem';
import { useTitle } from '../hooks/useTitle';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

/**
 * FavoritesPage displaying movies saved by the user.
 */
export const FavoritesPage: FC = () => {
  useTitle('Favorites');
  const { favorites } = useFavoritesStore();

  return (
    <div className='custom-container flex min-h-screen flex-col gap-8 pt-24 pb-20 md:pt-32'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-display-sm md:text-display-md font-bold text-white'>
          Favorites
        </h1>
      </header>

      {favorites.length > 0 ? (
        <div className='flex flex-col gap-8'>
          {favorites.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center pt-24 text-center md:pt-40'>
          <p className='mb-8 text-lg text-neutral-500'>
            You don't have a favorite movie yet
          </p>
          <Link to='/'>
            <Button variant='primary' className='rounded-full'>
              Explore Movie
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
