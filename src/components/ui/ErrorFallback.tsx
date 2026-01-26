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
    <div
      className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-white'
      style={{ backgroundColor: '#000000', padding: '2rem 1rem' }}
    >
      {/* Background Decorative Blurs */}
      <div
        className='pointer-events-none absolute rounded-full blur-3xl'
        style={{
          top: '-6rem',
          left: '-6rem',
          width: '24rem',
          height: '24rem',
          backgroundColor: 'rgba(150, 18, 0, 0.2)',
        }}
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute rounded-full blur-3xl'
        style={{
          bottom: '-6rem',
          right: '-6rem',
          width: '24rem',
          height: '24rem',
          backgroundColor: 'rgba(185, 97, 85, 0.1)',
        }}
        aria-hidden='true'
      />

      {/* Main Card */}
      <div
        className='relative z-10 flex flex-col items-center text-center shadow-2xl'
        style={{
          width: '100%',
          maxWidth: '42rem',
          padding: '2.5rem 2rem',
          gap: '1.5rem',
          borderRadius: '1.5rem',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Error Icon */}
        <div
          className='flex items-center justify-center rounded-full'
          style={{
            width: '5rem',
            height: '5rem',
            backgroundColor: 'rgba(150, 18, 0, 0.2)',
            boxShadow: '0 0 0 8px rgba(150, 18, 0, 0.05)',
          }}
        >
          <AlertTriangle className='h-10 w-10 text-[#b96155]' />
        </div>

        {/* Message */}
        <div
          className='flex flex-col'
          style={{ gap: '0.75rem', maxWidth: '28rem' }}
        >
          <h1
            className='font-bold tracking-tight text-white'
            style={{ fontSize: '1.875rem', lineHeight: '2.25rem' }}
          >
            {isEnvIssue ? 'Configuration Error' : 'Oops! Something went wrong'}
          </h1>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: '1.625rem',
              color: '#a4a7ae',
            }}
          >
            {isEnvIssue
              ? 'It looks like your environment variables are not set correctly. Please check your .env file.'
              : 'An unexpected error occurred. Please try refreshing the page or returning to the home screen.'}
          </p>
        </div>

        {/* Developer Tip (Only in Dev Mode) */}
        {import.meta.env.DEV && isEnvIssue && (
          <div
            className='border-primary-300/30 bg-primary-300/5 w-full scale-95 animate-pulse rounded-lg border p-4 text-left'
            style={{ marginTop: '0.5rem' }}
          >
            <p className='text-primary-300 mb-2 flex items-center gap-2 text-sm font-bold'>
              <AlertTriangle className='size-4' />
              Developer Tip:
            </p>
            <ul className='flex flex-col gap-1.5 text-xs text-neutral-400'>
              <li className='flex items-start gap-2'>
                <span className='bg-primary-300 mt-1 block size-1 rounded-full' />
                Ensure <code className='text-zinc-300'>.env</code> file exists
                in the root directory.
              </li>
              <li className='flex items-start gap-2'>
                <span className='bg-primary-300 mt-1 block size-1 rounded-full' />
                Verify
                <code className='text-zinc-300'>VITE_READ_ACCESS_TOKEN</code> is
                provided.
              </li>
              <li className='flex items-start gap-2'>
                <span className='bg-primary-300 mt-1 block size-1 rounded-full' />
                Check if <code className='text-zinc-300'>VITE_BASE_URL</code> is
                correct.
              </li>
            </ul>
          </div>
        )}

        {/* Actions */}
        <div
          className='flex w-full flex-col items-center justify-center gap-3 sm:flex-row'
          style={{ maxWidth: '24rem', marginTop: '0.5rem' }}
        >
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
          <div
            className='w-full'
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '1.5rem',
              marginTop: '0.5rem',
            }}
          >
            <button
              onClick={() => setShowDetails(!showDetails)}
              className='mx-auto flex items-center justify-center transition-colors hover:text-white'
              style={{ gap: '0.5rem', color: '#717680' }}
              type='button'
            >
              <span style={{ fontSize: '0.875rem' }}>
                {showDetails ? 'Hide' : 'Show'} technical details
              </span>
              {showDetails ? (
                <ChevronUp style={{ width: '1rem', height: '1rem' }} />
              ) : (
                <ChevronDown style={{ width: '1rem', height: '1rem' }} />
              )}
            </button>

            {showDetails && (
              <div className='text-left' style={{ marginTop: '1rem' }}>
                <div
                  className='font-mono shadow-inner'
                  style={{
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backgroundColor: 'rgba(24, 29, 39, 0.5)',
                    padding: '1rem',
                    fontSize: '0.75rem',
                  }}
                >
                  <p
                    className='font-bold'
                    style={{ marginBottom: '0.25rem', color: '#b96155' }}
                  >
                    Error Message:
                  </p>
                  <p
                    style={{
                      wordBreak: 'break-all',
                      color: '#d5d7da',
                    }}
                  >
                    {error.message}
                  </p>
                  {error.stack && (
                    <>
                      <p
                        className='font-bold'
                        style={{
                          marginTop: '0.75rem',
                          marginBottom: '0.25rem',
                          color: '#b96155',
                        }}
                      >
                        Stack Trace:
                      </p>
                      <p
                        className='scrollbar-hide overflow-auto'
                        style={{
                          maxHeight: '10rem',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                          fontSize: '0.625rem',
                          lineHeight: '1.4',
                          color: '#717680',
                        }}
                      >
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
      <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#414651' }}>
        Status ID: {statusId}
      </p>
    </div>
  );
};

export default ErrorFallback;
