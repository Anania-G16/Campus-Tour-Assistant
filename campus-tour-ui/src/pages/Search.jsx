import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X, MapPin } from 'lucide-react';
import { locations } from '../data/locations';
import CampusMapContainer from "../components/CampusMapContainer";

export default function Search({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  onBuildingSelect, setOnBuildingSelect
}) {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const searchWrapperRef = useRef(null);

  // Close dropdown when clicking outside the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q) setSearchQuery(q);
    if (cat) setSelectedCategory(cat);
  }, [searchParams, setSearchQuery, setSelectedCategory]);

  const handleSelect = (loc) => {
    setOnBuildingSelect(null);
    setTimeout(() => setOnBuildingSelect(loc), 10);
    setIsOpen(false); // Hide dropdown after selection
  };

  const filteredLocations = locations.filter((location) => {
    const matchesQuery = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" ||
                           location.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
      
      {/* FLOATING SEARCH BAR - Top Center */}
      <div
        ref={searchWrapperRef}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-[1001] w-[90%] max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="relative flex items-center p-1">
            <div className="pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              placeholder="Search buildings..."
              className="block w-full pl-3 pr-10 py-4 text-base focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="pr-4 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* DROPDOWN RESULTS */}
          {isOpen && searchQuery.length > 0 && (
            <div className="max-h-[50vh] overflow-y-auto border-t border-slate-100 bg-white">
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  className="w-full text-left px-5 py-4 border-b border-slate-50 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{loc.name}</div>
                    <div className="text-[11px] text-slate-500 uppercase">{loc.category}</div>
                  </div>
                </button>
              ))}
              {filteredLocations.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-sm italic">No buildings found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FULL SCREEN MAP AREA */}
      <div className="absolute inset-0 z-0">
        <CampusMapContainer
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onBuildingSelect={onBuildingSelect}
        />
      </div>
    </div>
  );
}