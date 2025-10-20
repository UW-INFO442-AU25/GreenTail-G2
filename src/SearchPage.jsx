import React from 'react';

function SearchPage() {
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
              <li><a href="/" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Home</a></li>
              <li><a href="/quiz" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Quiz</a></li>
              <li><a href="/search" className="text-gray-600 hover:text-green-800 transition-colors duration-300 relative font-medium after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-green-800">Search</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Compare</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300 font-medium">Profile</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shops near you</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Store List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Store Card 1 */}
              <div className="bg-white border-2 border-green-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-900">MudBay – Ballard</h3>
                  <span className="text-gray-600 text-sm">0.6 mi</span>
                </div>
                <p className="text-gray-600 mb-4">Stocks: Acme Organic Chicken, EcoBite Grain-Free</p>
                <div className="flex gap-4 items-center">
                  <button className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                    Directions
                  </button>
                  <button className="text-green-800 text-sm font-medium hover:underline">Call</button>
                  <button className="text-green-800 text-sm font-medium hover:underline">Hours</button>
                </div>
                <p className="text-green-800 font-semibold text-sm mt-3">Carries your best match!</p>
              </div>

              {/* Store Card 2 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-900">PetSmart – Aurora</h3>
                  <span className="text-gray-600 text-sm">1.8 mi</span>
                </div>
                <p className="text-gray-600 mb-4">Stocks: EcoBite Salmon, PurePaw Organic</p>
                <div className="flex gap-4 items-center">
                  <button className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                    Directions
                  </button>
                  <button className="text-green-800 text-sm font-medium hover:underline">Call</button>
                  <button className="text-green-800 text-sm font-medium hover:underline">Hours</button>
                </div>
              </div>

              {/* Store Card 3 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Petco – Interbay</h3>
                  <span className="text-gray-600 text-sm">3.4 mi</span>
                </div>
                <p className="text-gray-600 mb-4">Stocks: PurePaw Organic, FarmFresh Kibble</p>
                <div className="flex gap-4 items-center">
                  <button className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-300">
                    Directions
                  </button>
                  <button className="text-green-800 text-sm font-medium hover:underline">Call</button>
                  <button className="text-green-800 text-sm font-medium hover:underline">Hours</button>
                </div>
              </div>
            </div>

            {/* Map Panel */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-24">
              <div className="mb-6">
                <input 
                  type="text" 
                  placeholder="98105" 
                  className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-800"
                />
                <button className="w-full bg-green-800 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300 mb-3">
                  Update
                </button>
                <a href="#" className="block w-full text-center bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-300 mb-3">
                  Back to Search
                </a>
                <p className="text-gray-500 text-xs">Used only to show local availability.</p>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-12 text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img src="/icons/location-icon.svg" alt="Map" className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-gray-700 mb-2">Map coming soon</h4>
                <p className="text-gray-500 text-sm">Interactive store locations will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </main>

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
                <li><a href="#" className="text-gray-600 hover:text-green-800 transition-colors duration-300">Compare</a></li>
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
    </div>
  );
}

export default SearchPage;
