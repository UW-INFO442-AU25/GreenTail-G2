import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { petFoodDatabase } from './data/petFoodDatabase';
import { useAuth } from './AuthContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const ComparePage = () => {
  const [selectedProducts, setSelectedProducts] = useState({
    first: null,
    second: null,
    third: null
  });
  const [savedItems, setSavedItems] = useState([]);
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { sectionsRef, getAnimationClass, getStaggeredAnimationClass } = useScrollAnimation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Load saved items from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedProducts');
    console.log('ComparePage: Loading saved products from localStorage:', saved);
    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved);
        console.log('ComparePage: Parsed saved products:', parsedSaved);
        setSavedItems(parsedSaved);
      } catch (error) {
        console.error('Error parsing saved products:', error);
      }
    } else {
      console.log('ComparePage: No saved products found in localStorage');
    }
  }, []);

  const handleProductSelect = (position, productId) => {
    if (productId === '') {
      setSelectedProducts(prev => ({
        ...prev,
        [position]: null
      }));
      return;
    }

    const product = petFoodDatabase.find(p => p.id === parseInt(productId));
    if (product) {
      setSelectedProducts(prev => ({
        ...prev,
        [position]: product
      }));
    }
  };

  const handleUseSavedItems = () => {
    console.log('ComparePage: handleUseSavedItems called, savedItems:', savedItems);
    if (savedItems.length >= 2) {
      const newSelection = {
        first: savedItems[0],
        second: savedItems[1],
        third: savedItems[2] || null
      };
      console.log('ComparePage: Setting selected products:', newSelection);
      setSelectedProducts(newSelection);
    } else {
      console.log('ComparePage: Not enough saved items to compare (need at least 2)');
    }
  };

  const handleRemoveAll = () => {
    console.log('ComparePage: handleRemoveAll called, current selectedProducts:', selectedProducts);
    setSelectedProducts({
      first: null,
      second: null,
      third: null
    });
    console.log('ComparePage: All products removed');
    
    // Force a small delay to ensure state update
    setTimeout(() => {
      console.log('ComparePage: State should be updated now');
    }, 100);
  };

  const getSelectedCount = () => {
    return Object.values(selectedProducts).filter(Boolean).length;
  };

  const getProductScore = (product) => {
    let score = 0;
    if (product.isOrganic) score += 20;
    if (product.isGrainFree) score += 15;
    if (product.ecoFeatures?.recyclablePackaging) score += 10;
    if (product.ecoFeatures?.lowFootprintProtein) score += 15;
    if (product.price < 30) score += 10;
    if (product.pricePer1000kcal < 3) score += 10;
    if (product.tags?.includes('premium')) score += 10;
    if (product.tags?.includes('sustainable')) score += 10;
    return Math.min(score, 100);
  };

  const getScoreBreakdown = (product) => {
    const breakdown = [];
    if (product.isOrganic) breakdown.push({ factor: 'Organic Certified', points: 20, earned: true });
    if (product.isGrainFree) breakdown.push({ factor: 'Grain-Free Formula', points: 15, earned: true });
    if (product.ecoFeatures?.recyclablePackaging) breakdown.push({ factor: 'Recyclable Packaging', points: 10, earned: true });
    if (product.ecoFeatures?.lowFootprintProtein) breakdown.push({ factor: 'Low-Carbon Protein', points: 15, earned: true });
    if (product.price < 30) breakdown.push({ factor: 'Budget-Friendly Price', points: 10, earned: true });
    if (product.pricePer1000kcal < 3) breakdown.push({ factor: 'Good Value per Calorie', points: 10, earned: true });
    if (product.tags?.includes('premium')) breakdown.push({ factor: 'Premium Quality', points: 10, earned: true });
    if (product.tags?.includes('sustainable')) breakdown.push({ factor: 'Sustainable Practices', points: 10, earned: true });
    
    // Add factors that weren't earned
    if (!product.isOrganic) breakdown.push({ factor: 'Organic Certified', points: 20, earned: false });
    if (!product.isGrainFree) breakdown.push({ factor: 'Grain-Free Formula', points: 15, earned: false });
    if (!product.ecoFeatures?.recyclablePackaging) breakdown.push({ factor: 'Recyclable Packaging', points: 10, earned: false });
    if (!product.ecoFeatures?.lowFootprintProtein) breakdown.push({ factor: 'Low-Carbon Protein', points: 15, earned: false });
    if (product.price >= 30) breakdown.push({ factor: 'Budget-Friendly Price', points: 10, earned: false });
    if (product.pricePer1000kcal >= 3) breakdown.push({ factor: 'Good Value per Calorie', points: 10, earned: false });
    if (!product.tags?.includes('premium')) breakdown.push({ factor: 'Premium Quality', points: 10, earned: false });
    if (!product.tags?.includes('sustainable')) breakdown.push({ factor: 'Sustainable Practices', points: 10, earned: false });
    
    return breakdown;
  };

  const renderScoreInfoModal = () => {
    if (!showScoreInfo) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">How We Calculate Scores</h3>
              <button 
                onClick={() => setShowScoreInfo(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Our Scoring System (Total: 100 points)</h4>
                <p className="text-sm text-green-700">
                  We evaluate products based on quality, sustainability, and value to help you make informed decisions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900">Quality Factors</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Organic Certified</span>
                      </div>
                      <span className="font-medium">20 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Grain-Free Formula</span>
                      </div>
                      <span className="font-medium">15 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Premium Quality</span>
                      </div>
                      <span className="font-medium">10 pts</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900">Sustainability & Value</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        <span>Recyclable Packaging</span>
                      </div>
                      <span className="font-medium">10 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                        <span>Low-Carbon Protein</span>
                      </div>
                      <span className="font-medium">15 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                        <span>Budget-Friendly</span>
                      </div>
                      <span className="font-medium">10 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Good Value/Calorie</span>
                      </div>
                      <span className="font-medium">10 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Sustainable Practices</span>
                      </div>
                      <span className="font-medium">10 pts</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Score Ranges</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <span><strong>80-100:</strong> Excellent choice</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span><strong>60-79:</strong> Good option</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span><strong>0-59:</strong> Consider alternatives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getComparisonInsights = (products) => {
    const insights = [];
    
    // Price comparison
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceDiff = maxPrice - minPrice;
    
    if (priceDiff > 10) {
      const cheapest = products.find(p => p.price === minPrice);
      insights.push({
        type: 'price',
        message: `${cheapest.name} is $${priceDiff.toFixed(2)} cheaper than the most expensive option`,
        icon: (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
        )
      });
    }

    // Organic comparison
    const organicCount = products.filter(p => p.isOrganic).length;
    if (organicCount === products.length) {
      insights.push({
        type: 'organic',
        message: 'All products are organic certified',
        icon: (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )
      });
    } else if (organicCount > 0) {
      const organicProducts = products.filter(p => p.isOrganic);
      insights.push({
        type: 'organic',
        message: `${organicProducts.map(p => p.name).join(', ')} are organic certified`,
        icon: (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )
      });
    }

    // Grain-free comparison
    const grainFreeCount = products.filter(p => p.isGrainFree).length;
    if (grainFreeCount === products.length) {
      insights.push({
        type: 'grain-free',
        message: 'All products are grain-free',
        icon: (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )
      });
    }

    return insights;
  };

  const renderProductCard = (product, index) => {
    const score = getProductScore(product);
    const scoreColor = score >= 80 ? 'text-green-700' : score >= 60 ? 'text-yellow-600' : 'text-red-600';
    
    return (
      <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        {/* Product Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.brand}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-800">${product.price}</div>
              <div className="text-sm text-gray-500">${product.pricePer1000kcal}/1000kcal</div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Overall Score</span>
                <button 
                  onClick={() => setShowScoreInfo(true)}
                  className="w-4 h-4 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors group"
                  title="How we calculate scores"
                >
                  <span className="text-xs text-white font-bold group-hover:text-green-100">i</span>
                </button>
              </div>
              <span className={`text-lg font-bold ${scoreColor}`}>{score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.isOrganic ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-700">Organic</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.isGrainFree ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-700">Grain-Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.ecoFeatures?.recyclablePackaging ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-700">Eco-Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.price < 30 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-700">Budget-Friendly</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags?.slice(0, 3).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Key Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div><span className="font-medium">Life Stage:</span> {product.lifeStage?.join(', ')}</div>
            <div><span className="font-medium">Main Proteins:</span> {product.mainProteins?.join(', ')}</div>
            <div><span className="font-medium">Available At:</span> {product.availableAt?.join(', ')}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex space-x-2">
            <button className="flex-1 bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Buy Now
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderComparisonInsights = (products) => {
    const insights = getComparisonInsights(products);
    
    if (insights.length === 0) return null;

    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2a1 1 0 10-2 0v2H5V7h2a1 1 0 000-2H5z" />
          </svg>
          Comparison Insights
        </h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0">{insight.icon}</div>
              <span className="text-gray-700">{insight.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderComparisonView = () => {
    const products = Object.values(selectedProducts).filter(Boolean);
    
    if (products.length < 2) {
      return (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Select products to compare
            </h2>
            <p className="text-gray-500 mb-6">
              Choose two or three foods from the dropdowns above to see a detailed comparison with insights and recommendations.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center border border-green-200">
                <svg className="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center border border-green-200">
                <svg className="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center border border-green-200">
                <svg className="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Comparison Insights */}
        {renderComparisonInsights(products)}
        
        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product, index) => renderProductCard(product, index))}
        </div>

        {/* Detailed Comparison Table (Collapsible) */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Comparison</h3>
            <p className="text-sm text-gray-600 mt-1">Click to expand detailed feature comparison</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  {products.map((product, index) => (
                    <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { key: 'brand', label: 'Brand' },
                  { key: 'price', label: 'Price', format: (value) => `$${value}` },
                  { key: 'pricePer1000kcal', label: 'Price per 1000 kcal', format: (value) => `$${value}` },
                  { key: 'petType', label: 'Pet Type' },
                  { key: 'lifeStage', label: 'Life Stage' },
                  { key: 'mainProteins', label: 'Main Proteins', format: (value) => Array.isArray(value) ? value.join(', ') : value },
                  { key: 'isGrainFree', label: 'Grain Free', format: (value) => value ? 'Yes' : 'No' },
                  { key: 'isOrganic', label: 'Organic', format: (value) => value ? 'Yes' : 'No' },
                  { key: 'feedingStyle', label: 'Feeding Style' },
                  { key: 'budgetRange', label: 'Budget Range' },
                  { key: 'availableAt', label: 'Available At', format: (value) => Array.isArray(value) ? value.join(', ') : value }
                ].map((field) => (
                  <tr key={field.key} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {field.label}
                    </td>
                    {products.map((product, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {field.format 
                          ? field.format(product[field.key])
                          : product[field.key] || 'N/A'
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logos/logo.png" alt="GreenTail Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-green-800">GreenTail</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/quiz" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Quiz
              </Link>
              <Link to="/search" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Search
              </Link>
              <Link to="/compare" className="text-green-800 px-3 py-2 text-sm font-medium border-b-2 border-green-800">
                Compare
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Profile
              </Link>
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {user.provider === 'google' && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    {user.provider === 'apple' && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    )}
                    <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Compare Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose two or three foods from your saved items to see differences.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              <button 
                onClick={handleUseSavedItems}
                className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                disabled={savedItems.length < 2}
              >
                Use saved items ({savedItems.length})
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Remove all button clicked');
                  handleRemoveAll();
                }}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                type="button"
              >
                Remove all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select first food
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                  value={selectedProducts.first?.id || ''}
                  onChange={(e) => handleProductSelect('first', e.target.value)}
                >
                  <option value="">Select first food</option>
                  {petFoodDatabase.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select second food
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                  value={selectedProducts.second?.id || ''}
                  onChange={(e) => handleProductSelect('second', e.target.value)}
                >
                  <option value="">Select second food</option>
                  {petFoodDatabase.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select third food
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                  value={selectedProducts.third?.id || ''}
                  onChange={(e) => handleProductSelect('third', e.target.value)}
                >
                  <option value="">Select third food</option>
                  {petFoodDatabase.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-sm text-gray-500 text-center">
              You can also open Compare from your Profile.
            </p>
          </div>

          {/* Comparison View */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderComparisonView()}
          </div>
        </div>
      </section>
      
      {/* Score Info Modal */}
      {renderScoreInfoModal()}
    </div>
  );
};

export default ComparePage;
