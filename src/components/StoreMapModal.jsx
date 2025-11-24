import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getStoresByZipCode, getMapCenterByZipCode, isValidZipCode, getZipCodeDisplayName, getSupportedZipCodes } from '../utils/storeLocator';
import { petFoodDatabase } from '../data/petFoodDatabase';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const StoreMapModal = ({ isOpen, onClose, selectedProduct = null }) => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [zipCode, setZipCode] = useState('98105');
  const [stores, setStores] = useState([]);
  const [mapCenter, setMapCenter] = useState([47.6062, -122.3321]);
  const [zipCodeError, setZipCodeError] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showZipCodeInfo, setShowZipCodeInfo] = useState(false);

  useEffect(() => {
    const storeData = getStoresByZipCode(zipCode);
    setStores(storeData);
    setMapCenter(getMapCenterByZipCode(zipCode));
  }, [zipCode]);

  // Get brand name from product name
  const getBrandFromProductName = (productName) => {
    if (!productName) return null;
    const product = petFoodDatabase.find(p => 
      p.name.toLowerCase() === productName.toLowerCase() ||
      p.name.toLowerCase().includes(productName.toLowerCase()) ||
      productName.toLowerCase().includes(p.name.toLowerCase())
    );
    return product ? product.brand : null;
  };

  const filteredStores = useMemo(() => {
    if (!selectedProduct) return stores;
    
    const brandName = getBrandFromProductName(selectedProduct);
    const searchTerms = [selectedProduct.toLowerCase()];
    if (brandName) {
      searchTerms.push(brandName.toLowerCase());
    }
    
    return stores.filter(store => 
      store.products.some(product => 
        searchTerms.some(term => 
          product.toLowerCase().includes(term)
        )
      )
    );
  }, [stores, selectedProduct]);

  const handleUpdateLocation = () => {
    if (!isValidZipCode(zipCode)) {
      setZipCodeError('Please enter a valid ZIP code (e.g., 98105)');
      return;
    }
    
    setZipCodeError('');
    const storeData = getStoresByZipCode(zipCode);
    setStores(storeData);
    setMapCenter(getMapCenterByZipCode(zipCode));
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  const handleCallStore = (phone) => {
    setSelectedPhone(phone);
    setShowPhoneModal(true);
  };

  const handleDialPhone = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`, '_self');
    setShowPhoneModal(false);
  };

  const handleGetDirections = (address) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  // Handle touch events for buttons
  const handleTouchStart = (e) => {
    e.currentTarget.classList.add('touch-active');
  };

  const handleTouchEnd = (e, callback) => {
    e.currentTarget.classList.remove('touch-active');
    callback();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4"
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-start p-4 md:p-6 border-b relative">
          <div className="flex-1 pr-2 md:pr-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {selectedProduct ? `Stores with ${selectedProduct}` : 'Stores Near You'}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {getZipCodeDisplayName(zipCode)} • {filteredStores.length} stores found
            </p>
          </div>
          <button
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, onClose)}
            className="text-gray-400 hover:text-gray-600 active:text-gray-800 text-3xl font-bold min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors flex-shrink-0 -mt-1 -mr-1 md:mt-0 md:mr-0"
            aria-label="Close map modal"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(90vh-120px)]">
          <div className="md:w-1/3 w-full border-b md:border-b-0 md:border-r overflow-y-auto">
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <label htmlFor="zipcode-input" className="text-sm font-medium text-gray-700">ZIP Code</label>
                  <button
                    type="button"
                    onClick={() => setShowZipCodeInfo(!showZipCodeInfo)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => setShowZipCodeInfo(!showZipCodeInfo))}
                    className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors min-w-[20px] min-h-[20px]"
                    title="Supported ZIP codes"
                    aria-label="Show supported ZIP codes"
                  >
                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                {showZipCodeInfo && (
                  <div 
                    className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs max-h-48 overflow-y-auto"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#93c5fd #dbeafe',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <p className="font-semibold text-blue-900 mb-2 sticky top-0 bg-blue-50 pb-1 z-10">Supported ZIP Codes:</p>
                    <div className="space-y-1 text-blue-800">
                      {getSupportedZipCodes().map((zip) => (
                        <div key={zip.code} className="py-0.5">• {zip.code} - {zip.name}</div>
                      ))}
                    </div>
                  </div>
                )}
                <input
                  id="zipcode-input"
                  type="text"
                  placeholder="Enter ZIP Code (e.g., 98105)"
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                    setZipCodeError('');
                  }}
                  className={`w-full p-2 border rounded-lg text-sm ${
                    zipCodeError ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {zipCodeError && (
                  <p className="text-red-500 text-xs mt-1">{zipCodeError}</p>
                )}
                <button 
                  onClick={handleUpdateLocation}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, handleUpdateLocation)}
                  className="w-full mt-2 bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors min-h-[44px]"
                >
                  Update Location
                </button>
              </div>

              <div className="space-y-3">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedStore?.id === store.id
                        ? 'border-green-600 bg-green-100'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                    }`}
                    onClick={() => handleStoreClick(store)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => handleStoreClick(store))}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{store.name}</h3>
                      <span className="text-sm text-gray-600">{store.distance}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{store.address}</p>
                    
                    {store.hours && (
                      <div className="text-sm text-gray-700 mb-2">
                        <strong>Hours:</strong>
                        <div className="text-gray-600 mt-1 space-y-0.5">
                          {store.hours.split(';').map((period, idx) => (
                            <div key={idx} className="text-xs">{period.trim()}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {store.website && (
                      <div className="mb-3">
                        <a 
                          href={store.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-green-600 hover:text-green-800 hover:underline"
                        >
                          Visit Website →
                        </a>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(store.address);
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => {
                          e.stopPropagation();
                          handleTouchEnd(e, () => handleGetDirections(store.address));
                        }}
                        className="flex-1 bg-green-800 text-white py-1 px-2 rounded text-xs hover:bg-green-700 transition-colors min-h-[44px]"
                      >
                        Directions
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallStore(store.phone);
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => {
                          e.stopPropagation();
                          handleTouchEnd(e, () => handleCallStore(store.phone));
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 py-1 px-2 rounded text-xs hover:bg-gray-200 transition-colors min-h-[44px]"
                      >
                        Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 w-full h-80 md:h-auto">
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
              key={`${mapCenter[0]}-${mapCenter[1]}`}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {filteredStores.map((store) => (
                <Marker
                  key={store.id}
                  position={[store.lat, store.lng]}
                  eventHandlers={{
                    click: () => handleStoreClick(store),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-sm">{store.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">{store.address}</p>
                      <p className="text-xs text-gray-600 mb-1">{store.distance}</p>
                      {store.hours && (
                        <div className="text-xs text-gray-600 mb-1">
                          <strong>Hours:</strong>
                          <div className="mt-0.5 space-y-0.5">
                            {store.hours.split(';').map((period, idx) => (
                              <div key={idx}>{period.trim()}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-1 mt-2">
                        <button
                          onClick={() => handleGetDirections(store.address)}
                          className="bg-green-800 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Directions
                        </button>
                        <button
                          onClick={() => handleCallStore(store.phone)}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-200"
                        >
                          Call
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            Tip: Click on store markers or store cards to see more details
          </p>
        </div>
      </div>

      {/* Phone Modal */}
      {showPhoneModal && selectedPhone && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowPhoneModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Store Phone Number</h3>
              <p className="text-2xl font-semibold text-green-800 mb-6">{selectedPhone}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleDialPhone(selectedPhone)}
                  className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Call Now
                </button>
                <button
                  onClick={() => setShowPhoneModal(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreMapModal;
