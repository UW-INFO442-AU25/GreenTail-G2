import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { petFoodDatabase } from './data/petFoodDatabase';
import { useAuth } from './AuthContext';
import { useTouchHandlers } from './hooks/useInteractionMode';
import { calculateProductQualityScore, convertTo5PointRating } from './utils/matchingAlgorithm';

/**
 * ComparePage - Redesigned per comparison_page_critique.md
 * 
 * Architecture:
 * 1. Analyst's Verdict Section - Enhanced insights with qualitative summary and Pros & Cons
 * 2. Comprehensive Comparison Table - Detailed side-by-side comparison of all attributes
 * 3. Clear CTAs - Primary "Add to Cart" and secondary "View Details" actions per product
 * 
 * Animation Strategy:
 * - Initial load: Verdict section fades in
 * - Scroll-triggered: Table sections use Intersection Observer
 * - Micro-interactions: Button hover effects
 * - Performance: Only transform and opacity
 */

const ComparePage = () => {
  const [selectedProducts, setSelectedProducts] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null
  });
  const [savedItems, setSavedItems] = useState([]);
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  const [isComparisonTableExpanded, setIsComparisonTableExpanded] = useState(false);
  const [showSavedItemsPreview, setShowSavedItemsPreview] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();
  
  // Maximum number of products based on login status
  const maxProducts = user ? 5 : 3;
  
  // Clear products beyond limit when login status changes
  useEffect(() => {
    if (!user && (selectedProducts.fourth || selectedProducts.fifth)) {
      setSelectedProducts(prev => ({
        ...prev,
        fourth: null,
        fifth: null
      }));
    }
  }, [user, selectedProducts.fourth, selectedProducts.fifth]);
  
  // Animation state
  const [isVisible, setIsVisible] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const sectionsRef = useRef({});
  const observerRef = useRef(null);

  // Generate Google search URL for product
  const getGoogleSearchUrl = (product) => {
    const searchQuery = `${product.brand} ${product.name} ${product.preferredChannel}`;
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://www.google.com/search?q=${encodedQuery}`;
  };

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

  // If navigated from Search with preselection, auto-apply and show results
  // Otherwise, if there are saved items, auto-apply them
  useEffect(() => {
    try {
      const selection = JSON.parse(localStorage.getItem('compareSelection') || 'null');
      if (selection && Array.isArray(selection) && selection.length >= 1) {
        // Priority 1: Use compareSelection if available (from Search page navigation)
        // If only one product is selected, set it as first
        const first = petFoodDatabase.find(p => p.id === selection[0]) || null;
        const second = selection[1] ? petFoodDatabase.find(p => p.id === selection[1]) : null;
        const third = selection[2] ? petFoodDatabase.find(p => p.id === selection[2]) : null;
        const fourth = maxProducts >= 4 && selection[3] ? petFoodDatabase.find(p => p.id === selection[3]) : null;
        const fifth = maxProducts >= 5 && selection[4] ? petFoodDatabase.find(p => p.id === selection[4]) : null;
        setSelectedProducts({ first, second, third, fourth, fifth });
        // Clear once consumed
        localStorage.removeItem('compareSelection');
        
        // Scroll to product selection area
        setTimeout(() => {
          const selectArea = document.getElementById('product-selection-area');
          if (selectArea) {
            selectArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Priority 2: Auto-load saved items if available (at least 2 items)
        const saved = localStorage.getItem('savedProducts');
        if (saved) {
          try {
            const parsedSaved = JSON.parse(saved);
            if (parsedSaved && Array.isArray(parsedSaved) && parsedSaved.length >= 2) {
              // Convert saved items to product objects from database
              // Saved items are full product objects, but we should match them with database for consistency
              const firstProduct = parsedSaved[0];
              const secondProduct = parsedSaved[1];
              const thirdProduct = parsedSaved[2] || null;
              
              // Find products in database by ID (handle both string and number IDs)
              const getProductFromDatabase = (savedProduct) => {
                try {
                  if (!savedProduct) return null;
                  const productId = typeof savedProduct === 'object' && savedProduct.id 
                    ? (typeof savedProduct.id === 'string' ? parseInt(savedProduct.id) : savedProduct.id)
                    : (typeof savedProduct === 'number' ? savedProduct : null);
                  if (!productId) return null;
                  return petFoodDatabase.find(p => p.id === productId) || null;
                } catch (err) {
                  console.error('Error getting product from database:', err, savedProduct);
                  return null;
                }
              };
              
              const first = getProductFromDatabase(firstProduct);
              const second = getProductFromDatabase(secondProduct);
              const third = thirdProduct ? getProductFromDatabase(thirdProduct) : null;
              const fourth = maxProducts >= 4 && parsedSaved[3] ? getProductFromDatabase(parsedSaved[3]) : null;
              const fifth = maxProducts >= 5 && parsedSaved[4] ? getProductFromDatabase(parsedSaved[4]) : null;
              
              if (first && second) {
                console.log('ComparePage: Auto-loading saved items:', { first, second, third, fourth, fifth });
                setSelectedProducts({ first, second, third, fourth, fifth });
              } else {
                console.log('ComparePage: Could not load saved items - first:', first, 'second:', second);
              }
            }
          } catch (error) {
            console.error('Error parsing saved products for auto-load:', error);
          }
        }
      }
    } catch (e) {
      console.error('Error in compare selection effect:', e);
      // Don't let errors prevent page from loading
    }
  }, []);

  const handleProductSelect = (position, productId) => {
    // Check if position is allowed based on login status
    const positionIndex = ['first', 'second', 'third', 'fourth', 'fifth'].indexOf(position);
    if (positionIndex >= maxProducts) {
      return; // Don't allow selection beyond max
    }

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
        first: savedItems[0] || null,
        second: savedItems[1] || null,
        third: savedItems[2] || null,
        fourth: maxProducts >= 4 ? (savedItems[3] || null) : null,
        fifth: maxProducts >= 5 ? (savedItems[4] || null) : null
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
      third: null,
      fourth: null,
      fifth: null
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
    // Use the unified quality score calculation
    return calculateProductQualityScore(product);
  };

  // Generate recommendation reason text (defined before useMemo)
  const generateRecommendationReason = (product, first, second, qualityScore, avgQualityScore) => {
    const reasons = [];
    
    if (qualityScore >= 80) {
      reasons.push('High quality');
    }
    
    const priceDiff = Math.abs(product.price - (first.price + second.price) / 2) / ((first.price + second.price) / 2);
    if (priceDiff <= 0.2) {
      reasons.push('Similar price');
    }
    
    if (first.isOrganic && second.isOrganic && product.isOrganic) {
      reasons.push('Organic');
    }
    
    if (first.isGrainFree && second.isGrainFree && product.isGrainFree) {
      reasons.push('Grain-free');
    }
    
    if (product.ecoFeatures?.recyclablePackaging && 
        first.ecoFeatures?.recyclablePackaging && 
        second.ecoFeatures?.recyclablePackaging) {
      reasons.push('Eco-friendly');
    }
    
    return reasons.length > 0 ? reasons.join(', ') : 'Good match';
  };

  // Recommend third product based on first two selections
  const getRecommendedThirdProducts = useMemo(() => {
    if (!selectedProducts.first || !selectedProducts.second) {
      return [];
    }

    const first = selectedProducts.first;
    const second = selectedProducts.second;
    const selectedIds = [first.id, second.id];

    // Calculate average characteristics of first two products
    const avgPrice = (first.price + second.price) / 2;
    const avgPricePer1000kcal = (first.pricePer1000kcal + second.pricePer1000kcal) / 2;
    const avgQualityScore = (calculateProductQualityScore(first) + calculateProductQualityScore(second)) / 2;

    // Find common features
    const commonTags = first.tags?.filter(tag => 
      second.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
    ) || [];
    const bothOrganic = first.isOrganic && second.isOrganic;
    const bothGrainFree = first.isGrainFree && second.isGrainFree;

    // Score and rank potential third products
    const recommendations = petFoodDatabase
      .filter(product => !selectedIds.includes(product.id))
      .map(product => {
        let score = 0;
        const qualityScore = calculateProductQualityScore(product);

        // Similar quality level (prefer products with similar quality)
        const qualityDiff = Math.abs(qualityScore - avgQualityScore);
        score += Math.max(0, 50 - qualityDiff); // Closer quality = higher score

        // Similar price range (within 20% of average)
        const priceDiff = Math.abs(product.price - avgPrice) / avgPrice;
        if (priceDiff <= 0.2) score += 20;
        else if (priceDiff <= 0.4) score += 10;

        // Similar value (price per 1000kcal)
        const valueDiff = Math.abs(product.pricePer1000kcal - avgPricePer1000kcal) / avgPricePer1000kcal;
        if (valueDiff <= 0.2) score += 15;
        else if (valueDiff <= 0.4) score += 7;

        // Match common features
        if (bothOrganic && product.isOrganic) score += 10;
        if (bothGrainFree && product.isGrainFree) score += 10;
        
        // Bonus for matching common tags
        const matchingTags = product.tags?.filter(tag => 
          commonTags.some(ct => ct.toLowerCase() === tag.toLowerCase())
        ) || [];
        score += matchingTags.length * 3;

        // Bonus for high quality products
        if (qualityScore >= 80) score += 15;
        else if (qualityScore >= 60) score += 8;

        // Bonus for eco-friendly if both are eco-friendly
        const bothEco = first.ecoFeatures && second.ecoFeatures;
        if (bothEco && product.ecoFeatures) {
          if (product.ecoFeatures.recyclablePackaging) score += 5;
          if (product.ecoFeatures.lowFootprintProtein) score += 5;
        }

        return {
          product,
          score,
          qualityScore,
          reason: generateRecommendationReason(product, first, second, qualityScore, avgQualityScore)
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Top 5 recommendations

    return recommendations;
  }, [selectedProducts.first, selectedProducts.second]);

  const getScoreBreakdown = (product) => {
    const breakdown = [];
    const tags = product.tags || [];
    const tagStrings = tags.map(t => t.toLowerCase());
    
    // Core quality factors
    if (product.isOrganic) breakdown.push({ factor: 'Organic Certified', points: 20, earned: true });
    if (product.isGrainFree) breakdown.push({ factor: 'Grain-Free Formula', points: 15, earned: true });
    if (product.ecoFeatures?.certified) breakdown.push({ factor: 'Eco Certification', points: 10, earned: true });
    if (tagStrings.some(t => t.includes('certified organic'))) breakdown.push({ factor: 'Certified Organic Tag', points: 5, earned: true });
    
    // Eco-friendly features
    if (product.ecoFeatures?.recyclablePackaging) breakdown.push({ factor: 'Recyclable Packaging', points: 10, earned: true });
    if (product.ecoFeatures?.lowFootprintProtein) breakdown.push({ factor: 'Low-Carbon Protein', points: 12, earned: true });
    if (product.ecoFeatures?.localProduction) breakdown.push({ factor: 'Local Production', points: 8, earned: true });
    if (tagStrings.some(t => t.includes('sustainable'))) breakdown.push({ factor: 'Sustainable Practices', points: 8, earned: true });
    
    // Value factors
    if (product.price <= 35) breakdown.push({ factor: 'Reasonable Price (≤$35)', points: 8, earned: true });
    if (product.pricePer1000kcal <= 3.5) breakdown.push({ factor: 'Good Value per Calorie (≤$3.5)', points: 8, earned: true });
    if (product.pricePer1000kcal <= 2.5) breakdown.push({ factor: 'Excellent Value (≤$2.5)', points: 4, earned: true });
    
    // Premium and quality indicators
    if (tagStrings.some(t => t.includes('premium'))) breakdown.push({ factor: 'Premium Quality', points: 8, earned: true });
    if (tagStrings.some(t => t.includes('high protein'))) breakdown.push({ factor: 'High Protein', points: 6, earned: true });
    if (tagStrings.some(t => t.includes('human-grade'))) breakdown.push({ factor: 'Human-Grade', points: 6, earned: true });
    
    // Additional quality bonuses
    if (tagStrings.some(t => t.includes('hypoallergenic'))) breakdown.push({ factor: 'Hypoallergenic', points: 5, earned: true });
    if (tagStrings.some(t => t.includes('limited ingredient'))) breakdown.push({ factor: 'Limited Ingredient', points: 5, earned: true });
    
    return breakdown;
  };

  const renderScoreInfoModal = () => {
    if (!showScoreInfo) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">How We Calculate Ratings</h3>
              <button 
                onClick={() => setShowScoreInfo(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, () => setShowScoreInfo(false))}
                className="text-gray-400 hover:text-gray-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Our Rating System (5.0 scale)</h4>
                <p className="text-sm text-green-700">
                  We evaluate products based on quality, sustainability, and value. Ratings are calculated from a 100-point scoring system and converted to a 5.0 scale for easy comparison.
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
                <h5 className="font-medium text-gray-900 mb-2">Rating Ranges</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <span><strong>4.0-5.0:</strong> Excellent choice (80-100 points)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span><strong>3.0-3.9:</strong> Good option (60-79 points)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span><strong>0-2.9:</strong> Consider alternatives (0-59 points)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            const key = entry.target.dataset.sectionKey;
            if (key && !hasAnimated[key]) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
              setHasAnimated((prev) => ({ ...prev, [key]: true }));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    Object.keys(sectionsRef.current).forEach((key) => {
      const element = sectionsRef.current[key];
      if (element) {
        element.dataset.sectionKey = key;
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasAnimated]);

  // Initialize animations on mount
  useEffect(() => {
    // Trigger initial animations for header and title sections
    setTimeout(() => {
      setIsVisible((prev) => ({
        ...prev,
        'compare-header': true,
        'compare-title': true,
        'compare-selector': true,
      }));
      setHasAnimated((prev) => ({
        ...prev,
        'compare-header': true,
        'compare-title': true,
        'compare-selector': true,
      }));
    }, 300);
  }, []);

  // Initialize animations when products are selected
  useEffect(() => {
    const products = Object.values(selectedProducts).filter(Boolean);
    if (products.length >= 2) {
      setTimeout(() => {
        setIsVisible((prev) => ({
          ...prev,
          'verdict-section': true,
          'comparison-table': true,
          'ctas-section': true,
        }));
        setHasAnimated((prev) => ({
          ...prev,
          'verdict-section': true,
          'comparison-table': true,
          'ctas-section': true,
        }));
      }, 300);
    }
  }, [selectedProducts]);

  // Generate Analyst's Verdict - Phase 1: Enhanced insights
  const generateAnalystsVerdict = (products) => {
    if (products.length < 2) return null;

    const [product1, product2] = products;
    
    // Determine positioning (premium vs value, etc.)
    const price1 = product1.price;
    const price2 = product2.price;
    const isPremium1 = price1 > price2;
    const isOrganic1 = product1.isOrganic || product1.ecoFeatures?.certified;
    const isOrganic2 = product2.isOrganic || product2.ecoFeatures?.certified;
    
    // Generate qualitative summary with product names and contrast marker
    const product1Name = `${product1.brand} ${product1.name}`;
    const product2Name = `${product2.brand} ${product2.name}`;
    const summaryText = `${product1Name} is a ${
      isPremium1 ? 'premium, protein-dense' : 'balanced'
    } formula ideal for ${
      product1.lifeStage?.[0] || 'adult'
    } ${product1.petType?.[0] || 'pets'} and owners prioritizing ${
      isOrganic1 ? 'ingredient sourcing and organic certification' : 
      product1.ecoFeatures?.lowFootprintProtein ? 'sustainable protein sources' :
      'nutritional balance'
    }. In contrast, ${product2Name} offers a ${
      isPremium1 ? 'strong, balanced nutritional profile' : 'premium, high-quality'
    } at a ${
      isPremium1 ? 'more accessible' : 'higher'
    } price point, making it a ${
      isPremium1 ? 'versatile choice for a wide range' : 'premium option for discerning'
    } of ${product2.lifeStage?.[0] || 'adult'} ${product2.petType?.[0] || 'pets'}.`;

    const textBeforeContrast = `${product1Name} is a ${
      isPremium1 ? 'premium, protein-dense' : 'balanced'
    } formula ideal for ${
      product1.lifeStage?.[0] || 'adult'
    } ${product1.petType?.[0] || 'pets'} and owners prioritizing ${
      isOrganic1 ? 'ingredient sourcing and organic certification' : 
      product1.ecoFeatures?.lowFootprintProtein ? 'sustainable protein sources' :
      'nutritional balance'
    }.`;

    const textAfterContrast = `${product2Name} offers a ${
      isPremium1 ? 'strong, balanced nutritional profile' : 'premium, high-quality'
    } at a ${
      isPremium1 ? 'more accessible' : 'higher'
    } price point, making it a ${
      isPremium1 ? 'versatile choice for a wide range' : 'premium option for discerning'
    } of ${product2.lifeStage?.[0] || 'adult'} ${product2.petType?.[0] || 'pets'}.`;

    // Generate Pros & Cons for each product
    const generateProsCons = (product, otherProducts) => {
      const pros = [];
      const cons = [];
      
      // Price analysis
      const otherPrices = otherProducts.map(p => p.price);
      const isCheapest = product.price === Math.min(product.price, ...otherPrices);
      const isMostExpensive = product.price === Math.max(product.price, ...otherPrices);
      
      if (isCheapest) {
        pros.push('Budget-friendly cost per serving');
      } else if (isMostExpensive) {
        cons.push('Premium price point');
      }
      
      // Quality indicators
      if (product.isOrganic || product.ecoFeatures?.certified) {
        pros.push('Organic certified with transparent sourcing');
      }
      
      if (product.ecoFeatures?.lowFootprintProtein) {
        pros.push('High-quality, diverse protein sources');
      } else if (!product.ecoFeatures?.lowFootprintProtein && otherProducts.some(p => p.ecoFeatures?.lowFootprintProtein)) {
        cons.push('Less sustainable protein sourcing');
      }
      
      if (product.isGrainFree) {
        pros.push('Grain-free formula suitable for sensitive pets');
      }
      
      // Value proposition
      const pricePerKcal = product.pricePer1000kcal;
      const otherPricePerKcal = otherProducts.map(p => p.pricePer1000kcal);
      const isBestValue = pricePerKcal === Math.min(pricePerKcal, ...otherPricePerKcal);
      
      if (isBestValue) {
        pros.push('Excellent value per calorie');
      }
      
      // Life stage coverage
      if (product.lifeStage?.length > 1) {
        pros.push('Suitable for multiple life stages');
      } else if (otherProducts.some(p => p.lifeStage?.length > 1)) {
        cons.push('Limited to specific life stage');
      }
      
      // Packaging
      if (product.ecoFeatures?.recyclablePackaging) {
        pros.push('Eco-friendly recyclable packaging');
      } else if (otherProducts.some(p => p.ecoFeatures?.recyclablePackaging)) {
        cons.push('Less eco-friendly packaging');
      }
      
      // Fill remaining slots
      if (pros.length < 2) {
        if (!product.isGrainFree && otherProducts.some(p => p.isGrainFree)) {
          cons.push('Contains grains (may not suit all pets)');
        }
      }
      
      return { pros: pros.slice(0, 3), cons: cons.slice(0, 3) };
    };

    return {
      summary: summaryText,
      summaryData: {
        product1Name,
        product2Name,
        textBeforeContrast,
        textAfterContrast
      },
      products: products.map((product, index) => ({
        product,
        position: index === 0 ? 'first' : index === 1 ? 'second' : 'third',
        ...generateProsCons(product, products.filter((_, i) => i !== index))
      }))
    };
  };

  // Generate comprehensive comparison table data - Phase 2
  const generateComparisonTable = useMemo(() => {
    const products = Object.values(selectedProducts).filter(Boolean);
    if (products.length < 2) return null;

    const tableRows = [];
    
    // Key Information section
    tableRows.push({ section: 'Key Information', rows: [
      {
        attribute: 'Best For',
        values: products.map(p => 
          `${p.lifeStage?.[0] || 'Adult'} ${p.petType?.[0] || 'Pets'}`
        ),
        highlight: null // No single best value
      },
      {
        attribute: 'Price',
        values: products.map(p => `$${p.price.toFixed(2)}`),
        highlight: products.map((p, i) => {
          const prices = products.map(pr => pr.price);
          return p.price === Math.min(...prices) ? i : null;
        }).filter(i => i !== null)[0] || null
      },
      {
        attribute: 'Price per 1000 kcal',
        values: products.map(p => `$${p.pricePer1000kcal.toFixed(2)}`),
        highlight: products.map((p, i) => {
          const prices = products.map(pr => pr.pricePer1000kcal);
          return p.pricePer1000kcal === Math.min(...prices) ? i : null;
        }).filter(i => i !== null)[0] || null
      },
      {
        attribute: 'Rating',
        values: products.map(p => `4.5 ⭐ (12 reviews)`), // Mock data
        highlight: null
      }
    ]});

    // Guaranteed Analysis section (mock data - can be enhanced with real data)
    tableRows.push({ section: 'Guaranteed Analysis', rows: [
      {
        attribute: 'Crude Protein',
        values: products.map(p => {
          // Mock calculation based on product attributes
          const baseProtein = p.tags?.some(t => t.toLowerCase().includes('high protein')) ? 38 : 32;
          return `${baseProtein}% (min)`;
        }),
        highlight: products.map((p, i) => {
          const proteins = products.map(pr => {
            const hasHighProtein = pr.tags?.some(t => t.toLowerCase().includes('high protein'));
            return hasHighProtein ? 38 : 32;
          });
          return p.tags?.some(t => t.toLowerCase().includes('high protein')) && 
                 Math.max(...proteins) === 38 ? i : null;
        }).filter(i => i !== null)[0] || null
      },
      {
        attribute: 'Crude Fat',
        values: products.map(p => {
          const baseFat = p.price > 30 ? 18 : 16;
          return `${baseFat}% (min)`;
        }),
        highlight: products.map((p, i) => {
          const fats = products.map(pr => pr.price > 30 ? 18 : 16);
          return Math.max(...fats) === (p.price > 30 ? 18 : 16) ? i : null;
        }).filter(i => i !== null)[0] || null
      },
      {
        attribute: 'Fiber',
        values: products.map(p => {
          const baseFiber = p.isGrainFree ? 3.5 : 4.0;
          return `${baseFiber}% (max)`;
        }),
        highlight: products.map((p, i) => {
          const fibers = products.map(pr => pr.isGrainFree ? 3.5 : 4.0);
          return p.isGrainFree && Math.min(...fibers) === 3.5 ? i : null;
        }).filter(i => i !== null)[0] || null
      }
    ]});

    // Key Ingredients section
    tableRows.push({ section: 'Key Ingredients', rows: [
      {
        attribute: 'Top 5 Ingredients',
        values: products.map(p => {
          const proteins = p.mainProteins?.slice(0, 5).join(', ') || 'N/A';
          return proteins;
        }),
        highlight: null
      },
      {
        attribute: 'Grain-Free',
        values: products.map(p => p.isGrainFree ? 'Yes' : 'No'),
        highlight: products.map((p, i) => p.isGrainFree ? i : null).filter(i => i !== null)
      },
      {
        attribute: 'Organic Certified',
        values: products.map(p => (p.isOrganic || p.ecoFeatures?.certified) ? 'Yes' : 'No'),
        highlight: products.map((p, i) => (p.isOrganic || p.ecoFeatures?.certified) ? i : null).filter(i => i !== null)
      }
    ]});

    // Additional Attributes section
    tableRows.push({ section: 'Additional Attributes', rows: [
      {
        attribute: 'Life Stage',
        values: products.map(p => p.lifeStage?.join(', ') || 'N/A'),
        highlight: null
      },
      {
        attribute: 'Main Proteins',
        values: products.map(p => p.mainProteins?.join(', ') || 'N/A'),
        highlight: null
      },
      {
        attribute: 'Feeding Style',
        values: products.map(p => p.feedingStyle?.join(', ') || 'N/A'),
        highlight: null
      },
      {
        attribute: 'Eco Features',
        values: products.map(p => {
          const features = [];
          if (p.ecoFeatures?.lowFootprintProtein) features.push('Low-Footprint Protein');
          if (p.ecoFeatures?.recyclablePackaging) features.push('Recyclable Packaging');
          if (p.ecoFeatures?.certified) features.push('Certified Organic');
          return features.length > 0 ? features.join(', ') : 'None';
        }),
        highlight: null
      }
    ]});

    return tableRows;
  }, [selectedProducts]);

  const renderProductCard = (product, index) => {
    const score = getProductScore(product);
    const rating5 = convertTo5PointRating(score);
    const scoreColor = score >= 80 ? 'text-green-700' : score >= 60 ? 'text-yellow-600' : 'text-red-600';
    
    return (
      <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        {/* Product Header */}
        <div className="relative p-6 pb-4">
          {/* Score details button - Top right corner, above image and name */}
          <div className="flex justify-end mb-3">
            <button 
              onClick={() => setShowScoreInfo(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, () => setShowScoreInfo(true))}
              className="text-xs text-gray-500 hover:text-green-700 underline transition-colors duration-200"
              title="Score details"
            >
              Score details
            </button>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className="relative inline-block">
              {/* Floating shadow effect - soft glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20 blur-xl transform translate-y-2 scale-110 -z-10 rounded-lg"></div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg shadow-md transition-all duration-500 ease-out relative z-10"
                style={{
                  transform: 'translateY(-3px) scale(1)',
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))',
                  transition: 'transform 0.5s ease-out, filter 0.5s ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                  e.currentTarget.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.15))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1)';
                  e.currentTarget.style.filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))';
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.brand}</p>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Rating</span>
              <span className={`text-2xl font-bold ${scoreColor}`}>{rating5}/5.0</span>
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
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400">•</span>
              <span className={product.isOrganic ? 'text-gray-700' : 'text-gray-400'}>Organic</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400">•</span>
              <span className={product.isGrainFree ? 'text-gray-700' : 'text-gray-400'}>Grain-Free</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400">•</span>
              <span className={product.ecoFeatures?.recyclablePackaging ? 'text-gray-700' : 'text-gray-400'}>Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400">•</span>
              <span className={product.price < 30 ? 'text-gray-700' : 'text-gray-400'}>Budget-Friendly</span>
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
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div><span className="font-medium">Life Stage:</span> {product.lifeStage?.join(', ')}</div>
            <div><span className="font-medium">Main Proteins:</span> {product.mainProteins?.join(', ')}</div>
          </div>

          {/* Price Information */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">Price</span>
              <div className="text-right">
                <div className="text-base font-semibold text-gray-900">${product.price}</div>
                <div className="text-xs text-gray-500">${product.pricePer1000kcal}/1000kcal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex space-x-2">
            <a 
              href={product ? getGoogleSearchUrl(product) : '#'}
              target="_blank"
              rel="noopener noreferrer"
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e)}
              className="flex-1 bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium min-h-[44px] flex items-center justify-center"
            >
              Buy Now
            </a>
            <button 
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Analyst's Verdict - Phase 1: Enhanced insights
  const renderAnalystsVerdict = (products) => {
    if (products.length < 2) return null;
    
    const verdict = generateAnalystsVerdict(products);
    if (!verdict) return null;

    return (
      <div 
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8"
        ref={el => sectionsRef.current['verdict-section'] = el}
      >
        <div 
          className={`transition-all duration-1000 ease-out ${
            isVisible['verdict-section'] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2a1 1 0 10-2 0v2H5V7h2a1 1 0 000-2H5z" />
          </svg>
            Analyst's Verdict
        </h3>
          
          {/* Qualitative Summary */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-md border border-gray-100">
            <div className="space-y-4">
              {verdict.summaryData ? (
                <>
                  {/* First Product */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-base">
                        <span className="font-bold text-gray-900 text-lg">{verdict.summaryData.product1Name}</span>
                        {verdict.summaryData.textBeforeContrast.split(verdict.summaryData.product1Name)[1]}
                      </p>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">In contrast</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  
                  {/* Second Product */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-base">
                        <span className="font-bold text-gray-900 text-lg">{verdict.summaryData.product2Name}</span>
                        {verdict.summaryData.textAfterContrast.split(verdict.summaryData.product2Name)[1]}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-700 leading-relaxed">{verdict.summary}</p>
              )}
            </div>
          </div>

          {/* Pros & Cons Framework - Horizontal Scrollable */}
          <div className="w-full">
            <div className={`overflow-x-auto scrollbar-hide ${verdict.products.length > 3 ? '' : 'overflow-x-hidden'}`} style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              overflowY: 'hidden'
            }}>
              <div className={`${verdict.products.length > 3 ? 'inline-flex' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4 pb-4`} style={verdict.products.length > 3 ? { width: 'max-content' } : {}}>
                {verdict.products.map((item, index) => (
                  <div 
                    key={index} 
                    className={`bg-white rounded-lg p-4 shadow-sm transition-all duration-800 ease-out ${
                      isVisible['verdict-section'] 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-5'
                    } ${verdict.products.length > 3 ? 'flex-shrink-0' : ''}`}
                    style={{ 
                      transitionDelay: `${600 + index * 150}ms`,
                      ...(verdict.products.length > 3 ? { width: 'calc((100vw - 4rem) / 3)', minWidth: '300px', maxWidth: '380px' } : {})
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                      {item.product.brand} {item.product.name}
                    </h4>
                    
                    {/* Pros */}
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-green-800 mb-2">Pros:</div>
                      <ul className="space-y-1">
                        {item.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Cons */}
                    <div>
                      <div className="text-xs font-semibold text-red-800 mb-2">Cons:</div>
                      <ul className="space-y-1">
                        {item.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{con}</span>
                          </li>
                        ))}
                        {item.cons.length === 0 && (
                          <li className="text-sm text-gray-500 italic">No significant drawbacks</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

    // Display products: first 3 visible, all 5 in horizontal scroll if needed
    return (
      <div className="space-y-8">
        {/* Product Cards - Always horizontal scroll */}
        {products.length > 0 && (
          <div className="w-full">
            <div className="overflow-x-auto scrollbar-hide" style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              overflowY: 'hidden'
            }}>
              <div className="inline-flex gap-6 pb-4" style={{ width: 'max-content' }}>
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="flex-shrink-0"
                    style={{ width: '380px', maxWidth: '380px' }}
                  >
                    {renderProductCard(product, index)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analyst's Verdict - Phase 1: Enhanced insights */}
        {renderAnalystsVerdict(products)}

        {/* Comprehensive Comparison Table - Phase 2: Detailed side-by-side (Collapsible) */}
        {generateComparisonTable && (
          <div 
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
            ref={el => sectionsRef.current['comparison-table'] = el}
          >
            <div 
              className={`transition-all duration-1000 ease-out ${
                isVisible['comparison-table'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {/* Collapsible Header */}
              <div 
                className="p-6 border-b border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setIsComparisonTableExpanded(!isComparisonTableExpanded)}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, () => setIsComparisonTableExpanded(!isComparisonTableExpanded))}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Detailed Comparison</h3>
                    <p className="text-sm text-gray-600 mt-1">Side-by-side comparison of key attributes</p>
                  </div>
                  <svg 
                    className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${isComparisonTableExpanded ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Collapsible Content */}
              {isComparisonTableExpanded && (
                <div className="overflow-x-auto">
                  <table className="w-full" style={{ tableLayout: 'fixed' }}>
                  <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-200" style={{ width: '25%' }}>
                        Attribute
                      </th>
                  {products.map((product, index) => (
                        <th key={index} className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-200" style={{ width: `${75 / products.length}%` }}>
                          <div className="flex flex-col items-center">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg mb-2"
                            />
                            <div className="font-semibold text-xs break-words">{product.brand}</div>
                            <div className="text-xs text-gray-600 break-words px-2">{product.name}</div>
                          </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                    {generateComparisonTable.map((section, sectionIndex) => (
                      <React.Fragment key={sectionIndex}>
                        {/* Section Header - Subtle separator, not a highlight */}
                        <tr className="bg-gray-50 border-t-2 border-gray-300">
                          <td colSpan={products.length + 1} className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-px flex-1 bg-gray-300"></div>
                              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">{section.section}</h4>
                              <div className="h-px flex-1 bg-gray-300"></div>
                            </div>
                          </td>
                        </tr>
                        {/* Section Rows */}
                        {section.rows.map((row, rowIndex) => (
                          <tr 
                            key={rowIndex} 
                            className="hover:bg-gray-50 transition-colors"
                            style={{
                              animationDelay: `${(sectionIndex * 100 + rowIndex * 50)}ms`,
                              opacity: isVisible['comparison-table'] ? 1 : 0,
                              transform: isVisible['comparison-table'] ? 'translateY(0)' : 'translateY(10px)',
                              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                            }}
                          >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900" style={{ width: '25%' }}>
                              {row.attribute}
                    </td>
                            {row.values.map((value, valueIndex) => {
                              const isHighlighted = (Array.isArray(row.highlight) && row.highlight.includes(valueIndex)) ||
                                                   (typeof row.highlight === 'number' && row.highlight === valueIndex);
                              return (
                                <td 
                                  key={valueIndex} 
                                  className={`px-6 py-4 text-sm text-center relative ${
                                    isHighlighted
                                      ? 'font-bold text-green-700 bg-green-100 border-l-4 border-green-600' 
                                      : 'text-gray-700'
                                  }`}
                                  style={{ width: `${75 / products.length}%`, wordBreak: 'break-word' }}
                                >
                                  {isHighlighted && (
                                    <span className="absolute top-1 right-1 text-green-600 text-xs">✓</span>
                                  )}
                                  <div className="break-words">{value}</div>
                                </td>
                              );
                            })}
                  </tr>
                        ))}
                      </React.Fragment>
                ))}
                  </tbody>
                </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Clear CTAs Section - Phase 3: Primary and secondary actions */}
        <div 
          className="bg-white rounded-xl shadow-lg p-6"
          ref={el => sectionsRef.current['ctas-section'] = el}
        >
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible['ctas-section'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Ready to choose?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <div 
                  key={index} 
                  className={`border border-gray-200 rounded-lg p-4 transition-all duration-800 ease-out ${
                    isVisible['ctas-section'] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ 
                    transitionDelay: `${400 + index * 150}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{product.brand}</h4>
                    <p className="text-sm text-gray-600 mb-3">{product.name}</p>
                    <div className="text-2xl font-bold text-green-800">${product.price}</div>
                  </div>
                  
                  {/* Primary CTA */}
                  <a 
                    href={product ? getGoogleSearchUrl(product) : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e)}
                    className="block w-full bg-green-800 text-white px-4 py-3 rounded-lg text-sm font-medium text-center mb-3 transition-all duration-300 ease min-h-[44px] flex items-center justify-center"
                    style={{
                      transform: 'translateY(0)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.backgroundColor = '#065f46'; // green-700
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.backgroundColor = '#166534'; // green-800
                    }}
                    aria-label={`Buy ${product.name} now`}
                  >
                    Buy Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50"
        ref={el => sectionsRef.current['compare-header'] = el}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`flex justify-between items-center h-16 transition-all duration-1000 ease-out ${
              isVisible['compare-header'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-5'
            }`}
          >
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="h-8 w-8" />
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
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, handleLogout)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors min-h-[44px]"
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
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-8"
            ref={el => sectionsRef.current['compare-title'] = el}
          >
            <div 
              className={`transition-all duration-1000 ease-out ${
                isVisible['compare-title'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose two or three foods from your saved items to see differences.
            </p>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow-sm p-6 mb-8"
            ref={el => sectionsRef.current['compare-selector'] = el}
          >
            <div 
              className={`flex flex-wrap gap-4 mb-6 transition-all duration-1000 ease-out ${
                isVisible['compare-selector'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <button 
                onClick={handleUseSavedItems}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, handleUseSavedItems)}
                className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300 min-h-[44px]"
                disabled={savedItems.length < 2}
                style={{
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
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
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTouchEnd(e, () => {
                    handleRemoveAll();
                  });
                }}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-all duration-300 min-h-[44px]"
                type="button"
                style={{
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Remove all
              </button>
            </div>

            {!user && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Not logged in:</span> Compare up to 3 products. <Link to="/login" className="underline hover:text-blue-900">Login</Link> to compare up to 5 products.
                </p>
              </div>
            )}
            <div 
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 transition-all duration-1000 ease-out ${
                isVisible['compare-selector'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '800ms', gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))' }}
            >
              <div className="min-w-0 flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select first food
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                  style={{ paddingRight: '1.5rem' }}
                  value={selectedProducts.first?.id || ''}
                  onChange={(e) => handleProductSelect('first', e.target.value)}
                >
                  <option value="">Select first food</option>
                  {/* Only show products that are not already selected in second or third */}
                  {petFoodDatabase
                    .filter(product => {
                      if (selectedProducts.second && product.id === selectedProducts.second.id) return false;
                      if (selectedProducts.third && product.id === selectedProducts.third.id) return false;
                      return true;
                    })
                    .map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="relative min-w-0 flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select second food {savedItems.length > 0 && (
                    <span className="text-xs font-normal text-gray-500">(From your saved items)</span>
                  )}
                </label>
                {savedItems.length > 0 ? (
                  <>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                      value={selectedProducts.second?.id || ''}
                      onChange={(e) => handleProductSelect('second', e.target.value)}
                      onFocus={() => setShowSavedItemsPreview(true)}
                      onBlur={() => setTimeout(() => setShowSavedItemsPreview(false), 200)}
                    >
                      <option value="">Select second food</option>
                      {/* Only show saved items */}
                      {savedItems.map(savedItem => {
                        const product = typeof savedItem === 'object' && savedItem.id 
                          ? petFoodDatabase.find(p => p.id === savedItem.id) || savedItem
                          : petFoodDatabase.find(p => p.id === savedItem);
                        if (!product) return null;
                        // Exclude if already selected in first, third, fourth, or fifth
                        if (selectedProducts.first && product.id === selectedProducts.first.id) return null;
                        if (selectedProducts.third && product.id === selectedProducts.third.id) return null;
                        if (selectedProducts.fourth && product.id === selectedProducts.fourth.id) return null;
                        if (selectedProducts.fifth && product.id === selectedProducts.fifth.id) return null;
                        return (
                          <option key={product.id} value={product.id}>
                            {product.name} {product.brand ? `(${product.brand})` : ''}
                          </option>
                        );
                      })}
                    </select>
                    {/* Preview of saved items */}
                    {showSavedItemsPreview && savedItems.length > 0 && (
                      <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        <div className="p-3 border-b border-gray-200 bg-gray-50">
                          <h4 className="text-sm font-semibold text-gray-700">Saved in Profile ({savedItems.length})</h4>
                        </div>
                        <div className="p-2">
                          {savedItems.map((savedItem, index) => {
                            const product = typeof savedItem === 'object' && savedItem.id 
                              ? petFoodDatabase.find(p => p.id === savedItem.id) || savedItem
                              : petFoodDatabase.find(p => p.id === savedItem);
                            if (!product) return null;
                            // Exclude if already selected
                            if (selectedProducts.first && product.id === selectedProducts.first.id) return null;
                            if (selectedProducts.third && product.id === selectedProducts.third.id) return null;
                            if (selectedProducts.fourth && product.id === selectedProducts.fourth.id) return null;
                            if (selectedProducts.fifth && product.id === selectedProducts.fifth.id) return null;
                            return (
                              <div 
                                key={product.id || index}
                                className="p-2 hover:bg-gray-50 rounded cursor-pointer flex items-center gap-3"
                                onClick={() => {
                                  handleProductSelect('second', product.id);
                                  setShowSavedItemsPreview(false);
                                }}
                              >
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                                  <div className="text-xs text-gray-500">{product.brand}</div>
                                  <div className="text-xs text-gray-600">${product.price}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 text-sm">
                    No saved items in your profile. Save products from Search page to compare them here.
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select third food {selectedProducts.first && selectedProducts.second && (
                    <span className="text-xs font-normal text-gray-500">(Recommended based on your selections)</span>
                  )}
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                  value={selectedProducts.third?.id || ''}
                  onChange={(e) => handleProductSelect('third', e.target.value)}
                >
                  <option value="">Select third food</option>
                  {selectedProducts.first && selectedProducts.second ? (
                    getRecommendedThirdProducts.length > 0 ? (
                      <optgroup label="Recommended for you">
                        {getRecommendedThirdProducts.map(({ product, reason }) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {reason}
                          </option>
                        ))}
                      </optgroup>
                    ) : (
                      <option value="" disabled>No recommendations available. Please select first and second food.</option>
                    )
                  ) : (
                    <option value="" disabled>Please select first and second food to see recommendations</option>
                  )}
                </select>
                {selectedProducts.first && selectedProducts.second && getRecommendedThirdProducts.length > 0 && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-xs font-medium text-green-800 mb-2">💡 Top Recommendation:</p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={getRecommendedThirdProducts[0].product.image} 
                        alt={getRecommendedThirdProducts[0].product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {getRecommendedThirdProducts[0].product.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {getRecommendedThirdProducts[0].product.brand} • ${getRecommendedThirdProducts[0].product.price}
                        </div>
                        <div className="text-xs text-green-700 mt-1">
                          {getRecommendedThirdProducts[0].reason}
                        </div>
                      </div>
                      <button
                        onClick={() => handleProductSelect('third', getRecommendedThirdProducts[0].product.id)}
                        className="px-3 py-1 bg-green-800 text-white text-xs rounded hover:bg-green-700 transition-colors whitespace-nowrap"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                )}
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
