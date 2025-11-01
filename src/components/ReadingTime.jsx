import React from 'react';

/**
 * Reading Time Label - Helps users understand content volume to avoid information fatigue
 * Optimization reason: Set user expectations about content length, improve UX
 */
function ReadingTime({ minutes, className = '' }) {
  return (
    <div 
      className={`inline-flex items-center gap-2 text-xs text-gray-500 ${className}`}
      role="note"
      aria-label={`Estimated reading time ${minutes} minute${minutes !== 1 ? 's' : ''}`}
    >
      <svg 
        className="w-3 h-3" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{minutes} min read</span>
    </div>
  );
}

export default ReadingTime;
