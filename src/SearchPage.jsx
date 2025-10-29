import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import { useAuth } from './AuthContext';
import { useToast } from './contexts/ToastContext';
import { petFoodDatabase } from './data/petFoodDatabase';
import { getMatchLevelStyle, findBestMatches } from './utils/matchingAlgorithm';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import StoreMapModal from './components/StoreMapModal';

function SearchPage() {
  const { quizData } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { sectionsRef, getAnimationClass, getStaggeredAnimationClass } = useScrollAnimation();
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
    // 右侧标签筛选器 - 产品特性和品质
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

  // 过滤和搜索产品
  const filteredProducts = useMemo(() => {
    let products = [...petFoodDatabase];
    
    // 如果有 quiz 数据，先进行智能匹配
    if (quizData && quizData.pet) {
      products = findBestMatches(quizData);
    }

    // 搜索过滤
    if (searchTerm) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 物种过滤
    if (filters.species.length > 0) {
      products = products.filter(product => 
        filters.species.some(species => product.petType.includes(species))
      );
    }

    // 生命阶段过滤
    if (filters.lifeStage.length > 0) {
      products = products.filter(product => 
        filters.lifeStage.some(stage => product.lifeStage.includes(stage))
      );
    }

    // 饮食方式过滤
    if (filters.dietStyle.length > 0) {
      products = products.filter(product => 
        filters.dietStyle.some(style => product.feedingStyle.includes(style))
      );
    }

    // 蛋白质类型过滤
    if (filters.proteinType.length > 0) {
      products = products.filter(product => 
        filters.proteinType.some(protein => product.mainProteins.includes(protein))
      );
    }

    // 价格范围过滤
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

    // Premium 筛选 - 显示高端产品
    if (filters.premium) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('premium') || 
          tag.toLowerCase().includes('high-end') ||
          product.price > 40
        )
      );
    }

    // Packaging 筛选 - 显示有环保包装的产品
    if (filters.packaging) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('recyclable') || 
          tag.toLowerCase().includes('compostable') ||
          tag.toLowerCase().includes('eco-friendly')
        )
      );
    }

    // Certifications 筛选 - 显示有认证的产品
    if (filters.certifications) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('certified') || 
          tag.toLowerCase().includes('organic') ||
          tag.toLowerCase().includes('usda')
        )
      );
    }

    // Grain Free 筛选 - 显示无谷物产品
    if (filters.grainFree) {
      products = products.filter(product => product.isGrainFree);
    }

    // High Protein 筛选 - 显示高蛋白产品
    if (filters.highProtein) {
      products = products.filter(product => 
        product.tags.some(tag => tag.toLowerCase().includes('high protein'))
      );
    }

    // Organic 筛选 - 显示有机产品
    if (filters.organic) {
      products = products.filter(product => product.isOrganic);
    }

    // Sustainable 筛选 - 显示可持续产品
    if (filters.sustainable) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('sustainable') || 
          tag.toLowerCase().includes('low-footprint') ||
          tag.toLowerCase().includes('eco-friendly')
        )
      );
    }

    // Hypoallergenic 筛选 - 显示低敏产品
    if (filters.hypoallergenic) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('hypoallergenic') || 
          tag.toLowerCase().includes('limited ingredient') ||
          tag.toLowerCase().includes('single protein')
        )
      );
    }

    // Locally Sourced 筛选 - 显示本地采购产品
    if (filters.locallySourced) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('locally sourced') || 
          tag.toLowerCase().includes('made nearby') ||
          tag.toLowerCase().includes('local production')
        )
      );
    }

    // Human Grade 筛选 - 显示人类级产品
    if (filters.humanGrade) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('human-grade') || 
          tag.toLowerCase().includes('human grade')
        )
      );
    }

    // Subscription 筛选 - 显示订阅产品
    if (filters.subscription) {
      products = products.filter(product => 
        product.tags.some(tag => 
          tag.toLowerCase().includes('subscription') || 
          tag.toLowerCase().includes('fresh meals')
        )
      );
    }

    // 排序
    switch (sortBy) {
      case 'lowest':
        // 价格排序，但保持 Best match 在最上面
        products.sort((a, b) => {
          if (a.matchLevel === 'best' && b.matchLevel !== 'best') return -1;
          if (b.matchLevel === 'best' && a.matchLevel !== 'best') return 1;
          return a.price - b.price;
        });
        break;
      case 'highest':
        // 价格排序，但保持 Best match 在最上面
        products.sort((a, b) => {
          if (a.matchLevel === 'best' && b.matchLevel !== 'best') return -1;
          if (b.matchLevel === 'best' && a.matchLevel !== 'best') return 1;
          return b.price - a.price;
        });
        break;
      case 'best':
      default:
        // 智能匹配排序：Best match 优先，然后按匹配分数排序
        products.sort((a, b) => {
          // 首先按匹配等级排序
          const levelOrder = { 'best': 0, 'great': 1, 'good': 2, 'eco-friendly': 3, 'budget': 4 };
          const aLevel = levelOrder[a.matchLevel] || 5;
          const bLevel = levelOrder[b.matchLevel] || 5;
          
          if (aLevel !== bLevel) {
            return aLevel - bLevel;
          }
          
          // 相同等级内按匹配分数排序
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
    // 检查用户是否已登录
    if (!user) {
      showError('Please log in to save products to your profile.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    const isAlreadySaved = savedProducts.find(p => p.id === product.id);

    let updated;
    if (!isAlreadySaved) {
      const productToSave = { ...product, savedAt: new Date().toISOString() };
      updated = [...savedProducts, productToSave];
      localStorage.setItem('savedProducts', JSON.stringify(updated));
      showSuccess('Saved to your profile');
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

  return (
    <div className="min-h-screen bg-white">
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
      {quizData && quizData.pet && (
        <section className="bg-green-50 py-4">
          <div className="max-w-6xl mx-auto px-8">
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
              className="text-green-800 hover:underline text-sm mt-1"
            >
              Clear filters
            </button>
          </div>
        </section>
      )}

      {/* Main Layout */}
      <main className="pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          {/* Sort & Tags */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by</label>
            <select 
              id="sort" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="best">Best match</option>
              <option value="lowest">Lowest price</option>
              <option value="highest">Highest price</option>
            </select>
            
            {/* 地图按钮 */}
            <button
              onClick={() => {
                setSelectedProductForMap(null);
                setShowMapModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              🗺️ Find Stores Near You
            </button>
            
            {/* Active Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {filters.species.map((species, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {species} ✕
                </span>
              ))}
              {filters.lifeStage.map((stage, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {stage} ✕
                </span>
              ))}
              {filters.dietStyle.map((style, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {style} ✕
                </span>
              ))}
              {filters.proteinType.map((protein, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {protein} ✕
                </span>
              ))}
              {filters.premium && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Premium ✕
                </span>
              )}
              {filters.packaging && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Packaging ✕
                </span>
              )}
              {filters.certifications && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Certifications ✕
                </span>
              )}
              {filters.grainFree && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Grain Free ✕
                </span>
              )}
              {filters.highProtein && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  High Protein ✕
                </span>
              )}
              {filters.organic && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Organic ✕
                </span>
              )}
              {filters.sustainable && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Sustainable ✕
                </span>
              )}
              {filters.hypoallergenic && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Hypoallergenic ✕
                </span>
              )}
              {filters.locallySourced && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Locally Sourced ✕
                </span>
              )}
              {filters.humanGrade && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Human Grade ✕
                </span>
              )}
              {filters.subscription && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Subscription ✕
                </span>
              )}
            </div>
                </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 shadow-lg lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
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

                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={() => {/* Apply filters logic */}}
                    className="flex-1 bg-green-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300"
                  >
                    Apply filters
                  </button>
                  <button 
                    onClick={clearFilters}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors duration-300"
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
            <section className="flex-1 min-h-0">
              <div className="mb-6">
                <input 
                  type="text" 
                  placeholder="Search by brand, protein, keyword..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button 
                  onClick={() => handleTagFilter('premium')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.premium 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Premium
                </button>
                <button 
                  onClick={() => handleTagFilter('packaging')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.packaging 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Packaging
                </button>
                <button 
                  onClick={() => handleTagFilter('certifications')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.certifications 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Certifications
                </button>
                <button 
                  onClick={() => handleTagFilter('grainFree')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.grainFree 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Grain Free
                </button>
                <button 
                  onClick={() => handleTagFilter('highProtein')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.highProtein 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  High Protein
                </button>
                <button 
                  onClick={() => handleTagFilter('organic')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.organic 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Organic
                </button>
                <button 
                  onClick={() => handleTagFilter('sustainable')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.sustainable 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sustainable
                </button>
                <button 
                  onClick={() => handleTagFilter('hypoallergenic')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.hypoallergenic 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Hypoallergenic
                </button>
                <button 
                  onClick={() => handleTagFilter('locallySourced')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.locallySourced 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Locally Sourced
                </button>
                <button 
                  onClick={() => handleTagFilter('humanGrade')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.humanGrade 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Human Grade
                </button>
                <button 
                  onClick={() => handleTagFilter('subscription')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    filters.subscription 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Subscription
                </button>
              </div>
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
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
                        <a href="#" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                          Buy on {product.preferredChannel}
                        </a>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setSelectedProductForMap(product.name);
                              setShowMapModal(true);
                            }}
                            className="text-gray-600 hover:text-green-800 text-sm flex items-center gap-1"
                            title="Find stores with this product"
                          >
                            📍 Find Nearby
                          </button>
                          <button className="text-gray-600 hover:text-green-800 text-sm">Compare</button>
                          <button 
                            onClick={(e) => { e.preventDefault(); handleSaveProduct(product); }}
                            className={`${isProductSaved(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors duration-300`}
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
                    className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
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
            className="bg-green-800 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            Compare latest 2
          </button>
          <button
            onClick={() => setShowComparePrompt(false)}
            className="text-gray-500 text-xs hover:text-gray-700"
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
                <img src="/logos/logo.png" alt="GreenTail Logo" className="w-6 h-6" />
                GreenTail
              </h3>
              <p className="text-gray-600 leading-relaxed">Helping pet parents choose organic, planet-friendly food with confidence.</p>
            </div>
            <div>
              <ul className="space-y-2">
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

      {/* 地图弹窗 */}
      <StoreMapModal 
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        selectedProduct={selectedProductForMap}
      />
    </div>
  );
}

export default SearchPage;
