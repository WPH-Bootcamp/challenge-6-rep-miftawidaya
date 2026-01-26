import type { FC, InputHTMLAttributes, Ref } from 'react';
import { Search } from 'lucide-react';
import { CloseRoundedIcon } from '../Icon';
import { cn } from '../../../lib/cn';
import { inputVariants, type InputVariantProps } from './variants';

/**
 * Shared Input Component
 *
 * A reusable input component with support for icons, clear actions,
 * and multiple sizes. Designed to be flexible and accessible.
 */
export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariantProps {
  onClear?: () => void;
  showIcon?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export const Input: FC<InputProps> = ({
  className,
  size,
  onClear,
  showIcon = true,
  value,
  ref,
  ...props
}) => {
  const hasValue = value && String(value).length > 0;

  return (
    <div className={cn(inputVariants({ size, className }))}>
      {showIcon && <Search className='size-6 shrink-0 text-neutral-500' />}
      <input
        type='text'
        className='text-neutral-25 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-neutral-500'
        ref={ref}
        value={value}
        {...props}
      />
      {hasValue && onClear && (
        <button
          type='button'
          onClick={onClear}
          className='text-base-white flex size-5 shrink-0 items-center justify-center transition-opacity hover:opacity-80'
          aria-label='Clear search'
        >
          <CloseRoundedIcon size={20} className='text-neutral-700' />
        </button>
      )}
    </div>
  );
};

export default Input;
