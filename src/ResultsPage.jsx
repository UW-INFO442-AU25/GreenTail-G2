import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import { useAuth } from './AuthContext';
import { useToast } from './contexts/ToastContext';
import { findBestMatches, getMatchLevelStyle, generatePersonalizedDescription, getProductMatchLevel, calculateProductQualityScore, convertTo5PointRating } from './utils/matchingAlgorithm';
import { petFoodDatabase } from './data/petFoodDatabase';
import StoreMapModal from './components/StoreMapModal';
import TransitionPlanModal from './components/TransitionPlanModal';
import ContextualHelpBanner from './components/ContextualHelpBanner';
import { useTouchHandlers } from './hooks/useInteractionMode';

/**
 * ResultsPage - Redesigned per results_page_redesign_plan.md
 * 
 * Architecture:
 * 1. Contextual Help Banner - Dismissible top banner with educational links
 * 2. Left Sidebar Filters - Comprehensive filtering system
 * 3. Main Content Area - Results with sorting and active filters
 * 4. Redesigned Product Cards - Visual hierarchy, structured features, CTAs
 * 
 * Animation Strategy:
 * - Initial load: Banner and header fade in
 * - Scroll-triggered: Product cards use Intersection Observer
 * - Filter changes: Smooth transitions
 * - Micro-interactions: Button hover effects
 */

function ResultsPage() {
  const { quizData } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();
  const [showHelpBanner, setShowHelpBanner] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedProductForMap, setSelectedProductForMap] = useState(null);
  const [showTransitionPlan, setShowTransitionPlan] = useState(false);
  
  // Saved products state for compare suggestion
  const [savedForCompare, setSavedForCompare] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedProducts') || '[]');
    } catch {
      return [];
    }
  });
  const [showComparePrompt, setShowComparePrompt] = useState(true);
  const savedCount = savedForCompare.length;
  
  // Filter state - Comprehensive filtering system
  const [filters, setFilters] = useState({
    priceRange: '',
    brands: [],
    lifeStage: [],
    specialDiet: [],
    proteinType: [],
    sustainability: {
      ecoProtein: false,
      recyclablePackaging: false,
      certifiedOrganic: false
    }
  });
  
  // Sorting state
  const [sortBy, setSortBy] = useState('best');
  
  // Animation state
  const [isVisible, setIsVisible] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const sectionsRef = useRef({});
  const observerRef = useRef(null);

  // Get unique values from database for filters
  const availableBrands = useMemo(() => {
    const brands = [...new Set(petFoodDatabase.map(p => p.brand))];
    return brands.sort();
  }, []);

  const availableLifeStages = useMemo(() => {
    const stages = new Set();
    petFoodDatabase.forEach(p => {
      p.lifeStage?.forEach(s => stages.add(s));
    });
    return Array.from(stages).sort();
  }, []);

  const availableProteins = useMemo(() => {
    const proteins = new Set();
    petFoodDatabase.forEach(p => {
      p.mainProteins?.forEach(pr => proteins.add(pr));
    });
    return Array.from(proteins).sort();
  }, []);

  // Get best matching products using smart matching algorithm
  const matchedProducts = useMemo(() => {
    if (!quizData || !quizData.pet) {
      return [];
    }
    return findBestMatches(quizData);
  }, [quizData]);

  // Filter and sort products based on user selections
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...matchedProducts];

    // Apply price range filter
    if (filters.priceRange) {
      products = products.filter(product => {
        const price = product.price;
        switch (filters.priceRange) {
          case 'under20': return price < 20;
          case '20-30': return price >= 20 && price <= 30;
          case '30-40': return price >= 30 && price <= 40;
          case 'over40': return price > 40;
          default: return true;
        }
      });
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      products = products.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Apply life stage filter
    if (filters.lifeStage.length > 0) {
      products = products.filter(product => 
        filters.lifeStage.some(stage => product.lifeStage?.includes(stage))
      );
    }

    // Apply special diet filter
    if (filters.specialDiet.length > 0) {
      products = products.filter(product => {
        if (filters.specialDiet.includes('grain-free') && !product.isGrainFree) return false;
        if (filters.specialDiet.includes('high-protein') && !product.tags.some(t => t.toLowerCase().includes('high protein'))) return false;
        if (filters.specialDiet.includes('limited-ingredient') && !product.tags.some(t => t.toLowerCase().includes('limited ingredient'))) return false;
        if (filters.specialDiet.includes('hypoallergenic') && !product.tags.some(t => t.toLowerCase().includes('hypoallergenic'))) return false;
        return true;
      });
    }

    // Apply protein type filter
    if (filters.proteinType.length > 0) {
      products = products.filter(product => 
        filters.proteinType.some(protein => product.mainProteins?.includes(protein))
      );
    }

    // Apply sustainability filters
    if (filters.sustainability.ecoProtein) {
      products = products.filter(product => 
        product.ecoFeatures?.lowFootprintProtein
      );
    }
    if (filters.sustainability.recyclablePackaging) {
      products = products.filter(product => 
        product.ecoFeatures?.recyclablePackaging
      );
    }
    if (filters.sustainability.certifiedOrganic) {
      products = products.filter(product => 
        product.ecoFeatures?.certified || product.isOrganic
      );
    }

    // Apply sorting based on user selection
    switch (sortBy) {
      case 'lowest':
        // Sort by price (low to high), prioritizing "best match" products
        products.sort((a, b) => {
          if (a.matchLevel === 'best' && b.matchLevel !== 'best') return -1;
          if (b.matchLevel === 'best' && a.matchLevel !== 'best') return 1;
          return a.price - b.price;
        });
        break;
      case 'highest':
        // Sort by price (high to low), prioritizing "best match" products
        products.sort((a, b) => {
          if (a.matchLevel === 'best' && b.matchLevel !== 'best') return -1;
          if (b.matchLevel === 'best' && a.matchLevel !== 'best') return 1;
          return b.price - a.price;
        });
        break;
      case 'best':
      default:
        // Sort by match level first, then by match score (preserves algorithm priority)
        products.sort((a, b) => {
          const levelOrder = { 'best': 0, 'great': 1, 'good': 2, 'eco-friendly': 3, 'budget': 4 };
          const aLevel = levelOrder[a.matchLevel] || 5;
          const bLevel = levelOrder[b.matchLevel] || 5;
          if (aLevel !== bLevel) return aLevel - bLevel;
          return (b.matchScore || 0) - (a.matchScore || 0);
        });
        break;
    }

    return products;
  }, [matchedProducts, filters, sortBy]);

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

  // Filter handlers
  const handleFilterChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  const handlePriceRangeChange = (value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === value ? '' : value
    }));
  };

  const handleSustainabilityChange = (key) => {
    setFilters(prev => ({
      ...prev,
      sustainability: {
        ...prev.sustainability,
        [key]: !prev.sustainability[key]
      }
    }));
  };

  const handleSpecialDietChange = (diet, checked) => {
    setFilters(prev => ({
      ...prev,
      specialDiet: checked
        ? [...prev.specialDiet, diet]
        : prev.specialDiet.filter(d => d !== diet)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: '',
      brands: [],
      lifeStage: [],
      specialDiet: [],
      proteinType: [],
      sustainability: {
        ecoProtein: false,
        recyclablePackaging: false,
        certifiedOrganic: false
      }
    });
  };

  // Get active filters count for display
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange) count++;
    count += filters.brands.length;
    count += filters.lifeStage.length;
    count += filters.specialDiet.length;
    count += filters.proteinType.length;
    count += Object.values(filters.sustainability).filter(Boolean).length;
    return count;
  }, [filters]);

  // Ensure all products have matchLevel and matchScore
  const processedProducts = useMemo(() => {
    return filteredAndSortedProducts.map(product => {
      if (!product.matchLevel) {
        product.matchLevel = getProductMatchLevel(product);
      }
      if (product.matchScore === undefined) {
        product.matchScore = calculateProductQualityScore(product);
      }
      return product;
    });
  }, [filteredAndSortedProducts]);

  const handleSaveProduct = (product) => {
    const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    const isAlreadySaved = savedProducts.find(p => p.id === product.id);

    let updated;
    if (!isAlreadySaved) {
      const productToSave = { ...product, savedAt: new Date().toISOString() };
      updated = [...savedProducts, productToSave];
      localStorage.setItem('savedProducts', JSON.stringify(updated));
      if (user) {
        showSuccess('Saved to your profile', 1500);
      } else {
        showSuccess('Saved locally. Sign in to sync across devices', 1500);
      }
    } else {
      updated = savedProducts.filter(p => p.id !== product.id);
      localStorage.setItem('savedProducts', JSON.stringify(updated));
      showSuccess('Removed from saved', 1500);
    }
    setSavedForCompare(updated);
    setShowComparePrompt(updated.length >= 2);
  };

  const isProductSaved = (productId) => {
    const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    return savedProducts.find(p => p.id === productId);
  };

  // Generate Google search URL for product
  const getGoogleSearchUrl = (product) => {
    const searchQuery = `${product.brand} ${product.name} ${product.preferredChannel}`;
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://www.google.com/search?q=${encodedQuery}`;
  };

  // Compare now action - send last two saved items to compare page
  const handleCompareNow = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
      
      if (!saved || saved.length < 2) {
        alert('Please save at least 2 products to compare');
        return false;
      }
      
      const lastTwo = saved.slice(-2).map(p => {
        return typeof p === 'object' && p.id ? p.id : p;
      });
      
      if (lastTwo.length < 2) {
        alert('Error: Could not extract product IDs');
        return false;
      }
      
      localStorage.setItem('compareSelection', JSON.stringify(lastTwo));
      
      const baseUrl = window.location.origin;
      const basePath = import.meta.env.BASE_URL || '/';
      const compareUrl = `${baseUrl}${basePath}compare`.replace(/\/+/g, '/');
      window.location.href = compareUrl;
      
      return false;
    } catch (error) {
      console.error('handleCompareNow: Error:', error);
      const baseUrl = window.location.origin;
      const basePath = import.meta.env.BASE_URL || '/';
      window.location.href = `${baseUrl}${basePath}compare`.replace(/\/+/g, '/');
      return false;
    }
  };

  // Keep local state in sync when user removes elsewhere
  useEffect(() => {
    const onStorage = () => {
      try {
        setSavedForCompare(JSON.parse(localStorage.getItem('savedProducts') || '[]'));
      } catch {
        setSavedForCompare([]);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

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

  // Initialize animations
  useEffect(() => {
    setTimeout(() => {
      setIsVisible((prev) => ({
        ...prev,
        'results-header': true,
        'filter-sidebar': true,
      }));
      setHasAnimated((prev) => ({
        ...prev,
        'results-header': true,
        'filter-sidebar': true,
      }));
    }, 300);
  }, []);


  const personalizedDescription = generatePersonalizedDescription(quizData);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-green-800">GreenTail</span>
          </div>
          <nav>
            <ul className="flex gap-8">
              <li><Link to="/" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Home</Link></li>
              <li><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Quiz</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Search</Link></li>
              <li><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Contextual Help Banner - Phase 6: Dismissible top banner */}
          <ContextualHelpBanner 
            isVisible={showHelpBanner} 
            onDismiss={() => setShowHelpBanner(false)}
            onShowTransitionPlan={() => setShowTransitionPlan(true)}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            {/* Optimization: Fade-in on page load */}
            <aside 
              className="w-full lg:w-48 flex-shrink-0"
              ref={el => sectionsRef.current['filter-sidebar'] = el}
            >
              <div 
                className={`bg-white rounded-xl p-4 shadow-lg lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto transition-all duration-1000 ease-out ${
                  isVisible['filter-sidebar'] 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-5'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <h3 className="text-base font-semibold text-gray-900 mb-3">Filter by</h3>
                
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">LIFE STAGE</p>
                  {availableLifeStages.map((stage) => (
                    <label key={stage} className="flex items-center gap-2 mb-1.5">
                      <input 
                        type="checkbox" 
                        checked={filters.lifeStage.includes(stage)}
                        onChange={(e) => handleFilterChange('lifeStage', stage, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-xs">{stage}</span>
                    </label>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">PROTEIN TYPE</p>
                  {availableProteins.slice(0, 4).map((protein) => (
                    <label key={protein} className="flex items-center gap-2 mb-1.5">
                      <input 
                        type="checkbox" 
                        checked={filters.proteinType.includes(protein)}
                        onChange={(e) => handleFilterChange('proteinType', protein, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-xs">{protein}</span>
                    </label>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">PRICE RANGE</p>
                  <label className="flex items-center gap-2 mb-1.5">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filters.priceRange === 'under20'}
                      onChange={() => handlePriceRangeChange('under20')}
                      className="w-4 h-4"
                    />
                    <span className="text-xs">$ &lt; 20</span>
                  </label>
                  <label className="flex items-center gap-2 mb-1.5">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filters.priceRange === '20-30'}
                      onChange={() => handlePriceRangeChange('20-30')}
                      className="w-4 h-4"
                    />
                    <span className="text-xs">$20–30</span>
                  </label>
                  <label className="flex items-center gap-2 mb-1.5">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filters.priceRange === '30-40'}
                      onChange={() => handlePriceRangeChange('30-40')}
                      className="w-4 h-4"
                    />
                    <span className="text-xs">$30–40</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filters.priceRange === 'over40'}
                      onChange={() => handlePriceRangeChange('over40')}
                      className="w-4 h-4"
                    />
                    <span className="text-xs">$ &gt; 40</span>
                  </label>
                </div>

                {/* Filter buttons with hover effects */}
                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={() => {/* Apply filters logic */}}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => {/* Apply filters logic */})}
                    className="flex-1 bg-green-800 text-white py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-300 ease min-h-[32px]"
                    style={{
                      transform: 'translateY(0)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.backgroundColor = '#065f46'; // green-700
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.backgroundColor = '#166534'; // green-800
                    }}
                  >
                    Apply filters
                  </button>
                  <button 
                    onClick={clearAllFilters}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, clearAllFilters)}
                    className="flex-1 bg-gray-200 text-gray-700 py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-300 ease min-h-[32px]"
                    style={{
                      transform: 'translateY(0)',
                      transition: 'transform 0.3s ease, background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.backgroundColor = '#d1d5db'; // gray-300
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = '#e5e7eb'; // gray-200
                    }}
                  >
                    Clear
                  </button>
                </div>

                <Link 
                  to="/search" 
                  className="block w-full text-center bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-300"
                >
                  Find stores nearby ➤
                </Link>
              </div>
            </aside>

            {/* Main Results Area */}
            {/* Phase 1 & 3: Results with sorting and active filters */}
            <main className="flex-1">
              {/* Results Header */}
              <div 
                ref={el => sectionsRef.current['results-header'] = el}
                className={`mb-6 transition-all duration-1000 ease-out ${
                  isVisible['results-header'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
              >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Best matches for your pet</h1>
                <p className="text-gray-600 mb-4">{personalizedDescription}</p>
                <div className="text-green-800 text-sm mb-4">✔ Your answers saved</div>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => {
                      setSelectedProductForMap(null);
                      setShowMapModal(true);
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => {
                      setSelectedProductForMap(null);
                      setShowMapModal(true);
                    })}
                    className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded-lg text-sm font-medium transition-all duration-300 ease min-h-[44px]"
                    style={{
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.backgroundColor = '#065f46'; // green-700
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.backgroundColor = '#166534'; // green-800
                    }}
                    aria-label="Find stores near you"
                  >
                    🗺️ Find Stores Near You
                  </button>
                  <Link
                    to="/compare"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
                  >
                    Compare Products
                  </Link>
                </div>
              </div>

              {/* Sort and Active Filters Bar */}
              {/* Phase 3 & 5: Sorting dropdown and active filters display */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by</label>
                <select 
                  id="sort" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="best">Best match</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                </select>
                
                {/* Active Filters Display */}
                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {filters.priceRange && (
                      <span 
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                        onClick={() => handlePriceRangeChange(filters.priceRange)}
                      >
                        Price: {filters.priceRange === 'under20' ? '< $20' : 
                                filters.priceRange === '20-30' ? '$20–30' :
                                filters.priceRange === '30-40' ? '$30–40' : '> $40'}
                        <span className="ml-1 hover:text-red-600">✕</span>
                      </span>
                    )}
                    {filters.brands.map((brand) => (
                      <span 
                        key={brand}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                        onClick={() => handleFilterChange('brands', brand, false)}
                      >
                        {brand}
                        <span className="ml-1 hover:text-red-600">✕</span>
                      </span>
                    ))}
                    {filters.lifeStage.map((stage) => (
                      <span 
                        key={stage}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                        onClick={() => handleFilterChange('lifeStage', stage, false)}
                      >
                        {stage}
                        <span className="ml-1 hover:text-red-600">✕</span>
                      </span>
                    ))}
                    {filters.specialDiet.map((diet) => (
                      <span 
                        key={diet}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                        onClick={() => handleSpecialDietChange(diet, false)}
                      >
                        {diet.replace('-', ' ')}
                        <span className="ml-1 hover:text-red-600">✕</span>
                      </span>
                    ))}
                    {filters.proteinType.map((protein) => (
                  <span 
                        key={protein}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                        onClick={() => handleFilterChange('proteinType', protein, false)}
                  >
                        {protein}
                    <span className="ml-1 hover:text-red-600">✕</span>
                  </span>
                ))}
                    {Object.entries(filters.sustainability)
                      .filter(([key, value]) => value)
                      .map(([key]) => {
                        const labels = {
                          ecoProtein: 'Eco-Protein',
                          recyclablePackaging: 'Recyclable Packaging',
                          certifiedOrganic: 'Certified Organic'
                        };
                        return (
                  <span 
                            key={key}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                            onClick={() => handleSustainabilityChange(key)}
                  >
                            {labels[key]}
                            <span className="ml-1 hover:text-red-600">✕</span>
                  </span>
                        );
                      })}
                  </div>
                )}
                
                {/* Results Count */}
                <div className="ml-auto text-sm text-gray-600">
                  Showing {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Product Grid */}
              {/* Optimization: Staggered fade-in on scroll for product cards */}
              {/* Responsive grid: adaptive columns based on available space, 1-3 columns depending on screen size */}
              <div className="product-grid-adaptive gap-4">
                {processedProducts.map((product, index) => {
                  const matchStyle = getMatchLevelStyle(product.matchLevel);
                  const productKey = `product-${product.id}`;
                  const productScore = product.matchScore || calculateProductQualityScore(product);
                  const rating5 = convertTo5PointRating(productScore);
                  // Determine color based on rating
                  const ratingColor = productScore >= 80 ? 'bg-green-800 text-white' : 
                                     productScore >= 60 ? 'bg-blue-600 text-white' : 
                                     productScore >= 55 ? 'bg-yellow-600 text-white' : 
                                     'bg-gray-600 text-white';
                  
                  return (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full transition-all duration-300 ease"
                      ref={el => sectionsRef.current[productKey] = el}
                      style={{
                        transform: isVisible[productKey] ? 'translateY(0)' : 'translateY(20px)',
                        opacity: isVisible[productKey] ? 1 : 0,
                        transition: `transform 0.8s ease-out, opacity 0.8s ease-out, box-shadow 0.3s ease`,
                        transitionDelay: isVisible[productKey] ? `${Math.min(index * 80, 800)}ms` : '0ms',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`${ratingColor} px-3 py-1 rounded text-sm font-semibold`}>
                          {rating5}/5.0
                        </span>
                        {/* Favorite button - positioned at top right */}
                        <button 
                          onClick={(e) => { e.preventDefault(); handleSaveProduct(product); }}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            handleTouchEnd(e, () => handleSaveProduct(product));
                          }}
                          className={`${isProductSaved(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center`}
                          title={isProductSaved(product.id) ? 'Remove from saved' : 'Save to profile'}
                        >
                          {isProductSaved(product.id) ? (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {/* Product image with floating effect */}
                      <div className="relative inline-block w-full mb-4">
                        {/* Floating shadow effect - soft glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20 blur-2xl transform translate-y-4 scale-110 -z-10 rounded-lg"></div>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-48 object-cover rounded-lg transition-all duration-500 ease-out relative z-10"
                          style={{
                            transform: 'translateY(-5px) scale(1)',
                            filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.12))',
                            transition: 'transform 0.5s ease-out, filter 0.5s ease-out',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
                            e.currentTarget.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.18))';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px) scale(1)';
                            e.currentTarget.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.12))';
                          }}
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                        {product.name.includes(product.brand) ? product.name : `${product.brand} · ${product.name}`}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-semibold text-gray-900">${product.price}</span> • $/1000 kcal: <span className="font-semibold text-gray-900">${product.pricePer1000kcal}</span>
                      </p>
                      <div className="mt-auto space-y-3">
                        {/* First row: Buy now and Compare buttons */}
                        <div className="flex gap-2">
                          {/* Buy now button */}
                          <a 
                            href={getGoogleSearchUrl(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={(e) => handleTouchEnd(e)}
                            className="flex-1 bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease min-h-[44px] flex items-center justify-center"
                            style={{
                              transform: 'translateY(0)',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                              e.currentTarget.style.backgroundColor = '#065f46'; // green-700
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                              e.currentTarget.style.backgroundColor = '#166534'; // green-800
                            }}
                          >
                            Buy now
                          </a>
                          {/* Compare button with liquid glass effect */}
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              try {
                                const selection = [product.id];
                                localStorage.setItem('compareSelection', JSON.stringify(selection));
                                navigate('/compare', { replace: false });
                              } catch (error) {
                                console.error('Error navigating to compare page:', error);
                                window.location.href = '/compare';
                              }
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleTouchEnd(e, () => {
                                try {
                                  const selection = [product.id];
                                  localStorage.setItem('compareSelection', JSON.stringify(selection));
                                  navigate('/compare', { replace: false });
                                } catch (error) {
                                  console.error('Error navigating to compare page:', error);
                                  window.location.href = '/compare';
                                }
                              });
                            }}
                            className="flex-1 liquid-glass text-gray-800 px-4 py-2 rounded-lg text-sm font-medium min-h-[44px]"
                          >
                            Compare
                          </button>
                        </div>
                        {/* Second row: Find store nearby button */}
                        <button 
                          onClick={() => {
                            setSelectedProductForMap(product.name);
                            setShowMapModal(true);
                          }}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={(e) => handleTouchEnd(e, () => {
                            setSelectedProductForMap(product.name);
                            setShowMapModal(true);
                          })}
                          className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-300 min-h-[44px] flex items-center justify-center gap-1"
                          title="Find stores with this product"
                        >
                          📍 Find store nearby
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {processedProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">No matching products found</h3>
                  <p className="text-gray-600 mb-6">Please try adjusting your filter criteria or search keywords.</p>
                  <button 
                    onClick={clearAllFilters}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, clearAllFilters)}
                    className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 min-h-[44px]"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Compare suggestion bar - Floating style */}
      {savedCount >= 2 && showComparePrompt && (
        <div className="fixed bottom-6 left-1/2 z-40 liquid-glass shadow-2xl rounded-full px-4 py-2 flex items-center gap-3 backdrop-blur-xl" style={{ transform: 'translateX(-50%)' }}>
          <span className="text-xs text-gray-800 font-medium whitespace-nowrap">You saved {savedCount} items</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCompareNow(e);
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleTouchEnd(e, () => handleCompareNow(e));
            }}
            className="bg-green-800 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-green-700 transition-colors duration-300 whitespace-nowrap min-h-[32px]"
          >
            Compare latest 2
          </button>
          <button
            type="button"
            onClick={() => setShowComparePrompt(false)}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300 min-h-[32px] min-w-[32px] flex items-center justify-center"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <StoreMapModal 
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        selectedProduct={selectedProductForMap}
      />

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