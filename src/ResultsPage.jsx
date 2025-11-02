import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import { useAuth } from './AuthContext';
import { findBestMatches, getMatchLevelStyle, generatePersonalizedDescription } from './utils/matchingAlgorithm';
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
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();
  const [showHelpBanner, setShowHelpBanner] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedProductForMap, setSelectedProductForMap] = useState(null);
  const [showTransitionPlan, setShowTransitionPlan] = useState(false);
  
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
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Contextual Help Banner - Phase 6: Dismissible top banner */}
          <ContextualHelpBanner 
            isVisible={showHelpBanner} 
            onDismiss={() => setShowHelpBanner(false)}
            onShowTransitionPlan={() => setShowTransitionPlan(true)}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Comprehensive Filtering System */}
            {/* Phase 1 & 2: Repurposed sidebar for filters */}
            <aside 
              className="w-full lg:w-64 flex-shrink-0"
              ref={el => sectionsRef.current['filter-sidebar'] = el}
            >
              <div 
                className={`bg-white rounded-xl p-6 shadow-lg lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto transition-all duration-1000 ease-out ${
                  isVisible['filter-sidebar'] 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-5'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filter by</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      onTouchStart={handleTouchStart}
                      onTouchEnd={(e) => handleTouchEnd(e, clearAllFilters)}
                      className="text-sm text-green-800 hover:text-green-900 hover:underline transition-colors duration-200 min-h-[44px]"
                      aria-label="Clear all filters"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">PRICE RANGE</p>
                  <div className="space-y-2">
                    {[
                      { value: 'under20', label: '$ < 20' },
                      { value: '20-30', label: '$20–30' },
                      { value: '30-40', label: '$30–40' },
                      { value: 'over40', label: '$ > 40' },
                    ].map((range) => (
                      <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={filters.priceRange === range.value}
                          onChange={() => handlePriceRangeChange(range.value)}
                          className="text-green-800 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">BRAND</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableBrands.slice(0, 10).map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={(e) => handleFilterChange('brands', brand, e.target.checked)}
                          className="text-green-800 focus:ring-green-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Life Stage Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">LIFE STAGE</p>
                  <div className="space-y-2">
                    {availableLifeStages.map((stage) => (
                      <label key={stage} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.lifeStage.includes(stage)}
                          onChange={(e) => handleFilterChange('lifeStage', stage, e.target.checked)}
                          className="text-green-800 focus:ring-green-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{stage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Diet Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">SPECIAL DIET</p>
                  <div className="space-y-2">
                    {[
                      { value: 'grain-free', label: 'Grain-Free' },
                      { value: 'high-protein', label: 'High-Protein' },
                      { value: 'limited-ingredient', label: 'Limited Ingredient' },
                      { value: 'hypoallergenic', label: 'Hypoallergenic' },
                    ].map((diet) => (
                      <label key={diet.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.specialDiet.includes(diet.value)}
                          onChange={(e) => handleSpecialDietChange(diet.value, e.target.checked)}
                          className="text-green-800 focus:ring-green-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{diet.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Protein Type Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">PROTEIN TYPE</p>
                  <div className="space-y-2">
                    {availableProteins.map((protein) => (
                      <label key={protein} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.proteinType.includes(protein)}
                          onChange={(e) => handleFilterChange('proteinType', protein, e.target.checked)}
                          className="text-green-800 focus:ring-green-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{protein}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sustainability Filter */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">SUSTAINABILITY</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.sustainability.ecoProtein}
                        onChange={() => handleSustainabilityChange('ecoProtein')}
                        className="text-green-800 focus:ring-green-500 rounded"
                      />
                      <span className="text-sm text-gray-700">Eco-Protein</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.sustainability.recyclablePackaging}
                        onChange={() => handleSustainabilityChange('recyclablePackaging')}
                        className="text-green-800 focus:ring-green-500 rounded"
                      />
                      <span className="text-sm text-gray-700">Recyclable Packaging</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.sustainability.certifiedOrganic}
                        onChange={() => handleSustainabilityChange('certifiedOrganic')}
                        className="text-green-800 focus:ring-green-500 rounded"
                      />
                      <span className="text-sm text-gray-700">Certified Organic</span>
                    </label>
              </div>
              </div>
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

              {/* Product Grid - Phase 4: Redesigned product cards */}
              {/* Optimization: Scroll-triggered animations using Intersection Observer */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAndSortedProducts.length > 0 ? (
                  filteredAndSortedProducts.map((product, index) => {
                    const matchStyle = getMatchLevelStyle(product.matchLevel);
                    const productKey = `product-${product.id}`;
                    
                    // Extract key features for icon display (2-3 most important)
                    const keyFeatures = [];
                    if (product.ecoFeatures?.certified || product.isOrganic) {
                      keyFeatures.push({ icon: 'certified', label: 'Certified Organic' });
                    }
                    if (product.ecoFeatures?.lowFootprintProtein) {
                      keyFeatures.push({ icon: 'eco', label: 'Low-Footprint Protein' });
                    }
                    if (product.ecoFeatures?.recyclablePackaging) {
                      keyFeatures.push({ icon: 'recycle', label: 'Recyclable Bag' });
                    }
                    // Add more if needed
                    if (keyFeatures.length === 0 && product.isGrainFree) {
                      keyFeatures.push({ icon: 'grain', label: 'Grain-Free' });
                    }
                    
                    // Mock rating (can be replaced with real data)
                    const rating = 4.5;
                    const reviewCount = 12;
                    
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
                        {/* Match Badge and Price */}
                        <div className="flex justify-between items-start mb-4">
                          <span className={`${matchStyle.bgColor} ${matchStyle.textColor} px-3 py-1 rounded text-sm font-semibold`}>
                            {matchStyle.label}
                          </span>
                          <span className="text-xl font-semibold text-gray-900">${product.price}</span>
                        </div>
                        
                        {/* Product Image - Phase 4: High-quality image with hover effect */}
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-400 ease"
                          style={{
                            transform: 'scale(1)',
                            transition: 'transform 0.4s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.03)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                        
                        {/* Brand & Name */}
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                          {product.name.includes(product.brand) ? product.name : `${product.brand} · ${product.name}`}
                        </h3>
                        
                        {/* Star Rating - Phase 4: Social proof */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{rating} ({reviewCount} reviews)</span>
                        </div>
                        
                        {/* Key Features - Phase 4: Icon-based, structured (2-3 attributes) */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          {keyFeatures.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                              <span className="text-green-800 text-sm">
                                {feature.icon === 'certified' && '✓'}
                                {feature.icon === 'eco' && '🌱'}
                                {feature.icon === 'recycle' && '♻️'}
                                {feature.icon === 'grain' && '🌾'}
                            </span>
                              <span className="text-xs text-green-800 font-medium">{feature.label}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Price per 1000 kcal */}
                        <p className="text-sm text-gray-600 mb-4">$/1000 kcal: ${product.pricePer1000kcal}</p>
                        
                        {/* CTAs - Phase 4: Primary "Add to Cart" and secondary actions */}
                        <div className="flex flex-col gap-3 mt-auto">
                          {/* Primary CTA: Add to Cart / Buy */}
                          <a 
                            href="#" 
                            onTouchStart={handleTouchStart}
                            onTouchEnd={(e) => handleTouchEnd(e)}
                            className="bg-green-800 text-white px-4 py-3 rounded-lg text-sm font-medium text-center transition-all duration-300 ease min-h-[44px] flex items-center justify-center"
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
                            aria-label={`Add ${product.name} to cart`}
                          >
                            Add to Cart • Buy on {product.preferredChannel}
                          </a>
                          
                          {/* Secondary Actions */}
                          <div className="flex items-center justify-between text-sm">
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
                              className="text-gray-600 hover:text-green-800 flex items-center gap-1 transition-colors duration-300 min-h-[44px]"
                              title="Find stores with this product"
                            >
                              📍 Find Nearby
                            </button>
                            <span className="text-gray-500">Match: {Math.round(product.matchScore || 0)}%</span>
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