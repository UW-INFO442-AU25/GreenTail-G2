import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { sectionsRef, getAnimationClass, getParallaxStyle } = useScrollAnimation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-2xl font-bold text-green-800">GreenTail</span>
          </div>
          <nav>
            <ul className="flex gap-8 items-center">
              <li><Link to="/" className="text-gray-600 hover:text-green-800 transition-colors duration-300 relative font-medium after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-green-800">Home</Link></li>
              <li><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Quiz</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Search</Link></li>
              <li><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</Link></li>
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
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link 
                    to="/login" 
                    className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
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
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 pt-32 pb-20 relative overflow-hidden">
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0 opacity-20"
          style={getParallaxStyle(0.3)}
        >
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              className="space-y-8"
              ref={el => sectionsRef.current['hero-content'] = el}
            >
              <div className={getAnimationClass('hero-content')}>
                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                  Feed well. Do right by the planet.
                </h1>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <Link to="/quiz/0" className="bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
                    <span className="relative z-10">Take the 90-sec Quiz</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </Link>
                  <Link to="/first-time" className="text-gray-600 hover:text-green-800 transition-all duration-300 font-medium text-lg hover:translate-x-1">
                    First time owning pet? →
                  </Link>
                </div>
              </div>
            </div>
            <div 
              className="text-center"
              ref={el => sectionsRef.current['hero-image'] = el}
            >
              <div className={getAnimationClass('hero-image', 200)}>
                <img 
                  src="/images/hero-dog.png" 
                  alt="Happy dog with organic food" 
                  className="max-w-full h-auto transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
          <div 
            className="grid grid-cols-2 gap-4 mt-8"
            ref={el => sectionsRef.current['hero-features'] = el}
          >
            <div className={getAnimationClass('hero-features', 400)}>
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-green-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <img src="/icons/leaf.svg" alt="Leaf" className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-700 font-medium">Low-footprint proteins</span>
              </div>
            </div>
            <div className={getAnimationClass('hero-features', 500)}>
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-green-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <img src="/icons/recycle-icon.svg" alt="Recycle" className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-700 font-medium">Recyclable packaging</span>
              </div>
            </div>
            <div className={getAnimationClass('hero-features', 600)}>
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-green-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <img src="/icons/check-icon.svg" alt="Check" className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-700 font-medium">Trusted certifications</span>
              </div>
            </div>
            <div className={getAnimationClass('hero-features', 700)}>
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-green-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <img src="/icons/location-icon.svg" alt="Location" className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-700 font-medium">Made closer to you</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <img src="/icons/paw-icon.svg" alt="Paw" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tell us about your pet</h3>
              <p className="text-gray-600 leading-relaxed">Share your pet's age, size, dietary needs, and your sustainability priorities.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <img src="/icons/search-icon.svg" alt="Search" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">We analyze products</h3>
              <p className="text-gray-600 leading-relaxed">Our algorithm scores products on environmental impact, nutrition, and value.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <img src="/icons/heart-icon.svg" alt="Heart" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get personalized picks</h3>
              <p className="text-gray-600 leading-relaxed">Receive recommendations that match your pet's needs and your values.</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <Link to="/quiz/0" className="bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl inline-block">
              Start the Quiz
            </Link>
            <p className="text-gray-600">
              <Link to="/login" className="text-green-800 hover:underline">Already have an account? Sign in</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose GreenTail Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why choose GreenTail?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icons/leaf.svg" alt="Leaf" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Why organic?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Fewer synthetic pesticides on crops/ingredients.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icons/recycle-icon.svg" alt="Recycle" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Switch slowly</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Mix new food over 7–14 days to avoid tummy upsets.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icons/check-icon.svg" alt="Check" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Read the label</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Ingredients order matters; look for clear sourcing and certifications.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icons/location-icon.svg" alt="Location" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Budget & eco swaps</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Try a best-match topper first; pick recyclable or compostable bags.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust GreenTail Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why trust GreenTail?</h2>
          <div className="space-y-8 mb-8">
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/icons/yes-icon.svg" alt="Yes" className="w-3 h-3 filter brightness-0 invert" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Clear criteria, no grades</h4>
                <p className="text-gray-600 leading-relaxed">We show eco highlights and "Best match" instead of vague letter grades.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/icons/yes-icon.svg" alt="Yes" className="w-3 h-3 filter brightness-0 invert" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Receipts included</h4>
                <p className="text-gray-600 leading-relaxed">Every product page explains why it appears, full transparency.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-5 h-5 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/icons/yes-icon.svg" alt="Yes" className="w-3 h-3 filter brightness-0 invert" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Independent</h4>
                <p className="text-gray-600 leading-relaxed">Scores exist whether or not there's a buy link.</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/about" className="text-green-800 font-medium hover:underline">Learn more about our team →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <img src="/logos/logo.png" alt="GreenTail Logo" className="w-6 h-6" />
                GreenTail
              </h3>
              <p className="text-gray-600 leading-relaxed">Helping pet parents choose organic, planet-friendly food with confidence.</p>
            </div>
            <div>
              <ul className="space-y-2">
                <li><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Quiz</Link></li>
                <li><Link to="/first-time" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Learn</Link></li>
                <li><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Compare</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">How We Evaluate</a></li>
                <li><Link to="/about" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Contact</Link></li>
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
}

export default HomePage;
