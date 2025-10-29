import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { useScrollAnimation } from './hooks/useScrollAnimation';

function Quiz0() {
  const navigate = useNavigate();
  const { sectionsRef, getAnimationClass, getParallaxStyle } = useScrollAnimation();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartQuiz = () => {
    setIsStarting(true);
    setTimeout(() => navigate('/quiz/1'), 300);
  };

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
            <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/logos/logo.png" alt="GreenTail Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-2xl font-bold text-green-800">GreenTail</span>
          </div>
          <nav>
            <ul className="flex gap-8">
              <li><a href="/" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Home</a></li>
              <li><a href="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300 relative font-medium after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-green-800">Quiz</a></li>
              <li><a href="/search" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Search</a></li>
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
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Let’s find the perfect organic match for your pet 🐾
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              In just 90 seconds, get personalized organic food and product recommendations tailored to your pet’s needs — and your budget.
            </p>
            
            <div className="flex flex-col gap-4 items-center justify-center mb-8">
              <button 
                onClick={handleStartQuiz}
                className={`bg-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-green-700 hover:shadow-xl ${isStarting ? 'scale-95' : 'scale-100'}`}
              >
                {isStarting ? 'Starting…' : "Start My Pet Quiz"}
              </button>
              <Link to="/first-time" className="text-gray-600 hover:text-green-800 transition-all duration-300 font-medium text-base">
                New to pet parenting? See our beginner’s guide →
              </Link>
            </div>

            <div className="flex justify-center gap-4 mb-12 flex-nowrap overflow-x-auto px-4">
              <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                <svg className="w-4 h-4 text-green-700" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h7l-1 8 11-14h-7l0-6z"/></svg>
                It’s quick
              </span>
              <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                <svg className="w-4 h-4 text-green-700" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5l8 7-8 7V5z"/></svg>
                Skip what you don’t know
              </span>
              <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                <svg className="w-4 h-4 text-green-700" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/></svg>
                We don’t sell your data
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz0;
