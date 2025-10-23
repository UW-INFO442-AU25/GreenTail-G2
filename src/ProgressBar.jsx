import React from 'react';

function ProgressBar({ currentStep, totalSteps = 5 }) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white border-b border-gray-200 py-2" style={{ marginTop: '80px' }}>
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-600">Progress</span>
          <span className="text-xs font-medium text-green-800">{currentStep}/{totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-green-800 h-1 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
