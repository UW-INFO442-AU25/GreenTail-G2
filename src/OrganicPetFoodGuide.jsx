import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

const OrganicPetFoodGuide = () => {
  const [activeSection, setActiveSection] = useState('definition');

  const sections = {
    definition: {
      title: "What Does 'Organic' Mean?",
      icon: "",
      content: {
        main: "Organic pet food follows strict standards for ingredient sourcing, processing, and certification.",
        details: [
          "95% or more of ingredients must be certified organic",
          "No synthetic pesticides, herbicides, or fertilizers used",
          "No artificial preservatives, colors, or flavors",
          "No genetically modified organisms (GMOs)",
          "Animals raised without antibiotics or growth hormones",
          "Sustainable farming practices required"
        ],
        benefits: [
          "Reduced exposure to harmful chemicals",
          "Higher nutritional value in many cases",
          "Better for environmental sustainability",
          "Supports ethical farming practices"
        ]
      }
    },
    standards: {
      title: "Certification Standards",
      icon: "",
      content: {
        main: "Different certification levels indicate varying degrees of organic compliance.",
        details: [
          "USDA Organic: 95%+ organic ingredients, strictest standard",
          "Made with Organic Ingredients: 70%+ organic ingredients",
          "Organic Ingredients: Less than 70% organic ingredients",
          "Non-GMO Project Verified: No genetically modified ingredients",
          "Certified Humane: Ethical treatment of farm animals"
        ],
        levels: {
          "100% Organic": {
            description: "All ingredients are certified organic",
            requirements: "No synthetic ingredients allowed",
            examples: ["Orijen Six Fish", "Acana Wild Prairie"]
          },
          "95% Organic": {
            description: "At least 95% organic ingredients",
            requirements: "Remaining 5% must be non-synthetic",
            examples: ["Blue Buffalo Wilderness", "Wellness Core"]
          },
          "Made with Organic": {
            description: "70-94% organic ingredients",
            requirements: "Up to 30% non-organic allowed",
            examples: ["Purina Pro Plan", "Hill's Science Diet"]
          }
        }
      }
    },
    ingredients: {
      title: "Organic vs Conventional",
      icon: "",
      content: {
        main: "Understanding the differences between organic and conventional pet food ingredients.",
        details: [
          "Organic meat comes from animals raised without antibiotics",
          "Organic grains are grown without synthetic pesticides",
          "Organic vegetables contain higher levels of antioxidants",
          "Organic processing avoids chemical preservatives",
          "Organic packaging uses sustainable materials"
        ],
        comparison: {
          "Protein Sources": {
            organic: "Free-range, antibiotic-free animals",
            conventional: "May include antibiotics, growth hormones"
          },
          "Grains": {
            organic: "No synthetic pesticides, herbicides",
            conventional: "May contain pesticide residues"
          },
          "Preservatives": {
            organic: "Natural: Vitamin E, Rosemary extract",
            conventional: "Chemical: BHA, BHT, Ethoxyquin"
          },
          "Processing": {
            organic: "Minimal processing, no irradiation",
            conventional: "May include chemical treatments"
          }
        }
      }
    },
    benefits: {
      title: "Benefits for Your Pet",
      icon: "",
      content: {
        main: "Organic pet food can provide several health and environmental benefits.",
        details: [
          "Reduced risk of allergic reactions",
          "Better digestibility for sensitive pets",
          "Higher nutrient density in many cases",
          "No artificial additives that may cause hyperactivity",
          "Supports overall immune system health"
        ],
        health: {
          "Digestive Health": "Easier digestion, reduced stomach upset",
          "Skin & Coat": "Reduced itching, shinier coat",
          "Energy Levels": "More stable energy, less hyperactivity",
          "Long-term Health": "Reduced toxin exposure over time"
        },
        environmental: {
          "Soil Health": "Supports sustainable farming practices",
          "Water Quality": "Reduces chemical runoff",
          "Biodiversity": "Preserves natural ecosystems",
          "Climate": "Lower carbon footprint"
        }
      }
    },
    cost: {
      title: "Cost Considerations",
      icon: "",
      content: {
        main: "Understanding the cost differences and value of organic pet food.",
        details: [
          "Organic pet food typically costs 20-50% more than conventional",
          "Higher ingredient costs due to organic farming practices",
          "Smaller production volumes increase per-unit costs",
          "Certification and compliance add to production costs",
          "Consider cost per meal rather than per bag"
        ],
        factors: {
          "Ingredient Quality": "Higher quality ingredients cost more",
          "Certification": "Organic certification requires fees",
          "Production Scale": "Smaller batches cost more per unit",
          "Packaging": "Sustainable packaging materials cost more"
        },
        tips: [
          "Buy in bulk when possible",
          "Look for sales and coupons",
          "Consider subscription services",
          "Calculate cost per meal, not per bag",
          "Factor in potential health savings"
        ]
      }
    },
    choosing: {
      title: "How to Choose",
      icon: "",
      content: {
        main: "Tips for selecting the right organic pet food for your pet.",
        details: [
          "Read labels carefully - look for certification seals",
          "Check ingredient lists for organic claims",
          "Consider your pet's specific dietary needs",
          "Start with a small bag to test acceptance",
          "Consult your veterinarian for recommendations"
        ],
        checklist: [
          "USDA Organic seal present",
          "Whole protein as first ingredient",
          "No artificial preservatives",
          "Appropriate for pet's life stage",
          "Within your budget range",
          "Available at local stores"
        ],
        redflags: [
          "Generic 'natural' claims without certification",
          "Organic ingredients listed but no certification seal",
          "Unrealistically low prices",
          "Vague ingredient descriptions"
        ]
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
              What "Organic" Really Covers
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understand organic pet food standards, certifications, and benefits. 
              Make informed decisions about your pet's nutrition and environmental impact.
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

            {/* Dynamic Content Based on Section */}
            {activeSection === 'definition' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {sections[activeSection].content.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {sections[activeSection].content.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'standards' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Certification Levels</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(sections[activeSection].content.levels).map(([level, info]) => (
                      <div key={level} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{level}</h4>
                        <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                        <p className="text-xs text-gray-500 mb-3">{info.requirements}</p>
                        <div className="text-xs">
                          <strong>Examples:</strong>
                          <ul className="mt-1 space-y-1">
                            {info.examples.map((example, index) => (
                              <li key={index} className="text-gray-600">• {example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Certification Details</h3>
                  <ul className="space-y-2">
                    {sections[activeSection].content.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'ingredients' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Differences</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Organic</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Conventional</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(sections[activeSection].content.comparison).map(([category, comparison]) => (
                          <tr key={category}>
                            <td className="border border-gray-300 px-4 py-2 font-medium">{category}</td>
                            <td className="border border-gray-300 px-4 py-2 text-green-700">{comparison.organic}</td>
                            <td className="border border-gray-300 px-4 py-2 text-red-700">{comparison.conventional}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Points</h3>
                  <ul className="space-y-2">
                    {sections[activeSection].content.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'benefits' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Benefits</h3>
                  <div className="space-y-4">
                    {Object.entries(sections[activeSection].content.health).map(([benefit, description]) => (
                      <div key={benefit} className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-1">{benefit}</h4>
                        <p className="text-sm text-green-700">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Environmental Benefits</h3>
                  <div className="space-y-4">
                    {Object.entries(sections[activeSection].content.environmental).map(([benefit, description]) => (
                      <div key={benefit} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-1">{benefit}</h4>
                        <p className="text-sm text-blue-700">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'cost' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost Factors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(sections[activeSection].content.factors).map(([factor, description]) => (
                      <div key={factor} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{factor}</h4>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Money-Saving Tips</h3>
                  <ul className="space-y-2">
                    {sections[activeSection].content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'choosing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Selection Checklist</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        What to Look For
                      </h4>
                      <ul className="space-y-2">
                        {sections[activeSection].content.checklist.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        Red Flags
                      </h4>
                      <ul className="space-y-2">
                        {sections[activeSection].content.redflags.map((flag, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">!</span>
                            <span className="text-sm text-gray-700">{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Considerations</h3>
                  <ul className="space-y-2">
                    {sections[activeSection].content.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Quick Reference */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Quick Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Look for Seals</h4>
                <p className="text-sm text-gray-600">USDA Organic certification</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Read Labels</h4>
                <p className="text-sm text-gray-600">Check ingredient lists</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Budget Wisely</h4>
                <p className="text-sm text-gray-600">Consider cost per meal</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Ask Your Vet</h4>
                <p className="text-sm text-gray-600">Get professional advice</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/search" 
                className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Search Products
              </Link>
              <Link 
                to="/compare" 
                className="bg-white text-green-800 border border-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Compare Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganicPetFoodGuide;
