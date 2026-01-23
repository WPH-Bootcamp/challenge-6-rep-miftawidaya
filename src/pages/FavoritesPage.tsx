import { type FC } from 'react';
import { useFavoritesStore } from '../store/favorites';
import { MovieListItem } from '../features/movies/components/MovieListItem';
import { useTitle } from '../hooks/useTitle';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useTrailerStore } from '../store/trailer';

/**
 * FavoritesPage displaying movies saved by the user.
 */
export const FavoritesPage: FC = () => {
  useTitle('Favorites');
  const { favorites } = useFavoritesStore();
  const openTrailer = useTrailerStore((state) => state.openTrailer);

  return (
    <div className='custom-container flex min-h-screen flex-col gap-8 pt-22 pb-20 md:gap-12 md:pt-38.5'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-display-xs md:text-display-lg font-bold text-white'>
          Favorites
        </h1>
      </header>

      {favorites.length > 0 ? (
        <div className='flex flex-col gap-8 md:gap-12'>
          {favorites.map((movie) => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              onWatchTrailer={() => openTrailer(movie.id, movie.title)}
            />
          ))}
        </div>
      ) : (
        <div className='mx-auto flex w-full max-w-75 flex-col items-center justify-center pt-10 text-center md:pt-20'>
          <img
            src='/images/clapperboard.svg'
            alt='Data Empty'
            className='mb-6 size-40 opacity-80 mix-blend-luminosity'
          />
          <h2 className='text-md mb-2 font-bold text-white'>Data Empty</h2>
          <p className='mb-6 text-sm text-neutral-500'>
            You don't have a favorite movie yet
          </p>
          <Link to='/' className='w-full'>
            <Button
              variant='primary'
              size='lg'
              className='md:text-md w-full rounded-full text-sm'
            >
              Explore Movie
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
