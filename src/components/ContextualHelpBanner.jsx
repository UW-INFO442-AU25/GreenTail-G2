import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ContextualHelpBanner - Dismissible banner for educational content
 * Optimization: Moves educational content from sidebar to contextual banner
 * Allows users to access help without interrupting shopping flow
 */
function ContextualHelpBanner({ isVisible, onDismiss, onShowTransitionPlan }) {
  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg relative" role="banner" aria-label="Helpful resources">
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        aria-label="Dismiss help banner"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <span className="font-semibold text-blue-900">Helpful resources:</span>
        <Link 
          to="/pet-food-labels-guide" 
          className="text-blue-700 hover:text-blue-900 hover:underline transition-colors duration-200"
          aria-label="Learn to decode pet food labels"
        >
          Learn to decode pet food labels →
        </Link>
        <span className="text-blue-300">|</span>
        <button
          onClick={onShowTransitionPlan}
          className="text-blue-700 hover:text-blue-900 hover:underline transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          aria-label="Get 7-14 day transition plan"
        >
          7-14 day transition plan →
        </button>
        <span className="text-blue-300">|</span>
        <Link 
          to="/organic-pet-food-guide" 
          className="text-blue-700 hover:text-blue-900 hover:underline transition-colors duration-200"
          aria-label="Learn what organic covers"
        >
          What "organic" covers →
        </Link>
      </div>
    </div>
  );
}

export default ContextualHelpBanner;
