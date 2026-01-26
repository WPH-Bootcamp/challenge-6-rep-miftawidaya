import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full items-center gap-2 rounded-2xl glass-surface border-neutral-800 px-4 transition-all',
  {
    variants: {
      size: {
        sm: 'h-11',
        lg: 'h-14',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
