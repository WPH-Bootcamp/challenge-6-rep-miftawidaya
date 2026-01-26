import { Toaster as SonnerToaster } from 'sonner';

export const Toaster = () => {
  return (
    <SonnerToaster
      position='top-center'
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'glass-surface-black flex items-center justify-center gap-3 h-13 w-full md:min-w-132.75 rounded-2xl px-6 text-white shadow-2xl mt-28.5',
          title: 'text-md font-medium font-poppins',
          icon: 'text-white',
        },
      }}
    />
  );
};
