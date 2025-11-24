import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

const PetFoodLabelsGuide = () => {
  const [activeSection, setActiveSection] = useState('ingredients');

  const sections = {
    ingredients: {
      title: "Ingredients List",
      icon: "",
      content: {
        main: "Ingredients are listed in order of weight, from highest to lowest.",
        details: [
          "The first 3-5 ingredients make up the majority of the food",
          "Look for whole protein sources (chicken, beef, fish) as the first ingredient",
          "Avoid foods where corn, wheat, or soy are in the top 3 ingredients",
          "Meat meals (chicken meal, fish meal) are concentrated protein sources",
          "Preservatives should be natural (vitamin E, vitamin C) rather than chemical"
        ],
        examples: {
          good: [
            "Chicken, Chicken Meal, Brown Rice, Oatmeal, Chicken Fat",
            "Salmon, Salmon Meal, Sweet Potato, Peas, Canola Oil"
          ],
          avoid: [
            "Corn, Chicken By-Product Meal, Wheat, Soybean Meal, Corn Gluten Meal",
            "Meat and Bone Meal, Corn, Wheat Flour, Animal Fat"
          ]
        }
      }
    },
    guaranteed: {
      title: "Guaranteed Analysis",
      icon: "",
      content: {
        main: "This shows the minimum/maximum percentages of key nutrients.",
        details: [
          "Crude Protein: Should be 18-30% for dogs, 26-40% for cats",
          "Crude Fat: Should be 8-20% for dogs, 9-20% for cats",
          "Crude Fiber: Should be less than 5% for most pets",
          "Moisture: Wet food has 70-80%, dry food has 8-12%",
          "Ash: Should be less than 10% (indicates mineral content)"
        ],
        examples: {
          good: [
            "Protein: 26% min, Fat: 15% min, Fiber: 4% max",
            "Protein: 32% min, Fat: 18% min, Fiber: 3% max"
          ],
          avoid: [
            "Protein: 18% min, Fat: 8% min, Fiber: 8% max",
            "Protein: 16% min, Fat: 6% min, Fiber: 12% max"
          ]
        }
      }
    },
    certifications: {
      title: "Certifications & Claims",
      icon: "",
      content: {
        main: "Look for third-party certifications that verify quality claims.",
        details: [
          "USDA Organic: 95%+ organic ingredients",
          "AAFCO Statement: Ensures nutritional adequacy",
          "Non-GMO Project Verified: No genetically modified ingredients",
          "Human Grade: Ingredients fit for human consumption",
          "Made in USA: Manufactured in the United States"
        ],
        examples: {
          good: [
            "USDA Organic Certified",
            "AAFCO Complete and Balanced for Adult Dogs",
            "Non-GMO Project Verified"
          ],
          avoid: [
            "Natural (unregulated term)",
            "Premium (marketing term only)",
            "Gourmet (marketing term only)"
          ]
        }
      }
    },
    redflags: {
      title: "Red Flags to Avoid",
      icon: "",
      content: {
        main: "Watch out for these warning signs on pet food labels.",
        details: [
          "Generic meat sources (meat, poultry, fish without specific animal)",
          "By-products as primary protein source",
          "Artificial colors, flavors, or preservatives",
          "Ethoxyquin, BHA, or BHT preservatives",
          "Propylene glycol (toxic to cats)",
          "Excessive fillers (corn, wheat, soy in top ingredients)"
        ],
        examples: {
          good: [
            "Specific proteins: Chicken, Beef, Salmon",
            "Natural preservatives: Mixed Tocopherols, Rosemary Extract",
            "Whole grains: Brown Rice, Oatmeal, Quinoa"
          ],
          avoid: [
            "Generic terms: Meat, Poultry, Fish",
            "Chemical preservatives: BHA, BHT, Ethoxyquin",
            "Artificial additives: Red 40, Blue 2, Artificial Flavors"
          ]
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How to Decode Pet Food Labels
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn to read pet food labels like a pro. Understand ingredients, nutritional claims, 
              and certifications to make informed decisions for your pet's health.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === key
                    ? 'bg-green-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {sections[activeSection].icon} {sections[activeSection].title}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {sections[activeSection].content.main}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Key Points */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Points</h3>
                <ul className="space-y-3">
                  {sections[activeSection].content.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">•</span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Examples</h3>
                
                {/* Good Examples */}
                <div className="mb-6">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Good Examples
                  </h4>
                  <div className="space-y-2">
                    {sections[activeSection].content.examples.good.map((example, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avoid Examples */}
                <div>
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Avoid These
                  </h4>
                  <div className="space-y-2">
                    {sections[activeSection].content.examples.avoid.map((example, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reference Card */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Quick Reference Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Protein First</h4>
                <p className="text-sm text-gray-600">Look for whole meat as the first ingredient</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Check Analysis</h4>
                <p className="text-sm text-gray-600">Verify protein and fat percentages</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Look for Certifications</h4>
                <p className="text-sm text-gray-600">USDA Organic, AAFCO, Non-GMO</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-12 text-center">
            <Link 
              to="/search" 
              className="inline-block bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Search Products
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PetFoodLabelsGuide;
