import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import ProgressBar from './ProgressBar';
import NavigationBar from './components/NavigationBar';
import { useTouchHandlers } from './hooks/useInteractionMode';

function Quiz2() {
  const navigate = useNavigate();
  const { quizData, updateQuizData } = useQuiz();
  const [avoidIngredients, setAvoidIngredients] = useState(quizData.avoidIngredients);
  const [feedingStyle, setFeedingStyle] = useState(quizData.feedingStyle);
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();

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
      <NavigationBar />

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
            <fieldset className="mb-6">
              <legend className="block text-lg font-semibold text-gray-900 mb-3">
                Any ingredients to avoid?
              </legend>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Ingredients to avoid selection">
                {ingredients.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => handleIngredientToggle(ingredient)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => handleIngredientToggle(ingredient))}
                    aria-pressed={avoidIngredients.includes(ingredient)}
                    aria-label={`${avoidIngredients.includes(ingredient) ? 'Remove' : 'Add'} ${ingredient} to ingredients to avoid`}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 min-h-[44px] ${
                      avoidIngredients.includes(ingredient)
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2" id="ingredients-hint">
                Unsure? Leave it blank—we'll show gentle options.
              </p>
            </fieldset>

            {/* Question 2 */}
            <fieldset className="mb-8">
              <legend className="block text-lg font-semibold text-gray-900 mb-3">
                Current feeding style?
              </legend>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Current feeding style selection">
                {feedingStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setFeedingStyle(style)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => setFeedingStyle(style))}
                    aria-pressed={feedingStyle === style}
                    aria-label={`Select ${style} as current feeding style`}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 min-h-[44px] ${
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
                  <span className="text-green-600 text-sm font-medium">Tip:</span>
                  <p className="text-green-800 text-sm">
                    New to organic? We'll include a 7-14 day transition plan in your results.
                  </p>
                </div>
              </div>
            </fieldset>

            {/* Navigation */}
            <nav className="flex justify-between items-center" aria-label="Quiz navigation">
              <button
                onClick={handleBack}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, handleBack)}
                aria-label="Go back to previous step"
                className="text-gray-600 hover:text-green-800 transition-colors duration-300 min-h-[44px] min-w-[44px]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, handleNext)}
                aria-label="Continue to next step"
                className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 min-h-[44px] min-w-[44px]"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz2;
