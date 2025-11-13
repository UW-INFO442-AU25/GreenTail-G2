import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has accepted cookies and if the consent has expired
    const checkCookieConsent = () => {
      const consentData = localStorage.getItem('cookieConsent');
      
      if (!consentData) {
        // No consent data, show the banner
        setShowConsent(true);
        return;
      }

      try {
        const { accepted, timestamp } = JSON.parse(consentData);
        
        if (!accepted) {
          // User hasn't accepted, show the banner
          setShowConsent(true);
          return;
        }

        // Check if consent has expired (30 days = 30 * 24 * 60 * 60 * 1000 ms)
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        const now = Date.now();
        const consentTime = timestamp || 0;
        
        if (now - consentTime > thirtyDaysInMs) {
          // Consent has expired, show the banner again
          setShowConsent(true);
        }
      } catch (error) {
        // Error parsing consent data, show the banner
        console.error('Error parsing cookie consent:', error);
        setShowConsent(true);
      }
    };

    // Small delay to ensure smooth page load
    const timer = setTimeout(checkCookieConsent, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    const consentData = {
      accepted: true,
      timestamp: Date.now()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By clicking "Accept Cookies", you consent to our use of cookies. 
              <Link to="/cookie-policy" className="text-green-800 hover:text-green-900 underline ml-1">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 bg-green-800 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg min-h-[44px] min-w-[120px]"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

