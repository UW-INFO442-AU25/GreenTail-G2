import React from 'react';
import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">GreenTail Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Core Features</h2>
            <div className="space-y-2">
              <Link to="/" className="block text-blue-600 hover:underline">Homepage</Link>
              <Link to="/search" className="block text-blue-600 hover:underline">Search Page (with Map)</Link>
              <Link to="/results" className="block text-blue-600 hover:underline">Results Page (with Map)</Link>
              <Link to="/shops-near-you" className="block text-blue-600 hover:underline">Shops Page (with Map)</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-800">User Flow</h2>
            <div className="space-y-2">
              <Link to="/quiz" className="block text-blue-600 hover:underline">Quiz Page</Link>
              <Link to="/quiz/0" className="block text-blue-600 hover:underline">Quiz Step 0</Link>
              <Link to="/first-time" className="block text-blue-600 hover:underline">First Time Pet Owner Page (with YouTube Video)</Link>
              <Link to="/compare" className="block text-blue-600 hover:underline">Compare Page</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Other Pages</h2>
            <div className="space-y-2">
              <Link to="/about" className="block text-blue-600 hover:underline">About Page</Link>
              <Link to="/profile" className="block text-blue-600 hover:underline">Profile Page</Link>
              <Link to="/login" className="block text-blue-600 hover:underline">Login Page</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Map Feature Testing</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Search Page:</strong> Click "Find Stores Near You" button or product's "Find Nearby" button</p>
            <p><strong>Results Page:</strong> Click "Find Stores Near You" button or product's "Find Nearby" button</p>
            <p><strong>Shops Page:</strong> Click "Open Interactive Map" button</p>
            <p><strong>Expected Result:</strong> Map modal opens, displaying store locations in Seattle area</p>
          </div>
        </div>

        <div className="mt-8 bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">YouTube Video Feature Testing</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Video Location:</strong> Navigate to <code>/first-time</code> page</p>
            <p><strong>Video Content:</strong> Pet Nutrition Guide for New Pet Parents (starts at 6 seconds)</p>
            <p><strong>Expected Result:</strong> YouTube video loads and plays correctly, responsive design</p>
            <p><strong>Video Link:</strong> <a href="https://www.youtube.com/watch?v=RXh5yyGmP5k&t=6s" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.youtube.com/watch?v=RXh5yyGmP5k&t=6s</a></p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">User Persona Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Emma Chen (Environmentally Conscious User)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Test eco-friendly product filtering</li>
                <li>• Test environmental impact information</li>
                <li>• Test product comparison features</li>
                <li>• Test map store filtering</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sarah Williams (New Pet Parent)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Test educational content</li>
                <li>• Test beginner-friendly interface</li>
                <li>• Test guided features</li>
                <li>• Test map usage guidance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Responsive Design Testing</h2>
          <div className="text-gray-700">
            <p className="mb-2">Test different screen sizes:</p>
            <ul className="text-sm space-y-1">
              <li>• <strong>Desktop:</strong> 1920x1080, 1366x768</li>
              <li>• <strong>Tablet:</strong> iPad (768x1024)</li>
              <li>• <strong>Mobile:</strong> iPhone (375x667), Android (360x640)</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-red-800">Bug Reporting</h2>
          <div className="text-gray-700">
            <p className="mb-2">If you find any issues, please provide:</p>
            <ul className="text-sm space-y-1">
              <li>• Browser type and version</li>
              <li>• Console error messages (F12)</li>
              <li>• Steps to reproduce</li>
              <li>• Expected result vs actual result</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
