import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/logos/logo.png" alt="GreenTail Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-2xl font-bold text-green-800">GreenTail</span>
          </div>
          <nav>
            <ul className="flex gap-8">
              <li><Link to="/" className="text-gray-600 hover:text-green-800 transition-colors duration-300 relative font-medium after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-green-800">Home</Link></li>
              <li><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Quiz</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Search</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Feed well. Do right by the planet.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                In 90 seconds, we learn about your pet and show the best organic foods that fit your budget and values.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Link to="/quiz/0" className="bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
                  <span className="relative z-10">Take the 90-sec Quiz</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </Link>
                <Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-all duration-300 font-medium text-lg hover:translate-x-1">
                  First time owning pet? →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-green-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <img src="/icons/leaf.svg" alt="Leaf" className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Low-footprint proteins</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-green-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <img src="/icons/recycle-icon.svg" alt="Recycle" className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Recyclable packaging</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-green-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <img src="/icons/check-icon.svg" alt="Check" className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Trusted certifications</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-green-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <img src="/icons/location-icon.svg" alt="Location" className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Made closer to you</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="/images/hero-dog.png" 
                alt="Happy dog with organic food" 
                className="max-w-full h-auto"
              />
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
              <a href="#" className="text-green-800 hover:underline">Already have an account? Sign in</a>
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
              <a href="#" className="text-green-800 text-sm font-medium hover:underline mt-3 inline-block">Learn more →</a>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icons/recycle-icon.svg" alt="Recycle" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Switch slowly</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Mix new food over 7–14 days to avoid tummy upsets.</p>
              <a href="#" className="text-green-800 text-sm font-medium hover:underline mt-3 inline-block">Learn more →</a>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icons/check-icon.svg" alt="Check" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Read the label</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Ingredients order matters; look for clear sourcing and certifications.</p>
              <a href="#" className="text-green-800 text-sm font-medium hover:underline mt-3 inline-block">Learn more →</a>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icons/location-icon.svg" alt="Location" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Budget & eco swaps</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Try a best-match topper first; pick recyclable or compostable bags.</p>
              <a href="#" className="text-green-800 text-sm font-medium hover:underline mt-3 inline-block">Learn more →</a>
            </div>
          </div>
          <div className="text-center">
            <a href="#" className="text-green-800 font-medium hover:underline">Explore all tips →</a>
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
            <a href="#" className="text-green-800 font-medium hover:underline">Learn more about our team →</a>
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
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Quiz</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Learn</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Compare</a></li>
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
}

export default HomePage;
