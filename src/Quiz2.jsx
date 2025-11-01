import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import ProgressBar from './ProgressBar';

function Quiz2() {
  const navigate = useNavigate();
  const { quizData, updateQuizData } = useQuiz();
  const [avoidIngredients, setAvoidIngredients] = useState(quizData.avoidIngredients);
  const [feedingStyle, setFeedingStyle] = useState(quizData.feedingStyle);

  const ingredients = ['Chicken', 'Beef', 'Fish', 'Dairy', 'Grain', 'Pea/Lentil', 'Soy', 'None', 'Not sure'];
  const feedingStyles = ['Kibble', 'Wet', 'Freeze-dried', 'Fresh', 'Mix', 'Unsure'];

  const handleIngredientToggle = (ingredient) => {
    if (ingredient === 'None') {
      setAvoidIngredients(['None']);
    } else {
      setAvoidIngredients(prev => {
        const filtered = prev.filter(item => item !== 'None');
        if (prev.includes(ingredient)) {
          return filtered.filter(item => item !== ingredient);
        } else {
          return [...filtered, ingredient];
        }
      });
    }
  };

  const handleNext = () => {
    updateQuizData('quiz2', {
      avoidIngredients: avoidIngredients,
      feedingStyle: feedingStyle
    });
    navigate('/quiz/3');
  };

  const handleBack = () => {
    navigate('/quiz/1');
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
      <ProgressBar currentStep={2} totalSteps={5} />

      {/* Main Content */}
      <div className="pt-8 pb-20">
        <div className="max-w-2xl mx-auto px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Diet & sensitivities
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Share anything we should avoid and what you're feeding now.
            </p>

            {/* Question 1 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Any ingredients to avoid?
              </label>
              <div className="flex flex-wrap gap-3">
                {ingredients.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => handleIngredientToggle(ingredient)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                      avoidIngredients.includes(ingredient)
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Unsure? Leave it blank—we'll show gentle options.
              </p>
            </div>

            {/* Question 2 */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Current feeding style?
              </label>
              <div className="flex flex-wrap gap-3">
                {feedingStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setFeedingStyle(style)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                      feedingStyle === style
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 text-lg">💡</span>
                  <p className="text-green-800 text-sm">
                    New to organic? We'll include a 7-14 day transition plan in your results.
                  </p>
                </div>
              </div>
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

export default Quiz2;
