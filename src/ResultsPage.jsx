import React, { useState, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import { useAuth } from './AuthContext';
import { findBestMatches, getMatchLevelStyle, generatePersonalizedDescription } from './utils/matchingAlgorithm';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import StoreMapModal from './components/StoreMapModal';
import TransitionPlanModal from './components/TransitionPlanModal';

function ResultsPage() {
  const { quizData } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { sectionsRef, getAnimationClass, getStaggeredAnimationClass } = useScrollAnimation();
  const [activeTags, setActiveTags] = useState([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedProductForMap, setSelectedProductForMap] = useState(null);
  const [showTransitionPlan, setShowTransitionPlan] = useState(false);
  const initializedRef = useRef(false);

  // Debug: Log quiz data
  console.log('ResultsPage quizData:', quizData);

  // 使用智能匹配算法获取最佳匹配产品
  const matchedProducts = useMemo(() => {
    if (!quizData || !quizData.pet) {
      return [];
    }
    return findBestMatches(quizData);
  }, [quizData]);

  // Simple fallback if no data
  if (!quizData || !quizData.pet) {
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

  // 使用智能算法生成个性化描述
  const personalizedDescription = generatePersonalizedDescription(quizData);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="w-6 h-6 object-contain" />
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

      {/* Main Content */}
      <div className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Learn to decode pet food labels</h4>
                <Link to="/pet-food-labels-guide" className="text-green-800 hover:underline">Read guide →</Link>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">7-14 day transition plan</h4>
                <button 
                  onClick={() => setShowTransitionPlan(true)}
                  className="text-green-800 hover:underline cursor-pointer"
                >
                  Get plan →
                </button>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">What "organic" covers</h4>
                <Link to="/organic-pet-food-guide" className="text-green-800 hover:underline">Learn more →</Link>
              </div>
              
            </aside>

            {/* Main Results */}
            <main className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Best matches for your pet</h1>
              <p className="text-gray-600 mb-6">{personalizedDescription}</p>

              {/* 地图按钮 */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    setSelectedProductForMap(null);
                    setShowMapModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  🗺️ Find Stores Near You
                </button>
              </div>

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

              {/* 动态产品网格 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {matchedProducts.length > 0 ? (
                  matchedProducts.map((product) => {
                    const matchStyle = getMatchLevelStyle(product.matchLevel);
                    return (
                      <div key={product.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <span className={`${matchStyle.bgColor} ${matchStyle.textColor} px-3 py-1 rounded text-sm font-semibold`}>
                            {matchStyle.label}
                          </span>
                          <span className="text-xl font-semibold text-gray-900">${product.price}</span>
                        </div>
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                          {product.name.includes(product.brand) ? product.name : `${product.brand} · ${product.name}`}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.slice(0, 4).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-sm text-gray-600 mb-4">$/1000 kcal: ${product.pricePer1000kcal}</p>
                        <div className="flex justify-between items-center">
                          <a href="#" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                            Buy on {product.preferredChannel}
                          </a>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <button 
                              onClick={() => {
                                setSelectedProductForMap(product.name);
                                setShowMapModal(true);
                              }}
                              className="text-gray-600 hover:text-green-800 flex items-center gap-1"
                              title="Find stores with this product"
                            >
                              📍 Find Nearby
                            </button>
                            <span>Match: {product.matchScore}%</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">No matching products found</h3>
                    <p className="text-gray-600 mb-6">Please try adjusting your filter criteria or retake the quiz.</p>
                    <Link to="/quiz/0" className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                      Retake Quiz
                    </Link>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* 地图弹窗 */}
      <StoreMapModal 
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        selectedProduct={selectedProductForMap}
      />

      {/* 转换计划弹窗 */}
      <TransitionPlanModal 
        isOpen={showTransitionPlan}
        onClose={() => setShowTransitionPlan(false)}
        petType={quizData?.pet || 'Dog'}
        currentFood="Regular"
        newFood="Organic"
      />
    </div>
  );
}

export default ResultsPage;