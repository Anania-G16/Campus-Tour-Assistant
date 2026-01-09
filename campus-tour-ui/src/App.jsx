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
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { darkMode } = useTheme(); // kept, not removed (other components may rely on it)

  // SHARED STATES FOR THE MAP PAGE
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [onBuildingSelect, setOnBuildingSelect] = useState(null);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col min-h-screen">
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* SEARCH ROUTE */}
            <Route
              path="/search"
              element={
                <Search
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onBuildingSelect={onBuildingSelect}
                  setOnBuildingSelect={setOnBuildingSelect}
                />
              }
            />

            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/location/:id" element={<BuildingDetails />} />
            <Route path="/category/:category" element={<Categories />} />

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
