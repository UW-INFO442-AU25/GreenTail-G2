import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { petFoodDatabase } from './data/petFoodDatabase';
import { useAuth } from './AuthContext';
import { useTouchHandlers } from './hooks/useInteractionMode';

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
    third: null
  });
  const [savedItems, setSavedItems] = useState([]);
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();
  
  // Animation state
  const [isVisible, setIsVisible] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const sectionsRef = useRef({});
  const observerRef = useRef(null);

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
  useEffect(() => {
    try {
      const selection = JSON.parse(localStorage.getItem('compareSelection') || 'null');
      if (selection && Array.isArray(selection) && selection.length >= 2) {
        const first = petFoodDatabase.find(p => p.id === selection[0]) || null;
        const second = petFoodDatabase.find(p => p.id === selection[1]) || null;
        const third = selection[2] ? petFoodDatabase.find(p => p.id === selection[2]) : null;
        setSelectedProducts({ first, second, third });
        // Clear once consumed
        localStorage.removeItem('compareSelection');
      }
    } catch (e) {
      // ignore
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
    
    // Generate qualitative summary
    const summary = `${product1.brand} ${product1.name} is a ${
      isPremium1 ? 'premium, protein-dense' : 'balanced'
    } formula ideal for ${
      product1.lifeStage?.[0] || 'adult'
    } ${product1.petType?.[0] || 'pets'} and owners prioritizing ${
      isOrganic1 ? 'ingredient sourcing and organic certification' : 
      product1.ecoFeatures?.lowFootprintProtein ? 'sustainable protein sources' :
      'nutritional balance'
    }. In contrast, ${product2.brand} ${product2.name} offers a ${
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
      summary,
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
    const scoreColor = score >= 80 ? 'text-green-700' : score >= 60 ? 'text-yellow-600' : 'text-red-600';
    
    return (
      <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        {/* Product Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
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
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => setShowScoreInfo(true))}
                  className="w-4 h-4 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors group min-h-[44px] min-w-[44px]"
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
            <button 
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e)}
              className="flex-1 bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium min-h-[44px]"
            >
              Buy Now
            </button>
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
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed">{verdict.summary}</p>
            </div>

          {/* Pros & Cons Framework */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verdict.products.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg p-4 shadow-sm transition-all duration-800 ease-out ${
                  isVisible['verdict-section'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ 
                  transitionDelay: `${600 + index * 150}ms`,
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
        {/* Analyst's Verdict - Phase 1: Enhanced insights */}
        {renderAnalystsVerdict(products)}
        
        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product, index) => renderProductCard(product, index))}
        </div>

        {/* Comprehensive Comparison Table - Phase 2: Detailed side-by-side */}
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
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-xl font-bold text-gray-900">Detailed Comparison</h3>
                <p className="text-sm text-gray-600 mt-1">Side-by-side comparison of key attributes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-200">
                        Attribute
                      </th>
                  {products.map((product, index) => (
                        <th key={index} className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-200 min-w-[200px]">
                          <div className="flex flex-col items-center">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg mb-2"
                            />
                            <div className="font-semibold text-xs">{product.brand}</div>
                            <div className="text-xs text-gray-600">{product.name}</div>
                          </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                    {generateComparisonTable.map((section, sectionIndex) => (
                      <React.Fragment key={sectionIndex}>
                        {/* Section Header */}
                        <tr className="bg-green-50">
                          <td colSpan={products.length + 1} className="px-6 py-3">
                            <h4 className="text-sm font-bold text-green-800">{section.section}</h4>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {row.attribute}
                    </td>
                            {row.values.map((value, valueIndex) => (
                              <td 
                                key={valueIndex} 
                                className={`px-6 py-4 whitespace-nowrap text-sm text-center ${
                                  (Array.isArray(row.highlight) && row.highlight.includes(valueIndex)) ||
                                  (typeof row.highlight === 'number' && row.highlight === valueIndex)
                                    ? 'font-bold text-green-800 bg-green-50' 
                                    : 'text-gray-700'
                                }`}
                              >
                                {value}
                      </td>
                    ))}
                  </tr>
                        ))}
                      </React.Fragment>
                ))}
              </tbody>
            </table>
              </div>
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
                    href="#" 
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
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart • Buy on {product.preferredChannel}
                  </a>
                  
                  {/* Secondary CTAs */}
                  <div className="space-y-2">
                    <a 
                      href="#" 
                      className="block text-sm text-green-800 hover:text-green-900 hover:underline transition-colors duration-200"
                    >
                      View Full Product Details →
                    </a>
                    <a 
                      href="#" 
                      className="block text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200"
                    >
                      Read Customer Reviews →
                    </a>
                  </div>
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
        className="bg-white shadow-sm border-b"
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
      <section className="py-12">
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

            <div 
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 transition-all duration-1000 ease-out ${
                isVisible['compare-selector'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
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
