import { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Button from './Button/Button';

interface ErrorFallbackProps {
  error?: Error;
  onReset: () => void;
  onRefresh: () => void;
}

/**
 * Fallback UI for the Error Boundary
 * Professional, responsive error page with glassmorphism design
 */
const ErrorFallback = ({ error, onReset, onRefresh }: ErrorFallbackProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Generate a random Status ID once per mount
  const [statusId] = useState(
    () => `ERROR_${Math.random().toString(36).substring(7).toUpperCase()}`
  );

  // Check for configuration errors (missing .env)
  const isEnvIssue =
    !import.meta.env.VITE_BASE_URL ||
    !import.meta.env.VITE_READ_ACCESS_TOKEN ||
    error?.message.toLowerCase().includes('data is undefined');

  return (
    <div className='bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-40 text-white'>
      {/* Background Decorative Blurs */}
      <div
        className='bg-primary-300/20 pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl'
        aria-hidden='true'
      />
      <div
        className='bg-primary-200/10 pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full blur-3xl'
        aria-hidden='true'
      />

      {/* Main Card */}
      <div className='bg-base-black/40 relative z-10 flex w-full max-w-168 flex-col items-center gap-6 rounded-4xl border border-white/10 px-8 py-10 text-center shadow-2xl backdrop-blur-lg'>
        {/* Error Icon */}
        <div className='bg-primary-300/20 flex h-20 w-20 items-center justify-center rounded-full shadow-[0_0_0_8px_rgba(150,18,0,0.05)]'>
          <AlertTriangle className='text-primary-200 h-10 w-10' />
        </div>

        {/* Message */}
        <div className='flex max-w-112 flex-col gap-3'>
          <h1 className='text-display-sm font-bold tracking-tight text-white'>
            {isEnvIssue ? 'Configuration Error' : 'Oops! Something went wrong'}
          </h1>
          <p className='text-md leading-relaxed text-neutral-400'>
            {isEnvIssue
              ? 'It looks like your environment variables are not set correctly. Please check your .env file.'
              : 'An unexpected error occurred. Please try refreshing the page or returning to the home screen.'}
          </p>
        </div>

        {/* Developer Tip (Only in Dev Mode) */}
        {import.meta.env.DEV && isEnvIssue && (
          <div className='border-primary-300/30 bg-primary-300/5 mt-2 w-full scale-95 animate-pulse rounded-lg border p-4 text-left'>
            <p className='text-primary-300 mb-2 flex items-center gap-2 text-sm font-bold'>
              <AlertTriangle className='size-4' />
              Developer Tip:
            </p>
            <ul className='flex flex-col gap-1.5 text-xs text-neutral-400'>
              <li className='flex items-start gap-2'>
                <span className='bg-primary-300 mt-1 block size-1 rounded-full' />
                <span>
                  Ensure <code className='text-zinc-300'>.env</code> file exists
                  in the root directory.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='bg-primary-300 mt-1 block size-1 rounded-full' />
                <span>
                  Verify{' '}
                  <code className='text-zinc-300'>VITE_READ_ACCESS_TOKEN</code>{' '}
                  is provided.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='bg-primary-300 mt-1 block size-1 rounded-full' />
                <span>
                  Check if <code className='text-zinc-300'>VITE_BASE_URL</code>{' '}
                  is correct.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className='mt-2 flex w-full max-w-96 flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            className='w-full sm:w-auto sm:flex-1'
            onClick={onRefresh}
            variant='primary'
          >
            <RefreshCw className='h-5 w-5 stroke-2' />
            <span>Refresh</span>
          </Button>
          <Button
            className='w-full sm:w-auto sm:flex-1'
            onClick={onReset}
            variant='secondary'
          >
            <Home className='h-5 w-5 stroke-2' />
            <span>Go to Home</span>
          </Button>
        </div>

        {/* Technical Details (Collapsible) */}
        {error && (
          <div className='mt-2 w-full border-t border-white/10 pt-6'>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className='mx-auto flex items-center justify-center text-neutral-500 transition-colors hover:text-white'
              style={{ gap: '0.5rem' }}
              type='button'
            >
              <span className='text-sm'>
                {showDetails ? 'Hide' : 'Show'} technical details
              </span>
              {showDetails ? (
                <ChevronUp className='h-4 w-4' />
              ) : (
                <ChevronDown className='h-4 w-4' />
              )}
            </button>

            {showDetails && (
              <div className='mt-4 text-left'>
                <div className='rounded-xl border border-white/5 bg-neutral-900/50 p-4 font-mono text-xs shadow-inner'>
                  <p className='text-primary-200 mb-1 font-bold'>
                    Error Message:
                  </p>
                  <p className='break-all text-neutral-300'>{error.message}</p>
                  {error.stack && (
                    <>
                      <p className='text-primary-200 mt-3 mb-1 font-bold'>
                        Stack Trace:
                      </p>
                      <p className='scrollbar-hide max-h-40 overflow-auto text-[10px] leading-relaxed break-all whitespace-pre-wrap text-neutral-500'>
                        {error.stack.split('\n').slice(0, 8).join('\n')}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <p className='mt-6 text-xs text-neutral-700'>Status ID: {statusId}</p>
    </div>
  );
};

export default ErrorFallback;
