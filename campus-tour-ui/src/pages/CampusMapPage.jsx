
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MapContainer from "../components/MapContainer";

export default function CampusMapPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      
      
   <header className="mb-6 bg-white rounded-xl shadow-lg border border-gray-200">
  <div className="px-6 py-4 flex items-center gap-4">
 
    <img src="/src/images/logo.png" alt="AAU Logo" className="w-20 h-auto" />
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        🗺️ CTBE Campus Navigation
      </h1>
      <p className="text-sm text-gray-500">
        Find your way around College of Technology and Built Environment.
      </p>
    </div>
  </div>
</header>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <SearchBar onSearch={setQuery} />
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Map and Details Container */}
      <MapContainer 
        searchQuery={query} 
        selectedCategory={selectedCategory}
      />
    </div>
  );
}