import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-neutral-700 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-800 text-base-white hover:bg-neutral-700',
        secondary:
          'border-transparent bg-neutral-900 text-neutral-400 hover:bg-neutral-800',
        outline: 'text-neutral-300',
        primary:
          'border-transparent bg-primary-300 text-base-white hover:bg-primary-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
