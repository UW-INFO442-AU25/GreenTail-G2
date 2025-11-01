import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useToast } from './contexts/ToastContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { sectionsRef, getAnimationClass, getParallaxStyle } = useScrollAnimation();
  
  // Debug logging
  console.log('ProfilePage rendered, user:', user);
  const [savedProducts, setSavedProducts] = useState([]);
  const [zipCode, setZipCode] = useState('98105');
  const [sortBy, setSortBy] = useState('recently-saved');
  const [useZipInResults, setUseZipInResults] = useState(true);
  const [showNearbyShops, setShowNearbyShops] = useState(true);

  // Get user persona data
  const getUserPersona = () => {
    if (!user) return null;
    
    const personas = {
      'Sammi Huang': {
        name: 'Sammi Huang',
        memberSince: '2024',
        bio: 'UX Designer & Pet Parent',
        preferences: {
          zipCode: '98105',
          useZipInResults: true,
          showNearbyShops: true
        },
        defaultSavedProducts: [
          {
            id: 'ecobite-chicken',
            name: 'EcoBite · Organic Chicken & Oat Recipe',
            price: 28.85,
            image: '/img/ecobite.jpg',
            tags: ['certified organic', 'low-footprint protein', 'recyclable bag', 'made nearby'],
            preferredChannel: 'Chewy',
            pricePer1000kcal: 22.85,
            savedAt: '2024-12-15T10:30:00Z'
          },
          {
            id: 'purepaw-salmon',
            name: 'PurePaw · Organic Salmon Recipe',
            price: 33.50,
            image: '/img/purepaw.jpg',
            tags: ['certified organic', 'single-protein', 'no artificial preservatives'],
            preferredChannel: 'Amazon',
            pricePer1000kcal: 23.50,
            savedAt: '2024-12-14T15:20:00Z'
          },
          {
            id: 'farmfresh-turkey',
            name: 'FarmFresh · Grain-Free Turkey & Sweet Potato',
            price: 43.10,
            image: '/img/farmfresh.jpg',
            tags: ['grain-free', 'recyclable bag', 'made nearby'],
            preferredChannel: 'Petco',
            pricePer1000kcal: 24.10,
            savedAt: '2024-12-13T09:15:00Z'
          }
        ]
      },
      'Lele Zhang': {
        name: 'Lele Zhang',
        memberSince: '2024',
        bio: 'Data Researcher & Cat Lover',
        preferences: {
          zipCode: '98112',
          useZipInResults: true,
          showNearbyShops: false
        },
        defaultSavedProducts: [
          {
            id: 'whiskerwell-tuna',
            name: 'WhiskerWell · Organic Tuna & Pumpkin',
            price: 23.95,
            image: '/img/whiskerwell.jpg',
            tags: ['recyclable pouch', 'transparency page'],
            preferredChannel: 'MudBay',
            pricePer1000kcal: 13.45,
            savedAt: '2024-12-16T14:45:00Z'
          },
          {
            id: 'oceanwhisk-tuna',
            name: 'OceanWhisk · Tuna & Seaweed (Cat)',
            price: 16.99,
            image: '/img/oceanwhisk.jpg',
            tags: ['wet/canned', 'high-moisture', 'omega-3 rich'],
            preferredChannel: 'MudBay',
            pricePer1000kcal: 13.99,
            savedAt: '2024-12-15T11:30:00Z'
          }
        ]
      },
      'Kaibo Wang': {
        name: 'Kaibo Wang',
        memberSince: '2024',
        bio: 'Product Designer & Dog Enthusiast',
        preferences: {
          zipCode: '98103',
          useZipInResults: true,
          showNearbyShops: true
        },
        defaultSavedProducts: [
          {
            id: 'vitalbites-duck',
            name: 'VitalBites · Freeze-Dried Duck Nuggets',
            price: 42.00,
            image: '/img/vitalbites.jpg',
            tags: ['freeze-dried', 'grain-free', 'single-protein'],
            preferredChannel: 'Petco',
            pricePer1000kcal: 37.85,
            savedAt: '2024-12-17T16:20:00Z'
          },
          {
            id: 'meadowmix-lamb',
            name: 'MeadowMix · Organic Lamb & Brown Rice',
            price: 33.99,
            image: '/img/meadowmix.jpg',
            tags: ['certified organic', 'low-footprint protein'],
            preferredChannel: 'Chewy',
            pricePer1000kcal: 23.25,
            savedAt: '2024-12-16T13:10:00Z'
          }
        ]
      },
      'Lanqi Zhang': {
        name: 'Lanqi Zhang',
        memberSince: '2024',
        bio: 'User Researcher & Pet Advocate',
        preferences: {
          zipCode: '98115',
          useZipInResults: false,
          showNearbyShops: true
        },
        defaultSavedProducts: [
          {
            id: 'pupstart-chicken',
            name: 'PupStart · Organic Chicken for Puppies',
            price: 24.99,
            image: '/img/pupstart.jpg',
            tags: ['puppy/kitten', 'certified organic', 'kibble'],
            preferredChannel: 'Chewy',
            pricePer1000kcal: 19.50,
            savedAt: '2024-12-18T10:00:00Z'
          }
        ]
      },
      'Amber Lu': {
        name: 'Amber Lu',
        memberSince: '2024',
        bio: 'Developer & Multi-Pet Parent',
        preferences: {
          zipCode: '98122',
          useZipInResults: true,
          showNearbyShops: true
        },
        defaultSavedProducts: [
          {
            id: 'greentail-pate',
            name: 'GreenTail · Organic Chicken Paté',
            price: 22.99,
            image: '/img/greentail.jpg',
            tags: ['certified organic', 'BPA-free can', 'single-protein'],
            preferredChannel: 'Amazon',
            pricePer1000kcal: 14.05,
            savedAt: '2024-12-19T12:30:00Z'
          },
          {
            id: 'tummytender-turkey',
            name: 'TummyTender · Senior Turkey & Barley',
            price: 26.50,
            image: '/img/tummytender.jpg',
            tags: ['senior formula', 'digestive support', 'kibble'],
            preferredChannel: 'Amazon',
            pricePer1000kcal: 21.99,
            savedAt: '2024-12-18T15:45:00Z'
          }
        ]
      }
    };

    return personas[user.name] || {
      name: user.name,
      memberSince: '2025',
      bio: 'Pet Parent',
      preferences: {
        zipCode: '98105',
        useZipInResults: true,
        showNearbyShops: true
      },
      defaultSavedProducts: []
    };
  };

  const userPersona = getUserPersona();

  // Load saved products from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    if (saved.length === 0 && user) {
      // If no saved products and user exists, load default persona products
      const persona = getUserPersona();
      if (persona && persona.defaultSavedProducts.length > 0) {
        setSavedProducts(persona.defaultSavedProducts);
        localStorage.setItem('savedProducts', JSON.stringify(persona.defaultSavedProducts));
      }
    } else {
      setSavedProducts(saved);
    }
  }, [user]);

  // Initialize user preferences from persona
  useEffect(() => {
    if (user) {
      const persona = getUserPersona();
      if (persona) {
        setZipCode(persona.preferences.zipCode);
        setUseZipInResults(persona.preferences.useZipInResults);
        setShowNearbyShops(persona.preferences.showNearbyShops);
      }
    }
  }, [user]);

  // Sort products based on selected option
  const sortedProducts = [...savedProducts].sort((a, b) => {
    switch (sortBy) {
      case 'a-z':
        return a.name.localeCompare(b.name);
      case 'price-low-high':
        return a.price - b.price;
      case 'recently-saved':
      default:
        return new Date(b.savedAt || 0) - new Date(a.savedAt || 0);
    }
  });

  const handleRemoveProduct = (productId) => {
    const updated = savedProducts.filter(p => p.id !== productId);
    setSavedProducts(updated);
    localStorage.setItem('savedProducts', JSON.stringify(updated));
  };

  const handleAddToCompare = (product) => {
    console.log('ProfilePage: Adding product to compare:', product);
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    console.log('ProfilePage: Current compare list:', compareList);
    
    if (compareList.length < 3 && !compareList.find(p => p.id === product.id)) {
      compareList.push(product);
      localStorage.setItem('compareList', JSON.stringify(compareList));
      console.log('ProfilePage: Updated compare list:', compareList);
      showSuccess('Product added to compare list!');
    } else if (compareList.length >= 3) {
      showError('You can only compare up to 3 products at a time.');
    } else {
      showError('Product is already in compare list.');
    }
  };

  const handleUpdateZipCode = () => {
    // 验证 ZIP 码格式（简单的5位数字验证）
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zipCode)) {
      showError('Please enter a valid 5-digit ZIP code.');
      return;
    }

    // 更新用户偏好设置
    if (user) {
      const userPersona = getUserPersona();
      if (userPersona) {
        userPersona.preferences.zipCode = zipCode;
        // 这里可以保存到 localStorage 或其他存储
        localStorage.setItem('userPreferences', JSON.stringify(userPersona.preferences));
      }
    }

    showSuccess(`ZIP code updated to ${zipCode}!`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="h-8 w-8" />
                  <span className="text-xl font-bold text-green-800">GreenTail</span>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/quiz" 
                  className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                >
                  Quiz
                </Link>
                <Link 
                  to="/search" 
                  className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                >
                  Search
                </Link>
                <Link 
                  to="/compare" 
                  className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                >
                  Compare
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                >
                  About
                </Link>
                <Link 
                  to="/profile" 
                  className="text-green-800 hover:text-green-600 transition-colors duration-300 font-medium"
                >
                  Profile
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Login Prompt */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign in to view your profile</h1>
            <p className="text-lg text-gray-600 mb-8">
              Log in to see your saved products, preferences, and personalized recommendations.
            </p>
            <div className="space-y-4">
              <Link
                to="/login"
                className="inline-block bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
              >
                Sign In
              </Link>
              <div className="text-sm text-gray-500">
                Don't have an account? <Link to="/login" className="text-green-800 hover:text-green-600">Create one here</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error boundary for debugging
  try {
    return (
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-green-800">GreenTail</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                onClick={() => console.log('Navigating to home page')}
              >
                Home
              </Link>
              <Link 
                to="/quiz" 
                className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                onClick={() => console.log('Navigating to quiz page')}
              >
                Quiz
              </Link>
              <Link 
                to="/search" 
                className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                onClick={() => console.log('Navigating to search page')}
              >
                Search
              </Link>
              <Link 
                to="/compare" 
                className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                onClick={() => console.log('Navigating to compare page')}
              >
                Compare
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                onClick={() => console.log('Navigating to about page')}
              >
                About
              </Link>
              <Link to="/profile" className="text-green-800 border-b-2 border-green-800 font-medium">Profile</Link>
            </nav>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user.provider === 'google' && (
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-4 h-4" />
                  )}
                  {user.provider === 'apple' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  )}
                  <span className="text-sm text-gray-600">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Profile Hero */}
      <section 
        className="py-12 bg-white"
        ref={el => sectionsRef.current['profile-hero'] = el}
        style={getParallaxStyle(0.5)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={getAnimationClass('profile-hero', 0)}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your saved products</h1>
            <p className="text-lg text-gray-600 mb-8">Organic dog & cat foods you've liked across GreenTail.</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="98105"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button 
                  onClick={handleUpdateZipCode}
                  className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                  Update
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="recently-saved">Recently saved</option>
                <option value="a-z">A-Z</option>
                <option value="price-low-high">Price low to high</option>
              </select>

              <Link
                to="/search"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 mr-2"
              >
                Back to Search
              </Link>
              <Link
                to="/compare"
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-300"
              >
                Compare
              </Link>
            </div>

            {/* User Info Card */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg font-semibold">
                    {userPersona?.name ? userPersona.name.charAt(0) : user?.name ? user.name.charAt(0) : "U"}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{userPersona?.name || user?.name || "Sammi Huang"}</div>
                  <div className="text-sm text-gray-600">{userPersona?.bio || "Pet Parent"}</div>
                  <div className="text-sm text-gray-500">Member since {userPersona?.memberSince || "2025"}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useZipInResults}
                    onChange={(e) => setUseZipInResults(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Use this ZIP in results</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showNearbyShops}
                    onChange={(e) => setShowNearbyShops(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Show nearby shops widget</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saved Products Grid */}
      <section 
        className="py-12"
        ref={el => sectionsRef.current['saved-products'] = el}
        style={getParallaxStyle(0.3)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={getAnimationClass('saved-products', 200)}>
            {savedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved products yet</h3>
                <p className="text-gray-600 mb-6">Start exploring and save products you love!</p>
                <Link
                  to="/search"
                  className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={() => handleRemoveProduct(product.id)}
                          className="bg-white/80 hover:bg-white rounded-full p-2 transition-colors duration-300"
                          title="Remove from saved"
                        >
                          <span className="text-red-500">🗑</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-xl font-bold text-green-800 mb-3">${product.price}</p>
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
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">
                          Buy
                        </button>
                        <button
                          onClick={() => handleAddToCompare(product)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-300"
                        >
                          Add to Compare
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
  } catch (error) {
    console.error('ProfilePage error:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Profile Page Error</h1>
          <p className="text-gray-600 mb-4">Something went wrong. Please try refreshing the page.</p>
          <Link to="/" className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
