import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import ProgressBar from './ProgressBar';
import NavigationBar from './components/NavigationBar';
import { useTouchHandlers } from './hooks/useInteractionMode';

function Quiz3() {
  const navigate = useNavigate();
  const { quizData, updateQuizData } = useQuiz();
  const [selectedPriorities, setSelectedPriorities] = useState(quizData.priorities);
  const [mainGoal, setMainGoal] = useState(quizData.mainGoal);
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();

  const priorities = [
    'Lower-footprint protein',
    'Recyclable/compostable packaging',
    'Credible certifications',
    'Made closer to me'
  ];

  const goals = [
    'Keep my pet healthy',
    'Reduce environmental impact',
    'Stay on budget',
    'Learn the basics'
  ];

  const handlePriorityToggle = (priority) => {
    setSelectedPriorities(prev => {
      if (prev.includes(priority)) {
        return prev.filter(item => item !== priority);
      } else if (prev.length < 2) {
        return [...prev, priority];
      } else {
        return prev;
      }
    });
  };

  const handleNext = () => {
    updateQuizData('quiz3', {
      priorities: selectedPriorities,
      mainGoal: mainGoal
    });
    navigate('/quiz/4');
  };

  const handleBack = () => {
    navigate('/quiz/2');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-50">
      <NavigationBar />

      {/* Progress Bar */}
      <ProgressBar currentStep={3} totalSteps={5} />

      {/* Main Content */}
      <div className="pt-8 pb-20">
        <div className="max-w-2xl mx-auto px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Your priorities
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Tell us what "eco-friendly" means to you.
            </p>

            {/* Question 1 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-lg font-semibold text-gray-900">
                  Choose your top two for "eco-friendly"
                </label>
                <span className="text-sm text-gray-500">
                  {selectedPriorities.length}/2 selected
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {priorities.map((priority) => (
                  <button
                    key={priority}
                    onClick={() => handlePriorityToggle(priority)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => handlePriorityToggle(priority))}
                    disabled={!selectedPriorities.includes(priority) && selectedPriorities.length >= 2}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 min-h-[44px] ${
                      selectedPriorities.includes(priority)
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Pick two (you can change this later).
              </p>
            </div>

            {/* Question 2 */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                What's your main goal today?
              </label>
              <div className="flex flex-wrap gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setMainGoal(goal)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => setMainGoal(goal))}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 min-h-[44px] ${
                      mainGoal === goal
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                This helps us tune recommendations and tips.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, handleBack)}
                className="text-gray-600 hover:text-green-800 transition-colors duration-300 min-h-[44px] min-w-[44px]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, handleNext)}
                className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 min-h-[44px] min-w-[44px]"
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

export default Quiz3;
