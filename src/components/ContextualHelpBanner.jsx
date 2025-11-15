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
    <div className="helpful-resources mb-6 rounded-r-lg relative" role="banner" aria-label="Helpful resources">
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
        <span className="font-semibold text-gray-800">Helpful resources:</span>
        <Link 
          to="/pet-food-labels-guide" 
          className="resource-link"
          aria-label="Learn to decode pet food labels"
        >
          Learn to decode pet food labels →
        </Link>
        <span className="text-gray-300">|</span>
        <button
          onClick={onShowTransitionPlan}
          className="resource-link cursor-pointer bg-transparent border-none p-0"
          aria-label="Get 7-14 day transition plan"
        >
          7-14 day transition plan →
        </button>
        <span className="text-gray-300">|</span>
        <Link 
          to="/organic-pet-food-guide" 
          className="resource-link"
          aria-label="Learn what organic covers"
        >
          What "organic" covers →
        </Link>
      </div>
    </div>
  );
}

export default ContextualHelpBanner;
