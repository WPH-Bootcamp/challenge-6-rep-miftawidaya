import { useState, type FC } from 'react';
import { Play, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

/**
 * Page for verifying shared UI atoms against Figma Design System.
 */
export const ComponentTestPage: FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className='pb-spacing-10xl pt-24'>
      <div className='custom-container gap-spacing-9xl flex w-full flex-col'>
        {/* Typography & Brand Section */}
        <header className='gap-spacing-md flex flex-col'>
          <h1 className='text-display-lg text-primary-300 font-bold'>
            Component Test
          </h1>
          <p className='text-neutral-400'>
            Verifying Shared UI Atoms against Figma Design System
          </p>
        </header>

        <main className='gap-spacing-10xl grid grid-cols-1 md:grid-cols-2'>
          {/* Buttons Section */}
          <section className='gap-spacing-6xl flex flex-col'>
            <h2 className='text-display-xs pb-spacing-md border-b border-neutral-800'>
              Buttons
            </h2>

            <div className='gap-spacing-xl flex flex-col'>
              <div className='gap-spacing-md flex items-center'>
                <Button variant='primary' size='lg'>
                  Watch Now <Play className='fill-current' />
                </Button>
                <Button variant='primary' size='sm'>
                  Watch <Play className='fill-current' />
                </Button>
              </div>

              <div className='gap-spacing-md flex items-center'>
                <Button variant='secondary' size='lg'>
                  View Detail <Play />
                </Button>
                <Button variant='secondary' size='sm'>
                  Watch Later
                </Button>
              </div>

              <div className='gap-spacing-md flex items-center'>
                <Button
                  variant='outline'
                  size='lg'
                  className='size-14 rounded-full p-0'
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='size-14 rounded-full p-0'
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section className='gap-spacing-6xl flex flex-col'>
            <h2 className='text-display-xs pb-spacing-md border-b border-neutral-800'>
              Search Inputs
            </h2>

            <div className='gap-spacing-xl flex flex-col'>
              <Input
                size='lg'
                placeholder='Search Movie...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch('')}
              />
              <Input
                size='sm'
                placeholder='Search Small...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch('')}
              />
            </div>
          </section>

          {/* Badges Section */}
          <section className='gap-spacing-6xl flex flex-col'>
            <h2 className='text-display-xs pb-spacing-md border-b border-neutral-800'>
              Badges & Indicators
            </h2>

            <div className='gap-spacing-md flex flex-wrap'>
              <Badge variant='primary'>New Release</Badge>
              <Badge variant='default'>Action</Badge>
              <Badge variant='secondary'>Sci-Fi</Badge>
              <Badge variant='outline' className='flex items-center gap-1'>
                <Star className='size-3 fill-yellow-500 text-yellow-500' /> 8.4
              </Badge>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
