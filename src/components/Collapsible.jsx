import React, { useState } from 'react';

/**
 * Collapsible Component - Hides detailed information to avoid single-screen information overload
 * Optimization reason: Move secondary information into collapsible areas, ensure core information takes priority, following "sufficient but not redundant" principle
 */
function Collapsible({ 
  title, 
  children, 
  defaultExpanded = false,
  variant = 'default', // 'default', 'compact', 'accordion'
  className = '',
  ariaLabel
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle touch events for buttons
  const handleTouchStart = (e) => {
    e.currentTarget.classList.add('touch-active');
  };

  const handleTouchEnd = (e) => {
    e.currentTarget.classList.remove('touch-active');
    toggleExpanded();
  };

  const baseStyles = variant === 'compact' 
    ? 'border-l-4 border-green-800 pl-4 py-2' 
    : 'border border-gray-200 rounded-lg p-4 bg-white shadow-sm';

  return (
    <div className={`collapsible-wrapper ${className} ${baseStyles}`}>
      <button
        onClick={toggleExpanded}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full flex justify-between items-center text-left min-h-[44px] min-w-[44px]"
        aria-expanded={isExpanded}
        aria-label={ariaLabel || `${isExpanded ? 'Collapse' : 'Expand'} ${title}`}
        aria-controls={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isExpanded}
      >
        {isExpanded && <div className="text-gray-600 leading-relaxed">{children}</div>}
      </div>
    </div>
  );
}

export default Collapsible;
