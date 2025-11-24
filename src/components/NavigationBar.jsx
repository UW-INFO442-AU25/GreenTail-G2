import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function NavigationBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Check if the current path matches the link path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 min-h-[64px] md:h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8 py-3 md:py-4 h-full">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img 
            src={`${import.meta.env.BASE_URL}logos/logo.png`} 
            alt="GreenTail Logo" 
            className="h-8 w-8" 
            width="32"
            height="32"
          />
          <span className="text-xl md:text-2xl font-bold text-green-800">GreenTail</span>
        </Link>
        <nav role="navigation" aria-label="Main navigation menu">
          <ul className="flex flex-wrap gap-3 md:gap-6 lg:gap-8 items-center" role="menubar">
            <li role="none">
              <Link 
                to="/" 
                className={`text-sm md:text-base text-gray-600 hover:text-emerald-600 transition-colors duration-300 relative font-medium whitespace-nowrap
                  ${isActive('/') ? 'text-emerald-600 after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600' : 'after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300'}`} 
                aria-label="Go to homepage" 
                role="menuitem"
              >
                Home
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/quiz" 
                className={`text-gray-600 hover:text-emerald-600 transition-colors duration-300 relative font-medium 
                  ${isActive('/quiz') ? 'text-emerald-600 after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600' : 'after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300'}`} 
                aria-label="Start quiz" 
                role="menuitem"
              >
                Quiz
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/search" 
                className={`text-gray-600 hover:text-emerald-600 transition-colors duration-300 relative font-medium 
                  ${isActive('/search') ? 'text-emerald-600 after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600' : 'after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300'}`} 
                aria-label="Search products" 
                role="menuitem"
              >
                Search
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/compare" 
                className={`text-gray-600 hover:text-emerald-600 transition-colors duration-300 relative font-medium 
                  ${isActive('/compare') ? 'text-emerald-600 after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600' : 'after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300'}`} 
                aria-label="Compare products" 
                role="menuitem"
              >
                Compare
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/about" 
                className={`text-gray-600 hover:text-emerald-600 transition-colors duration-300 relative font-medium 
                  ${isActive('/about') ? 'text-emerald-600 after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600' : 'after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300'}`} 
                aria-label="About us" 
                role="menuitem"
              >
                About
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/profile" 
                className={`text-gray-600 hover:text-emerald-600 transition-colors duration-300 relative font-medium 
                  ${isActive('/profile') ? 'text-emerald-600 after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600' : 'after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300'}`} 
                aria-label="User profile" 
                role="menuitem"
              >
                Profile
              </Link>
            </li>
            {user ? (
              <li role="none">
                <button 
                  onClick={logout} 
                  className="text-sm text-red-600 hover:text-red-800 py-2 px-3 rounded-md hover:bg-red-50 transition-colors duration-300 font-medium"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li role="none">
                <Link 
                  to="/login" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
                  aria-label="Log in" 
                  role="menuitem"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavigationBar;
