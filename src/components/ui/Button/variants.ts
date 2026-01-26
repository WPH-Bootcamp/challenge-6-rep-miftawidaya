import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-300 text-base-white hover:bg-primary-400 active:bg-primary-200 shadow-sm',
        secondary:
          'backdrop-blur-xl bg-neutral-950/60 text-base-white border border-neutral-900 hover:bg-neutral-900 active:bg-neutral-950',
        outline:
          'border border-neutral-700 bg-transparent hover:bg-neutral-800 text-base-white',
        ghost: 'bg-transparent hover:bg-neutral-800 text-base-white',
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
