import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import ProgressBar from './ProgressBar';

function Quiz1() {
  const navigate = useNavigate();
  const { quizData, updateQuizData } = useQuiz();
  const [selectedPet, setSelectedPet] = useState(quizData.pet);
  const [selectedLifeStage, setSelectedLifeStage] = useState(quizData.lifeStage);
  const [selectedWeight, setSelectedWeight] = useState(quizData.weight);

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
                className="text-gray-600 hover:text-green-800 transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedPet || !selectedLifeStage || !selectedWeight}
                className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition-colors duration-300"
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
