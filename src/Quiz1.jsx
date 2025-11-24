import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import ProgressBar from './ProgressBar';
import NavigationBar from './components/NavigationBar';

function Quiz1() {
  const navigate = useNavigate();
  const { quizData, updateQuizData } = useQuiz();
  const [selectedPet, setSelectedPet] = useState(quizData.pet);
  const [selectedLifeStage, setSelectedLifeStage] = useState(quizData.lifeStage);
  const [selectedWeight, setSelectedWeight] = useState(quizData.weight);

  // Handle touch events for buttons
  const handleTouchStart = (e) => {
    e.currentTarget.classList.add('touch-active');
  };

  const handleTouchEnd = (e, callback) => {
    e.currentTarget.classList.remove('touch-active');
    callback();
  };

  const handleNext = () => {
    if (selectedPet && selectedLifeStage && selectedWeight) {
      updateQuizData('quiz1', {
        pet: selectedPet,
        lifeStage: selectedLifeStage,
        weight: selectedWeight
      });
      navigate('/quiz/2');
    }
  };

  const handleBack = () => {
    navigate('/quiz/0');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-50">
      <NavigationBar />

      {/* Progress Bar */}
      <ProgressBar currentStep={1} totalSteps={5} />

      {/* Main Content */}
      <div className="pt-8 pb-20">
        <div className="max-w-2xl mx-auto px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              About your pet
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Answer a few basics so we can tailor your results.
            </p>

            {/* Question 1 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                What pet are we shopping for?
              </label>
              <div className="flex flex-wrap gap-3">
                {['Dog', 'Cat'].map((pet) => (
                  <button
                    key={pet}
                    onClick={() => setSelectedPet(pet)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => setSelectedPet(pet))}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      selectedPet === pet
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {pet}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Life stage?
              </label>
              <div className="flex flex-wrap gap-3">
                {['Puppy/Kitten', 'Adult', 'Senior'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedLifeStage(stage)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => setSelectedLifeStage(stage))}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      selectedLifeStage === stage
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Approx. weight range?
              </label>
              <div className="flex flex-wrap gap-3">
                {['<10 lb', '10-25 lb', '26-50 lb', '51-90 lb', '90+ lb', 'Not sure'].map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => setSelectedWeight(weight))}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      selectedWeight === weight
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, handleBack)}
                className="text-gray-600 hover:text-green-800 transition-colors duration-300 min-w-[44px] min-h-[44px]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => !(!selectedPet || !selectedLifeStage || !selectedWeight) && handleTouchEnd(e, handleNext)}
                disabled={!selectedPet || !selectedLifeStage || !selectedWeight}
                className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition-colors duration-300 min-w-[44px] min-h-[44px]"
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

export default Quiz1;
