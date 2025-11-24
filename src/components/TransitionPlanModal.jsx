import React, { useState } from 'react';

const TransitionPlanModal = ({ isOpen, onClose, petType = 'Dog', currentFood = 'Regular', newFood = 'Organic' }) => {
  if (!isOpen) return null;

  const transitionPlan = {
    Dog: {
      days: [
        {
          day: 1,
          percentage: 25,
          description: "Mix 25% new food with 75% current food",
          tips: ["Monitor for any digestive changes", "Keep feeding schedule consistent"]
        },
        {
          day: 2,
          percentage: 25,
          description: "Continue 25% new food mixture",
          tips: ["Watch for appetite changes", "Ensure fresh water is available"]
        },
        {
          day: 3,
          percentage: 50,
          description: "Increase to 50% new food",
          tips: ["Check stool consistency", "Reduce treats if needed"]
        },
        {
          day: 4,
          percentage: 50,
          description: "Continue 50% new food mixture",
          tips: ["Monitor energy levels", "Keep exercise routine normal"]
        },
        {
          day: 5,
          percentage: 75,
          description: "Increase to 75% new food",
          tips: ["Watch for any allergic reactions", "Maintain regular feeding times"]
        },
        {
          day: 6,
          percentage: 75,
          description: "Continue 75% new food mixture",
          tips: ["Check coat condition", "Ensure adequate hydration"]
        },
        {
          day: 7,
          percentage: 100,
          description: "Complete transition to 100% new food",
          tips: ["Celebrate successful transition!", "Continue monitoring for 2-3 more days"]
        }
      ],
      warnings: [
        "If your pet shows signs of digestive upset, slow down the transition",
        "Some pets may need 10-14 days for complete transition",
        "Always consult your veterinarian if you have concerns"
      ]
    },
    Cat: {
      days: [
        {
          day: 1,
          percentage: 20,
          description: "Mix 20% new food with 80% current food",
          tips: ["Cats are more sensitive to food changes", "Monitor closely for any refusal to eat"]
        },
        {
          day: 2,
          percentage: 20,
          description: "Continue 20% new food mixture",
          tips: ["Ensure food is fresh", "Keep feeding area clean"]
        },
        {
          day: 3,
          percentage: 40,
          description: "Increase to 40% new food",
          tips: ["Watch for vomiting or diarrhea", "Maintain regular feeding schedule"]
        },
        {
          day: 4,
          percentage: 40,
          description: "Continue 40% new food mixture",
          tips: ["Monitor litter box habits", "Ensure water intake is normal"]
        },
        {
          day: 5,
          percentage: 60,
          description: "Increase to 60% new food",
          tips: ["Check for any behavioral changes", "Keep stress levels low"]
        },
        {
          day: 6,
          percentage: 60,
          description: "Continue 60% new food mixture",
          tips: ["Monitor weight", "Ensure adequate nutrition"]
        },
        {
          day: 7,
          percentage: 80,
          description: "Increase to 80% new food",
          tips: ["Almost there!", "Continue monitoring closely"]
        },
        {
          day: 8,
          percentage: 100,
          description: "Complete transition to 100% new food",
          tips: ["Success! Monitor for another week", "Enjoy your pet's improved health"]
        }
      ],
      warnings: [
        "Cats may need 10-14 days for complete transition",
        "If your cat stops eating, consult your veterinarian immediately",
        "Some cats prefer gradual changes over 2-3 weeks"
      ]
    }
  };

  const plan = transitionPlan[petType] || transitionPlan.Dog;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {petType} Food Transition Plan
            </h2>
            <p className="text-gray-600 mt-1">
              Safe 7-14 day transition from {currentFood} to {newFood} food
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Introduction */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">Why gradual transition?</h3>
            <p className="text-green-700 text-sm">
              A gradual transition helps prevent digestive upset, maintains your pet's appetite, 
              and allows their system to adjust to the new food gradually.
            </p>
          </div>

          {/* Daily Plan */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Daily Transition Schedule</h3>
            {plan.days.map((day, index) => (
              <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Day {day.day}</h4>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {day.percentage}% new food
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{day.description}</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">Tips for Day {day.day}:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {day.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Warnings */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Warnings</h3>
            <ul className="text-yellow-700 text-sm space-y-1">
              {plan.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">!</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Success Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-blue-800 mb-2">Success Tips</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Keep feeding times consistent</li>
              <li>• Ensure fresh water is always available</li>
              <li>• Monitor your pet's weight and energy levels</li>
              <li>• Be patient - every pet adjusts at their own pace</li>
              <li>• Consult your veterinarian if you have any concerns</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Save this plan for future reference
            </p>
            <button
              onClick={onClose}
              className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransitionPlanModal;
