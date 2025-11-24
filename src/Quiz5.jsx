import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import ProgressBar from './ProgressBar';
import NavigationBar from './components/NavigationBar';
import { useTouchHandlers } from './hooks/useInteractionMode';

function Quiz5() {
  const navigate = useNavigate();
  const { quizData, updateQuizData } = useQuiz();
  const [alternativeProteins, setAlternativeProteins] = useState(quizData.alternativeProteins);
  const [organicExperience, setOrganicExperience] = useState(quizData.organicExperience);
  const [zipCode, setZipCode] = useState(quizData.zipCode);
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();

  const proteinOptions = ['No', 'Maybe', 'Yes'];
  const experienceOptions = ['Beginner', 'Tried a few', 'Experienced'];

  const handleNext = () => {
    updateQuizData('quiz5', {
      alternativeProteins: alternativeProteins,
      organicExperience: organicExperience,
      zipCode: zipCode
    });
    navigate('/results');
  };

  const handleBack = () => {
    navigate('/quiz/4');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-50">
      <NavigationBar />

      {/* Progress Bar */}
      <ProgressBar currentStep={5} totalSteps={5} />

      {/* Main Content */}
      <div className="pt-8 pb-20">
        <div className="max-w-2xl mx-auto px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Openness & learning
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Tell us how adventurous you are and how much help you'd like.
            </p>

            {/* Question 1 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Would you consider alternative proteins if they fit your pet?
              </label>
              <div className="flex flex-wrap gap-3">
                {proteinOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAlternativeProteins(option)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => setAlternativeProteins(option))}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 min-h-[44px] ${
                      alternativeProteins === option
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Your experience with organic pet food?
              </label>
              <div className="flex flex-wrap gap-3">
                {experienceOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setOrganicExperience(option)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => setOrganicExperience(option))}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 min-h-[44px] ${
                      organicExperience === option
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                We'll tailor your Mini Education Pack on the results screen.
              </p>
            </div>

            {/* Question 3 */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                ZIP code (optional)
              </label>
              <input
                type="text"
                placeholder="e.g., 98105"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-2">
                ZIP only helps show local availability; it's optional.
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
                See Best Matches
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz5;
