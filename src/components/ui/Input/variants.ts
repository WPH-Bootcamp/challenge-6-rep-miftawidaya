import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-950/60 px-4 backdrop-blur-5 transition-all',
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
