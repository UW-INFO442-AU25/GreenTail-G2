import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check visibility of sections
      Object.keys(sectionsRef.current).forEach(key => {
        const element = sectionsRef.current[key];
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          setIsVisible(prev => ({ ...prev, [key]: isInView }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation classes
  const getAnimationClass = (sectionKey, delay = 0) => {
    const baseClass = "transition-all duration-1000 ease-out";
    if (isVisible[sectionKey]) {
      return `${baseClass} translate-y-0 opacity-100`;
    }
    return `${baseClass} translate-y-12 opacity-0`;
  };

  const getParallaxStyle = (speed = 0.5) => ({
    transform: `translateY(${scrollY * speed}px)`
  });

  const getStaggeredAnimationClass = (sectionKey, index = 0) => {
    const baseClass = "transition-all duration-1000 ease-out";
    const delay = index * 200; // 200ms delay between items
    
    if (isVisible[sectionKey]) {
      return `${baseClass} translate-y-0 opacity-100`;
    }
    return `${baseClass} translate-y-12 opacity-0`;
  };

  return {
    scrollY,
    isVisible,
    sectionsRef,
    getAnimationClass,
    getParallaxStyle,
    getStaggeredAnimationClass
  };
};
