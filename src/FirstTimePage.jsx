import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import YouTubeVideo from './components/YouTubeVideo';

const FirstTimePage = () => {
  const { sectionsRef, getAnimationClass, getParallaxStyle } = useScrollAnimation();
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const observerRef = useRef(null);

  // Intersection Observer for scroll-triggered animations
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
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

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
  }, [hasAnimated, sectionsRef]);

  // Initialize hero animations on mount
  useEffect(() => {
    setTimeout(() => {
      setIsVisible((prev) => ({
        ...prev,
        'hero-title': true,
        'hero-description': true,
        'hero-buttons': true,
      }));
      setHasAnimated((prev) => ({
        ...prev,
        'hero-title': true,
        'hero-description': true,
        'hero-buttons': true,
      }));
    }, 300);
  }, []);

  const scrollToVideo = () => {
    if (!videoRef.current) return;
    const headerOffset = 80; // fixed header height
    const elementPosition = videoRef.current.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-green-800">GreenTail</span>
          </div>
          <nav>
            <ul className="flex gap-8">
              <li><Link to="/" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Home</Link></li>
              <li><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Quiz</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Search</Link></li>
              <li><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center">
            <div 
              ref={el => sectionsRef.current['hero-title'] = el}
              className={`transition-all duration-1000 ease-out ${
                isVisible['hero-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
                New to pet parenting? Start here.
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mx-auto rounded-full mb-8"></div>
            </div>
            <div 
              ref={el => sectionsRef.current['hero-description'] = el}
              className={`transition-all duration-800 ease-out mb-12 ${
                isVisible['hero-description'] 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A quick guide to caring for your new pet—health, food, and daily routines—plus what "organic" really means.
              </p>
            </div>
            <div 
              ref={el => sectionsRef.current['hero-buttons'] = el}
              className={`flex flex-col sm:flex-row gap-6 items-center justify-center transition-all duration-800 ease-out ${
                isVisible['hero-buttons'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <Link to="/quiz/1" className="bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
                <span className="relative z-10">Take the 90-sec Quiz</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>
              <button onClick={scrollToVideo} className="text-gray-600 hover:text-green-800 transition-all duration-300 font-medium text-lg hover:translate-x-1">
                Watch 5‑min overview →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoRef} className="py-20 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <div 
            ref={el => sectionsRef.current['video-title'] = el}
            className={`mb-8 transition-all duration-600 ease-out ${
              isVisible['video-title'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Video: Getting started with your pet</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mx-auto rounded-full"></div>
          </div>
          <div 
            ref={el => sectionsRef.current['video-content'] = el}
            className={`max-w-4xl mx-auto transition-all duration-800 ease-out ${
              isVisible['video-content'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <YouTubeVideo
              videoId="RXh5yyGmP5k"
              title="Pet Nutrition Guide for New Pet Parents"
              startTime={6}
            />
          </div>
        </div>
      </section>

      {/* Essentials Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-emerald-50/30 to-blue-50/20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div 
            ref={el => sectionsRef.current['essentials-title'] = el}
            className="mb-16 text-center"
          >
            <div 
              className={`transition-all duration-600 ease-out ${
                isVisible['essentials-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Essentials you'll want to know</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mx-auto rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: 'essentials-1', title: 'Supplies checklist', text: 'Leash/collar or carrier, bowls, bed, litter/poop bags, ID tag, brush, toys.' },
              { key: 'essentials-2', title: 'Vet & vaccines', text: 'Find a local vet, schedule an exam, keep vaccine and microchip records handy.' },
              { key: 'essentials-3', title: 'Nutrition basics', text: 'Choose by species & life stage. Watch portions; fresh water always.' },
              { key: 'essentials-4', title: 'Switch foods slowly', text: 'Mix new food over 7–14 days to avoid tummy upsets.' },
              { key: 'essentials-5', title: 'Read the label', text: 'Ingredients order matters; look for clear sourcing and certifications.' },
              { key: 'essentials-6', title: 'Budget & eco swaps', text: 'Try a best-match topper first; pick recyclable or compostable bags.' },
            ].map((card, index) => (
              <div
                key={card.key}
                ref={el => sectionsRef.current[card.key] = el}
                className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100/50 hover:border-green-300/50 relative overflow-hidden transition-all duration-300 ease"
                style={{
                  transform: isVisible[card.key] ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible[card.key] ? 1 : 0,
                  transition: `transform 0.5s ease-out, opacity 0.5s ease-out, box-shadow 0.3s ease`,
                  transitionDelay: isVisible[card.key] ? `${index * 100}ms` : '0ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="w-6 h-6" />
                GreenTail
              </h3>
              <p className="text-gray-600 leading-relaxed">Helping pet parents choose organic, planet-friendly food with confidence.</p>
            </div>
            <div>
              <ul className="space-y-2">
                <li><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Quiz</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Learn</a></li>
                <li><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Compare</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">How We Evaluate</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-gray-600">© 2025 GreenTail. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FirstTimePage;
