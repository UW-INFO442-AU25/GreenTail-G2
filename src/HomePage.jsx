import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Collapsible from './components/Collapsible';
import ReadingTime from './components/ReadingTime';

/**
 * HomePage - Enhanced with smooth animations per smooth_transition_recommendations.md
 * 
 * Animation Strategy:
 * 1. Page initial load: Staggered animations for hero image, title, description, buttons
 * 2. Scroll-triggered animations: Intersection Observer for content entering viewport
 * 3. Micro-interactions: Hover effects on buttons and images
 * 4. Performance: Only transform and opacity (hardware accelerated)
 * 5. Accessibility: Respects prefers-reduced-motion
 * 
 * Content Optimization Notes:
 * 1. Core information priority: Hero section remains concise, core CTA (Take Quiz) in most visible position
 * 2. Modular layering: Detailed info from "Why Choose" and "Why Trust" moved into collapsible blocks to avoid single-screen overload
 * 3. Single-screen information control: Maximum 2 main information themes per screen, secondary info collapsed by default
 * 4. Reading time labels added: Help users gauge information volume
 * 5. Accessibility optimization: All interactive elements include aria-label, role, and other attributes
 */

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const sectionsRef = useRef({});
  const observerRef = useRef(null);
  // Control expand/collapse for additional "Why Choose GreenTail" cards
  // Optimization reason: Default show 2 core cards only, rest collapsed to ensure max 2 themes per screen
  const [showMoreTips, setShowMoreTips] = useState(false);
  const [moreTipsExpanded, setMoreTipsExpanded] = useState(false);
  const [transparencyExpanded, setTransparencyExpanded] = useState(false);
  
  // Fullscreen video state - controls the video intro sequence
  // Check if user has already seen the video
  // Note: Video should show on first visit only
  const hasSeenVideo = localStorage.getItem('hasSeenIntroVideo') === 'true';
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(!hasSeenVideo);
  const [videoEnded, setVideoEnded] = useState(hasSeenVideo);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(hasSeenVideo);
  
  // Debug: Log video state on mount
  useEffect(() => {
    const localStorageValue = localStorage.getItem('hasSeenIntroVideo');
    console.log('HomePage mounted - Video state:', {
      hasSeenVideo,
      isFullscreenVideo,
      showContent,
      localStorageValue,
      shouldShowVideo: !hasSeenVideo
    });
    
    // Force check: if localStorage is cleared, video should show
    if (!localStorageValue && !isFullscreenVideo) {
      console.warn('WARNING: localStorage is empty but video is not showing! Forcing video to show...');
      setIsFullscreenVideo(true);
      setShowContent(false);
    }
  }, []);
  const fullscreenVideoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Contact modal state
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handle touch events for buttons and links
  const handleTouchStart = (e) => {
    e.currentTarget.classList.add('touch-active');
  };

  const handleTouchEnd = (e, callback) => {
    e.currentTarget.classList.remove('touch-active');
    if (callback) callback();
  };

  // Intersection Observer for scroll-triggered animations
  // Optimization: Uses Intersection Observer API for efficient scroll detection
  // When element reaches 20% visibility, triggers animation
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            const key = entry.target.dataset.sectionKey;
            if (key && !hasAnimated[key]) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
              setHasAnimated((prev) => ({ ...prev, [key]: true }));
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px 0px -50px 0px', // Start animation slightly before fully visible
      }
    );

    // Observe all sections
    Object.keys(sectionsRef.current).forEach((key) => {
      const element = sectionsRef.current[key];
      if (element) {
        element.dataset.sectionKey = key;
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasAnimated]);

  // Handle video skip - immediate transition without animation
  const handleSkipVideo = () => {
    // Mark video as seen in localStorage
    localStorage.setItem('hasSeenIntroVideo', 'true');
    
    setVideoEnded(true);
    setIsFullscreenVideo(false);
    setIsTransitioning(false);
    setShowContent(true);
    
    // Trigger hero animations immediately
    setIsVisible((prev) => ({
      ...prev,
      'hero-image': true,
      'hero-title': true,
      'hero-description': true,
      'hero-button': true,
      'hero-link': true,
      'hero-features': true,
    }));
    setHasAnimated((prev) => ({
      ...prev,
      'hero-image': true,
      'hero-title': true,
      'hero-description': true,
      'hero-button': true,
      'hero-link': true,
      'hero-features': true,
    }));
  };

  // Handle video end and transition to normal view
  const handleVideoEnd = () => {
    // Mark video as seen in localStorage
    localStorage.setItem('hasSeenIntroVideo', 'true');
    
    setVideoEnded(true);
    
    // Start the transition: zoom out and fade (very fast transition)
    setTimeout(() => {
      setIsTransitioning(true);
      
      // After zoom animation completes, switch to normal view
      setTimeout(() => {
        setIsFullscreenVideo(false);
        setIsTransitioning(false);
        
        // Show page content immediately after transition
        setShowContent(true);
        
        // Trigger hero animations
        setTimeout(() => {
          setIsVisible((prev) => ({
            ...prev,
            'hero-image': true,
            'hero-title': true,
            'hero-description': true,
            'hero-button': true,
            'hero-link': true,
            'hero-features': true,
          }));
          setHasAnimated((prev) => ({
            ...prev,
            'hero-image': true,
            'hero-title': true,
            'hero-description': true,
            'hero-button': true,
            'hero-link': true,
            'hero-features': true,
          }));
        }, 100);
      }, 600); // Wait for zoom animation (0.6s - much faster)
    }, 0); // No initial delay
  };

  // Ensure video loads and plays on mount
  useEffect(() => {
    if (fullscreenVideoRef.current && isFullscreenVideo) {
      const video = fullscreenVideoRef.current;
      
      console.log('Video element found, attempting to play:', {
        src: video.src,
        isFullscreenVideo,
        hasSeenVideo: localStorage.getItem('hasSeenIntroVideo')
      });
      
      // Ensure video is muted and set to autoplay (required for autoplay policy)
      video.muted = true;
      video.playsInline = true;
      
      // Add error handler
      video.onerror = (e) => {
        console.error('Video error:', e);
        console.error('Video src:', video.src);
        console.error('Video error details:', video.error);
      };
      
      // Load and play the video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing
            console.log('Video is playing successfully');
          })
          .catch((error) => {
            // Autoplay was prevented
            console.warn('Autoplay prevented:', error);
            // Try to play again after user interaction is detected
            const handleInteraction = () => {
              video.play().catch((err) => {
                console.error('Failed to play video after interaction:', err);
              });
              document.removeEventListener('click', handleInteraction);
              document.removeEventListener('touchstart', handleInteraction);
            };
            document.addEventListener('click', handleInteraction, { once: true });
            document.addEventListener('touchstart', handleInteraction, { once: true });
          });
      }
    } else {
      const localStorageValue = localStorage.getItem('hasSeenIntroVideo');
      console.log('Video not showing because:', {
        hasRef: !!fullscreenVideoRef.current,
        isFullscreenVideo,
        hasSeenVideo: localStorageValue,
        localStorageValue,
        shouldShowVideo: !localStorageValue
      });
      
      // If video should show but ref is not ready, try again after a short delay
      if (isFullscreenVideo && !fullscreenVideoRef.current) {
        console.log('Video ref not ready, will retry in 100ms...');
        setTimeout(() => {
          if (fullscreenVideoRef.current && isFullscreenVideo) {
            console.log('Retrying video play...');
            const video = fullscreenVideoRef.current;
            video.muted = true;
            video.playsInline = true;
            video.play().catch(err => console.warn('Retry play failed:', err));
          }
        }, 100);
      }
    }
  }, [isFullscreenVideo]);

  // Initialize hero animations on mount (only if content should show)
  useEffect(() => {
    // Only trigger initial animations if content is already showing
    if (showContent) {
      setTimeout(() => {
        setIsVisible((prev) => ({
          ...prev,
          'hero-image': true,
          'hero-title': true,
          'hero-description': true,
          'hero-button': true,
          'hero-link': true,
          'hero-features': true,
        }));
        setHasAnimated((prev) => ({
          ...prev,
          'hero-image': true,
          'hero-title': true,
          'hero-description': true,
          'hero-button': true,
          'hero-link': true,
          'hero-features': true,
        }));
      }, 300);
    }
  }, [showContent]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Fullscreen Video Intro - Shows on page load */}
      {isFullscreenVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-black cursor-pointer"
          onClick={handleSkipVideo}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            backgroundColor: 'black'
          }}
        >
          <video 
            ref={fullscreenVideoRef}
            src={`${import.meta.env.BASE_URL || '/'}images/homepage.mp4`}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            onError={(e) => {
              console.error('Video load error:', e);
              const videoSrc = `${import.meta.env.BASE_URL || '/'}images/homepage.mp4`;
              console.error('Video src:', videoSrc);
              console.error('BASE_URL:', import.meta.env.BASE_URL);
              // If video fails to load, skip it and show content
              handleSkipVideo();
              console.error('Full video element:', fullscreenVideoRef.current);
              if (fullscreenVideoRef.current) {
                console.error('Video error code:', fullscreenVideoRef.current.error?.code);
                console.error('Video error message:', fullscreenVideoRef.current.error?.message);
              }
            }}
            onLoadedData={() => {
              console.log('Video loaded successfully');
              // Ensure video plays when loaded
              if (fullscreenVideoRef.current) {
                fullscreenVideoRef.current.play().catch((err) => {
                  console.warn('Autoplay prevented on loadedData:', err);
                });
              }
            }}
            onCanPlay={() => {
              console.log('Video can play');
            }}
            aria-label="GreenTail introduction video"
          />
          {/* Click to skip hint */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm animate-pulse pointer-events-none">
            Click anywhere to skip
          </div>
        </div>
      )}

      {/* Main Page Content - Hidden until video ends */}
      <div 
        className={`transition-opacity duration-1000 ease-out ${
          showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <header className={`bg-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg backdrop-blur-sm bg-white/95' : 'shadow-md'
        }`} id="main-header">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-4">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-green-800">GreenTail</span>
          </div>
          <nav role="navigation" aria-label="Main navigation menu">
            <ul className="flex gap-8 items-center" role="menubar">
              <li role="none"><Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 relative font-medium after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600 after:scale-x-100" aria-label="Go to homepage" role="menuitem">Home</Link></li>
              <li role="none"><Link to="/quiz" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300" aria-label="Start quiz" role="menuitem">Quiz</Link></li>
              <li role="none"><Link to="/search" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300" aria-label="Search products" role="menuitem">Search</Link></li>
              <li role="none"><Link to="/compare" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300" aria-label="Compare products" role="menuitem">Compare</Link></li>
              <li role="none"><Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300" aria-label="About us" role="menuitem">About</Link></li>
              <li role="none"><Link to="/profile" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300" aria-label="User profile" role="menuitem">Profile</Link></li>
              {user ? (
                <li className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {user.provider === 'google' && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    {user.provider === 'apple' && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    )}
                    <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, handleLogout)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors min-h-[44px] min-w-[44px]"
                    aria-label="Log out"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link 
                    to="/login" 
                    className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors font-medium"
                    aria-label="Log in"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {/* Optimization: Initial load animations - hero image, title, description, buttons with staggered timing */}
      <section className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 pt-24 pb-28 relative overflow-hidden">
        {/* Decorative background elements with darker overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className={`max-w-6xl mx-auto px-8 relative z-10 transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Title: Fade-in & Slide-up - 0.6s ease-out, from 20px below */}
            {/* Optimization: Classic title entrance - slide up 20px while fading in */}
            <div 
              className="space-y-8"
              ref={el => sectionsRef.current['hero-content'] = el}
              style={{ paddingTop: '2rem' }}
            >
              <div 
                ref={el => sectionsRef.current['hero-title'] = el}
                className={`transition-all duration-1000 ease-out ${
                  isVisible['hero-title'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionTimingFunction: 'ease-out' }}
              >
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6 drop-shadow-lg">
                  Feed well. Do right by the planet.
                </h1>
              </div>
              
              {/* Description: Delayed fade-in - delay 0.2s, duration 0.8s */}
              {/* Optimization: Creates natural reading flow from title to body */}
              <div 
                ref={el => sectionsRef.current['hero-description'] = el}
                className={`transition-all duration-1000 ease-out ${
                  isVisible['hero-description'] 
                    ? 'opacity-100' 
                    : 'opacity-0'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-center">
                  {/* Action button: Staggered fade-in & slide-up */}
                  {/* Optimization: Button appears after description (delay 500ms) */}
                  <Link 
                    to="/quiz/0" 
                    ref={el => sectionsRef.current['hero-button'] = el}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e)}
                    className={`bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg relative overflow-hidden group min-h-[44px] shadow-lg hover:shadow-xl ${
                      isVisible['hero-button'] 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-5'
                    }`}
                    style={{ 
                      transitionDelay: '800ms',
                      transition: 'transform 0.3s ease-out, opacity 0.8s ease-out, box-shadow 0.3s ease',
                      transform: 'translateY(0)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                    }}
                    aria-label="Start 90-second quiz to get personalized recommendations"
                  >
                    <span className="relative z-10">Take the 90-sec Quiz</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </Link>
                  <Link 
                    to="/first-time" 
                    ref={el => sectionsRef.current['hero-link'] = el}
                    className={`text-white/90 hover:text-white font-medium text-lg transition-all duration-500 ${
                      isVisible['hero-link'] 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-5'
                    }`}
                    style={{ transitionDelay: '1000ms' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    First time owning pet? →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main Visual/Dog Image - Appears after fullscreen video ends */}
            {/* Optimization: Image smoothly appears after video transition, floating above background */}
            <div 
              className="text-center relative"
              ref={el => sectionsRef.current['hero-image'] = el}
              style={{ paddingTop: '2rem' }}
            >
              <div 
                className={`transition-all duration-1500 ease-out ${
                  isVisible['hero-image'] && showContent
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <div className="relative inline-block">
                  {/* Floating shadow effect - soft glow without box */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20 blur-3xl transform translate-y-8 scale-125 -z-10"></div>
                  <img 
                    src={`${import.meta.env.BASE_URL}images/hero-dog.png`}
                    alt="Happy dog representing GreenTail's mission to help pets and the planet"
                    className="max-w-full h-auto transition-all duration-500 ease-out relative z-10"
                    style={{
                      transform: 'translateY(-10px) scale(1)',
                      filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
                      transition: 'transform 0.5s ease-out, filter 0.5s ease-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-20px) scale(1.05)';
                      e.currentTarget.style.filter = 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.2))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1)';
                      e.currentTarget.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero features: Staggered fade-in */}
          {/* Optimization: Features appear sequentially after hero content */}
          <div 
            className="grid grid-cols-2 gap-4 md:gap-6 mt-8"
            ref={el => sectionsRef.current['hero-features'] = el}
          >
            {[
              { key: 'hero-feature-1', icon: 'leaf.svg', text: 'Low-footprint proteins', delay: 800, svgIcon: (
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              )},
              { key: 'hero-feature-2', icon: 'recycle-icon.svg', text: 'Recyclable packaging', delay: 950, svgIcon: (
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.5 2L16 6l4 1-2 3 3 1-2.5 4"/>
                  <path d="M5.5 2L8 6l-4 1 2 3-3 1 2.5 4"/>
                  <circle cx="12" cy="16" r="6"/>
                  <path d="M10 16l1 2 2-2"/>
                </svg>
              )},
              { key: 'hero-feature-3', icon: 'check-icon.svg', text: 'Trusted certifications', delay: 1100, svgIcon: (
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              )},
              { key: 'hero-feature-4', icon: 'location-icon.svg', text: 'Made closer to you', delay: 1250, svgIcon: (
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              )},
            ].map((feature) => (
              <div
                key={feature.key}
                ref={el => sectionsRef.current[feature.key] = el}
                className={`flex items-center gap-5 transition-all duration-300 ease-out ${
                  isVisible[feature.key] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ 
                  transitionDelay: isVisible[feature.key] ? `${feature.delay}ms` : '0ms',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
                  if (iconWrapper) {
                    iconWrapper.style.transform = 'scale(1.15) rotate(-5deg)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
                  if (iconWrapper) {
                    iconWrapper.style.transform = 'scale(1) rotate(0deg)';
                  }
                }}
              >
                <div 
                  className="icon-wrapper w-16 h-16 bg-white/95 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {feature.svgIcon}
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-xl md:text-[22px] text-white font-semibold leading-snug"
                    style={{
                      letterSpacing: '-0.3px',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {feature.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {/* Optimization: Scroll-triggered title animation, staggered card animations */}
      <section className="py-20 md:py-28 bg-gray-50" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div 
            className="flex justify-center items-center mb-16 relative"
            ref={el => sectionsRef.current['how-it-works-title'] = el}
          >
            <div 
              className={`transition-all duration-600 ease-out ${
                isVisible['how-it-works-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">How it works</h2>
            </div>
            <ReadingTime minutes={2} className="absolute right-0 hidden md:block" />
          </div>
          {/* How it works cards: Staggered fade-in on scroll */}
          {/* Optimization: Cards appear sequentially when scrolling into view */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { key: 'how-step-1', icon: 'paw-icon.svg', title: 'Tell us about your pet', text: "Share your pet's age, size, dietary needs, and your sustainability priorities.", delay: 0, svgIcon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="9" r="2"/>
                  <circle cx="15" cy="9" r="2"/>
                  <circle cx="9" cy="15" r="2"/>
                  <circle cx="15" cy="15" r="2"/>
                  <path d="M12 5v14"/>
                </svg>
              )},
              { key: 'how-step-2', icon: 'search-icon.svg', title: 'We analyze products', text: 'Our algorithm scores products on environmental impact, nutrition, and value.', delay: 150, svgIcon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              )},
              { key: 'how-step-3', icon: 'heart-icon.svg', title: 'Get personalized picks', text: "Receive recommendations that match your pet's needs and your values.", delay: 300, svgIcon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#059669" stroke="#059669" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
                </svg>
              )},
            ].map((step) => (
              <div
                key={step.key}
                className="text-center group transition-all duration-300 ease bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl hover:-translate-y-2"
                ref={el => sectionsRef.current[step.key] = el}
                style={{
                  transform: isVisible[step.key] ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible[step.key] ? 1 : 0,
                  transition: `transform 0.5s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease`,
                  transitionDelay: isVisible[step.key] ? `${step.delay}ms` : '0ms',
                }}
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors duration-300 p-4">
                  {step.svgIcon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
          <div 
            className="text-center space-y-4"
            ref={el => sectionsRef.current['how-it-works-cta'] = el}
          >
            <div
              className={`transition-all duration-500 ease-out ${
                isVisible['how-it-works-cta'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <Link 
                to="/quiz/0" 
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e)}
                className="bg-green-800 text-white px-8 py-4 rounded-lg font-bold text-lg inline-block transition-all duration-300 min-h-[44px] shadow-lg hover:shadow-xl"
                style={{
                  transform: 'translateY(0)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                }}
                aria-label="Start quiz"
              >
                Start the Quiz
              </Link>
              <p className="text-gray-600 mt-4">
                <Link to="/login" className="text-green-800 hover:underline">Already have an account? Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GreenTail Section */}
      {/* Optimization: Scroll-triggered title animation, staggered card animations */}
      <section className="py-20 md:py-28" aria-labelledby="why-choose-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div 
            className="flex justify-center items-center mb-16 relative"
            ref={el => sectionsRef.current['why-choose-title'] = el}
          >
            <div 
              className={`transition-all duration-600 ease-out ${
                isVisible['why-choose-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <h2 id="why-choose-heading" className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Why choose GreenTail?</h2>
            </div>
            <ReadingTime minutes={1} className="absolute right-0 hidden md:block" />
          </div>
          
          {/* Core information: Default show first 2 most important cards */}
          {/* Optimization: Cards appear sequentially when scrolling into view */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[
              { key: 'why-card-1', icon: 'leaf.svg', title: 'Why organic?', text: 'Fewer synthetic pesticides on crops/ingredients.', ariaLabel: 'Why choose organic products', delay: 0 },
              { key: 'why-card-2', icon: 'recycle-icon.svg', title: 'Switch slowly', text: 'Mix new food over 7–14 days to avoid tummy upsets.', ariaLabel: 'How to transition pet food gradually', delay: 150 },
            ].map((card) => (
              <div
                key={card.key}
                className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200 relative overflow-hidden group transition-all duration-300 ease"
                role="article"
                aria-label={card.ariaLabel}
                ref={el => sectionsRef.current[card.key] = el}
                style={{
                  transform: isVisible[card.key] ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible[card.key] ? 1 : 0,
                  transition: `transform 0.5s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease`,
                  transitionDelay: isVisible[card.key] ? `${card.delay}ms` : '0ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></div>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 p-4">
                  <img src={`${import.meta.env.BASE_URL}icons/${card.icon}`} alt={`${card.title} icon`} className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-semibold text-emerald-600 mb-3">{card.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Secondary information: Collapsed display, users can actively expand for more tips */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-start">
              <button
                onClick={() => setMoreTipsExpanded(!moreTipsExpanded)}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors min-h-[36px]"
                aria-expanded={moreTipsExpanded}
                aria-label={moreTipsExpanded ? 'Collapse more helpful tips' : 'Expand to view more GreenTail usage tips'}
              >
                <span className="font-medium">More helpful tips</span>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                    moreTipsExpanded ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                moreTipsExpanded ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!moreTipsExpanded}
            >
                {moreTipsExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { key: 'tip-1', icon: 'check-icon.svg', title: 'Read the label', text: 'Ingredients order matters; look for clear sourcing and certifications.', delay: 0 },
                      { key: 'tip-2', icon: 'location-icon.svg', title: 'Budget & eco swaps', text: 'Try a best-match topper first; pick recyclable or compostable bags.', delay: 150 },
                    ].map((tip) => (
                      <div
                        key={tip.key}
                        className="text-center p-6 bg-white rounded-xl shadow-lg relative overflow-hidden group transition-all duration-300 ease"
                        style={{
                          transform: moreTipsExpanded ? 'translateY(0)' : 'translateY(20px)',
                          opacity: moreTipsExpanded ? 1 : 0,
                          transition: `transform 0.5s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease`,
                          transitionDelay: moreTipsExpanded ? `${tip.delay}ms` : '0ms',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-8px)';
                          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <img src={`${import.meta.env.BASE_URL}icons/${tip.icon}`} alt={`${tip.title} icon`} className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-green-800 mb-3">{tip.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{tip.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
        </div>
      </section>

      {/* Why Trust GreenTail Section */}
      {/* Optimization: Scroll-triggered title animation */}
      <section className="py-20 bg-gray-50" aria-labelledby="why-trust-heading">
        <div className="max-w-6xl mx-auto px-8">
          <div 
            className="flex justify-center items-center mb-16 relative"
            ref={el => sectionsRef.current['why-trust-title'] = el}
          >
            <div 
              className={`transition-all duration-600 ease-out ${
                isVisible['why-trust-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <h2 id="why-trust-heading" className="text-4xl font-bold text-center text-gray-900">Why trust GreenTail?</h2>
            </div>
            <ReadingTime minutes={1} className="absolute right-0 hidden md:block" />
          </div>
          
          {/* Core trust points: Default expand first most important one */}
          {/* Optimization: Card appears when scrolling into view */}
          <div 
            className="mb-6"
            ref={el => sectionsRef.current['why-trust-card'] = el}
          >
            <div 
              className={`flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg transition-all duration-500 ease-out ${
                isVisible['why-trust-card'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              role="article"
              aria-label="Clear evaluation criteria"
            >
              <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                <img src={`${import.meta.env.BASE_URL}icons/yes-icon.svg`} alt="" className="w-3 h-3 filter brightness-0 invert" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Clear criteria, no grades</h4>
                <p className="text-gray-600 leading-relaxed">We show eco highlights and "Best match" instead of vague letter grades.</p>
              </div>
            </div>
          </div>

          {/* Detailed trust information: Collapsed display */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex justify-start mb-4">
              <button
                onClick={() => setTransparencyExpanded(!transparencyExpanded)}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors min-h-[36px]"
                aria-expanded={transparencyExpanded}
                aria-label={transparencyExpanded ? 'Collapse transparency commitment' : 'Expand to view detailed information about GreenTail\'s transparency commitment'}
              >
                <span className="font-medium">Learn about our transparency commitment</span>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                    transparencyExpanded ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                transparencyExpanded ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!transparencyExpanded}
            >
              {transparencyExpanded && (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      transform: transparencyExpanded ? 'translateY(0)' : 'translateY(20px)',
                      opacity: transparencyExpanded ? 1 : 0,
                      transition: `transform 0.5s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease`,
                      transitionDelay: transparencyExpanded ? '0ms' : '0ms',
                    }}
                  >
                    <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                      <img src={`${import.meta.env.BASE_URL}icons/yes-icon.svg`} alt="" className="w-3 h-3 filter brightness-0 invert" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Receipts included</h4>
                      <p className="text-gray-600 leading-relaxed">Every product page explains why it appears, full transparency.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      transform: transparencyExpanded ? 'translateY(0)' : 'translateY(20px)',
                      opacity: transparencyExpanded ? 1 : 0,
                      transition: `transform 0.5s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease`,
                      transitionDelay: transparencyExpanded ? '150ms' : '0ms',
                    }}
                  >
                    <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                      <img src={`${import.meta.env.BASE_URL}icons/yes-icon.svg`} alt="" className="w-3 h-3 filter brightness-0 invert" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Independent</h4>
                      <p className="text-gray-600 leading-relaxed">Scores exist whether or not there's a buy link.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/about" 
              className="text-green-800 font-medium hover:underline"
              aria-label="Learn more about our team"
            >
              Learn more about our team →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="w-6 h-6" />
                GreenTail
              </h3>
              <p className="text-gray-600 leading-relaxed">Helping pet parents choose organic, planet-friendly food with confidence.</p>
            </div>
            <div className="flex items-center justify-end">
              <ul className="flex flex-wrap gap-4 md:gap-6 items-center">
                <li className="flex items-center"><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Quiz</Link></li>
                <li className="flex items-center"><Link to="/first-time" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Learn</Link></li>
                <li className="flex items-center"><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Compare</Link></li>
                <li className="flex items-center">
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="text-gray-600 hover:text-green-800 transition-colors duration-300 cursor-pointer p-0 border-0 bg-transparent"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-gray-600">© 2025 GreenTail. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Kaibo Wang</p>
                <a href="mailto:kwang37@uw.edu" className="text-green-600 hover:text-green-800">
                  kwang37@uw.edu
                </a>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Lele Zhang</p>
                <a href="mailto:lelez@uw.edu" className="text-green-600 hover:text-green-800">
                  lelez@uw.edu
                </a>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Lanqi Zhang</p>
                <a href="mailto:zha12935@uw.edu" className="text-green-600 hover:text-green-800">
                  zha12935@uw.edu
                </a>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Sammi Huang</p>
                <a href="mailto:shuang36@uw.edu" className="text-green-600 hover:text-green-800">
                  shuang36@uw.edu
                </a>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Amber Lu</p>
                <a href="mailto:yuyaol@uw.edu" className="text-green-600 hover:text-green-800">
                  yuyaol@uw.edu
                </a>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowContactModal(false)}
                className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default HomePage;
