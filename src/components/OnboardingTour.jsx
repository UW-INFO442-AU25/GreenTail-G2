import React, { useState, useEffect } from 'react';

/**
 * OnboardingTour - A floating tutorial window for first-time users
 * Designed for Sarah persona (new pet parents) to guide them through key features
 * 
 * @param {string} pageId - Unique ID for the page (e.g., 'search', 'compare') to track 'seen' state
 * @param {Array} steps - Array of objects with { title, content, icon }
 * @param {boolean} forceShow - For debugging, forces the tutorial to show
 */
const OnboardingTour = ({ pageId, steps, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMinified, setIsMinified] = useState(false);

  useEffect(() => {
    // Check if user has seen this specific tutorial
    const hasSeen = localStorage.getItem(`hasSeenTutorial_${pageId}`);
    
    if (!hasSeen || forceShow) {
      // Add a small delay so it doesn't pop up instantly when page loads
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [pageId, forceShow]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleDismiss();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(`hasSeenTutorial_${pageId}`, 'true');
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  // Minified view (just a helper bubble)
  if (isMinified) {
    return (
      <button
        onClick={() => setIsMinified(false)}
        onTouchStart={(e) => e.currentTarget.classList.add('active')}
        onTouchEnd={(e) => e.currentTarget.classList.remove('active')}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] bg-green-800 text-white p-4 rounded-full shadow-lg hover:bg-green-700 active:bg-green-900 transition-all hover:scale-110 active:scale-95 min-w-[56px] min-h-[56px] flex items-center justify-center"
        aria-label="Open tutorial"
      >
        <span className="text-xl">💡</span>
      </button>
    );
  }

  // Expanded view (The floating window)
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] w-[calc(100vw-2rem)] max-w-sm md:w-96 bg-white rounded-xl shadow-2xl border border-green-100 overflow-hidden animate-fade-in-up transition-all duration-300">
      {/* Header */}
      <div className="bg-green-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-white">
          {step.iconType === 'svg' ? (
            <img 
              src={`${import.meta.env.BASE_URL || '/'}icons/${step.icon}`} 
              alt="" 
              className="w-5 h-5 filter brightness-0 invert"
            />
          ) : (
            <span className="text-lg">{step.icon || '👋'}</span>
          )}
          <h3 className="font-bold text-sm tracking-wide">GreenTail Tips</h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMinified(true)}
            onTouchStart={(e) => e.currentTarget.classList.add('active')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('active')}
            className="text-green-200 hover:text-white active:text-green-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Minimize"
          >
            —
          </button>
          <button 
            onClick={handleDismiss}
            onTouchStart={(e) => e.currentTarget.classList.add('active')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('active')}
            className="text-green-200 hover:text-white active:text-green-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {step.content}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 mb-4">
          {steps.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-6 bg-green-600' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={handlePrev}
            onTouchStart={(e) => !e.currentTarget.disabled && e.currentTarget.classList.add('active')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('active')}
            disabled={currentStep === 0}
            className={`text-sm font-medium px-4 py-2.5 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[44px] ${
              currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
            }`}
          >
            Back
          </button>
          
          <div className="text-xs text-gray-400 font-medium flex-shrink-0">
            {currentStep + 1} / {steps.length}
          </div>

          <button
            onClick={handleNext}
            onTouchStart={(e) => e.currentTarget.classList.add('active')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('active')}
            className="bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-green-700 active:bg-green-900 transition-colors shadow-md hover:shadow-lg min-h-[44px] flex-shrink-0"
          >
            {currentStep === steps.length - 1 ? 'Got it!' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;

