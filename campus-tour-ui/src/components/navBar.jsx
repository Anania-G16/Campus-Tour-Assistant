import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Lock, LogOut, Sun, Moon } from "lucide-react";
import { storeContext, useTheme } from "../context/storeContext";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, adminLogOut} =useContext(storeContext)
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const {  getBuildings, locations} = useContext(storeContext);

  useEffect(() => {
    getBuildings();
  }, []);

  useEffect(()=>{
    console.log(locations);

  },[])

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/search" },
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/about" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <nav className="bg-primary-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="text-white font-bold">
          ADDIS ABABA UNIVERSITY
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? "text-white border-b-2"
                  : "text-white/80"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-white hover:text-white/80 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {!isAuthenticated ? (
            <Link to="/login" className="flex items-center gap-2 text-white">
              <Lock size={16} />
              Admin Login
            </Link>
          ) : (
            <>
              <Link to="/admin" className="text-white font-semibold">
                Admin
              </Link>
              <button
                onClick={adminLogOut}
                className="flex items-center gap-2 text-white"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-primary-700 p-4 space-y-3">
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-white"
            >
              {link.name}
            </Link>
          ))}

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
              <button onClick={adminLogOut} className="block text-white">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
