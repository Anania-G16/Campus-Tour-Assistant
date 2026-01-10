import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from './context/ThemeContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Categories from './pages/Categories';
import About from './pages/About';
import BuildingDetails from './pages/BuildingDetails';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminFeedbackReview from './pages/AdminFeedbackReview';
import Feedback from './pages/FeedBack';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { darkMode } = useTheme(); // kept, not removed (other components may rely on it)

  // SHARED STATES FOR THE MAP PAGE
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [onBuildingSelect, setOnBuildingSelect] = useState(null);

  return (
    <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userRole={userRole}>
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
              <AdminLogin setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
            )
          }
        />

        <Route
          path="/admin"
          element={
            isAuthenticated && userRole === 'admin' ? <Admin /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/admin/feedback"
          element={
            isAuthenticated && userRole === 'admin' ? <AdminFeedbackReview /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
