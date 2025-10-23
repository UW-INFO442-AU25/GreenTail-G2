import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

function Quiz0() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz/1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-50">
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
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Progress Bar */}
      <ProgressBar currentStep={0} totalSteps={5} />

      {/* Main Content */}
      <div className="pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tell us about your pet
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            In 90 seconds, we'll personalize recommendations and show the best organic options for your budget and values.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-8">
            <button 
              onClick={handleStartQuiz}
              className="bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl"
            >
              Start Quiz
            </button>
            <a href="#" className="text-gray-600 hover:text-green-800 transition-all duration-300 font-medium text-lg hover:translate-x-1">
              First time pet parenting? →
            </a>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              It's quick
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              Skip what you don't know
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              We don't sell your data
            </span>
          </div>

          <div className="max-w-sm mx-auto">
            <img 
              src="/images/dog.png" 
              alt="Happy dog" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            <p className="text-xs text-gray-500 mt-2">
              ZIP is optional; it only helps with local availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz0;
