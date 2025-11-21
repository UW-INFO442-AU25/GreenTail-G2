import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ErrorBoundary - React Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the app.
 * 
 * Note: Error boundaries only catch errors in:
 * - Rendering
 * - Lifecycle methods
 * - Constructors
 * 
 * They do NOT catch errors in:
 * - Event handlers (use try-catch)
 * - Async code (setTimeout, promises, etc.)
 * - Server-side rendering
 * - Errors thrown in the error boundary itself
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // Called when a child component throws an error
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  // Log error information
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // In production, you can log errors to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. We've been notified and will fix this issue soon.
            </p>

            {/* Show detailed error info in development mode only */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left bg-gray-100 p-4 rounded text-sm">
                <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-red-600 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Render children normally if no error
    return this.props.children;
  }
}

export default ErrorBoundary;

