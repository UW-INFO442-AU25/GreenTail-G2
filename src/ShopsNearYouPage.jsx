import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StoreMapModal from './components/StoreMapModal';
import NavigationBar from './components/NavigationBar';

const ShopsNearYouPage = () => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [zipCode, setZipCode] = useState('98105');

  const stores = [
    {
      id: 1,
      name: 'MudBay – Ballard',
      address: '5314 15th Ave NW, Seattle, WA 98107',
      distance: '0.6 mi',
      phone: '(206) 783‑1328',
      hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
      products: ['Acme Organic Chicken', 'EcoBite Grain-Free'],
      website: 'https://www.mudbay.com/stores/',
      isHighlighted: true
    },
    {
      id: 2,
      name: 'PetSmart – Aurora',
      address: '13000 Aurora Ave N, Seattle, WA 98133',
      distance: '1.8 mi',
      phone: '(206) 361‑1634',
      hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
      products: ['EcoBite Salmon', 'PurePaw Organic'],
      website: 'https://www.storeopeninghours.com/petsmart‑seattle‑wa',
      isHighlighted: false
    },
    {
      id: 3,
      name: 'Petco – Interbay',
      address: '8728 Holman Rd NW, Seattle, WA 98117',
      distance: '3.4 mi',
      phone: '(206) 784‑0524',
      hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
      products: ['PurePaw Organic', 'FarmFresh Kibble'],
      website: 'https://www.chamberofcommerce.com/business-directory/washington/seattle/pet-store/5361387-petco/',
      isHighlighted: false
    }
  ];

  const handleCallStore = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`, '_self');
  };

  const handleGetDirections = (address) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  const handleShowHours = (hours) => {
    alert(`Store Hours:\n${hours}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shops near you</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Store List */}
            <div className="lg:col-span-2 space-y-6">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className={`bg-white border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    store.isHighlighted 
                      ? 'border-green-800 bg-green-50 shadow-lg' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
                    <span className="text-sm text-gray-600 font-medium">{store.distance}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{store.address}</p>
                  
                  <div className="text-sm text-gray-700 mb-4">
                    <strong>Stocks:</strong> {store.products.join(', ')}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleGetDirections(store.address)}
                      className="flex items-center gap-2 bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <img src={`${import.meta.env.BASE_URL}icons/location-icon.svg`} alt="Directions" className="w-4 h-4 filter brightness-0 invert" />
                      Directions
                    </button>
                    <button
                      onClick={() => handleCallStore(store.phone)}
                      className="text-gray-600 hover:text-green-800 text-sm font-medium underline"
                    >
                      Call
                    </button>
                    <button
                      onClick={() => handleShowHours(store.hours)}
                      className="text-gray-600 hover:text-green-800 text-sm font-medium underline"
                    >
                      Hours
                    </button>
                  </div>

                  {store.isHighlighted && (
                    <p className="text-green-800 font-semibold text-sm mt-3">
                      Carries your best match!
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Map Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-800"
                  />
                  <button className="w-full bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium mb-3">
                    Update
                  </button>
                  <Link to="/search" className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium block text-center">
                    Back to Search
                  </Link>
                  <p className="text-xs text-gray-500 mt-3">Used only to show local availability.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-gray-500">
                    🗺️
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Interactive Map</h3>
                  <p className="text-sm text-gray-600 mb-4">Click to open full map view</p>
                  <button
                    onClick={() => setShowMapModal(true)}
                    className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Open Interactive Map
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dataset Section */}
          <section className="mt-16 bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mock store dataset (for INFO 442: Cooperative Software Development Autumn 2025)</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Store</th>
                    <th className="px-4 py-3 text-left font-semibold">Address</th>
                    <th className="px-4 py-3 text-left font-semibold">Distance (mi)</th>
                    <th className="px-4 py-3 text-left font-semibold">Carries (SKUs/brands)</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">Hours URL</th>
                    <th className="px-4 py-3 text-left font-semibold">Maps URL</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store) => (
                    <tr key={store.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{store.name}</td>
                      <td className="px-4 py-3">{store.address}</td>
                      <td className="px-4 py-3">{store.distance}</td>
                      <td className="px-4 py-3">{store.products.join(', ')}</td>
                      <td className="px-4 py-3">{store.phone}</td>
                      <td className="px-4 py-3">
                        <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-green-800 hover:underline">
                          {store.website.split('/')[2]}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-800 hover:underline"
                        >
                          maps.google.com
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 italic mt-4">
              INFO 442: Cooperative Software Development Autumn 2025 project uses this dataset for the Nearby Shops page.
            </p>
          </section>
        </div>
      </main>

      {/* Map Modal */}
      <StoreMapModal 
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        selectedProduct={null}
      />
    </div>
  );
};

export default ShopsNearYouPage;
