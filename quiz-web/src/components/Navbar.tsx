import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext provides user and logout
import { MenuIcon, XIcon, BookOpenIcon, UserIcon, LogOutIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Destructure user and logout from AuthContext
  const navigate = useNavigate();

  // State for profile photo URL
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    // Get profile photo from localStorage
    const storedPhoto = localStorage.getItem('profilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/hmoe');
  };

  return (
    // Navbar container with shadow and a subtle entrance animation
    <nav className="bg-white shadow-lg animate-page-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <BookOpenIcon className="h-8 w-8 text-smartmind-dark group-hover:text-smartmind-medium transition-colors duration-300 transform group-hover:scale-105" />
              <span className="ml-2 text-2xl font-extrabold text-smartmind-dark group-hover:text-smartmind-medium transition-colors duration-300">SmartMind</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-6">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-semibold text-gray-700
                           hover:text-smartmind-dark hover:bg-smartmind-very-light
                           transition-all duration-300 transform hover:scale-105"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-md text-sm font-semibold text-gray-700
                           hover:text-smartmind-dark hover:bg-smartmind-very-light
                           transition-all duration-300 transform hover:scale-105"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2 rounded-md text-sm font-semibold text-gray-700
                           hover:text-smartmind-dark hover:bg-smartmind-very-light
                           transition-all duration-300 transform hover:scale-105"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-full text-sm font-medium text-smartmind-dark
                               hover:text-smartmind-medium hover:bg-smartmind-very-light
                               transition-all duration-300 transform hover:scale-105 group"
                  >
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="h-7 w-7 rounded-full object-cover mr-2 border-2 border-smartmind-light group-hover:border-smartmind-medium transition-colors duration-300"
                      />
                    ) : (
                      <UserIcon className="h-6 w-6 mr-1 text-smartmind-medium group-hover:text-smartmind-dark" />
                    )}
                    <span className="truncate max-w-[80px]">{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                               text-white bg-smartmind-dark hover:bg-smartmind-medium
                               shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium text-smartmind-dark
                               hover:text-smartmind-medium hover:bg-smartmind-very-light
                               transition-all duration-300 transform hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-2 px-4 py-2 rounded-md text-sm font-medium
                               text-white bg-smartmind-dark hover:bg-smartmind-medium
                               shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-smartmind-dark
                         hover:text-smartmind-medium hover:bg-smartmind-very-light
                         focus:outline-none focus:ring-2 focus:ring-inset focus:ring-smartmind-medium"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XIcon className="h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <MenuIcon className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg pb-4" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-2 px-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700
                         hover:text-smartmind-dark hover:bg-smartmind-very-light
                         transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700
                         hover:text-smartmind-dark hover:bg-smartmind-very-light
                         transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700
                         hover:text-smartmind-dark hover:bg-smartmind-very-light
                         transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 pb-3 border-t border-smartmind-light">
            {user ? (
              <>
                <div className="flex items-center px-4 mb-4">
                  <div className="flex-shrink-0">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border-2 border-smartmind-light"
                      />
                    ) : (
                      <UserIcon className="h-10 w-10 text-smartmind-medium bg-smartmind-very-light rounded-full p-2" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-semibold text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="space-y-1 px-2">
                  <Link
                    to="/profile"
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700
                               hover:text-smartmind-dark hover:bg-smartmind-very-light
                               transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700
                               hover:text-smartmind-dark hover:bg-smartmind-very-light
                               transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2 px-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 text-base font-medium
                             text-white bg-smartmind-dark hover:bg-smartmind-medium
                             rounded-md shadow-md transition-all duration-300 transform hover:scale-[1.01]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 text-base font-medium
                             text-white bg-smartmind-dark hover:bg-smartmind-medium
                             rounded-md shadow-md transition-all duration-300 transform hover:scale-[1.01]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;