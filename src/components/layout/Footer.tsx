import type { FC } from 'react';
import logo from '../../assets/images/logo.svg';

/**
 * Footer component with brand info and links.
 */
export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-background border-t border-neutral-800'>
      <div className='custom-container flex h-30 flex-col justify-center gap-2 sm:items-start md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col items-start gap-4'>
          <img src={logo} alt='Movie Explorer' className='h-8 w-auto md:h-10' />
        </div>
        <p className='md:text-md text-xs text-neutral-500'>
          Copyright ©{currentYear} Movie Explorer
        </p>
      </div>
    </footer>
  );
};
