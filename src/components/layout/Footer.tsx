import type { FC } from 'react';
import logo from '../../assets/images/logo.svg';

/**
 * Footer component with brand info and links.
 */
export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='h-30 border-t border-[#252B37] bg-black'>
      <div className='md:px-11xl flex h-full flex-col items-start px-4 py-6 md:flex-row md:items-center md:py-2'>
        <div className='flex items-center'>
          <img src={logo} alt='Movie Explorer' className='h-7 w-auto md:h-10' />
        </div>
        <div className='mt-2 text-xs font-normal text-neutral-600 md:mt-0 md:ml-auto md:text-base'>
          Copyright © {currentYear} Movie Explorer
        </div>
      </div>
    </footer>
  );
};
