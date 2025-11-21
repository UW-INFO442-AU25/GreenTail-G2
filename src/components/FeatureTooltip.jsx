import React, { useState, useEffect } from 'react';

/**
 * FeatureTooltip - Lightweight tooltip that appears next to feature buttons
 * Similar to comment bubbles, provides quick contextual hints
 * 
 * @param {string} pageId - Page identifier for localStorage tracking
 * @param {string} featureId - Unique ID for this specific feature tooltip
 * @param {string} message - Short, concise hint message (1 sentence max, ~10 words)
 * @param {string} position - Position relative to target: 'top', 'bottom', 'left', 'right'
 * @param {React.RefObject} targetRef - Ref to the element this tooltip points to
 * @param {number} delay - Delay in milliseconds before showing tooltip (default: 1000)
 * @param {number} offset - Custom offset in pixels (default: 8)
 * @param {number} maxWidth - Maximum width in pixels (default: 160)
 */
const FeatureTooltip = ({ 
  pageId, 
  featureId, 
  message, 
  position = 'top',
  targetRef,
  delay = 1000,
  offset = 8,
  maxWidth = 160
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [positionStyles, setPositionStyles] = useState({});

  useEffect(() => {
    // Check if user has dismissed this specific tooltip
    const storageKey = `tooltip_dismissed_${pageId}_${featureId}`;
    const hasDismissed = localStorage.getItem(storageKey);
    
    // Debug: Log tooltip state
    console.log(`[FeatureTooltip ${pageId}_${featureId}]`, {
      hasDismissed,
      storageKey,
      willShow: hasDismissed !== 'true'
    });
    
    if (hasDismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // Update position on scroll/resize
    const updatePosition = () => {
      if (!targetRef?.current) return;
      
      const rect = targetRef.current.getBoundingClientRect();

      let styles = {};
      switch (position) {
        case 'top':
          styles = {
            bottom: `${window.innerHeight - rect.top + offset}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: 'translateX(-50%)'
          };
          break;
        case 'bottom':
          styles = {
            top: `${rect.bottom + offset}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: 'translateX(-50%)'
          };
          break;
        case 'right':
          styles = {
            top: `${rect.top + rect.height / 2}px`,
            left: `${rect.right + offset}px`,
            transform: 'translateY(-50%)'
          };
          break;
        case 'left':
          styles = {
            top: `${rect.top + rect.height / 2}px`,
            right: `${window.innerWidth - rect.left + offset}px`,
            transform: 'translateY(-50%)'
          };
          break;
      }
      setPositionStyles(styles);
    };

    let timer;
    let interval;
    let timeout;

    const setupTooltip = () => {
      if (targetRef?.current) {
        updatePosition();
        timer = setTimeout(() => {
          console.log(`[FeatureTooltip ${pageId}_${featureId}] Showing tooltip after ${delay}ms delay`);
          setIsVisible(true);
        }, delay);
        
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
        return true;
      }
      return false;
    };

    // Try immediately
    if (!setupTooltip()) {
      // If ref not ready, check periodically
      interval = setInterval(() => {
        if (setupTooltip()) {
          clearInterval(interval);
        }
      }, 100);
      
      // Cleanup after 5 seconds if still not found
      timeout = setTimeout(() => {
        if (interval) clearInterval(interval);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [pageId, featureId, targetRef, position]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem(`tooltip_dismissed_${pageId}_${featureId}`, 'true');
  };

  if (isDismissed || !isVisible || !targetRef?.current) return null;

  const getArrowClass = () => {
    switch (position) {
      case 'top':
        return 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-l-transparent border-r-transparent border-b-transparent border-t-green-800';
      case 'bottom':
        return 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-l-transparent border-r-transparent border-t-transparent border-b-green-800';
      case 'left':
        return 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-t-transparent border-b-transparent border-l-transparent border-r-green-800';
      case 'right':
        return 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-t-transparent border-b-transparent border-r-transparent border-l-green-800';
      default:
        return '';
    }
  };

  return (
    <div
      className="fixed z-[70] pointer-events-none"
      style={positionStyles}
    >
      <div className="relative bg-green-800 text-white text-xs rounded-md px-2.5 py-1.5 shadow-lg pointer-events-auto animate-fade-in" style={{ maxWidth: `${maxWidth}px` }}>
        <p className="leading-snug text-white pr-4">{message}</p>
        
        {/* Arrow */}
        <div className={`absolute w-0 h-0 border-3 ${getArrowClass()}`} />
        
        {/* Close button - minimal design */}
        <button
          onClick={handleDismiss}
          className="absolute top-1 right-1 text-white/70 hover:text-white transition-colors"
          aria-label="Close tooltip"
          style={{ 
            width: '14px',
            height: '14px',
            fontSize: '12px',
            lineHeight: '1',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeatureTooltip;
