import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

/**
 * Error fallback component for MovieDetailPage when movie is not found.
 */
export const MovieDetailError: FC = () => (
  <div className='custom-container pt-24 pb-20 text-center'>
    <h1 className='text-display-sm text-red-500'>Movie not found</h1>
    <Link to='/'>
      <Button variant='outline' className='mt-4'>
        Back to Home
      </Button>
    </Link>
  </div>
);
