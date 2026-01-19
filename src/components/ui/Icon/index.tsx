import { type FC, type SVGProps } from 'react';
import { cn } from '../../../lib/cn';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Play Icon
 *
 * Uses a compound path with fill-rule="evenodd" to create a white circle
 * with a transparent play triangle cutout. This avoids mask rendering issues.
 */
export const PlayIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('h-4.5! w-4.5! text-white md:h-6! md:w-6!', className)}
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM20 17.0718L32 24L20 30.9282V17.0718Z'
      fill='currentColor'
    />
  </svg>
);

/**
 * Heart Fill Icon
 */
export const HeartFillIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z'
      fill='currentColor'
    />
  </svg>
);

/**
 * Heart Outline Icon
 */
export const HeartOutlineIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * Close Rounded Icon
 */
export const CloseRoundedIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z'
      fill='currentColor'
    />
    <path
      d='M14.8284 9.17139L9.17139 14.8284M9.17139 9.17139L14.8284 14.8284'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * Arrow Left Icon
 */
export const ArrowLeftIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M9.56994 18.8201C9.37994 18.8201 9.18994 18.7501 9.03994 18.6001L2.96994 12.5301C2.67994 12.2401 2.67994 11.7601 2.96994 11.4701L9.03994 5.40012C9.32994 5.11012 9.80994 5.11012 10.0999 5.40012C10.3899 5.69012 10.3899 6.17012 10.0999 6.46012L4.55994 12.0001L10.0999 17.5401C10.3899 17.8301 10.3899 18.3101 10.0999 18.6001C9.95994 18.7501 9.75994 18.8201 9.56994 18.8201Z'
      fill='currentColor'
    />
    <path
      d='M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z'
      fill='currentColor'
    />
  </svg>
);

/**
 * Check Icon
 */
export const CheckIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z'
      fill='currentColor'
    />
    <path
      d='M8 12L11 15L17 9'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * Menu Icon
 */
export const MenuIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z'
      fill='currentColor'
    />
    <path
      d='M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z'
      fill='currentColor'
    />
    <path
      d='M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z'
      fill='currentColor'
    />
  </svg>
);

/**
 * Emoji Happy Icon
 */
export const EmojiHappyIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.5 6.38C9.53 6.38 10.38 7.22 10.38 8.26C10.38 9.3 9.54 10.14 8.5 10.14C7.46 10.14 6.62 9.28 6.62 8.25C6.62 7.22 7.47 6.38 8.5 6.38ZM12 19.08C9.31 19.08 7.12 16.89 7.12 14.2C7.12 13.5 7.69 12.92 8.39 12.92H15.59C16.29 12.92 16.86 13.49 16.86 14.2C16.88 16.89 14.69 19.08 12 19.08ZM15.5 10.12C14.47 10.12 13.62 9.28 13.62 8.24C13.62 7.2 14.46 6.36 15.5 6.36C16.54 6.36 17.38 7.2 17.38 8.24C17.38 9.28 16.53 10.12 15.5 10.12Z'
      fill='currentColor'
    />
  </svg>
);

/**
 * Close Icon
 */
export const CloseIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M18 6L6 18M6 6L18 18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * Star Fill Icon
 */
export const StarFillIcon: FC<Readonly<IconProps>> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 21 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('text-white', className)}
    {...props}
  >
    <path
      d='M9.17154 1.33127C9.63793 0.556284 10.7615 0.556284 11.2279 1.33127L13.5583 5.20367C13.7259 5.48208 13.9992 5.68065 14.3157 5.75396L18.7188 6.77371C19.5999 6.9778 19.9471 8.04636 19.3542 8.72941L16.3915 12.1424C16.1785 12.3878 16.0741 12.7091 16.1022 13.0328L16.4929 17.5355C16.5711 18.4366 15.6622 19.097 14.8293 18.7442L10.6678 16.9811C10.3686 16.8544 10.0308 16.8544 9.7316 16.9811L5.57009 18.7442C4.73724 19.097 3.82827 18.4366 3.90647 17.5355L4.29724 13.0328C4.32534 12.7091 4.22095 12.3878 4.00794 12.1424L1.04521 8.72941C0.45228 8.04636 0.799478 6.9778 1.68066 6.77371L6.08368 5.75396C6.40024 5.68065 6.67354 5.48208 6.84109 5.20367L9.17154 1.33127Z'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </svg>
);
