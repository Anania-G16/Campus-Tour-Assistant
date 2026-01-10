import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Building2 } from "lucide-react";
// import { locations } from "../data/locations";
import { useTheme } from "../context/ThemeContext";
import { storeContext } from "../context/storeContext";

const buildingCategories = [
  { id: "library", name: "Library", icon: Building2 },
  { id: "laboratory", name: "Laboratory", icon: Building2 },
  { id: "admin", name: "Admin office", icon: Building2 },
  { id: "cafeteria", name: "Cafeteria", icon: Building2 },
  { id: "restroom", name: "Restroom", icon: Building2 },
];

export default function Home() {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");


  const {getBuildings,locations}=useContext(storeContext)

  useEffect(()=>{
    getBuildings()
  },[])

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url('../../public/gateway.jpg')" }}
    >
      {/* Overlay to ensure text readability on image */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-slate-900/40' : 'bg-white/10'}`} />

      {/* CONTENT */}
      <div className="relative z-10 flex">
        {/* Left Sidebar */}
        <div
          className={`w-64 min-h-screen ${
            darkMode ? "bg-slate-900 text-slate-300" : "bg-white/95 text-slate-700"
          } backdrop-blur-sm border-r ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}
        >
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for areas..."
                className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'
                }`}
              />
            </div>
          </div>

          {/* Building List */}
          <div className="p-4">
            <h3 className="text-sm font-bold text-primary-600 mb-4 tracking-wider">
              BUILDING LIST
            </h3>
            <div className="space-y-2">
              {buildingCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/search?q=${category.name}`}
                  className="flex items-center space-x-3 p-2 rounded-lg transition-transform duration-200 hover:translate-x-2 hover:bg-primary-500/10"
                >
                  <Building2 className="h-5 w-5 text-primary-600" />
                  <span className={darkMode ? "text-white" : "text-gray-700"}>
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="p-4 border-t border-gray-200/20">
              <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Results</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {filteredLocations.map((loc) => (
                  <Link
                    key={loc.id}
                    to={`/location/${loc.id}`}
                    className={`block p-2 text-sm rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen px-8">
          {/* Welcome Card */}
          <div className={`${darkMode ? 'bg-slate-900/80' : 'bg-white/90'} backdrop-blur-md rounded-3xl px-12 py-10 text-center mb-12 shadow-2xl border ${darkMode ? 'border-slate-700' : 'border-white'}`}>
            <h1 className="text-4xl md:text-5xl font-black text-primary-600 leading-tight tracking-tight">
              WELCOME TO OUR
              <br />
              CAMPUS
              <br />
              TOUR ASSISTANT
            </h1>
            <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} mt-6 text-lg`}>
              Feel at ease finding directions around campus
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/search"
              className="flex flex-col items-center justify-center w-44 h-36 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-primary-600 hover:bg-primary-600 hover:text-white group transition-all duration-300 shadow-xl"
            >
              <Search className="h-10 w-10 text-primary-600 mb-3 group-hover:text-white transition-colors" />
              <span className="text-sm font-bold text-primary-700 group-hover:text-white">Search buildings</span>
            </Link>

            <Link
              to="/search"
              className="flex flex-col items-center justify-center w-44 h-36 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-primary-600 hover:bg-primary-600 hover:text-white group transition-all duration-300 shadow-xl"
            >
              <MapPin className="h-10 w-10 text-primary-600 mb-3 group-hover:text-white transition-colors" />
              <span className="text-sm font-bold text-primary-700 group-hover:text-white">Interactive map</span>
            </Link>

            <Link
              to="/categories"
              className="flex flex-col items-center justify-center w-44 h-36 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-primary-600 hover:bg-primary-600 hover:text-white group transition-all duration-300 shadow-xl"
            >
              <Building2 className="h-10 w-10 text-primary-600 mb-3 group-hover:text-white transition-colors" />
              <span className="text-sm font-bold text-primary-700 group-hover:text-white">Building details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}