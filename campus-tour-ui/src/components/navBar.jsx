import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Lock, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { storeContext } from '../context/storeContext';

export default function Navbar() {

const { isAuthenticated, setIsAuthenticated }=useContext(storeContext);

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/search' },
    { name: 'Categories', path: '/categories' },
    { name: 'Contact', path: '/about' },
    { name: 'Feedback', path: '/feedback' },
  ];


  const adminLinks = [
    { name: 'Map', path: '/search' },
    { name: 'Categories', path: '/categories' },
    { name: 'Feedback Review', path: '/admin/feedback' },
    { name: 'Admin Dashboard', path: '/admin' },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className={`${darkMode ? 'bg-slate-900 text-blue-400' : 'bg-white text-blue-600'} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2 text-current font-bold">
          <img src="/src/images/logo.png" alt="Addis Ababa University Logo" className="h-8 w-8 rounded-full" />
          <span>ADDIS ABABA UNIVERSITY</span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            adminLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? 'text-current border-b-2'
                    : 'text-current/80'
                }`}
              >
                {link.name}
              </Link>
            ))
          ) : (
            publicLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? 'text-current border-b-2'
                    : 'text-current/80'
                }`}
              >
                {link.name}
              </Link>
            ))
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-current hover:text-current/80 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {!isAuthenticated && (
            <Link to="/login" className="flex items-center gap-2 text-current">
              <Lock size={16} />
              Admin Login
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-current"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : null}
        </div>

        {/* MOBILE BUTTON */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-current">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className={`md:hidden ${darkMode ? 'bg-black' : 'bg-white'} p-4 space-y-3`}>
          {publicLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-current"
            >
              {link.name}
            </Link>
          ))}

          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-white"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          {!isAuthenticated ? (
            <Link to="/login" className="block text-white">
              Admin Login
            </Link>
          ) : (
            <>
              <Link to="/admin" className="block text-white">
                Admin
              </Link>
              <button onClick={handleLogout} className="block text-white">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}