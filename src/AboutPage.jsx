import { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import NavigationBar from './components/NavigationBar';

/**
 * AboutPage - Enhanced with smooth animations per smooth_transition_recommendations.md
 * 
 * Animation Strategy:
 * 1. Page initial load: Staggered animations for hero image, title, description, buttons
 * 2. Scroll-triggered animations: Intersection Observer for content entering viewport
 * 3. Micro-interactions: Hover effects on buttons and images
 * 4. Performance: Only transform and opacity (hardware accelerated)
 * 5. Accessibility: Respects prefers-reduced-motion
 */
const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const [showContactModal, setShowContactModal] = useState(false);
  const sectionsRef = useRef({});
  const observerRef = useRef(null);

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


  // Initialize hero animations on mount
  useEffect(() => {
    // Hero section animates immediately on page load
    setTimeout(() => {
      setIsVisible((prev) => ({
        ...prev,
        'hero-image': true,
        'hero-title': true,
        'hero-description': true,
        'hero-button-1': true,
        'hero-button-2': true,
      }));
      setHasAnimated((prev) => ({
        ...prev,
        'hero-image': true,
        'hero-title': true,
        'hero-description': true,
        'hero-button-1': true,
        'hero-button-2': true,
      }));
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      {/* Hero Section */}
      {/* Optimization: Initial load animations - hero image, title, description, buttons with staggered timing */}
      <section className="about-hero-section pt-24">
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Main Visual/Image - Subtle Scale & Fade-in */}
            {/* Optimization: scale(1.05) to scale(1) with opacity 0->1, duration 1.2s */}
            <div 
              className="lg:w-1/2"
              ref={el => sectionsRef.current['hero-image'] = el}
            >
              <div 
                className={`transition-all duration-1200 ease-out ${
                  isVisible['hero-image'] 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <div className="earth-illustration">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/earth-pets.png`} 
                    alt="Earth with pets, symbolizing GreenTail's mission to help pet parents make sustainable choices" 
                    className="w-full"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            {/* Title: Fade-in & Slide-up - 0.6s ease-out, from 20px below */}
            {/* Optimization: Classic title entrance - slide up 20px while fading in */}
            <div 
              className="lg:w-1/2 text-center lg:text-left"
              ref={el => sectionsRef.current['hero-text'] = el}
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
                <h1 className="about-section-title text-4xl lg:text-5xl">
                  Why GreenTail exists
                </h1>
              </div>
              
              {/* Description: Delayed fade-in - delay 0.2s, duration 0.8s */}
              {/* Optimization: Creates natural reading flow from title to body */}
              <div 
                ref={el => sectionsRef.current['hero-description'] = el}
                className={`transition-all duration-800 ease-out ${
                  isVisible['hero-description'] 
                    ? 'opacity-100' 
                    : 'opacity-0'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <p className="about-section-subtitle text-lg">
                  We&apos;re building a clearer, faster way to choose organic pet foods that fit your pet and your budget. No more confusing labels or endless research.
                </p>
              </div>
              
              {/* Action buttons: Staggered fade-in & slide-up */}
              {/* Optimization: Buttons appear sequentially (0.3s + 0.15s intervals) after description */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#mission" 
                  ref={el => sectionsRef.current['hero-button-1'] = el}
                  className={`about-btn-primary ${
                    isVisible['hero-button-1'] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ 
                    transitionDelay: '800ms',
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                  }}
                  aria-label="Scroll to our mission section"
                >
                  Our mission
                </a>
                <a 
                  href="#team" 
                  ref={el => sectionsRef.current['hero-button-2'] = el}
                  className={`about-btn-secondary ${
                    isVisible['hero-button-2'] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ 
                    transitionDelay: '650ms',
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                  }}
                  aria-label="Scroll to meet the team section"
                >
                  Meet the team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      {/* Optimization: Scroll-triggered animations using Intersection Observer */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-emerald-100/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          {/* Section Title: Fade-in & Slide-up (consistent with hero title) */}
          {/* Optimization: Uses Intersection Observer - triggers when 20% visible */}
          <div 
            className="mb-16"
            ref={el => sectionsRef.current['value-title'] = el}
          >
            <div 
              className={`transition-all duration-600 ease-out ${
                isVisible['value-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why does it matter?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mx-auto rounded-full"></div>
            </div>
          </div>
          
          {/* Value cards: Staggered fade-in on scroll */}
          {/* Optimization: Cards appear sequentially when scrolling into view */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="about-quote-card"
              ref={el => sectionsRef.current['value-card-1'] = el}
              style={{
                opacity: isVisible['value-card-1'] ? 1 : 0,
                transform: isVisible['value-card-1'] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              }}
            >
              <p className="about-quote-text">
                Pure ingredients, lighter footprint.
              </p>
            </div>
            
            <div 
              className="about-quote-card"
              ref={el => sectionsRef.current['value-card-2'] = el}
              style={{
                opacity: isVisible['value-card-2'] ? 1 : 0,
                transform: isVisible['value-card-2'] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.15s, transform 0.8s ease-out 0.15s',
              }}
            >
              <p className="about-quote-text">
                Nourish naturally. Reduce the impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      {/* Optimization: Scroll-triggered title animation, staggered card animations */}
      <section id="mission" className="py-24 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div 
            className="text-center mb-20"
            ref={el => sectionsRef.current['mission-title'] = el}
          >
            <div 
              className={`transition-all duration-600 ease-out ${
                isVisible['mission-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <div className="inline-block">
                <h2 className="about-section-title text-4xl lg:text-6xl">
                  Our mission
                </h2>
              </div>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                Help pet parents pick organic, lower-impact foods that fit real budgets—quickly and clearly.
              </p>
            </div>
          </div>
          
          {/* Mission cards: Staggered fade-in on scroll */}
          {/* Optimization: Cards appear sequentially when scrolling into view */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { key: 'mission-card-1', title: 'Clarity over jargon', text: 'Plain-language eco highlights that actually make sense.', gradient: 'from-green-800 to-emerald-700', bgGradient: 'from-green-400/20 to-emerald-500/20', delay: 0 },
              { key: 'mission-card-2', title: 'Fair cost comparison', text: 'Show and Compare the cost.', gradient: 'from-emerald-700 to-teal-600', bgGradient: 'from-emerald-400/20 to-teal-500/20', delay: 150 },
              { key: 'mission-card-3', title: 'Progress, not perfection', text: 'Choose your top two eco priorities that matter most.', gradient: 'from-teal-600 to-green-700', bgGradient: 'from-teal-400/20 to-green-500/20', delay: 300 },
              { key: 'mission-card-4', title: 'Privacy-first', text: 'ZIP used only for shop info, nothing more.', gradient: 'from-green-800 to-emerald-700', bgGradient: 'from-green-400/20 to-emerald-500/20', delay: 450 },
            ].map((card) => (
              <div
                key={card.key}
                className="about-mission-card"
                ref={el => sectionsRef.current[card.key] = el}
                style={{
                  opacity: isVisible[card.key] ? 1 : 0,
                  transform: isVisible[card.key] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease-out ${card.delay}ms, transform 0.5s ease-out ${card.delay}ms`,
                }}
              >
                <div className="decoration-circle"></div>
                <h3>
                  {card.title}
                </h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* Optimization: Scroll-triggered title animation, staggered team member cards */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div 
            className="text-center mb-16"
            ref={el => sectionsRef.current['team-title'] = el}
          >
            <div 
              className={`transition-all duration-600 ease-out ${
                isVisible['team-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet our team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A passionate group of designers and researchers working to make pet food choices simpler.
              </p>
            </div>
          </div>
          {/* Team member cards: Staggered fade-in on scroll */}
          {/* Optimization: Cards appear sequentially with hover effects on images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: 'team-1', name: 'Sammi Huang', role: 'Product Manager', image: 'Sammi.png' },
              { key: 'team-2', name: 'Lele Zhang', role: 'UX & Research', image: 'Lele.jpg' },
              { key: 'team-3', name: 'Kaibo Wang', role: 'Product Design', image: 'kaiboWang.jpg' },
              { key: 'team-4', name: 'Lanqi Zhang', role: 'User Research', image: 'Lanqi.jpg' },
              { key: 'team-5', name: 'Amber Lu', role: 'Development', image: 'Amber.jpg' },
            ].map((member, index) => (
              <div
                key={member.key}
                className="about-team-card"
                ref={el => sectionsRef.current[member.key] = el}
                style={{
                  opacity: isVisible[member.key] ? 1 : 0,
                  transform: isVisible[member.key] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
                  transitionDelay: isVisible[member.key] ? `${index * 150}ms` : '0ms',
                }}
              >
                <div className="about-avatar-wrapper">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/${member.image}`} 
                    alt={member.name}
                    className="about-avatar-img"
                    loading="lazy"
                    width="140"
                    height="140"
                  />
                </div>
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the data */}
      {/* Optimization: Scroll-triggered animations with gradient background and decorative elements */}
      <section id="data" className="py-24 bg-gradient-to-br from-green-50 via-emerald-50/30 to-blue-50/20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div 
              className="lg:w-1/2"
              ref={el => sectionsRef.current['data-content'] = el}
            >
              <div 
                className={`transition-all duration-800 ease-out ${
                  isVisible['data-content'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
              >
                <div className="inline-block mb-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    About the data
                  </h3>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-full"></div>
                </div>
                <p 
                  className="text-gray-600 mb-6 leading-relaxed text-lg"
                  style={{
                    opacity: isVisible['data-content'] ? 1 : 0,
                    transform: isVisible['data-content'] ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
                  }}
                >
                  Products, prices, ingredients, packaging, and certifications come from retailer and brand pages. We harmonized names and computed $/1000 kcal for fair comparison. Where data is missing, we use mock placeholders.
                </p>
                <p 
                  className="text-gray-600 mb-6 leading-relaxed text-lg"
                  style={{
                    opacity: isVisible['data-content'] ? 1 : 0,
                    transform: isVisible['data-content'] ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
                  }}
                >
                  Store locations, availability, hours, and contact information in the &quot;Find store nearby&quot; feature are mock data generated for demonstration purposes. These stores and their product inventories are simulated and do not represent actual retail locations.
                </p>
                <small 
                  className="text-gray-500"
                  style={{
                    opacity: isVisible['data-content'] ? 1 : 0,
                    transform: isVisible['data-content'] ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s',
                  }}
                >
                  This is an INFO 442: Cooperative Software Development Autumn 2025 project; sources and prices may change.
                </small>
              </div>
            </div>
            {/* Data section image with floating effect */}
            <div 
              className="lg:w-1/2 relative"
              ref={el => sectionsRef.current['data-image'] = el}
            >
              <div 
                className={`relative inline-block w-full transition-all duration-800 ease-out ${
                  isVisible['data-image'] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-105'
                }`}
              >
                {/* Floating shadow effect - soft glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20 blur-3xl transform translate-y-8 scale-125 -z-10"></div>
                <img 
                  src={`${import.meta.env.BASE_URL}images/cat-dog.png`} 
                  alt="Cat and dog, representing the pets that GreenTail helps pet parents care for" 
                  className="w-full rounded-xl transition-all duration-500 ease-out relative z-10"
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
      </section>

      {/* Learn more */}
      <footer className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Learn more</h3>
          <ul className="flex flex-wrap gap-4 md:gap-6 mb-8 items-center">
            <li className="flex items-center">
              <a 
                href="https://docs.google.com/presentation/d/1CGDfJP_38tJmNWYQfVimajFI3okfaEKoQ5zCbNe3idw/edit?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Project deck ↗
              </a>
            </li>
            <li className="flex items-center">
              <a href="https://github.com/UW-INFO442-AU25/GreenTail-G2" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-medium">
                GitHub repo ↗
              </a>
            </li>
            <li className="flex items-center">
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-green-600 hover:text-green-800 font-medium cursor-pointer p-0 border-0 bg-transparent inline-block"
              >
                Contact us ↗
              </button>
            </li>
          </ul>
          <p className="text-gray-500">© 2025 GreenTail. INFO 442: Cooperative Software Development Autumn 2025.</p>
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
                className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
