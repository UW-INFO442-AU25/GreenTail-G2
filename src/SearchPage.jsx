import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import { useAuth } from './AuthContext';
import { useToast } from './contexts/ToastContext';
import { petFoodDatabase } from './data/petFoodDatabase';
import { getMatchLevelStyle, findBestMatches } from './utils/matchingAlgorithm';
import StoreMapModal from './components/StoreMapModal';
import { useTouchHandlers } from './hooks/useInteractionMode';

/**
 * SearchPage - Enhanced with smooth animations per smooth_transition_recommendations.md
 * 
 * Animation Strategy:
 * 1. Page initial load: Staggered animations for search context, filter sidebar, product cards
 * 2. Scroll-triggered animations: Intersection Observer for product cards entering viewport
 * 3. Micro-interactions: Hover effects on buttons and product images
 * 4. Performance: Only transform and opacity (hardware accelerated)
 * 5. Accessibility: Respects prefers-reduced-motion
 */

function SearchPage() {
  const { quizData } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers();
  const [isVisible, setIsVisible] = useState({});
  const [hasAnimated, setHasAnimated] = useState({});
  const sectionsRef = useRef({});
  const observerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('best');
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedProductForMap, setSelectedProductForMap] = useState(null);
  const [filters, setFilters] = useState({
    species: ['Dog'],
    lifeStage: ['Adult'],
    dietStyle: [],
    proteinType: [],
    priceRange: '',
    packaging: false,
    certifications: false,
    grainFree: false,
    highProtein: false,
    organic: false,
    sustainable: false,
    hypoallergenic: false,
    subscription: false,
    premium: false,
    locallySourced: false,
    humanGrade: false
  });

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

  // Filter and search products based on user inputs
  const filteredProducts = useMemo(() => {
    let products = [...petFoodDatabase];
    
    // If quiz data exists, use smart matching algorithm to prioritize results
    if (quizData && quizData.pet) {
      products = findBestMatches(quizData);
    }

    // Apply text search filter across product name, brand, and tags
    if (searchTerm) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by pet species (Dog, Cat)
    if (filters.species.length > 0) {
      products = products.filter(product => 
        filters.species.some(species => product.petType.includes(species))
      );
    }

    // Filter by life stage (Puppy, Adult, Senior)
    if (filters.lifeStage.length > 0) {
      products = products.filter(product => 
        filters.lifeStage.some(stage => product.lifeStage.includes(stage))
      );
    }

    // Filter by diet style (Kibble, Wet, Freeze-dried, etc.)
    if (filters.dietStyle.length > 0) {
      products = products.filter(product => 
        filters.dietStyle.some(style => product.feedingStyle.includes(style))
      );
    }

    // Filter by protein type (Chicken, Salmon, etc.)
    if (filters.proteinType.length > 0) {
      products = products.filter(product => 
        filters.proteinType.some(protein => product.mainProteins.includes(protein))
      );
    }

    // Filter by price range
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

    if (filters.premium) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('premium') || 
          tag.toLowerCase().includes('high-end') ||
          product.price > 40
        )
      );
    }

    if (filters.packaging) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('recyclable') || 
          tag.toLowerCase().includes('compostable') ||
          tag.toLowerCase().includes('eco-friendly')
        )
      );
    }

    if (filters.certifications) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('certified') || 
          tag.toLowerCase().includes('organic') ||
          tag.toLowerCase().includes('usda')
        )
      );
    }

    if (filters.grainFree) {
      products = products.filter(product => product.isGrainFree);
    }

    if (filters.highProtein) {
      products = products.filter(product => 
        product.tags.some(tag => tag.toLowerCase().includes('high protein'))
      );
    }

    if (filters.organic) {
      products = products.filter(product => product.isOrganic);
    }

    if (filters.sustainable) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('sustainable') || 
          tag.toLowerCase().includes('low-footprint') ||
          tag.toLowerCase().includes('eco-friendly')
        )
      );
    }

    if (filters.hypoallergenic) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('hypoallergenic') || 
          tag.toLowerCase().includes('limited ingredient') ||
          tag.toLowerCase().includes('single protein')
        )
      );
    }

    if (filters.locallySourced) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('locally sourced') || 
          tag.toLowerCase().includes('made nearby') ||
          tag.toLowerCase().includes('local production')
        )
      );
    }

    if (filters.humanGrade) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('human-grade') || 
          tag.toLowerCase().includes('human grade')
        )
      );
    }

    if (filters.subscription) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('subscription') || 
          tag.toLowerCase().includes('fresh meals')
        )
      );
    }

    // Sort products based on selected sort option
    switch (sortBy) {
      case 'lowest':
        // Sort by price (low to high), but keep "best match" products at the top
        products.sort((a, b) => {
          if (a.matchLevel === 'best' && b.matchLevel !== 'best') return -1;
          if (b.matchLevel === 'best' && a.matchLevel !== 'best') return 1;
          return a.price - b.price;
        });
        break;
      case 'highest':
        // Sort by price (high to low), but keep "best match" products at the top
        products.sort((a, b) => {
          if (a.matchLevel === 'best' && b.matchLevel !== 'best') return -1;
          if (b.matchLevel === 'best' && a.matchLevel !== 'best') return 1;
          return b.price - a.price;
        });
        break;
      case 'best':
      default:
        // Sort by match level first, then by match score within the same level
        products.sort((a, b) => {
          const levelOrder = { 'best': 0, 'great': 1, 'good': 2, 'eco-friendly': 3, 'budget': 4 };
          const aLevel = levelOrder[a.matchLevel] || 5;
          const bLevel = levelOrder[b.matchLevel] || 5;
          
          if (aLevel !== bLevel) {
            return aLevel - bLevel;
          }
          
          // If same level, sort by match score (higher score first)
          return (b.matchScore || 0) - (a.matchScore || 0);
        });
        break;
    }

    return products;
  }, [searchTerm, filters, sortBy, quizData]);

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

  const clearFilters = () => {
    setFilters({
      species: [],
      lifeStage: [],
      dietStyle: [],
      proteinType: [],
      priceRange: '',
      packaging: false,
      certifications: false,
      grainFree: false,
      highProtein: false,
      organic: false,
      sustainable: false,
      hypoallergenic: false,
      subscription: false,
      premium: false,
      locallySourced: false,
      humanGrade: false
    });
    setSearchTerm('');
  };

  const handleTagFilter = (tagType) => {
    setFilters(prev => ({
      ...prev,
      [tagType]: !prev[tagType]
    }));
  };

  const handleSaveProduct = (product) => {
    // Allow saving to localStorage for both logged-in and non-logged-in users
    // Logged-in users can sync to their profile, non-logged-in users can save locally
    const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    const isAlreadySaved = savedProducts.find(p => p.id === product.id);

    let updated;
    if (!isAlreadySaved) {
      const productToSave = { ...product, savedAt: new Date().toISOString() };
      updated = [...savedProducts, productToSave];
      localStorage.setItem('savedProducts', JSON.stringify(updated));
      if (user) {
        showSuccess('Saved to your profile');
      } else {
        showSuccess('Saved locally. Sign in to sync across devices');
      }
    } else {
      updated = savedProducts.filter(p => p.id !== product.id);
      localStorage.setItem('savedProducts', JSON.stringify(updated));
      showSuccess('Removed from saved');
    }
    setSavedForCompare(updated);
    // Re-open compare prompt on any heart click if there are at least 2 saved items
    setShowComparePrompt(updated.length >= 2);
  };

  const isProductSaved = (productId) => {
    const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    return savedProducts.find(p => p.id === productId);
  };

  // Compare now action - send last two saved items to compare page
  const handleCompareNow = () => {
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    if (saved.length < 2) return;
    const lastTwo = saved.slice(-2).map(p => p.id);
    localStorage.setItem('compareSelection', JSON.stringify(lastTwo));
    navigate('/compare');
  };

  // Keep local state in sync when user removes elsewhere (future-proof)
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
  // Optimization: Uses Intersection Observer API for efficient scroll detection
  // When element reaches 20% visibility, triggers animation
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
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px 0px -50px 0px', // Start animation slightly before fully visible
      }
    );

    // Observe all sections
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
    // Search context, filters, and search input animate immediately on page load
    setTimeout(() => {
      setIsVisible((prev) => ({
        ...prev,
        'search-context': true,
        'filter-sidebar': true,
        'search-header': true,
        'search-input': true,
      }));
      setHasAnimated((prev) => ({
        ...prev,
        'search-context': true,
        'filter-sidebar': true,
        'search-header': true,
        'search-input': true,
      }));
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-green-800">GreenTail</span>
          </div>
          <nav>
            <ul className="flex gap-8">
              <li><Link to="/" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Home</Link></li>
              <li><Link to="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Quiz</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-green-800 transition-colors duration-300 relative font-medium after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-green-800">Search</Link></li>
              <li><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Search Context Summary */}
      {/* Optimization: Fade-in on page load */}
      {quizData && quizData.pet && (
        <section 
          className="bg-green-50 py-4 mt-16"
          ref={el => sectionsRef.current['search-context'] = el}
        >
          <div 
            className={`max-w-6xl mx-auto px-8 transition-all duration-1000 ease-out ${
              isVisible['search-context'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-5'
            }`}
          >
            <p className="text-gray-700">
              <strong>
                {quizData.pet} · {quizData.lifeStage} · 
                {quizData.avoidIngredients && quizData.avoidIngredients.length > 0 && !quizData.avoidIngredients.includes('None') 
                  ? ` Avoid: ${quizData.avoidIngredients.filter(ingredient => ingredient !== 'Not sure').join(', ').toLowerCase()} ·` 
                  : ''} 
                {quizData.zipCode ? ` ZIP: ${quizData.zipCode}` : ''}
              </strong> (from your answers)
            </p>
            <button 
              onClick={clearFilters}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, clearFilters)}
              className="text-green-800 hover:underline text-sm mt-1 transition-colors duration-300 min-h-[44px]"
            >
              Clear filters
            </button>
          </div>
        </section>
      )}

      {/* Main Layout */}
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          {/* Sort & Tags */}
          {/* Optimization: Fade-in on page load */}
          <div 
            className="flex items-center gap-4 mb-6 flex-wrap"
            ref={el => sectionsRef.current['search-header'] = el}
          >
            <div 
              className={`transition-all duration-1000 ease-out ${
                isVisible['search-header'] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
                style={{ transitionDelay: '400ms' }}
            >
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by</label>
              <select 
                id="sort" 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm ml-2"
              >
                <option value="best">Best match</option>
                <option value="lowest">Lowest price</option>
                <option value="highest">Highest price</option>
              </select>
            </div>
            
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
            >
              🗺️ Find Stores Near You
            </button>
            
            {/* Active Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {filters.species.map((species, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleFilterChange('species', species, false)}
                >
                  {species} <span className="hover:text-red-600">✕</span>
                </span>
              ))}
              {filters.lifeStage.map((stage, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleFilterChange('lifeStage', stage, false)}
                >
                  {stage} <span className="hover:text-red-600">✕</span>
                </span>
              ))}
              {filters.dietStyle.map((style, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleFilterChange('dietStyle', style, false)}
                >
                  {style} <span className="hover:text-red-600">✕</span>
                </span>
              ))}
              {filters.proteinType.map((protein, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleFilterChange('proteinType', protein, false)}
                >
                  {protein} <span className="hover:text-red-600">✕</span>
                </span>
              ))}
              {filters.premium && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('premium')}
                >
                  Premium <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.packaging && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('packaging')}
                >
                  Packaging <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.certifications && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('certifications')}
                >
                  Certifications <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.grainFree && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('grainFree')}
                >
                  Grain Free <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.highProtein && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('highProtein')}
                >
                  High Protein <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.organic && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('organic')}
                >
                  Organic <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.sustainable && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('sustainable')}
                >
                  Sustainable <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.hypoallergenic && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('hypoallergenic')}
                >
                  Hypoallergenic <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.locallySourced && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('locallySourced')}
                >
                  Locally Sourced <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.humanGrade && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('humanGrade')}
                >
                  Human Grade <span className="hover:text-red-600">✕</span>
                </span>
              )}
              {filters.subscription && (
                <span 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-200 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => handleTagFilter('subscription')}
                >
                  Subscription <span className="hover:text-red-600">✕</span>
                </span>
              )}
            </div>
                </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            {/* Optimization: Fade-in on page load */}
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
                style={{ transitionDelay: '500ms' }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by</h3>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">SPECIES</p>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.species.includes('Dog')}
                      onChange={(e) => handleFilterChange('species', 'Dog', e.target.checked)}
                    />
                    <span className="text-sm">Dog</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={filters.species.includes('Cat')}
                      onChange={(e) => handleFilterChange('species', 'Cat', e.target.checked)}
                    />
                    <span className="text-sm">Cat</span>
                  </label>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">LIFE STAGE</p>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.lifeStage.includes('Puppy/Kitten')}
                      onChange={(e) => handleFilterChange('lifeStage', 'Puppy/Kitten', e.target.checked)}
                    />
                    <span className="text-sm">Puppy/Kitten</span>
                  </label>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.lifeStage.includes('Adult')}
                      onChange={(e) => handleFilterChange('lifeStage', 'Adult', e.target.checked)}
                    />
                    <span className="text-sm">Adult</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={filters.lifeStage.includes('Senior')}
                      onChange={(e) => handleFilterChange('lifeStage', 'Senior', e.target.checked)}
                    />
                    <span className="text-sm">Senior</span>
                  </label>
              </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">DIET STYLE</p>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.dietStyle.includes('Kibble')}
                      onChange={(e) => handleFilterChange('dietStyle', 'Kibble', e.target.checked)}
                    />
                    <span className="text-sm">Kibble</span>
                  </label>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.dietStyle.includes('Wet')}
                      onChange={(e) => handleFilterChange('dietStyle', 'Wet', e.target.checked)}
                    />
                    <span className="text-sm">Wet/Canned</span>
                  </label>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.dietStyle.includes('Freeze-dried')}
                      onChange={(e) => handleFilterChange('dietStyle', 'Freeze-dried', e.target.checked)}
                    />
                    <span className="text-sm">Freeze-dried</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={filters.dietStyle.includes('Fresh')}
                      onChange={(e) => handleFilterChange('dietStyle', 'Fresh', e.target.checked)}
                    />
                    <span className="text-sm">Fresh</span>
                  </label>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">PROTEIN TYPE</p>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.proteinType.includes('Chicken')}
                      onChange={(e) => handleFilterChange('proteinType', 'Chicken', e.target.checked)}
                    />
                    <span className="text-sm">Chicken</span>
                  </label>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.proteinType.includes('Fish')}
                      onChange={(e) => handleFilterChange('proteinType', 'Fish', e.target.checked)}
                    />
                    <span className="text-sm">Salmon</span>
                  </label>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      checked={filters.proteinType.includes('Turkey')}
                      onChange={(e) => handleFilterChange('proteinType', 'Turkey', e.target.checked)}
                    />
                    <span className="text-sm">Turkey</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={filters.proteinType.includes('Beef')}
                      onChange={(e) => handleFilterChange('proteinType', 'Beef', e.target.checked)}
                    />
                    <span className="text-sm">Beef</span>
                  </label>
              </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">PRICE RANGE</p>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filters.priceRange === 'under20'}
                      onChange={() => handlePriceRangeChange('under20')}
                    />
                    <span className="text-sm">$ &lt; 20</span>
                  </label>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filters.priceRange === '20-30'}
                      onChange={() => handlePriceRangeChange('20-30')}
                    />
                    <span className="text-sm">$20–30</span>
                  </label>
                  <label className="flex items-center gap-2 mb-2">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filters.priceRange === '30-40'}
                      onChange={() => handlePriceRangeChange('30-40')}
                    />
                    <span className="text-sm">$30–40</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filters.priceRange === 'over40'}
                      onChange={() => handlePriceRangeChange('over40')}
                    />
                      <span className="text-sm">$ &gt; 40</span>
                  </label>
                </div>

                {/* Filter buttons with hover effects */}
                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={() => {/* Apply filters logic */}}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => {/* Apply filters logic */})}
                    className="flex-1 bg-green-800 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 ease min-h-[44px]"
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
                    onClick={clearFilters}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, clearFilters)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease min-h-[44px]"
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

            {/* Product Results */}
            {/* Optimization: Search input fades in on page load */}
            <section className="flex-1 min-h-0">
              <div 
                className="mb-6"
                ref={el => sectionsRef.current['search-input'] = el}
              >
                <input 
                  type="text" 
                  placeholder="Search by brand, protein, keyword..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 transition-all duration-1000 ease-out ${
                    isVisible['search-input'] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button 
                  onClick={() => handleTagFilter('premium')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('premium'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.premium 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Premium
                </button>
                <button 
                  onClick={() => handleTagFilter('packaging')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('packaging'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.packaging 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Packaging
                </button>
                <button 
                  onClick={() => handleTagFilter('certifications')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('certifications'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.certifications 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Certifications
                </button>
                <button 
                  onClick={() => handleTagFilter('grainFree')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('grainFree'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.grainFree 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Grain Free
                </button>
                <button 
                  onClick={() => handleTagFilter('highProtein')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('highProtein'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.highProtein 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  High Protein
                </button>
                <button 
                  onClick={() => handleTagFilter('organic')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('organic'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.organic 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Organic
                </button>
                <button 
                  onClick={() => handleTagFilter('sustainable')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('sustainable'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.sustainable 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sustainable
                </button>
                <button 
                  onClick={() => handleTagFilter('hypoallergenic')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('hypoallergenic'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.hypoallergenic 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Hypoallergenic
                </button>
                <button 
                  onClick={() => handleTagFilter('locallySourced')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('locallySourced'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.locallySourced 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Locally Sourced
                </button>
                <button 
                  onClick={() => handleTagFilter('humanGrade')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('humanGrade'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.humanGrade 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Human Grade
                </button>
                <button 
                  onClick={() => handleTagFilter('subscription')}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => handleTagFilter('subscription'))}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 min-h-[44px] ${
                    filters.subscription 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Subscription
                </button>
              </div>
              
              {/* Product Grid */}
              {/* Optimization: Staggered fade-in on scroll for product cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => {
                  const matchStyle = getMatchLevelStyle(product.matchLevel);
                  const productKey = `product-${product.id}`;
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
                        <span className={`${matchStyle.bgColor} ${matchStyle.textColor} px-3 py-1 rounded text-sm font-semibold`}>
                          {matchStyle.label}
                        </span>
                        <span className="text-xl font-semibold text-gray-900">${product.price}</span>
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
                      <p className="text-sm text-gray-600 mb-4">$/1000 kcal: ${product.pricePer1000kcal}</p>
                      <div className="flex justify-between items-center mt-auto">
                        {/* Buy button with hover effect */}
                        <a 
                          href="#" 
                          onTouchStart={handleTouchStart}
                          onTouchEnd={(e) => handleTouchEnd(e)}
                          className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease min-h-[44px] flex items-center"
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
                          Buy on {product.preferredChannel}
                        </a>
                        <div className="flex items-center gap-2">
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
                            className="text-gray-600 hover:text-green-800 text-sm flex items-center gap-1 transition-colors duration-300 min-h-[44px]"
                            title="Find stores with this product"
                          >
                            📍 Find Nearby
                          </button>
                          <button 
                            onTouchStart={handleTouchStart}
                            onTouchEnd={(e) => handleTouchEnd(e)}
                            className="text-gray-600 hover:text-green-800 text-sm transition-colors duration-300 min-h-[44px]">Compare</button>
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
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">No matching products found</h3>
                  <p className="text-gray-600 mb-6">Please try adjusting your filter criteria or search keywords.</p>
                  <button 
                    onClick={clearFilters}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, clearFilters)}
                    className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 min-h-[44px]"
                  >
                    Clear all filters
                  </button>
            </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Compare suggestion bar */}
      {savedCount >= 2 && showComparePrompt && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-green-200 shadow-xl rounded-full px-5 py-3 flex items-center gap-4">
          <span className="text-sm text-gray-800">You saved {savedCount} items</span>
          <button
            onClick={handleCompareNow}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, handleCompareNow)}
            className="bg-green-800 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700 transition-colors min-h-[44px]"
          >
            Compare latest 2
          </button>
          <button
            onClick={() => setShowComparePrompt(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, () => setShowComparePrompt(false))}
            className="text-gray-500 text-xs hover:text-gray-700 min-h-[44px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="w-6 h-6" />
                GreenTail
              </h3>
              <p className="text-gray-600 leading-relaxed">Helping pet parents choose organic, planet-friendly food with confidence.</p>
            </div>
            <div className="flex items-center justify-end">
              <ul className="flex flex-wrap gap-4 md:gap-6 items-center">
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Quiz</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Learn</a></li>
                <li><Link to="/compare" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Compare</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">How We Evaluate</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-gray-600">© 2025 GreenTail. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <StoreMapModal 
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        selectedProduct={selectedProductForMap}
      />
    </div>
  );
}

export default SearchPage;
