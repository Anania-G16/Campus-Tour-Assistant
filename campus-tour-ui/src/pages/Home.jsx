import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Building2 } from "lucide-react";
import { locations } from "../data/locations";
import { useTheme } from "../context/ThemeContext";

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

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url('../../public/gateway.jpg')" }}
    >
      {/* CONTENT */}
      <div className="relative z-10 flex">
        {/* Left Sidebar */}
        <div
  className={`w-64 min-h-screen ${
    darkMode ? "bg-slate-900 text-slate-300" : "bg-slate-50 text-slate-700"
  }`}
>


          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for areas in the campus..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Building List */}
          <div className="p-4">
            <h3 className="text-sm font-bold text-primary-700 mb-4">
              BUILDING LIST
            </h3>
            <div className="space-y-2">
              {buildingCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/search?q=${category.name}`}
                  className="flex items-center space-x-3 p-2 rounded-lg transition-transform duration-200 hover:translate-x-2"

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
            <div className="p-4 border-t border-gray-200">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">
                RESULTS
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredLocations.map((loc) => (
                  <Link
                    key={loc.id}
                    to={`/location/${loc.id}`}
                    className="block p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-8">
          {/* Welcome Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-12 py-8 text-center mb-12 shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-700 leading-tight">
              WELCOME TO OUR
              <br />
              CAMPUS
              <br />
              TOUR ASSISTANT
            </h1>
            <p className="text-gray-600 mt-4">
              Feel at ease finding directions
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/search"
              className="flex flex-col items-center justify-center w-40 h-32 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-colors shadow-lg"
            >
              <Search className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-primary-700">
                Search for buildings
              </span>
            </Link>

            <Link
              to="/search"
              className="flex flex-col items-center justify-center w-40 h-32 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-colors shadow-lg"
            >
              <MapPin className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-primary-700">
                Interactive map
              </span>
            </Link>

            <Link
              to="/categories"
              className="flex flex-col items-center justify-center w-40 h-32 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-colors shadow-lg"
            >
              <Building2 className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-primary-700">
                Building details
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
