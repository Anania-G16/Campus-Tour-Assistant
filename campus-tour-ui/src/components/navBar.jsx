import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Lock, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { storeContext } from "../context/storeContext";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(storeContext);

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/search" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" }, // Changed 'Contact' to 'About'
    { name: "Feedback", path: "/feedback" },
  ];

  const adminLinks = [
    { name: "Map", path: "/search" },
    { name: "Categories", path: "/categories" },
    { name: "Feedback Review", path: "/admin/feedback" },
    { name: "Admin Dashboard", path: "/admin" },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#0a1a2f] text-white sticky top-0 z-50 border-b border-white/5 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* LOGO White */}

        <Link to="/" className="flex items-center space-x-2 font-bold group">
          <img
            src="/src/images/logo.png"
            alt="AAU Logo"
            className="h-9 w-9 rounded-full"
          />
          <span className="text-white tracking-tight uppercase text-sm md:text-base px-3 py-2.5 transition-colors duration-300 group-hover:text-[#646cff]">
            Addis Ababa University
          </span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated
            ? adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium px-3 py-2.5 transition-all duration-300
            ${
              location.pathname === link.path
                ? "text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#646cff] after:content-['']"
                : "text-white hover:text-[#646cff]"
            }`}
                >
                  {link.name}
                </Link>
              ))
            : publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium px-3 py-2.5 transition-all duration-300
            ${
              location.pathname === link.path
                ? "text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#646cff] after:content-['']"
                : "text-white hover:text-[#646cff]"
            }`}
                >
                  {link.name}
                </Link>
              ))}

          {/* Theme Toggle */}

          <button
            onClick={toggleDarkMode}
            className="text-white hover:text-[#646cff] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 appearance-none"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {!isAuthenticated && (
            <Link
              to="/login"
              className={`relative flex items-center gap-2 text-sm font-medium px-4 py-2.5 whitespace-nowrap transition-all duration-300
      ${
        location.pathname === "/login"
          ? "text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#646cff] after:content-['']"
          : "text-white hover:text-[#646cff]"
      }`}
            >
              <Lock size={16} />
              Admin Login
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white transition-all duration-300 hover:text-[#646cff]  focus:outline-none focus:ring-0 active:outline-none"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : null}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-current"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className={`md:hidden ${darkMode ? "bg-black" : "bg-white"} p-4 space-y-3`}
        >
          {(isAuthenticated ? adminLinks : publicLinks).map((link) => (
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
            {darkMode ? "Light Mode" : "Dark Mode"}
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