import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Categories from './pages/Categories';
import About from './pages/About';
import BuildingDetails from './pages/BuildingDetails';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Feedback from './pages/FeedBack';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for testing purposes
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : ''}`}>
      {/* Background Image for Light Mode */}
      {!darkMode && (
        <div 
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/gateway.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div className="flex flex-col min-h-screen relative">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/location/:id" element={<BuildingDetails />} />
            <Route path="/category/:category" element={<Categories />} />

            {/* LOGIN */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <AdminLogin setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* PROTECTED ADMIN */}
            <Route
              path="/admin"
              element={
                isAuthenticated ? <Admin /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
