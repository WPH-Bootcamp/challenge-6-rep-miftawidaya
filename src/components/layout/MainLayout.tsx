import type { FC, ReactNode } from 'react';
import Navbar from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout component that provides the common page structure.
 */
export const MainLayout: FC<Readonly<MainLayoutProps>> = ({ children }) => {
  return (
    <div className='bg-background flex min-h-screen flex-col text-white'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
};
