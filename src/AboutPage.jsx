import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AboutPage = () => {
  const { user, logout } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});

  const handleLogout = () => {
    logout();
    // Note: We'll add navigation later if needed
  };

  // Scroll animation effect
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logos/logo.png" alt="GreenTail Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-green-800">GreenTail</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/quiz" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Quiz
              </Link>
              <Link to="/search" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Search
              </Link>
              <Link to="/compare" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Compare
              </Link>
              <Link to="/about" className="text-green-800 px-3 py-2 text-sm font-medium border-b-2 border-green-800">
                About
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Profile
              </Link>
              {user ? (
                <div className="flex items-center gap-2">
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
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0 opacity-20"
          style={getParallaxStyle(0.3)}
        >
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div 
              className="lg:w-1/2"
              ref={el => sectionsRef.current['hero-image'] = el}
              style={getParallaxStyle(0.2)}
            >
              <div className={getAnimationClass('hero-image')}>
                <img 
                  src="/images/earth-pets.png" 
                  alt="Earth with pets" 
                  className="w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div 
              className="lg:w-1/2 text-center lg:text-left"
              ref={el => sectionsRef.current['hero-text'] = el}
            >
              <div className={getAnimationClass('hero-text', 200)}>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Why GreenTail exists
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We're building a clearer, faster way to choose organic pet foods that fit your pet and your budget. No more confusing labels or endless research.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="#mission" 
                    className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg"
                  >
                    Our mission
                  </a>
                  <a 
                    href="#team" 
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg"
                  >
                    Meet the team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Parallax background decoration */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-emerald-100/20"
          style={getParallaxStyle(0.1)}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div 
            className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-xl"
            style={getParallaxStyle(0.4)}
          ></div>
          <div 
            className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-xl"
            style={getParallaxStyle(0.3)}
          ></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          <div 
            className="mb-16"
            ref={el => sectionsRef.current['value-title'] = el}
          >
            <div className={getAnimationClass('value-title')}>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent mb-6">
                Why does it matter?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mx-auto rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="group bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100/50 hover:border-green-200"
              ref={el => sectionsRef.current['value-card-1'] = el}
            >
              <div className={getAnimationClass('value-card-1', 200)}>
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <p className="text-2xl text-gray-800 font-semibold leading-relaxed relative z-10">
                    "Pure ingredients, lighter footprint."
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              className="group bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100/50 hover:border-green-200"
              ref={el => sectionsRef.current['value-card-2'] = el}
            >
              <div className={getAnimationClass('value-card-2', 400)}>
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <p className="text-2xl text-gray-800 font-semibold leading-relaxed relative z-10">
                    "Nourish naturally. Reduce the impact."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 relative overflow-hidden">
        {/* Parallax background decoration */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-full blur-3xl"
            style={getParallaxStyle(0.2)}
          ></div>
          <div 
            className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"
            style={getParallaxStyle(0.3)}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div 
            className="text-center mb-20"
            ref={el => sectionsRef.current['mission-title'] = el}
          >
            <div className={getAnimationClass('mission-title')}>
              <div className="inline-block">
                <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-8">
                  Our mission
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 mx-auto rounded-full mb-8"></div>
              </div>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                Help pet parents pick organic, lower-impact foods that fit real budgets—quickly and clearly.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div 
              className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100/50 hover:border-green-300/50 relative overflow-hidden"
              ref={el => sectionsRef.current['mission-card-1'] = el}
            >
              <div className={getAnimationClass('mission-card-1', 200)}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent mb-4">
                    Clarity over jargon
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Plain-language eco highlights that actually make sense.</p>
                </div>
              </div>
            </div>
            
            <div 
              className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100/50 hover:border-green-300/50 relative overflow-hidden"
              ref={el => sectionsRef.current['mission-card-2'] = el}
            >
              <div className={getAnimationClass('mission-card-2', 400)}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
                    Fair cost comparison
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Show and Compare the cost.</p>
                </div>
              </div>
            </div>
            
            <div 
              className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100/50 hover:border-green-300/50 relative overflow-hidden"
              ref={el => sectionsRef.current['mission-card-3'] = el}
            >
              <div className={getAnimationClass('mission-card-3', 600)}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-green-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-green-700 bg-clip-text text-transparent mb-4">
                    Progress, not perfection
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Choose your top two eco priorities that matter most.</p>
                </div>
              </div>
            </div>
            
            <div 
              className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-green-100/50 hover:border-green-300/50 relative overflow-hidden"
              ref={el => sectionsRef.current['mission-card-4'] = el}
            >
              <div className={getAnimationClass('mission-card-4', 800)}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent mb-4">
                    Privacy-first
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">ZIP used only for shop info, nothing more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet our team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A passionate group of designers and researchers working to make pet food choices simpler.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <img 
                src="/images/Sammi.png" 
                alt="Sammi Huang" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sammi Huang</h3>
              <p className="text-gray-600">UX & PM</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <img 
                src="/images/Lele.jpg" 
                alt="Lele Zhang" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lele Zhang</h3>
              <p className="text-gray-600">Data & Research</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <img 
                src="/images/kaiboWang.jpg" 
                alt="Kaibo Wang" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover object-center scale-110"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kaibo Wang</h3>
              <p className="text-gray-600">Product Design</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <img 
                src="/images/Lanqi.jpg" 
                alt="Lanqi Zhang" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lanqi Zhang</h3>
              <p className="text-gray-600">User Research</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <img 
                src="/images/Amber.jpg" 
                alt="Amber Lu" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Amber Lu</h3>
              <p className="text-gray-600">Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* About the data */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">About the data</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Products, prices, ingredients, packaging, and certifications come from retailer and brand pages. We harmonized names and computed $/1000 kcal for fair comparison. Where data is missing, we use mock placeholders.
              </p>
              <small className="text-gray-500">This is an INFO 442: Cooperative Software Development Autumn 2025 project; sources and prices may change.</small>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/images/cat-dog.png" 
                alt="Cat and dog" 
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Learn more */}
      <footer className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Learn more</h3>
          <ul className="space-y-4 mb-8">
            <li>
              <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                Project deck ↗
              </a>
            </li>
            <li>
              <a href="https://github.com/kaibo-wang/GreenTail-G2" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-medium">
                GitHub repo ↗
              </a>
            </li>
            <li>
              <a href="mailto:contact@greentail.com" className="text-green-600 hover:text-green-800 font-medium">
                Contact us ↗
              </a>
            </li>
          </ul>
          <p className="text-gray-500">© 2025 GreenTail. INFO 442: Cooperative Software Development Autumn 2025.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
