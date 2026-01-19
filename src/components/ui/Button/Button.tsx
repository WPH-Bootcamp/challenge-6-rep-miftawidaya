import type { FC, ButtonHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { buttonVariants, type ButtonVariantProps } from './variants';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

/**
 * Shared Button Component
 *
 * A versatile button component supporting multiple variants and sizes.
 * Built for consistency and accessibility across the application.
 */
export const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  ref,
  ...props
}) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Button;
