import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import YouTubeVideo from './components/YouTubeVideo';

const FirstTimePage = () => {
  const { sectionsRef, getAnimationClass, getParallaxStyle } = useScrollAnimation();
  const videoRef = useRef(null);

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
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-8">
              New to pet parenting? Start here.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
              A quick guide to caring for your new pet—health, food, and daily routines—plus what "organic" really means.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <Link to="/quiz/1" className="bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
                <span className="relative z-10">Take the 90-sec Quiz</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </Link>
              <button onClick={scrollToVideo} className="text-gray-600 hover:text-green-800 transition-all duration-300 font-medium text-lg hover:translate-x-1">
                Watch 2‑min overview →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoRef} className="py-20">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Video: Getting started with your pet</h2>
          <div className="max-w-4xl mx-auto">
            <YouTubeVideo
              videoId="RXh5yyGmP5k"
              title="Pet Nutrition Guide for New Pet Parents"
              startTime={6}
            />
          </div>
        </div>
      </section>

      {/* Essentials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Essentials you'll want to know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Supplies checklist</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Leash/collar or carrier, bowls, bed, litter/poop bags, ID tag, brush, toys.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Vet & vaccines</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Find a local vet, schedule an exam, keep vaccine and microchip records handy.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Nutrition basics</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Choose by species & life stage. Watch portions; fresh water always.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Switch foods slowly</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Mix new food over 7–14 days to avoid tummy upsets.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Read the label</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Ingredients order matters; look for clear sourcing and certifications.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Budget & eco swaps</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Try a best-match topper first; pick recyclable or compostable bags.</p>
            </div>
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
