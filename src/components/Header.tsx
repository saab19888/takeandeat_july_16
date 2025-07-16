import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Utensils, LogOut, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const partnersRef = useRef<HTMLDivElement>(null);

  // Close partners dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (partnersRef.current && !partnersRef.current.contains(event.target as Node)) {
        setIsPartnersOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll to section after navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      // Clear the state after scrolling
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (path: string) => {
    if (path === '/') {
      navigate(path);
      // Always scroll to top when navigating to home
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('#')) {
      const sectionId = path.substring(1);
      if (location.pathname !== '/') {
        // If not on home page, navigate and then scroll
        navigate('/', { state: { scrollTo: sectionId } });
      } else {
        // If already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // For other routes, navigate and scroll to top
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setIsPartnersOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-red-600' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNavigation('/')}
          >
            <Utensils className="w-8 h-8 text-red-600 transition-transform duration-300 group-hover:scale-110" />
            <span className="ml-2 text-xl font-bold">Take & Eat</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/')}
              className={`${isActive('/')} transition duration-200 hover:text-red-600`}
            >
              Food Aid Resources
            </button>
            <button
              onClick={() => handleNavigation('#how-it-works')}
              className="text-gray-600 hover:text-red-600 transition duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavigation('#about')}
              className="text-gray-600 hover:text-red-600 transition duration-200"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation('#impact')}
              className="text-gray-600 hover:text-red-600 transition duration-200"
            >
              Our Impact
            </button>
            <div ref={partnersRef} className="relative">
              <button
                onClick={() => setIsPartnersOpen(!isPartnersOpen)}
                className="flex items-center text-gray-600 hover:text-red-600 transition duration-200 focus:outline-none"
              >
                Our Partners
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isPartnersOpen ? 'rotate-180' : ''}`} />
              </button>
              {isPartnersOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <button
                    onClick={() => handleNavigation('/local-food-banks')}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50"
                  >
                    Local Food Banks
                  </button>
                  <button
                    onClick={() => handleNavigation('/restaurants')}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50"
                  >
                    Restaurants
                  </button>
                  <button
                    onClick={() => handleNavigation('/community-centers')}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50"
                  >
                    Community Centers
                  </button>
                </div>
              )}
            </div>
            {user ? (
              <>
                <button
                  onClick={() => handleNavigation('/give-food')}
                  className={`${isActive('/give-food')} transition duration-200 hover:text-red-600`}
                >
                  Give Food
                </button>
                <button
                  onClick={() => handleNavigation('/take-food')}
                  className={`${isActive('/take-food')} transition duration-200 hover:text-red-600`}
                >
                  Take Food
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transform hover:scale-105 transition duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-red-600 transition duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('/')}
                className={`block w-full text-left px-3 py-2 rounded-lg ${isActive('/')} hover:bg-red-50 transition duration-200`}
              >
                Food Aid Resources
              </button>
              <button
                onClick={() => handleNavigation('#how-it-works')}
                className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition duration-200"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavigation('#about')}
                className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition duration-200"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation('#impact')}
                className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition duration-200"
              >
                Our Impact
              </button>
              <div className="px-3 py-2">
                <div className="font-medium text-gray-600">Our Partners</div>
                <div className="pl-4 space-y-1 mt-1">
                  <button
                    onClick={() => handleNavigation('/local-food-banks')}
                    className="block w-full text-left py-2 text-gray-600 hover:text-red-600"
                  >
                    Local Food Banks
                  </button>
                  <button
                    onClick={() => handleNavigation('/restaurants')}
                    className="block w-full text-left py-2 text-gray-600 hover:text-red-600"
                  >
                    Restaurants
                  </button>
                  <button
                    onClick={() => handleNavigation('/community-centers')}
                    className="block w-full text-left py-2 text-gray-600 hover:text-red-600"
                  >
                    Community Centers
                  </button>
                </div>
              </div>
              {user ? (
                <>
                  <button
                    onClick={() => handleNavigation('/give-food')}
                    className={`block w-full text-left px-3 py-2 rounded-lg ${isActive('/give-food')} hover:bg-red-50 transition duration-200`}
                  >
                    Give Food
                  </button>
                  <button
                    onClick={() => handleNavigation('/take-food')}
                    className={`block w-full text-left px-3 py-2 rounded-lg ${isActive('/take-food')} hover:bg-red-50 transition duration-200`}
                  >
                    Take Food
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavigation('/login')}
                  className="block w-full text-left px-3 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition duration-200"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}