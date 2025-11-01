import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route Transition Component - Provides smooth page transitions similar to Nuxt.js
 * Optimization: Creates seamless client-side routing with fade animations
 * Technique: Similar to Nuxt.js page transitions - intercepts route changes and applies CSS animations
 * 
 * How it works (similar to Nuxt.js):
 * 1. Detects route changes via useLocation hook (client-side routing interception)
 * 2. Applies exit animation to old content (page-leave)
 * 3. Updates content dynamically (no full page reload)
 * 4. Applies enter animation to new content (page-enter)
 * 5. Uses CSS keyframe animations for smooth transitions
 */
function RouteTransition({ children }) {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('enter');
  const prevPathnameRef = useRef(location.pathname);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip transition on initial mount (first page load)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathnameRef.current = location.pathname;
      return;
    }

    // Only trigger transition if pathname actually changed (not just state/hash updates)
    // This mimics Nuxt.js behavior where only route changes trigger transitions
    if (location.pathname !== prevPathnameRef.current) {
      // Start exit animation (similar to Nuxt page-leave)
      setTransitionStage('exit');
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  const handleAnimationEnd = (e) => {
    // Handle exit animation completion - immediate transition for minimal delay
    if (transitionStage === 'exit') {
      // Very brief delay to ensure smooth transition
      setTransitionStage('enter');
    }
  };

  return (
    <div
      className={`route-transition route-transition-${transitionStage} animate-change`}
      onAnimationEnd={handleAnimationEnd}
      key={location.pathname}
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </div>
  );
}

export default RouteTransition;
