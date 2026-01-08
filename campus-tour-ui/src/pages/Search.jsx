import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { locations } from '../data/locations';
import CampusMapContainer from "../components/CampusMapContainer";

export default function Search({ 
  searchQuery, setSearchQuery, 
  selectedCategory, setSelectedCategory, 
  onBuildingSelect, setOnBuildingSelect 
}) {
  const [searchParams] = useSearchParams();

  useEffect(() => {
  const q = searchParams.get('q');
  const cat = searchParams.get('category');
  
  if (q) setSearchQuery(q);
  if (cat) {
    setSelectedCategory(cat);
  }
}, [searchParams, setSearchQuery, setSelectedCategory]);

 const filteredLocations = locations.filter((location) => {
  const matchesQuery = location.name.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesCategory = selectedCategory === "All" || 
                          location.category.toLowerCase() === selectedCategory.toLowerCase();
  
  return matchesQuery && matchesCategory;
});

  const handleSelect = (loc) => {
    setOnBuildingSelect(null); 
    setTimeout(() => setOnBuildingSelect(loc), 10);
  };

  return (
    /* h-[calc(100vh-64px)] locks the container height to the viewport minus navbar */
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-white relative">
      
      {/* Sidebar - z-index higher than map but lower than navbar */}
      <div className="w-full lg:w-80 bg-white border-r flex flex-col z-[20] shadow-lg h-full">
        
        {/* Fixed Search Header */}
        <div className="flex-none p-5 bg-white border-b sticky top-0 z-[30]">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400 group-focus-within:text-primary-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search buildings..."
              className="block w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
            {filteredLocations.length} Results
          </p>
        </div>

        {/* Scrollable Results List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
          {filteredLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              style={{ cursor: 'pointer' }}
              className={`w-full text-left px-5 py-5 border-b border-slate-50 transition-all block relative z-[40] ${
                onBuildingSelect?.id === loc.id 
                ? "bg-primary-50 border-l-4 border-l-primary-600 shadow-inner" 
                : "hover:bg-slate-50 border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex flex-col pt-1">
                <div className={`text-sm font-semibold leading-tight ${onBuildingSelect?.id === loc.id ? "text-primary-700" : "text-slate-900"}`}>
                  {loc.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${onBuildingSelect?.id === loc.id ? 'bg-primary-400' : 'bg-slate-300'}`}></span>
                  {loc.category}
                </div>
              </div>
            </button>
          ))}
          {filteredLocations.length === 0 && (
            <div className="p-10 text-center text-slate-400 text-sm italic">
              No buildings found
            </div>
          )}
        </div>
      </div>

      {/* Map Area - absolute inset-0 prevents the map from expanding beyond this container */}
      <div className="flex-1 relative h-full min-h-0 z-[10] bg-slate-100"> 
        <div className="absolute inset-0">
          <CampusMapContainer 
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onBuildingSelect={onBuildingSelect}
          />
        </div>
      </div>

    </div>
  );
}