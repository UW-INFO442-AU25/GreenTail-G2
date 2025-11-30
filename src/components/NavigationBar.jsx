import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function NavigationBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if the current path matches the link path
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside or when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      
      const handleClickOutside = (event) => {
        const header = document.querySelector('header');
        if (header && !header.contains(event.target)) {
          setIsMobileMenuOpen(false);
        }
      };

      // Use setTimeout to avoid immediate closure when opening menu
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkClassName = (path) => {
    const baseClasses = "text-sm md:text-base text-gray-600 hover:text-emerald-600 transition-colors duration-300 relative font-medium whitespace-nowrap";
    const activeClasses = isActive(path)
      ? 'text-emerald-600 after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600'
      : 'after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300';
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Main header bar */}
        <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-3 md:py-4 min-h-[64px] md:h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
            <img 
              src={`${import.meta.env.BASE_URL}logos/logo.png`} 
              alt="GreenTail Logo" 
              className="h-8 w-8" 
              width="32"
              height="32"
            />
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-green-800">GreenTail</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block" role="navigation" aria-label="Main navigation menu">
            <ul className="flex gap-4 lg:gap-6 xl:gap-8 items-center" role="menubar">
              <li role="none">
                <Link 
                  to="/" 
                  className={linkClassName('/')}
                  aria-label="Go to homepage" 
                  role="menuitem"
                >
                  Home
                </Link>
              </li>
              <li role="none">
                <Link 
                  to="/quiz" 
                  className={linkClassName('/quiz')}
                  aria-label="Start quiz" 
                  role="menuitem"
                >
                  Quiz
                </Link>
              </li>
              <li role="none">
                <Link 
                  to="/search" 
                  className={linkClassName('/search')}
                  aria-label="Search products" 
                  role="menuitem"
                >
                  Search
                </Link>
              </li>
              <li role="none">
                <Link 
                  to="/compare" 
                  className={linkClassName('/compare')}
                  aria-label="Compare products" 
                  role="menuitem"
                >
                  Compare
                </Link>
              </li>
              <li role="none">
                <Link 
                  to="/about" 
                  className={linkClassName('/about')}
                  aria-label="About us" 
                  role="menuitem"
                >
                  About
                </Link>
              </li>
              <li role="none">
                <Link 
                  to="/profile" 
                  className={linkClassName('/profile')}
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span 
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <nav 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <ul className="flex flex-col px-4 pb-4 space-y-1" role="menubar">
            <li role="none">
              <Link 
                to="/" 
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
                aria-label="Go to homepage" 
                role="menuitem"
              >
                Home
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/quiz" 
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  isActive('/quiz') 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
                aria-label="Start quiz" 
                role="menuitem"
              >
                Quiz
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/search" 
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  isActive('/search') 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
                aria-label="Search products" 
                role="menuitem"
              >
                Search
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/compare" 
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  isActive('/compare') 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
                aria-label="Compare products" 
                role="menuitem"
              >
                Compare
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/about" 
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  isActive('/about') 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
                aria-label="About us" 
                role="menuitem"
              >
                About
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/profile" 
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  isActive('/profile') 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
                aria-label="User profile" 
                role="menuitem"
              >
                Profile
              </Link>
            </li>
            <li role="none" className="border-t border-gray-200 mt-1 pt-1">
              {user ? (
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors"
                  aria-label="Log out"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="block text-center py-3 px-4 rounded-lg text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
                  aria-label="Log in" 
                  role="menuitem"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavigationBar;
