import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/search' },
    { name: 'Contact', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-primary-70 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/map_assets/logo.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-primary-600 font-bold text-sm">AAU</span>';
                }}
              />
            </div>
            <span className="text-lg font-bold text-white">
              ADDIS ABABA UNIVERSITY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white text-2xl font-bold">Campus Tour</Link>
            <div className="flex gap-6 text-white">
              <Link to="/" className="hover:text-primary-200">Home</Link>
              <Link to="/search" className="hover:text-primary-200">Map</Link>
              <Link to="/about" className="hover:text-primary-200">Contact</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary-600">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isActive(link.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-white/80 hover:bg-primary-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:bg-primary-600 rounded-lg"
              >
                <Lock className="h-4 w-4" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
