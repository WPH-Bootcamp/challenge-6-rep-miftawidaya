import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component to catch and handle React component errors gracefully.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private readonly handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    globalThis.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className='bg-background p-spacing-xl flex min-h-screen flex-col items-center justify-center text-white'>
          <div className='glassmorphism gap-spacing-lg rounded-radius-2xl p-spacing-4xl flex max-w-md flex-col items-center text-center'>
            <h1 className='text-display-sm text-primary-300 font-bold'>
              Oops! Something went wrong
            </h1>
            <p className='text-neutral-400'>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <pre className='p-spacing-md overflow-auto rounded bg-neutral-900 text-xs text-red-400'>
                {this.state.error.message}
              </pre>
            )}
            <button
              className='bg-primary-300 rounded-md px-4 py-2 text-white'
              onClick={this.handleReset}
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
