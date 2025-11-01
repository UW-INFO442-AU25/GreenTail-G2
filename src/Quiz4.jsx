import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import ProgressBar from './ProgressBar';

function Quiz4() {
  const navigate = useNavigate();
  const { quizData, updateQuizData } = useQuiz();
  const [budget, setBudget] = useState(quizData.budget);
  const [organicPremium, setOrganicPremium] = useState(quizData.organicPremium);
  const [preferredBuying, setPreferredBuying] = useState(quizData.preferredBuying);

  const budgetOptions = ['<$25', '$25–$40', '$40–$60', '$60+', 'Flexible'];
  const organicOptions = ['0%', '~5%', '~10%', '20%+', 'Not sure'];
  const buyingOptions = ['Online delivery', 'Local pickup', 'Either'];

  const handleNext = () => {
    updateQuizData('quiz4', {
      budget: budget,
      organicPremium: organicPremium,
      preferredBuying: preferredBuying
    });
    navigate('/quiz/5');
  };

  const handleBack = () => {
    navigate('/quiz/3');
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
      <ProgressBar currentStep={4} totalSteps={5} />

      {/* Main Content */}
      <div className="pt-8 pb-20">
        <div className="max-w-2xl mx-auto px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Budget & shopping
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Choose what fits your budget and how you like to buy.
            </p>

            {/* Question 1 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Budget band (per 10 lb bag equivalent)?
              </label>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setBudget(option)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                      budget === option
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                We'll also show $/1000 kcal so you can compare value fairly.
              </p>
            </div>

            {/* Question 2 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                How much extra would you pay for organic?
              </label>
              <div className="space-y-3">
                {organicOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="organic"
                      value={option}
                      checked={organicPremium === option}
                      onChange={(e) => setOrganicPremium(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                This helps balance eco highlights vs. price in your best matches.
              </p>
            </div>

            {/* Question 3 */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Where do you prefer to buy?
              </label>
              <div className="space-y-3">
                {buyingOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="buying"
                      value={option}
                      checked={preferredBuying === option}
                      onChange={(e) => setPreferredBuying(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                We'll surface partner links or nearby stores first.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-green-800 transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz4;
