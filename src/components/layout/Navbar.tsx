import { type FC } from 'react';
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { ArrowLeftIcon, MenuIcon } from '../ui/Icon';
import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

import logo from '../../assets/images/logo.svg';

/**
 * Navbar component with logo, navigation links, and search functionality.
 */
export const Navbar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [search, setSearch] = useState(query);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(
    location.pathname === '/search'
  );

  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Sync state with URL query parameter
  useEffect(() => {
    setSearch(query);
  }, [query]);

  // Handle mobile search state based on route
  useEffect(() => {
    setIsMobileSearchActive(location.pathname === '/search');
  }, [location.pathname]);

  // Scroll handler for background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Focus mobile input when active
  useEffect(() => {
    if (isMobileSearchActive) {
      mobileInputRef.current?.focus();
    }
  }, [isMobileSearchActive]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    const trimmed = val.trim();
    // Incremental search: trigger navigation on 1+ characters
    if (trimmed.length > 0) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`, { replace: true });
    } else if (trimmed.length === 0 && location.pathname === '/search') {
      // Clear query while staying on search page
      navigate('/search', { replace: true });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleClear = () => {
    setSearch('');
    if (location.pathname === '/search') {
      navigate('/search', { replace: true });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Favorites', path: '/favorites' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 z-50 flex h-16 w-full items-center py-3 transition-all duration-300 md:h-22.5 md:py-4',
          isScrolled ? 'bg-neutral-950/60 backdrop-blur-lg' : 'bg-transparent'
        )}
      >
        <div className='custom-container flex w-full items-center justify-between'>
          {/* Desktop Navbar - Always visible on md+ screens */}
          {/* Mobile Navbar - Hidden when search is active */}
          <div
            className={cn(
              'flex w-full items-center justify-between',
              isMobileSearchActive ? 'hidden md:flex' : 'flex'
            )}
          >
            {/* Left: Logo & Desktop Links */}
            <div className='gap-8xl flex items-center'>
              <Link
                to='/'
                className='flex shrink-0 transform items-center transition-transform hover:scale-105'
              >
                <img
                  src={logo}
                  alt='Movie Explorer'
                  className='h-7 w-auto md:h-10'
                />
              </Link>

              <div className='gap-6xl hidden items-center md:flex'>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'hover:text-primary-300 text-md p-2 font-normal transition-colors',
                      location.pathname === link.path
                        ? 'text-base-white'
                        : 'text-neutral-300'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Search & Mobile Menu Interface */}
            <div className='gap-xl flex items-center'>
              <form
                onSubmit={handleSearchSubmit}
                className='hidden w-60.75 md:block'
              >
                <Input
                  placeholder='Search movie...'
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onClear={handleClear}
                  className='border-neutral-800 bg-neutral-950/60'
                  size='lg'
                />
              </form>

              {/* Mobile Actions */}
              <div className='flex items-center gap-6 md:hidden'>
                <button
                  onClick={() => navigate('/search')}
                  className='hover:text-primary-300 text-base-white transform cursor-pointer transition-all active:scale-95'
                  aria-label='Activate search'
                >
                  <Search className='size-6' />
                </button>
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className='hover:text-primary-300 text-base-white cursor-pointer transition-colors'
                  aria-label='Open menu'
                >
                  <MenuIcon size={24} className='text-base-white' />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Input Header (Active State on /search) - Mobile only */}
          {isMobileSearchActive && (
            <div className='gap-xl animate-in fade-in slide-in-from-top-2 flex w-full items-center duration-300 md:hidden'>
              <button
                onClick={() => navigate(-1)}
                className='flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:opacity-80'
                aria-label='Back'
              >
                <ArrowLeftIcon size={24} className='text-base-white' />
              </button>
              <form onSubmit={handleSearchSubmit} className='flex-1'>
                <Input
                  ref={mobileInputRef}
                  placeholder='Search Movie'
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onClear={handleClear}
                  className='rounded-xl border-neutral-800 bg-neutral-950/60 transition-all'
                  size='sm'
                />
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'bg-base-black fixed inset-0 z-100 transition-transform duration-500 md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className='flex h-16 items-center justify-between px-4'>
          <Link to='/' onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt='Movie Explorer' className='h-7 w-auto' />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className='hover:text-primary-300 text-base-white -mr-2 flex size-10 cursor-pointer items-center justify-center transition-colors'
            aria-label='Close menu'
          >
            <X size={24} className='text-base-white' />
          </button>
        </div>

        <div className='mt-6 flex flex-col gap-4 px-4'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'hover:text-primary-300 p-2 text-base font-normal transition-colors',
                location.pathname === link.path
                  ? 'text-base-white'
                  : 'text-neutral-400'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
