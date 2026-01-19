import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-300 text-white hover:bg-primary-400 active:bg-primary-200 shadow-sm [&_svg]:fill-current',
        secondary:
          'bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800 active:bg-neutral-950 [&_svg]:fill-current',
        outline:
          'border border-neutral-700 bg-transparent hover:bg-neutral-800 text-white',
        ghost: 'bg-transparent hover:bg-neutral-800 text-white',
      },
      size: {
        sm: 'h-11 px-6 py-2',
        lg: 'h-14 px-8 py-3 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
