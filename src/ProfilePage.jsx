import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useToast } from './contexts/ToastContext';
import NavigationBar from './components/NavigationBar';
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  
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

  // Update user's ZIP code for location-based features (store locator, etc.)
  const handleUpdateZipCode = () => {
    // Validate ZIP code format (5 digits)
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zipCode)) {
      showError('Please enter a valid 5-digit ZIP code.');
      return;
    }

    // Save ZIP code to user preferences if logged in
    if (user) {
      const userPersona = getUserPersona();
      if (userPersona) {
        userPersona.preferences.zipCode = zipCode;
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
      <div className="profile-page">
        <NavigationBar />

        {/* Login Prompt */}
        <section className="pt-24 pb-16 bg-white">
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
      <div className="profile-page">
      <NavigationBar />

      {/* Profile Hero */}
      <section 
        className="pt-24 pb-12"
      >
        <div className="profile-container px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="page-title">Your saved products</h1>
            <p className="page-subtitle">Organic dog & cat foods you've liked across GreenTail.</p>

            <div className="control-bar">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="98105"
                className="zip-input"
              />
              <button 
                onClick={handleUpdateZipCode}
                className="btn-update"
              >
                Update
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="recently-saved">Recently saved</option>
                <option value="a-z">A-Z</option>
                <option value="price-low-high">Price low to high</option>
              </select>

              <Link
                to="/search"
                className="btn-back"
              >
                Back to Search
              </Link>
              <Link
                to="/compare"
                className="btn-compare"
              >
                Compare
              </Link>
            </div>

            {/* User Info Card */}
            <div className="user-card">
              <div className="user-info">
                <div className="user-avatar">
                  <span>
                    {userPersona?.name ? userPersona.name.charAt(0) : user?.name ? user.name.charAt(0) : "U"}
                  </span>
                </div>
                <div className="user-details">
                  <h2>{userPersona?.name || user?.name || "Sammi Huang"}</h2>
                  <div className="user-role">{userPersona?.bio || "Pet Parent"}</div>
                  <div className="user-meta">Member since {userPersona?.memberSince || "2025"}</div>
                </div>
              </div>
              <div className="user-preferences">
                <label className="preference-item">
                  <input
                    type="checkbox"
                    checked={useZipInResults}
                    onChange={(e) => setUseZipInResults(e.target.checked)}
                  />
                  <div className={`custom-checkbox ${useZipInResults ? 'checked' : ''}`}>
                    {useZipInResults && (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="preference-label">Use this ZIP in results</span>
                </label>
                <label className="preference-item">
                  <input
                    type="checkbox"
                    checked={showNearbyShops}
                    onChange={(e) => setShowNearbyShops(e.target.checked)}
                  />
                  <div className={`custom-checkbox ${showNearbyShops ? 'checked' : ''}`}>
                    {showNearbyShops && (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="preference-label">Show nearby shops widget</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saved Products Grid */}
      <section 
        className="py-12"
      >
        <div className="profile-container px-4 sm:px-6 lg:px-8">
          <div>
            {savedProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="empty-title">No saved products yet</h3>
                <p className="empty-description">Start exploring and save products you love!</p>
                <Link
                  to="/search"
                  className="empty-cta"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="products-grid">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="product-card"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="product-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="favorite-btn"
                        title="Remove from saved"
                      >
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <div className="product-info">
                      <div className="product-brand">
                        {product.name.split('·')[0]?.trim() || 'Product'}
                      </div>
                      <h4 className="product-name">
                        {product.name}
                      </h4>
                      <div className="product-meta">
                        <div className="product-price">${product.price}</div>
                        <div className="product-rating">
                          <svg viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span>4.5</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {product.tags?.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-green-800 text-white py-1.5 px-3 rounded-md hover:bg-green-700 transition-colors duration-300 text-sm">
                          Buy
                        </button>
                        <button
                          onClick={() => handleAddToCompare(product)}
                          className="flex-1 border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md hover:bg-gray-50 transition-colors duration-300 text-sm"
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
