import { useState, useEffect } from 'react';

/**
 * Hook to detect whether the user is using touch or mouse interaction
 * Returns 'touch' or 'mouse' based on the primary interaction method
 */
export const useInteractionMode = () => {
  const [interactionMode, setInteractionMode] = useState('mouse');

  useEffect(() => {
    // Check if device supports touch
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Initially set based on touch capability
    setInteractionMode(hasTouch ? 'touch' : 'mouse');

    // Track the most recent interaction type
    let lastInteractionType = null;
    
    const handleTouchStart = () => {
      lastInteractionType = 'touch';
      setInteractionMode('touch');
    };

    const handleMouseMove = () => {
      // Only switch to mouse if we detect mouse movement after a delay
      // This prevents switching during touch interactions
      if (lastInteractionType !== 'touch') {
        setInteractionMode('mouse');
      }
    };

    const handleMouseDown = () => {
      lastInteractionType = 'mouse';
      setInteractionMode('mouse');
    };

    // Add event listeners
    if (hasTouch) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
    }
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });

    return () => {
      if (hasTouch) {
        document.removeEventListener('touchstart', handleTouchStart);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return interactionMode;
};

/**
 * Hook for handling both click and touch events
 * Returns handlers that work with both mouse and touch
 */
export const useClickHandler = (onClick, options = {}) => {
  const { preventDefault = true, stopPropagation = false } = options;

  const handleClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick(e);
  };

  const handleTouchEnd = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick(e);
  };

  return {
    onClick: handleClick,
    onTouchEnd: handleTouchEnd,
  };
};

/**
 * Reusable touch event handlers for buttons and interactive elements
 * Provides visual feedback for touch interactions
 */
export const useTouchHandlers = () => {
  const handleTouchStart = (e) => {
    e.currentTarget.classList.add('touch-active');
  };

  const handleTouchEnd = (e, callback) => {
    e.currentTarget.classList.remove('touch-active');
    if (callback) callback();
  };

  return {
    handleTouchStart,
    handleTouchEnd,
  };
};


