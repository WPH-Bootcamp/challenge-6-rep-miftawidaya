import type { FC, HTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';
import { badgeVariants, type BadgeVariantProps } from './variants';

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>, BadgeVariantProps {}

/**
 * Shared Badge Component
 *
 * A compact indicator used for labels, status updates, or metadata display.
 */
export const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export default Badge;
