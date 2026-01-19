import type { FC } from 'react';
import logo from '../../assets/images/logo.svg';

/**
 * Footer component with brand info and links.
 */
export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-background border-t border-neutral-800 py-16'>
      <div className='custom-container flex flex-col items-center justify-between gap-8 md:flex-row'>
        <div className='flex flex-col items-center gap-4 md:items-start'>
          <img src={logo} alt='Movie Explorer' className='h-8 w-auto md:h-10' />
          <p className='text-sm text-neutral-500'>
            © {currentYear} Movie Explorer. All rights reserved.
          </p>
        </div>
        <div className='flex gap-6'>
          <a
            href='/privacy'
            className='text-sm text-neutral-500 transition-colors hover:text-white'
          >
            Privacy Policy
          </a>
          <a
            href='/terms'
            className='text-sm text-neutral-500 transition-colors hover:text-white'
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
