import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { useTouchHandlers } from './hooks/useInteractionMode';

/**
 * Quiz0 - Enhanced Quiz Landing Page per redesign proposal
 * 
 * Architecture:
 * 1. Enhanced Hero Section - Improved headline, sub-headline, CTA with microcopy
 * 2. How It Works Section - 3-step process explanation
 * 3. Social Proof Section - Testimonials and trust badge
 * 
 * Animation Strategy:
 * - Initial load: Staggered animations for hero elements
 * - Scroll-triggered: How It Works and Social Proof sections
 * - Micro-interactions: Button hover effects
 * - Performance: Only transform and opacity (hardware accelerated)
 */

function Quiz0() {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const sectionsRef = useRef({});
  const observerRef = useRef(null);
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();

  const handleStartQuiz = () => {
    setIsStarting(true);
    setTimeout(() => navigate('/quiz/1'), 300);
  };

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
  }, [hasAnimated]);

  // Initialize hero animations on mount
  useEffect(() => {
    setTimeout(() => {
      setIsVisible((prev) => ({
        ...prev,
        'hero-title': true,
        'hero-subtitle': true,
        'hero-cta': true,
        'hero-microcopy': true,
        'hero-features': true,
      }));
      setHasAnimated((prev) => ({
        ...prev,
        'hero-title': true,
        'hero-subtitle': true,
        'hero-cta': true,
        'hero-microcopy': true,
        'hero-features': true,
      }));
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-50">
      {/* Decorative BG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -left-20 top-48 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
      </div>

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
              <li><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300 relative font-medium after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-green-800">Quiz</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Search</Link></li>
              <li><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Progress Bar */}
      <ProgressBar currentStep={0} totalSteps={5} />

      {/* Main Content */}
      <div className="pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          {/* Enhanced Hero Section */}
          {/* Phase 1: Enhanced Hero with improved messaging and animations */}
          <section className="text-center mb-20">
            {/* Main Headline - Fade-in & Slide-up */}
            <div 
              ref={el => sectionsRef.current['hero-title'] = el}
              className={`transition-all duration-1000 ease-out ${
                isVisible['hero-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionTimingFunction: 'ease-out' }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Let's find the perfect organic match for your pet 🐾
          </h1>
            </div>
            
            {/* Sub-headline - Delayed fade-in */}
            <div 
              ref={el => sectionsRef.current['hero-subtitle'] = el}
              className={`transition-all duration-800 ease-out mb-8 max-w-2xl mx-auto ${
                isVisible['hero-subtitle'] 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <p className="text-lg text-gray-700">
                Our quick and easy quiz analyzes your pet's needs to recommend ideal organic food options.
              </p>
            </div>
            
            {/* CTA Button and Microcopy - Staggered fade-in */}
            <div className="flex flex-col gap-4 items-center justify-center mb-8">
            <button 
              onClick={handleStartQuiz}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, handleStartQuiz)}
                ref={el => sectionsRef.current['hero-cta'] = el}
                className={`bg-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ease min-h-[44px] ${
                  isVisible['hero-cta'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                } ${isStarting ? 'scale-95' : 'scale-100'}`}
                style={{ 
                  transitionDelay: '800ms',
                  transform: 'translateY(0)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, opacity 0.5s ease-out, box-shadow 0.3s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isStarting) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.backgroundColor = '#065f46'; // green-700
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isStarting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.backgroundColor = '#166534'; // green-800
                  }
                }}
                aria-label="Start the 90-second quiz to get personalized recommendations"
              >
                {isStarting ? 'Starting…' : "Start The 90-Second Quiz"}
            </button>
              
              {/* Microcopy below CTA */}
              <div 
                ref={el => sectionsRef.current['hero-microcopy'] = el}
                className={`transition-all duration-1000 ease-out ${
                  isVisible['hero-microcopy'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '1200ms' }}
              >
                <p className="text-sm text-gray-600 font-medium">5 simple steps. Personalized results.</p>
              </div>
              
              <Link 
                to="/first-time" 
                className="text-gray-600 hover:text-green-800 transition-all duration-300 font-medium text-base"
                style={{ transitionDelay: '1200ms' }}
              >
                New to pet parenting? See our beginner's guide →
            </Link>
          </div>

            {/* Feature Tags - Staggered fade-in */}
            <div 
              ref={el => sectionsRef.current['hero-features'] = el}
              className="flex justify-center gap-4 mb-12 flex-nowrap overflow-x-auto px-4"
            >
              {[
                { key: 'hero-feature-1', icon: 'M13 2L3 14h7l-1 8 11-14h-7l0-6z', text: "It's quick", delay: 1500 },
                { key: 'hero-feature-2', icon: 'M8 5l8 7-8 7V5z', text: "Skip what you don't know", delay: 1750 },
                { key: 'hero-feature-3', icon: 'M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z', text: "We don't sell your data", delay: 2000 },
              ].map((feature) => (
                <span
                  key={feature.key}
                  ref={el => sectionsRef.current[feature.key] = el}
                  className={`flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-800 ease-out ${
                    isVisible[feature.key] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: isVisible[feature.key] ? `${feature.delay}ms` : '0ms' }}
                >
                  <svg className="w-4 h-4 text-green-700" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d={feature.icon}/>
                  </svg>
                  {feature.text}
            </span>
              ))}
            </div>
          </section>

          {/* Phase 2: How It Works Section */}
          {/* Optimization: Scroll-triggered animations using Intersection Observer */}
          <section 
            className="py-20 bg-white/50 rounded-2xl mb-20"
            aria-labelledby="how-it-works-heading"
            ref={el => sectionsRef.current['how-it-works'] = el}
          >
            <div 
              className="text-center mb-16"
              ref={el => sectionsRef.current['how-it-works-title'] = el}
            >
              <div 
                className={`transition-all duration-1000 ease-out ${
                  isVisible['how-it-works-title'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
              >
                <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  How It Works
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Get personalized organic food recommendations in three simple steps
                </p>
              </div>
            </div>
            
            {/* Three-Step Process - Staggered fade-in on scroll */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { 
                  key: 'how-step-1', 
                  icon: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
                  title: 'Answer questions',
                  description: "Tell us about your pet's age, size, dietary needs, and your sustainability priorities.",
                  delay: 0
                },
                { 
                  key: 'how-step-2', 
                  icon: 'M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.05-.33-.04-.66-.25-.89l-1.07-1.33z',
                  title: 'We analyze products',
                  description: 'Our algorithm scores products on environmental impact, nutrition, and value.',
                  delay: 250
                },
                { 
                  key: 'how-step-3', 
                  icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
                  title: 'Get personalized picks',
                  description: "Receive recommendations that match your pet's needs and your values.",
                  delay: 500
                },
              ].map((step) => (
                <div
                  key={step.key}
                  className="text-center group transition-all duration-300 ease"
                  ref={el => sectionsRef.current[step.key] = el}
                  style={{
                    transform: isVisible[step.key] ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible[step.key] ? 1 : 0,
                    transition: `transform 0.8s ease-out, opacity 0.8s ease-out`,
                    transitionDelay: isVisible[step.key] ? `${step.delay}ms` : '0ms',
                  }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                    <svg className="w-8 h-8 text-green-800" viewBox="0 0 24 24" fill="currentColor">
                      <path d={step.icon}/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Phase 3: Social Proof Section */}
          {/* Optimization: Scroll-triggered animations using Intersection Observer */}
          <section 
            className="py-20 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl"
            aria-labelledby="social-proof-heading"
            ref={el => sectionsRef.current['social-proof'] = el}
          >
            <div 
              className="text-center mb-16"
              ref={el => sectionsRef.current['social-proof-title'] = el}
            >
              <div 
                className={`transition-all duration-1000 ease-out ${
                  isVisible['social-proof-title'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
              >
                <h2 id="social-proof-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Trusted by Pet Parents
                </h2>
              </div>
            </div>
            
            {/* Testimonials - Staggered fade-in */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {[
                {
                  key: 'testimonial-1',
                  quote: "The quiz helped me find organic options that fit my budget. My dog loves the recommendations!",
                  author: "Sarah M.",
                  delay: 0
                },
                {
                  key: 'testimonial-2',
                  quote: "I appreciated the transparency about environmental impact. Finally found a brand I can trust.",
                  author: "Michael R.",
                  delay: 250
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.key}
                  className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 ease"
                  ref={el => sectionsRef.current[testimonial.key] = el}
                  style={{
                    transform: isVisible[testimonial.key] ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible[testimonial.key] ? 1 : 0,
                    transition: `transform 0.8s ease-out, opacity 0.8s ease-out, box-shadow 0.3s ease`,
                    transitionDelay: isVisible[testimonial.key] ? `${testimonial.delay}ms` : '0ms',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <p className="text-gray-700 italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
                  <p className="text-sm font-semibold text-gray-900">— {testimonial.author}</p>
                </div>
              ))}
          </div>

            {/* Trust Badge - Fade-in on scroll */}
            <div 
              className="text-center"
              ref={el => sectionsRef.current['trust-badge'] = el}
            >
              <div 
                className={`inline-block bg-white px-8 py-4 rounded-full shadow-lg transition-all duration-600 ease-out ${
                  isVisible['trust-badge'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <p className="text-lg font-semibold text-gray-900">
                  Join <span className="text-green-800 text-2xl font-bold">5,000+</span> pet parents who found their perfect organic match!
            </p>
          </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Quiz0;
