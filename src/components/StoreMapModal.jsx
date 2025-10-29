import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getStoresByZipCode, getMapCenterByZipCode, isValidZipCode, getZipCodeDisplayName } from '../utils/storeLocator';

// 修复Leaflet默认图标问题
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 移除静态商店数据，现在使用动态数据

const StoreMapModal = ({ isOpen, onClose, selectedProduct = null }) => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [zipCode, setZipCode] = useState('98105');
  const [stores, setStores] = useState([]);
  const [mapCenter, setMapCenter] = useState([47.6062, -122.3321]);
  const [zipCodeError, setZipCodeError] = useState('');

  // 根据zipcode获取商店数据
  useEffect(() => {
    const storeData = getStoresByZipCode(zipCode);
    setStores(storeData);
    setMapCenter(getMapCenterByZipCode(zipCode));
  }, [zipCode]);

  // 根据产品筛选商店
  const filteredStores = selectedProduct 
    ? stores.filter(store => 
        store.products.some(product => 
          product.toLowerCase().includes(selectedProduct.toLowerCase())
        )
      )
    : stores;

  // 更新位置
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
    window.open(`tel:${phone.replace(/\D/g, '')}`, '_self');
  };

  const handleGetDirections = (address) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedProduct ? `Stores with ${selectedProduct}` : 'Stores Near You'}
            </h2>
            <p className="text-gray-600 mt-1">
              {getZipCodeDisplayName(zipCode)} • {filteredStores.length} stores found
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(90vh-120px)]">
          {/* 左侧：商店列表 */}
          <div className="md:w-1/3 w-full border-b md:border-b-0 md:border-r overflow-y-auto">
            <div className="p-4">
              <div className="mb-4">
                <input
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
                  className="w-full mt-2 bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  🔍 Update Location
                </button>
              </div>

              <div className="space-y-3">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedStore?.id === store.id
                        ? 'border-green-800 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                    }`}
                    onClick={() => handleStoreClick(store)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{store.name}</h3>
                      <span className="text-sm text-gray-600">{store.distance}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{store.address}</p>
                    
                    <div className="text-sm text-gray-700 mb-3">
                      <strong>Stocks:</strong> {store.products.join(', ')}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(store.address);
                        }}
                        className="flex-1 bg-green-800 text-white py-1 px-2 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        📍 Directions
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallStore(store.phone);
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 py-1 px-2 rounded text-xs hover:bg-gray-200 transition-colors"
                      >
                        📞 Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：地图 */}
          <div className="md:w-2/3 w-full h-80 md:h-auto">
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
              key={`${mapCenter[0]}-${mapCenter[1]}`} // 强制重新渲染地图
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
                      <p className="text-xs text-gray-600 mb-2">{store.distance}</p>
                      <div className="text-xs">
                        <strong>Stocks:</strong> {store.products.join(', ')}
                      </div>
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

        {/* 底部信息 */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            💡 Tip: Click on store markers or store cards to see more details
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreMapModal;
