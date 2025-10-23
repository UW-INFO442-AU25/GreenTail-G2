import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from './QuizContext';

function ResultsPage() {
  const { quizData } = useQuiz();
  const [activeTags, setActiveTags] = useState([]);
  const initializedRef = useRef(false);

  // Debug: Log quiz data
  console.log('ResultsPage quizData:', quizData);

  // Simple fallback if no data
  if (!quizData) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Please complete the quiz first.</p>
          <Link to="/quiz/0" className="text-green-800 hover:underline mt-4 inline-block">
            Start Quiz
          </Link>
        </div>
      </div>
    );
  }

  // Generate tags based on user selections
  const generateTags = () => {
    const tags = [];
    
    // Add pet type and life stage
    if (quizData.pet) tags.push(quizData.pet);
    if (quizData.lifeStage) tags.push(quizData.lifeStage);
    
    // Add avoid ingredients as "grain-free", "chicken-free", etc.
    if (quizData.avoidIngredients && quizData.avoidIngredients.length > 0) {
      quizData.avoidIngredients.forEach(ingredient => {
        if (ingredient !== 'None' && ingredient !== 'Not sure') {
          tags.push(`${ingredient.toLowerCase()}-free`);
        }
      });
    }
    
    // Add priorities
    if (quizData.priorities && quizData.priorities.length > 0) {
      quizData.priorities.forEach(priority => {
        if (priority === 'Lower-footprint protein') tags.push('eco-protein');
        if (priority === 'Recyclable/compostable packaging') tags.push('eco-packaging');
        if (priority === 'Credible certifications') tags.push('certified');
        if (priority === 'Made closer to me') tags.push('local');
      });
    }
    
    // Add budget
    if (quizData.budget) {
      if (quizData.budget === '<$25') tags.push('budget-friendly');
      if (quizData.budget === '$60+') tags.push('premium');
    }
    
    return tags.slice(0, 5); // Limit to 5 tags
  };

  const allTags = generateTags();
  
  // Initialize activeTags with all tags only once
  React.useEffect(() => {
    if (!initializedRef.current && allTags.length > 0) {
      setActiveTags(allTags);
      initializedRef.current = true;
    }
  }, [allTags]);

  const handleTagRemove = (tagToRemove) => {
    setActiveTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleClearFilters = () => {
    setActiveTags([]);
  };

  // Generate description based on user answers
  const generateDescription = () => {
    const parts = [];
    if (quizData.pet) parts.push(quizData.pet);
    if (quizData.lifeStage) parts.push(quizData.lifeStage);
    
    if (quizData.avoidIngredients && quizData.avoidIngredients.length > 0 && !quizData.avoidIngredients.includes('None')) {
      const allergies = quizData.avoidIngredients.filter(ingredient => ingredient !== 'Not sure').join(', ');
      if (allergies) parts.push(`Allergies: ${allergies.toLowerCase()}`);
    }
    
    if (quizData.zipCode) {
      parts.push(`ZIP ${quizData.zipCode}`);
    }
    
    parts.push('(from your answers)');
    return parts.join(' • ');
  };

  return (
    <div className="min-h-screen bg-green-50">
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
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Learn to decode pet food labels</h4>
                <a href="#" className="text-green-800 hover:underline">Read guide →</a>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">2-week transition plan</h4>
                <a href="#" className="text-green-800 hover:underline">Get plan →</a>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">What "organic" covers</h4>
                <a href="#" className="text-green-800 hover:underline">Learn more →</a>
              </div>
              <a href="#" className="text-green-800 hover:underline text-sm">See all tips →</a>
            </aside>

            {/* Main Results */}
            <main className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Best matches for your pet</h1>
              <p className="text-gray-600 mb-6">{generateDescription()}</p>

              {/* Filters */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by</label>
                <select id="sort" className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Best match</option>
                </select>
                {activeTags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                    onClick={() => handleTagRemove(tag)}
                  >
                    {tag} 
                    <span className="ml-1 hover:text-red-600">✕</span>
                  </span>
                ))}
                {activeTags.length > 0 && (
                  <span 
                    className="text-gray-500 text-sm underline cursor-pointer hover:text-gray-700"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </span>
                )}
              </div>

              <div className="text-green-800 text-sm mb-6">✔ Your answers saved</div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product 1 */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-green-800 text-white px-3 py-1 rounded text-sm font-semibold">Best match</span>
                    <span className="text-xl font-semibold text-gray-900">$34.99</span>
                  </div>
                  <img src="/images/Orijen.png" alt="Orijen" className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Orijen · Six Fish Recipe</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">low-footprint protein</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">recyclable bag</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">certified organic</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">made nearby</span>
                  </div>
                  <p className="text-gray-600 mb-4">High-protein, grain-free recipe with six different fish sources. Perfect for dogs with sensitivities.</p>
                  <p className="text-sm text-gray-600 mb-4">$/1000 kcal: $2.85</p>
                  <div className="flex justify-between items-center">
                    <a href="#" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                      Buy on MudBay
                    </a>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Why this?</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">Great choice</span>
                    <span className="text-xl font-semibold text-gray-900">$28.99</span>
                  </div>
                  <img src="/images/BlueBuffalo.png" alt="Blue Buffalo" className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Blue Buffalo · Wilderness</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">grain-free</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">high protein</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">no by-products</span>
                  </div>
                  <p className="text-gray-600 mb-4">Grain-free recipe with high-quality protein sources. Great for active dogs who need extra nutrition.</p>
                  <p className="text-sm text-gray-600 mb-4">$/1000 kcal: $2.42</p>
                  <div className="flex justify-between items-center">
                    <a href="#" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                      Buy on Amazon
                    </a>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Why this?</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold">Good option</span>
                    <span className="text-xl font-semibold text-gray-900">$32.50</span>
                  </div>
                  <img src="/images/COREGrain.png" alt="CORE Grain-Free" className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Wellness · CORE Grain-Free</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">grain-free</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">natural ingredients</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">omega fatty acids</span>
                  </div>
                  <p className="text-gray-600 mb-4">High-quality grain-free formula with natural ingredients and omega fatty acids for healthy skin and coat.</p>
                  <p className="text-sm text-gray-600 mb-4">$/1000 kcal: $2.68</p>
                  <div className="flex justify-between items-center">
                    <a href="#" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                      Buy on Chewy
                    </a>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Why this?</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                {/* Product 4 */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-semibold">Eco-friendly</span>
                    <span className="text-xl font-semibold text-gray-900">$36.99</span>
                  </div>
                  <img src="/images/OpenFarm.png" alt="Open Farm" className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Open Farm · Homestead Turkey</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">sustainable sourcing</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">compostable bag</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">ethically raised</span>
                  </div>
                  <p className="text-gray-600 mb-4">Premium eco-friendly option with sustainably sourced ingredients and compostable packaging.</p>
                  <p className="text-sm text-gray-600 mb-4">$/1000 kcal: $2.95</p>
                  <div className="flex justify-between items-center">
                    <a href="#" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                      Buy on Chewy
                    </a>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Why this?</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;